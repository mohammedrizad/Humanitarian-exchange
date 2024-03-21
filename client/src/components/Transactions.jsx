
import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import "./Transactions.css";
import { shortenAddress } from "../utils/shortenAddress";

const TransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  firstname,
  location,
  description,
  availability,
}) => {
  return (
    <div className="transactions-card">
      <div className="transactions-link">
        <div className="from-to-container">
          <div className="from">
            <a
              href={`https://sepolia.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noreferrer"
            >
              From: {shortenAddress(addressFrom)}
            </a>
          </div>
          <div className="to">
            <a
              href={`https://sepolia.etherscan.io/address/${addressTo}`}
              target="_blank"
              rel="noreferrer"
            >
              To: {shortenAddress(addressTo)}
            </a>
          </div>
        </div>
      </div>
      <p className="transaction-info">Name: {firstname}</p>
      <p className="transaction-info">Location: {location}</p>
      <p className="transaction-info">Description: {description}</p>
      <p className="transaction-info">Availability: {availability}</p>
      <div className="transactions-timestamp">
        <p>{timestamp}</p>
      </div>
    </div>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="transactions-container">
      {currentAccount ? (
        <h3 className="text-white text-3xl text-center my-2">
          Latest Transactions
        </h3>
      ) : (
        <h3 className="text-white text-3xl text-center my-2">
          Connect your account to see the latest transactions
        </h3>
      )}

      <div className="transactions-content">
        {[...transactions].reverse().map((transaction, i) => (
          <TransactionsCard key={i} {...transaction} />
        ))}
      </div>
    </div>
  );
};

export default Transactions;
