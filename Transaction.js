import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Web3 from 'web3';

const Transaction = () => {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');
  const [success, setSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState();

  // Replace with your own Ethereum node URL
  const ethereumNodeUrl =
    'https://mainnet.infura.io/v3/2820793388bb421e9438e8c71bb2e6de';

  // Initialize web3 instance
  const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));

  // Replace with your own wallet private key
  const walletPrivateKey =
    '19115de5259b0cd79adb5ca5da1fe8402998623051ed00f7b374a6363dca142a';

  // Define the recipient address
  const recipientAddress = '0x93AE18bC0a4Bfc76f3Cb7E4Dfb957AEb1Ca9B737';

  const handleSendTransaction = async () => {
    console.log('hi');
    try {
      // Get the nonce for the sender address
      const senderAddress =
        web3.eth.accounts.privateKeyToAccount(walletPrivateKey).address;
      const nonce = await web3.eth.getTransactionCount(senderAddress);
      // Define the transaction parameters
      const txParams = {
        nonce: web3.utils.toHex(nonce),
        to: recipientAddress,
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      };
      // Sign the transaction with the sender's private key
      const signedTx = await web3.eth.accounts.signTransaction(
        txParams,
        walletPrivateKey,
      );
      // Send the signed transaction
      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      console.log('Transaction successful:', txReceipt);
    } catch (error) {
      console.log('Transaction failed:', error);
    }
  };

  return (
    // <SafeAreaView>
    <View style={styles.container}>
      <TextInput
        placeholder="Receiver Address"
        value={receiverAddress}
        onChangeText={setReceiverAddress}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="Enter Amount"
        value={usdtAmount}
        onChangeText={setUsdtAmount}
        style={styles.TextInput}
      />
      <TouchableOpacity onPress={handleSendTransaction} style={styles.button}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>
    </View>
    // </SafeAreaView>
  );
};

export default Transaction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: 'white',
    textTransform: 'uppercase',
  },
  errorText: {
    color: 'red',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    textTransform: 'uppercase',
    fontSize: 12,
  },
  TextInput: {
    backgroundColor: '#fff',
    width: 300,
    padding: 15,
    marginBottom: 5,
  },
  textStyle: {
    color: 'white',
    textTransform: 'uppercase',
  },
});
