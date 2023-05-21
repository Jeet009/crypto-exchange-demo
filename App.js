import { StatusBar } from "expo-status-bar";
// import { NetworkProvider } from "./src/context/NetwrokContext";
import { Provider } from "mobx-react";
import Route from "./src/routes/Route";
import NetworkStore from "./src/stores/NetworkStore";

export default function App() {
  return (
    <>
      <Provider NetworkStore={NetworkStore}>
        <Route />
      </Provider>
      <StatusBar style="auto" />
    </>
  );
}
