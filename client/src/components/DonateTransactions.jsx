// DonateTransactions.jsx
import React, { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';
import "./DonateTransactions.css"; // Add any styling specific to DonateTransactions
import { shortenAddress } from "../utils/shortenAddress";

const DonateTransactionsCard = ({
  addressTo,
  addressFrom,
  timestamp,
  firstname,
  location,
  description,
  availability,
}) => {
  return (
    <div className="donate-transactions-card">
      <div className="donate-transactions-link">
        <div className="donate-from-to-container">
          <div className="donate-from">
            <a
              href={`https://sepolia.etherscan.io/address/${addressFrom}`}
              target="_blank"
              rel="noreferrer"
            >
              From: {shortenAddress(addressFrom)}
            </a>
          </div>
          <div className="donate-to">
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
      <p className="donate-transaction-info">Name: {firstname}</p>
      <p className="donate-transaction-info">Location: {location}</p>
      <p className="donate-transaction-info">Description: {description}</p>
      <p className="donate-transaction-info">Availability: {availability}</p>
      <div className="donate-transactions-timestamp">
        <p>{timestamp}</p>
      </div>
    </div>
  );
};

const DonateTransactions = () => {
  const { transactions, currentAccount } = useContext(TransactionContext);

  return (
    <div className="donate-transactions-container">
      {currentAccount ? (
        <h3 className='donate-transactions-hh'>
          Latest Donation Transactions
        </h3>
      ) : (
        <h3 className='donate-transactions-hh'>
          Connect your account to see the latest donation transactions
        </h3>
      )}

<div className="donate-transactions-content">
        {[...transactions]
          .filter(transaction => transaction.transactionType === BigInt(0)) // Filter only donation transactions (where transactionType is 0)
          .reverse()
          .map((transaction, i) => (
            <DonateTransactionsCard key={i} {...transaction} />
          ))}
      </div>
    </div>
  );
};

export default DonateTransactions;
