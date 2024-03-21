import React, { useEffect } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import { JsonRpcProvider } from "@ethersproject/providers";
import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const useEthers = () => {
  const { ethereum } = window;

  if (!ethereum && !window.web3) {
    console.error("No ethereum object or web3 provider");
    return null;
  }

  const provider = ethereum || window.web3.currentProvider;
  const ethersProvider = new Web3Provider(provider);
  const signer = ethersProvider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  // Replace with your provider URL
  const providerURL = "https://eth-sepolia.g.alchemy.com/v2/z8i8H5G-Trp68wHfvKdzLw6D9xm5foyS";
  const jsonRpcProvider = new JsonRpcProvider(providerURL);

  return { ethereum, transactionsContract, jsonRpcProvider };
};

export const TransactionsProvider = ({ children }) => {
  const {
    ethereum,
    transactionsContract,
    jsonRpcProvider,
  } = useEthers();

  const [isLoading, setIsLoading] = React.useState(false);
  const [currentAccount, setCurrentAccount] = React.useState("");
  const [donateFormData, setDonateFormData] = React.useState({
    firstname: "",
    address: "",
    location: "",
    phone: "",
    email: "",
    description: "",
    availability: "",
    transactionType: "Donation",
  });
  const [requestFormData, setRequestFormData] = React.useState({
    firstname: "",
    location: "",
    description: "",
    availability: "",
    transactionType: "Request",
  });
  const [transactionCount, setTransactionCount] = React.useState(
    parseInt(localStorage.getItem("transactionCount")) || 0
  );
  const [transactions, setTransactions] = React.useState([]);

  const handleDonateChange = (e, name) => {
    setDonateFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value || "",
    }));
  };

  const handleRequestChange = (e, name) => {
    setRequestFormData((prevState) => ({
      ...prevState,
      [name]: e.target.value || "",
    }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        // Set isLoading to true while fetching data
        setIsLoading(true);

        const availableTransactions =
          await transactionsContract.getAllTransactions();
        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              Number(transaction.timestamp) * 1000
            ).toLocaleString(),
            firstname: transaction.firstname,
            location: transaction.location,
            description: transaction.description,
            availability: transaction.availability,
            transactionType: transaction.transactionType,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);

        // Set isLoading back to false after fetching data
        setIsLoading(false);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
      // Set isLoading back to false in case of an error
      setIsLoading(false);
    }
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.error("No ethereum object");
        return alert("Please install MetaMask.");
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        console.log("Wallet connected:", accounts[0]);
        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.error("Error checking wallet connection:", error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem("transactionCount", transactionsCount);
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();

      console.log("Wallet connected:", accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async (formData) => {
    try {
      setIsLoading(true);

      if (!transactionsContract) {
        console.error("Failed to create Ethereum contract.");
        setIsLoading(false);
        return;
      }

      const {
        firstname,
        location,
        description,
        availability,
        transactionType,
      } = formData;

      if (
        !firstname ||
        !location ||
        !description ||
        !availability ||
        !transactionType
      ) {
        console.error("Please fill in all the required fields.");
        return;
      }

      const transactionTypeString = transactionType.toString();

      if (!["Donation", "Request"].includes(transactionTypeString)) {
        console.error("Invalid transaction type");
        return;
      }

      // Call addToBlockchain function to initiate the transaction
      const transactionHash = await transactionsContract.addToBlockchain(
        firstname,
        location,
        description,
        availability,
        transactionTypeString
      );

      // Log the transaction hash and update loading status
      console.log(`Transaction initiated - ${transactionHash.hash}`);

      // Robust Transaction Confirmation Handling
      const listener = jsonRpcProvider.on("block", async (blockNumber) => {
        const transaction = await jsonRpcProvider.getTransaction(transactionHash.hash);
        const confirmations = transaction.confirmations;

        if (confirmations >= 6) {
          console.log(`Transaction confirmed! ${transactionHash.hash}`);
          jsonRpcProvider.off("block", listener);

          const transactionsCount = await transactionsContract.getTransactionCount();
          setTransactionCount(transactionsCount.toNumber());
          setIsLoading(false);

          getAllTransactions();
        }
      });
    } catch (error) {
      console.error("Error sending transaction:", error);
      setIsLoading(false);
      throw error;
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, [transactionCount]);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        donateFormData,
        requestFormData,
        handleDonateChange,
        handleRequestChange,
        sendTransaction,
        transactions,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
