import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Web3 = require('web3');

function App() {
  const [receiverAddress, setReceiverAddress] = useState('');
  const [usdtAmount, setUsdtAmount] = useState('');

  const ethereumNodeUrl =
    'https://mainnet.infura.io/v3/2820793388bb421e9438e8c71bb2e6de';

  const web3 = new Web3(new Web3.providers.HttpProvider(ethereumNodeUrl));

  const recipientAddress = '0x93AE18bC0a4Bfc76f3Cb7E4Dfb957AEb1Ca9B737';

  const handleSendTransaction = async () => {
    try {
      const senderAddress = web3.eth.accounts.privateKeyToAccount(
        web3.utils.toHex(
          '19115de5259b0cd79adb5ca5da1fe8402998623051ed00f7b374a6363dca142a',
        ),
      ).address;
      console.log(senderAddress);
      // console.log(web3.eth.getTransactionCount(senderAddress));
      const nonce = 0;
      // const nonce = await web3.eth.getTransactionCount(
      //   web3.utils.toHex(senderAddress),
      // );
      // console.log(nonce);
      const txParams = {
        nonce: `0x${nonce.toString(16)}`,
        to: web3.utils.toHex(recipientAddress),
        value: web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex('21000'),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
      };
      console.log(txParams);

      const signedTx = await web3.eth.accounts.signTransaction(
        txParams,
        web3.utils.toHex(
          '19115de5259b0cd79adb5ca5da1fe8402998623051ed00f7b374a6363dca142a',
        ),
      );

      const txReceipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      console.log('Transaction successful:', txReceipt);
    } catch (error) {
      console.log('Transaction failed:', error);
    }
  };

  return (
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
  );
}

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

export default App;
