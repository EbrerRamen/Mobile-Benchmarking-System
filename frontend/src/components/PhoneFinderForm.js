import React, { useState } from 'react';
import './PhoneFinderForm.css';

const PhoneFinderForm = ({ isOpen, onClose, onSearch }) => {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  // const [sortByValueScore, setSortByValueScore] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRam, setMinRam] = useState('');
  const [minStorage, setMinStorage] = useState('');
  const [minBattery, setMinBattery] = useState('');
  const [minRefreshRate, setMinRefreshRate] = useState('');
  const [minCamera, setMinCamera] = useState('');
  const [os, setOs] = useState('');
  const [network, setNetwork] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const filters = {
      search,
      brand,
      sort: sortOrder,
      // sortByValueScore,
      minPrice,
      maxPrice,
      minRam,
      minStorage,
      minBattery,
      minRefreshRate,
      minCamera,
      os,
      network,
    };

    onSearch(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Phone Finder</h2>
        <form onSubmit={handleSubmit} className="phone-form">

          <input type="text" placeholder="Search by name or processor" value={search} onChange={(e) => setSearch(e.target.value)} />
          <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          
          <div className="range-inputs">
            <input type="number" placeholder="Min Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            <input type="number" placeholder="Max Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          </div>

          <div className="range-inputs">
            <input type="number" placeholder="Min RAM (GB)" value={minRam} onChange={(e) => setMinRam(e.target.value)} />
            <input type="number" placeholder="Min Storage (GB)" value={minStorage} onChange={(e) => setMinStorage(e.target.value)} />
          </div>

          <div className="range-inputs">
            <input type="number" placeholder="Min Battery (mAh)" value={minBattery} onChange={(e) => setMinBattery(e.target.value)} />
            <input type="number" placeholder="Min Camera (MP)" value={minCamera} onChange={(e) => setMinCamera(e.target.value)} />
          </div>

          <input type="number" placeholder="Min Refresh Rate (Hz)" value={minRefreshRate} onChange={(e) => setMinRefreshRate(e.target.value)} />
          <input type="text" placeholder="Operating System" value={os} onChange={(e) => setOs(e.target.value)} />
          <input type="text" placeholder="Network (e.g., 5G)" value={network} onChange={(e) => setNetwork(e.target.value)} />

          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Sort by Price</option>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>

          {/* <select value={sortByValueScore} onChange={(e) => setSortByValueScore(e.target.value)}>
            <option value="">Sort by Value Score</option>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select> */}

          <button type="submit">Find</button>
        </form>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default PhoneFinderForm;
