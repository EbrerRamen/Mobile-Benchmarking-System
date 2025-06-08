import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import './TrendingPhones.css'; 

const ValueForMoney = () => {
  const [phones, setPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchValuePhones = async () => {
      try {
        const res = await axios.get('/api/phones/top-value');
        setPhones(res.data);
      } catch (error) {
        console.error('Failed to fetch value-for-money phones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchValuePhones();
  }, []);

  if (loading) return <div className="text-center p-4">Loading value-for-money phones...</div>;

  return (
    <div className="trending-container">
      <h2 className="trending-header">💸 Value for Money</h2>
      <ul className="trending-list">
        {phones.map((phone, index) => (
          <li key={phone._id} className="trending-item">
            <Link to={`/phone/${phone._id}`} className="trending-link">
              <span className="phone-name">{phone.name}</span>
              <span className="rating">📈 Score: {phone.valueScore}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValueForMoney;
