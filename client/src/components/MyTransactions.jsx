// MyTransactions.jsx
import React, { useState } from 'react';
import './MyTransactions.css';
import DonateTransactions from './DonateTransactions'; // Import the DonateTransactions component
import RequestTransactions from './RequestTransactions'; // Import the RequestTransactions component

const MyTransactions = () => {
  const [activeTab, setActiveTab] = useState('donation');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="my-transactions">
      <div className="tab-buttons">
        <button
          className={activeTab === 'donation' ? 'active' : ''}
          onClick={() => handleTabChange('donation')}
        >
          Donation Records
        </button>
        <button
          className={activeTab === 'request' ? 'active' : ''}
          onClick={() => handleTabChange('request')}
        >
          Request Records
        </button>
      </div>

      <div className="tab-content">
        {/* Conditionally render the DonateTransactions component when the 'donation' tab is active */}
        {activeTab === 'donation' && <DonateTransactions />}
        {/* Conditionally render the RequestTransactions component when the 'request' tab is active */}
        {activeTab === 'request' && <RequestTransactions />}
      </div>
    </div>
  );
};

export default MyTransactions;
