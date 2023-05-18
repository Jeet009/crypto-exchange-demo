import { createContext, useContext, useState } from "react";

const NetworkContext = createContext();

export const useNetwork = () => useContext(NetworkContext);

export const NetworkProvider = ({ children }) => {
  const networks = {
    bitcoin: {
      name: "Bitcoin",
      currency: "BTC",
      apiUrl: "https://api.example.com/bitcoin",
    },
    polygon: {
      name: "Polygon",
      currency: "USDT",
      apiUrl: "https://api.example.com/polygon",
    },
  };

  const [currentNetwork, setCurrentNetwork] = useState("bitcoin");

  const switchNetwork = (network) => {
    if (networks.hasOwnProperty(network)) {
      setCurrentNetwork(network);
    } else {
      console.warn(`Network '${network}' is not supported.`);
    }
  };

  const getSelectedNetwork = () => {
    return networks[currentNetwork];
  };

  const getNetworksList = () => {
    return Object.values(networks);
  };

  return (
    <NetworkContext.Provider
      value={{
        currentNetwork,
        switchNetwork,
        getSelectedNetwork,
        getNetworksList,
      }}
    >
      {children}
    </NetworkContext.Provider>
  );
};
