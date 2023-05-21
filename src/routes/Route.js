import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../components/HomeScreen";
import WalletScreen from "../components/WalletScreen";
// import { useNetwork } from "../context/NetwrokContext";
import SendTransactionScreen from "../components/SendTransactionScreen";
import TransactionHistoryScreen from "../components/TransactionHistoryScreen";
import NetworkStore from "../stores/NetworkStore";
import { observer } from "mobx-react";

const Stack = createStackNavigator();

const Route = observer(() => {
  // const { currentNetwork } = useNetwork();
  const { currentNetwork } = NetworkStore;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: `CRYPTOXPRESS / ${currentNetwork}`,
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerTintColor: "#000",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "black",
              fontSize: 12,
              textTransform: "uppercase",
            },
            animationTypeForReplace: "push",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            title: "USER WALLET",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
              fontSize: 12,
            },
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="SendTransactionScreen"
          component={SendTransactionScreen}
          options={{
            title: "MAKE A TRANSACTTION",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
              fontSize: 12,
            },
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="TransactionHistoryScreen"
          component={TransactionHistoryScreen}
          options={{
            title: "TRANSACTTION HISTORY",
            headerStyle: {
              backgroundColor: "#000",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "bold",
              color: "white",
              fontSize: 12,
            },
            animationTypeForReplace: "push",
            animation: "slide_from_right",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
});

export default Route;
