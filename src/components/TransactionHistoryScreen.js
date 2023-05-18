import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fetchTransactionHistory } from "../stores/ApiEndpoints";

const TransactionHistoryScreen = () => {
  const [transactions, setTransactions] = useState(null);

  useEffect(() => {
    fetchTransactionHistory()
      .then((res) => res.json())
      .then(() => {
        setTransactions(res);
        console.log(res);
      });
  }, []);

  if (transactions) {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Transaction History</Text>
        {transactions.map((transaction, index) => (
          <View key={index}>
            <Text style={styles.textStyle}>
              Hash: {transaction.hash.substring(0, 15) + "..."}
            </Text>
            <Text style={styles.textStyle}>Value: {transaction.value}</Text>
          </View>
        ))}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Transaction History</Text>
        <Text style={styles.errorText}>Something went wrong</Text>
      </View>
    );
  }
};

export default TransactionHistoryScreen;

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
