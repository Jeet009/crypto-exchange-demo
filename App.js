import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NetworkProvider } from "./src/context/NetwrokContext";
import { Provider } from "mobx-react";
import Route from "./src/routes/Route";
import NetworkStore from "./src/stores/NetworkStore";

export default function App() {
  return (
    <>
      {/* <Provider NetworkStore={NetworkStore}> */}
      <NetworkProvider>
        <Route />
      </NetworkProvider>
      {/* </Provider> */}
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
