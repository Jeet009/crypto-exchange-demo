import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Web3 from "web3";
import { useNavigation } from "@react-navigation/native";

const SendTransactionScreen = () => {
  const [receiverAddress, setReceiverAddress] = useState("");
  const [usdtAmount, setUsdtAmount] = useState("");
  const [success, setSuccess] = useState(false);
  const [transactionHash, setTransactionHash] = useState();

  const navigation = useNavigation();

  const handleSendTransaction = async () => {
    try {
      const provider = await window.ethereum;
      await provider.enable();
      const web3 = new Web3(provider);

      const usdtContractAddress = "0x6a23C73810a2b940105E05096710ACb48211D972";
      const usdtContractABI = [
        {
          constant: true,
          inputs: [],
          name: "name",
          outputs: [
            {
              name: "",
              type: "string",
            },
          ],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
        {
          constant: false,
          inputs: [
            {
              name: "_to",
              type: "address",
            },
            {
              name: "_value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const accounts = await web3.eth.getAccounts();
      const senderAddress = accounts[0];

      const usdtContract = new web3.eth.Contract(
        usdtContractABI,
        usdtContractAddress
      );

      const usdtDecimalPlaces = 6;
      const usdtAmountInWei = web3.utils
        .toWei(usdtAmount, `ether`)
        .padEnd(usdtDecimalPlaces + 1, "0");

      const tx = await usdtContract.methods
        .transfer(receiverAddress, usdtAmountInWei)
        .send({
          from: senderAddress,
        });

      console.log("Transaction Hash:", tx.transactionHash);
      setTransactionHash(tx.transactionHash);
      setSuccess(true);
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return success ? (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        TRANSACTTION WAS SUCCESSFULLY INITIATED
      </Text>
      <Text style={styles.textStyle}>
        TRANSACTTION HASH : {transactionHash.substring(0, 15) + "..."}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("TransactionHistoryScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>CHECK TRANSACTTION HISTORY</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View style={styles.container}>
      <TextInput
        placeholder="Receiver Address"
        value={receiverAddress}
        onChangeText={setReceiverAddress}
        style={styles.TextInput}
      />
      <TextInput
        placeholder="USDT Amount"
        value={usdtAmount}
        onChangeText={setUsdtAmount}
        style={styles.TextInput}
      />
      <TouchableOpacity onPress={handleSendTransaction} style={styles.button}>
        <Text style={styles.buttonText}>SEND</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendTransactionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    color: "white",
    textTransform: "uppercase",
  },
  errorText: {
    color: "red",
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    paddingVertical: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    textTransform: "uppercase",
    fontSize: 12,
  },
  TextInput: {
    backgroundColor: "#fff",
    width: 300,
    padding: 15,
    marginBottom: 5,
  },
  textStyle: {
    color: "white",
    textTransform: "uppercase",
  },
});
