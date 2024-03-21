// Welcome.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import Transactions from './Transactions';
import Home from './Home'; // Import the Home component

import './Welcome.css';

import Donate from './Donate';
import Request from './Request';
import NgoPage from './NgoPage';
import Search from './Search';
import Support from './Support';
import MyTransactions from './MyTransactions';
import VerifyNgo from './VerifyNgo';
import Navbar from './Navbar';





const Welcome = () => {
  return (
    <Router>

      <div className="homepage">
        {/* Top Navigation Bar */}
        <nav className="top-nav">
          <div className="top-nav-content">
            <p>Connecting those who have with those who need!</p>
            <Link to="/support" className="support-link">Support the initiative</Link>
            <FontAwesomeIcon icon={faHeart} style={{ marginRight: '5px' }} />
          </div>
        </nav>





        {/* Header */}
        <header className="header">
          <img src="icon.png" alt="Logo" className="logo" />
          <nav>
            <ul className="nav-links">
              <li><Link to="/" className="nav-link" activeClassName="active">Home</Link></li>
              <li><Link to="/donate" className="nav-link" activeClassName="active">Donate</Link></li>
              <li><Link to="/request" className="nav-link" activeClassName="active">Request</Link></li>
              <li><Link to="/ngo" className="nav-link" activeClassName="active">NGO</Link></li>
              <li><Link to="/verify-ngo" className="nav-link" activeClassName="active">VerifyNGO</Link></li>
              {/*<li><Link to="/my-transactions" className="nav-link" activeClassName="active">My Transactions</Link></li>*/}
            </ul>
          </nav>
        </header>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            index
            element={<Home />}
          />
          <Route path="/donate" element={<Donate />} />
          <Route path="/request" element={<Request />} />
          <Route path="/ngo" element={<NgoPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/support" element={<Support />} />
          <Route path="/verify-ngo" element={<VerifyNgo />} />
          <Route path="/my-transactions" element={<MyTransactions />} />
          

          {/* Add additional routes for other pages as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default Welcome;


