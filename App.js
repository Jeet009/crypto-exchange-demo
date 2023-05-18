import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NetworkProvider } from "./src/context/NetwrokContext";
import Route from "./src/routes/Route";

export default function App() {
  return (
    <>
      <NetworkProvider>
        <Route />
      </NetworkProvider>
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
