import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div className="search-page">
      {/* Filter and Search Options */}
      <div className="filter-search-options">
        <div className="filter-options">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select id="categoryFilter" name="categoryFilter">
            <option value="food">Food</option>
            <option value="clothes">Clothes</option>
            <option value="books">Books</option>
            {/* Add more categories as needed */}
          </select>
        </div>

        <div className="search-bar">
          <label htmlFor="itemSearch">Search for Items:</label>
          <input type="text" id="itemSearch" name="itemSearch" placeholder="Enter item name" />
        </div>
      </div>

      {/* Resource Cards */}
      <div className="resource-cards">
        {/* Example Resource Card */}
        <div className="resource-card">
          <img src="resource-image.jpg" alt="Resource Thumbnail" />
          <p className="resource-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="donate-now-button">Donate Now</button>
        </div>
        {/* Additional resource cards go here */}
      </div>

      {/* Sorting Options */}
      <div className="sorting-options">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" name="sort">
          <option value="relevance">Relevance</option>
          <option value="date">Date</option>
        </select>
      </div>
    </div>
  );
};

export default Search;
