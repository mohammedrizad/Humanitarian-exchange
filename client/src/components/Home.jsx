import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the updated CSS file
import { TransactionContext } from '../context/TransactionContext';

const Home = () => {
  const { connectWallet, currentAccount } = useContext(TransactionContext);

  return (
    <section className="home-hero-section">
      <div className="home-center-container">
        <div className="home-wallet-container">
          {!currentAccount ? (
            <button className="connect-wallet-button" onClick={connectWallet}>
              Connect Wallet
            </button>
          ) : (
            <button
              className="connect-wallet-button"
              onClick={() =>
                window.open(
                  `https://sepolia.etherscan.io/address/${currentAccount}`,
                  "_blank"
                )
              }
            >
              Metamask Connected!
            </button>
          )}
        </div>
        <div className="home-text-container">
          <h1 className='ch'>Make The World a Better Place</h1>
          <p className='cha'>"Feed those who are hungry. Wrap the needy in warmth, and shelter their dreams with donated abundance, combating the suffering of those in need.".</p>
        </div>
      </div>
      <div className="home-cta-buttons">
        <Link to="/donate" className="home-button-link">
          <button className="donate-button">Donate Now</button>
        </Link>
        <Link to="/request" className="home-button-link">
          <button className="request-button">Request Resources</button>
        </Link>
        <Link to="/search" className="home-button-link">
          <button className="search-button">Search Available Resources</button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
