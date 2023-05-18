export const fetchUSDTPrice = async (currentNetwork) => {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,tether&vs_currencies=usd"
    );
    const data = await response.json();
    const price =
      currentNetwork == "bitcoin" ? data.bitcoin.usd : data.tether.usd;
    return price;
  } catch (error) {
    console.error("Error fetching USDT price:", error);
    throw error;
  }
};
export const fetchTransactionHistory = async () => {
  try {
    const address = "0x6a23C73810a2b940105E05096710ACb48211D972";

    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=GVTHRPUXE2HJ539EU45261ZMTU9MCYBE5I`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === "1") {
      return data.result;
    } else {
      console.error("Error fetching transaction history:", data.message);
      return null;
    }
  } catch (error) {
    console.error("Error fetching transaction history:", error);
    return null;
  }
};
