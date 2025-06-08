import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { Link } from 'react-router-dom';
import './TrendingPhones.css'; 

const TrendingPhones = () => {
  const [trendingPhones, setTrendingPhones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get('/api/phones/trending');
        setTrendingPhones(res.data);
      } catch (error) {
        console.error('Failed to fetch trending phones:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return <div className="text-center p-4">Loading trending phones...</div>;

  return (
    <div className="trending-container">
      <h2 className="trending-header">🔥 Top Rated</h2>
      <ul className="trending-list">
        {trendingPhones.map((item) => (
          <li key={item.phone._id} className="trending-item">
            <Link to={`/phone/${item.phone._id}`} className="trending-link">
              <span className="phone-name">{item.phone.name}</span>
              <span className="rating">⭐ {item.averageRating.toFixed(1)} ({item.count})</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrendingPhones;
