// RequestTransactions.jsx
import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import "./RequestTransactions.css"; // Add any styling specific to RequestTransactions
import { shortenAddress } from "../utils/shortenAddress";

const RequestTransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  firstname,
  location,
  description,
  availability,
}) => {
  return (
    <div className="request-transactions-card">
      <div className="request-transactions-link">
        <div className="request-from-to-container">
          <div className="request-from">
            <a
              href={`https://sepolia.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noreferrer"
            >
              From: {shortenAddress(addressFrom)}
            </a>
          </div>
          <div className="request-to">
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
      <p className="request-transaction-info">Name: {firstname}</p>
      <p className="request-transaction-info">Location: {location}</p>
      <p className="request-transaction-info">Description: {description}</p>
      <p className="request-transaction-info">Desired Quantity: {availability}</p>
      <div className="request-transactions-timestamp">
        <p>{timestamp}</p>
      </div>
    </div>
  );
};

const RequestTransactions = () => {
    const { transactions, currentAccount } = useContext(TransactionContext);
  
    return (
      <div className="request-transactions-container">
        {currentAccount ? (
          <h3 className="request-transactions-hh">
            Latest Request Transactions
          </h3>
        ) : (
          <h3 className="request-transactions-hh">
            Connect your account to see the latest request transactions
          </h3>
        )}
  
        <div className="request-transactions-content">
          {[...transactions]
            .filter(transaction => transaction.transactionType === BigInt(1)) // Filter only request transactions (where transactionType is 1)
            .reverse()
            .map((transaction, i) => (
              <RequestTransactionsCard key={i} {...transaction} />
            ))}
        </div>
      </div>
    );
  };
  
  export default RequestTransactions;