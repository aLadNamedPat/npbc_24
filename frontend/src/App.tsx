import React, { useEffect, useState } from 'react';import './App.css';
import DatasetUploader from './DatasetUploader';
import MySlider from './MySlider';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Layout, Row, Col, Button, Spin } from "antd";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import "@aptos-labs/wallet-adapter-ant-design/dist/index.css";
import { AccountAddress, Aptos } from "@aptos-labs/ts-sdk";
import {Provider, Network, AptosClient, AptosAccount, Types} from 'aptos';
import { useWallet, InputTransactionData} from "@aptos-labs/wallet-adapter-react";
import submitDataset from './DatasetSubmission';
import submitLabelingTask from './DatasetLabeling';


export const apClient = new AptosClient('https://fullnode.testnet.aptoslabs.com');
export const moduleAddress = "0x4fc3338dd407a69a518aac33eb2a28129cbea7903963fa6e463d3439a34df42b";
export const provider = new Provider(Network.TESTNET); // Replace MAINNET with the desired network



function App() {
  const {account, signAndSubmitTransaction } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);
  const [transactionInProgress, setTransactionInProgress] = useState<boolean>(false);
  
  const items = [
    { 
      title: "Mask Segmentation", 
      description: "Embark on a groundbreaking journey with us to redefine the future of image analysis and machine learning! We are seeking enthusiastic contributors to take part in an exhilarating task: the creation and segmentation of 1000 high-quality masks. This pivotal project aims to enhance our understanding and interpretation of complex visual data, paving the way for innovative advancements in AI-driven technologies. 50 APT",
      imageUrl: "./assets/13Lynteris4-superJumbo.png"
    },
    { 
      title: "Cell Segmentation", 
      description: "Dive into the microscopic world and make a monumental impact with our latest project in cellular analysis. We are on the hunt for dedicated individuals to join us in an enthralling task: the segmentation of 50 cells. This unique challenge is more than just a task; it's an opportunity to contribute to groundbreaking research that could revolutionize the way we understand cellular structures and functions. 10 APT",
      imageUrl: "./assets/cells.png"
    },
    { 
      title: "Furniture Segmentation", 
      description: "Join us on an exciting journey into the heart of interior design and innovation as we embark on a project to label 20 unique pieces of furniture. This engaging task is more than just an assignment; it’s an invitation to influence the future of home decor and smart living environments. Your contributions will play a pivotal role in enhancing how we interact with and perceive our living spaces, bridging the gap between aesthetic appeal and functional design. 5 APT",
      imageUrl: "./assets/ChairSegmentation.png"
    }
  ]  
  
  useEffect(() => {
    const fetchBalance = async () => {
      if (account && provider.indexerClient) {
        const acc = await apClient.getAccountResources(account.address)
        setBalance(acc[1].data.coin.value / 100000000);
      };
    };
    fetchBalance();
  }, [account]);
  
  return (
    <div className="App">
      <header className="App-header flex justify-between p-4">
        <div className="flex items-center space-x-4">
          {balance !== null && (
            <div className="text-white">
              {`Balance: ${balance} APT`}
            </div>
          )}
          <WalletSelector />
        </div>
      </header>
      {/* Rest of your component */}
      <div className="align-middle">
        <DatasetUploader />
        <MySlider items={items}/>
      </div>
    </div>
  );
}

export default App;