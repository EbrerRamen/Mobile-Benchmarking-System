// components/PhoneFinderForm.js
import React, { useState } from 'react';
import './PhoneFinderForm.css'; // optional styling

const PhoneFinderForm = ({ isOpen, onClose, onSearch }) => {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [sortOrder, setSortOrder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ search, brand, sortOrder });
    onClose(); // close the modal after submitting
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Phone Finder</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort by price</option>
            <option value="asc">Lowest to Highest</option>
            <option value="desc">Highest to Lowest</option>
          </select>
          <button type="submit">Find</button>
        </form>
        <button className="close-btn" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default PhoneFinderForm;
