import { AptosAccount, Types } from 'aptos';
import { apClient } from './App'; // The AptosClient instance you initialized

const submitDataset = async (account: AptosAccount) => {
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: "0x7ace233db888c0a18caecd373b9ad5ffeb2a55901dee7a728e21da0b4b500d7a::DatasetLabeling::submit_dataset",
      type_arguments: [],
      arguments: [
        account      
      ],
    };
  
    // Generate and sign the transaction
    const txnRequest = await apClient.generateTransaction(account.address(), payload);
    const signedTxn = await apClient.signTransaction(account, txnRequest);
  
    // Submit the transaction
    const txnResult = await apClient.submitTransaction(signedTxn);
    return txnResult;
  };
  


export default submitDataset;