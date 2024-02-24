import React, { useState, ChangeEvent, useEffect } from 'react';
import axios from 'axios';
import { useWallet} from "@aptos-labs/wallet-adapter-react";
import { apClient, provider } from './App';
import submitDataset from './DatasetSubmission';

const DatasetUploader = () => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [folderName, setFolderName] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const {account, signAndSubmitTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  let expression = "This operation will cost you .01 apt"

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (account && provider.indexerClient) {
        const acc = await apClient.getAccountResources(account.address)
        setBalance(acc[1].data.coin.value / 100000000);
      };
    };
    fetchBalance();
  }, [account]);

  const handleFolderNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFolderName(e.target.value);
  };

  const uploadDataset = async () => {
    if (!files || files.length === 0 || !folderName) {
      alert('Please select files and specify a folder name.');
      return;
    }

    setUploading(true);

    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    let data = new FormData();
    files.forEach((file) => {
      // Append each file to the form data with a path including the root folder name
      data.append('file', file, `${folderName}/${file.name}`);
    });

    const pinataApiKey = import.meta.env.VITE_PINATA_KEY as string;
    const pinataApiSecret = import.meta.env.VITE_PINATA_SECRET as string;
    
    try {
      const response = await axios.post(url, data, {
        maxBodyLength: Infinity,
        headers: {
          'pinata_api_key': pinataApiKey,
          'pinata_secret_api_key': pinataApiSecret,
        },
      });

      alert(`Dataset uploaded! IPFS Hash: ${response.data.IpfsHash}`);

      expression = ""
    } catch (error) {
      console.error('Error uploading dataset:', error);
      alert('Failed to upload the dataset.');
    } finally {
      submitDataset(apClient)
      setUploading(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <input 
        type="text"
        placeholder="Description"
        className="mb-4 text-sm font-semibold w-full px-4 py-2 border rounded-full"
      />

      <input
        type = "number"
        placeholder="Amount of APT to pay"
        className="mb-4 text-sm font-semibold w-full px-4 py-2 border rounded-full"
        >
      </input>
      <input 
        type="text"
        placeholder="Folder Name"
        value={folderName}
        onChange={handleFolderNameChange}
        className="mb-4 text-sm font-semibold w-full px-4 py-2 border rounded-full"
      />
      <input 
        type="file"
        multiple // Allow multiple file selection
        onChange={handleFileChange} 
        className="mb-4 file:mr-4 file:py-2 file:px-4
                   file:rounded-full file:border-0
                   file:text-sm file:font-semibold
                   file:bg-violet-50 file:text-violet-700
                   hover:file:bg-violet-100"
      /> 
      <div>{expression}</div>

      <button 
        onClick={uploadDataset} // Call the function to upload the dataset
        className={`mt-2 px-4 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition-colors ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Dataset to IPFS'}
      </button>
      {uploading && <p className="mt-2 text-gray-500">Uploading dataset to IPFS, please wait...</p>}
    </div>
  );
};

export default DatasetUploader;