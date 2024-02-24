import React, { useState, FormEvent } from 'react';
import { Aptos, AptosConfig, Network, Account } from '@aptos-labs/ts-sdk';

// Set up Aptos client with testnet configuration
const aptosConfig = new AptosConfig({ network: Network.TESTNET });
const aptos = new Aptos(aptosConfig);

interface SendCoinFormProps {
    senderAccount: Account;
}

async function sendTransaction(sender: Account, recipientAddress: string, amount: number) {
    const transaction = await aptos.transaction.build.simple({
      sender: sender.accountAddress,
      data: {
        function: "0x1::coin::transfer",
        typeArguments: ["0x1::aptos_coin::AptosCoin"],
        functionArguments: [recipientAddress, amount],
      },
    });
  
    // Sign and submit the transaction
    const pendingTransaction = await aptos.signAndSubmitTransaction({
      signer: sender,
      transaction, 
    });
  
    console.log(`Transaction submitted. Hash: ${pendingTransaction.hash}`);
};

const SendCoinForm: React.FC<SendCoinFormProps> = ({ senderAccount }) => {
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!recipientAddress || !amount) {
      alert('Please fill in both recipient address and amount.');
      return;
    }

    try {
      // Convert amount to number before sending
      await sendTransaction(senderAccount, recipientAddress, Number(amount));
      alert('Transaction submitted successfully.');
    } catch (error) {
      console.error('Transaction submission failed:', error);
      alert('Failed to submit the transaction.');
    }

    // Reset form
    setRecipientAddress('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Recipient Address:
          <input
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
      </div>
      <button type="submit">Send Coin</button>
    </form>
  );
};

export default SendCoinForm;