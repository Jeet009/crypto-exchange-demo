import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NetworkUtilsProvider, useNetwork } from "../context/NetwrokContext";
import { fetchUSDTPrice } from "../stores/ApiEndpoints";
import { useNavigation } from "@react-navigation/native";
import { observer, inject } from "mobx-react";

const windowHeight = Dimensions.get("window").height;

const HomeScreen = () => {
  // const { currentNetwork, switchNetwork, getSelectedNetwork } = NetworkStore;
  const [usdtPrice, setUsdtPrice] = useState("");
  const { currentNetwork, switchNetwork, getSelectedNetwork } = useNetwork();
  const navigation = useNavigation();

  const selectedNetwork = getSelectedNetwork();

  const handleSwitchNetwork = (network) => {
    switchNetwork(network);
  };

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const price = await fetchUSDTPrice(currentNetwork);
        setUsdtPrice(price);
      } catch (error) {
        console.error("Error fetching USDT price:", error);
      }
    };

    fetchPrice();
  }, [switchNetwork]);

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {/* <Text> {selectedNetwork.currency}</Text> */}
        <Text style={styles.price}>
          {" "}
          {selectedNetwork.currency} / $ {usdtPrice}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() =>
            handleSwitchNetwork(
              currentNetwork == "bitcoin" ? "polygon" : "bitcoin"
            )
          }
          style={styles.button}
        >
          <Text style={styles.buttonText}>Change the network</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Wallet")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Check Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("TransactionHistoryScreen")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>CHECK TRANSACTTION HISTORY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
//   )
// );

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 30,
    height: windowHeight - 60,
  },
  infoContainer: {},
  buttonContainer: {},
  button: {
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    width: 300,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    textTransform: "uppercase",
  },
  networkWrapper: {
    backgroundColor: "orange",
    alignSelf: "center",
    paddingHorizontal: 100,
    paddingVertical: 5,
    borderRadius: 5,

    color: "white",
    textTransform: "uppercase",
  },
  price: {
    fontSize: 30,
    alignSelf: "center",
  },
});
