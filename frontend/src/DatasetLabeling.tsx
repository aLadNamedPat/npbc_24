import { AptosAccount, Types } from 'aptos';
import { apClient } from './App';

const finish_dataset = async (account: AptosAccount, cost : number, address: string) => {  
    // Construct the transaction payload
    const payload: Types.TransactionPayload = {
      type: "entry_function_payload",
      function: `0x${account.address().toString()}::DatasetLabeling::finish_dataset`,
      type_arguments: [], // Add type arguments if your function requires them
      arguments: [
        account,
        cost,
        address
      ],
    };
  
    // Generate a transaction request
    const txnRequest = await apClient.generateTransaction(account.address(), payload);
  
    // Sign the transaction with the user's account
    const signedTxn = await apClient.signTransaction(account, txnRequest);
  
    // Submit the signed transaction to the Aptos blockchain
    const txnResult = await apClient.submitTransaction(signedTxn);
  
    // Optionally, wait for the transaction to be processed and get the result
    const result = await apClient.waitForTransaction(txnResult.hash);
    console.log(result);
};

export default finish_dataset;