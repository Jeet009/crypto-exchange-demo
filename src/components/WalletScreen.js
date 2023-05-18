import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { ethers } from "ethers";
import { useNetwork } from "../context/NetwrokContext";
import { useNavigation } from "@react-navigation/native";

function WalletScreen() {
  const [walletDetails, setWalletDetails] = useState();
  const { currentNetwork } = useNetwork();
  const navigation = useNavigation();

  const importBitcoinWallet = (privateKey) => {
    try {
      const keyPair = bitcoin.ECPair.fromPrivateKey(
        Buffer.from(privateKey, "hex")
      );
      const { address } = bitcoin.payments.p2pkh({
        pubkey: keyPair.publicKey,
      });

      setWalletDetails({
        address: address,
        privateKey: privateKey,
      });
    } catch (error) {
      console.error("Error importing Bitcoin wallet:", error);
      return null;
    }
  };

  const importPolygonWallet = async (privateKey) => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://polygon-rpc-url"
      );
      const wallet = new ethers.Wallet(privateKey, provider);

      const address = await wallet.getAddress();
      console.log("Imported Polygon wallet address:", address);
      setWalletDetails({
        address: address,
        privateKey: privateKey,
      });
    } catch (error) {
      console.error("Error importing Polygon wallet:", error);
      return null;
    }
  };

  useEffect(() => {
    const privateKey =
      currentNetwork === "bitcoin"
        ? "KEY"
        : "19115de5259b0cd79adb5ca5da1fe8402998623051ed00f7b374a6363dca142a";
    const wallet =
      currentNetwork === "bitcoin"
        ? importBitcoinWallet(privateKey)
        : importPolygonWallet(privateKey);
  }, []);

  console.log(walletDetails);

  if (walletDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>
          {" "}
          Wallet Address: {walletDetails.address.substring(0, 15) + "..."}
        </Text>
        <Text style={styles.textStyle}>
          {" "}
          Private Key: {walletDetails.privateKey.substring(0, 15) + "..."}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("SendTransactionScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Initiate a transaction</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error importing wallet</Text>
      </View>
    );
  }
}

export default WalletScreen;

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
    // borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: "#000",
    textTransform: "uppercase",
    fontSize: 12,
  },
});
