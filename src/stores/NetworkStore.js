import { makeObservable, observable, action } from "mobx";

class NetworkStore {
  networks = {
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

  currentNetwork = "bitcoin";

  constructor() {
    makeObservable(this, {
      currentNetwork: observable,
      switchNetwork: action,
      getSelectedNetwork: action,
      getNetworksList: action,
    });
  }

  switchNetwork(network) {
    if (this.networks.hasOwnProperty(network)) {
      this.currentNetwork = network;
    } else {
      console.warn(`Network '${network}' is not supported.`);
    }
  }

  getSelectedNetwork() {
    return this.networks[this.currentNetwork];
  }

  getNetworksList() {
    return Object.values(this.networks);
  }
}

export default new NetworkStore();
