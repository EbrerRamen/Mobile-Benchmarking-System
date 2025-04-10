import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './PhoneDetails.css'; // Make sure this file exists or create one

const PhoneDetails = () => {
  const { phoneId } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const res = await axios.get(`http://localhost:1080/api/phones/${phoneId}`);
        setPhone(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Failed to load phone details');
        setLoading(false);
      }
    };

    fetchPhone();
  }, [phoneId]);

  if (loading) return <p>Loading phone details...</p>;
  if (!phone) return <p>Phone not found.</p>;

  return (
    <div className="phone-details-container">
      <h2>{phone.name}</h2>
      
      <img
        src={phone.imageUrl || 'https://via.placeholder.com/200'}
        alt={phone.name}
        className="phone-details-image"
      />

      <div className="phone-basic-info">
        <p><strong>Brand:</strong> {phone.brand}</p>
        <p><strong>Price:</strong> ${phone.price}</p>
      </div>

      <div className="phone-features">
        <h3>Features</h3>
        <ul>
          <li><strong>Camera:</strong> {phone.features?.camera || 'N/A'}</li>
          <li><strong>Battery:</strong> {phone.features?.battery || 'N/A'}</li>
          <li><strong>Display:</strong> {phone.features?.display || 'N/A'}</li>
          <li><strong>Processor:</strong> {phone.features?.processor || 'N/A'}</li>
        </ul>
      </div>
    </div>
  );
};

export default PhoneDetails;
