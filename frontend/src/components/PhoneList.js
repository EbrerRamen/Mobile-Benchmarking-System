import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditPhoneForm from './EditPhoneForm';
import './PhoneList.css'; // CSS file

const PhoneList = () => {
  const [phones, setPhones] = useState([]);
  const [editingPhone, setEditingPhone] = useState(null);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async () => {
    try {
      const res = await axios.get('http://localhost:1080/api/phones');
      setPhones(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch phones');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this phone?')) return;
    try {
      await axios.delete(`http://localhost:1080/api/phones/${id}`);
      fetchPhones();
    } catch (err) {
      console.error(err);
      alert('Failed to delete phone');
    }
  };

  const handleEditClick = (phone) => {
    setEditingPhone(phone);
  };

  const handleUpdate = (updatedPhone) => {
    setEditingPhone(null);
    fetchPhones(); // refresh the list
  };

  return (
    <div className="phone-list-container">
      

      {editingPhone && (
        <EditPhoneForm
          phone={editingPhone}
          onUpdate={handleUpdate}
          onCancel={() => setEditingPhone(null)}
        />
      )}

      {phones.length === 0 ? (
        <p>No phones available.</p>
      ) : (
        <ul>
          {phones.map((phone) => (
            <li key={phone._id} className="phone-item">
              <div className="phone-item-info">
                {phone.imageUrl && (
                  <img
                    src={phone.imageUrl || 'https://via.placeholder.com/80'}
                    alt={phone.name}
                    className="phone-thumbnail"
                  />
                )}
                <div>
                  <strong>{phone.name}</strong> - {phone.brand} - ${phone.price}
                </div>
              </div>
              <div className="phone-item-actions">
                <button
                  onClick={() => handleEditClick(phone)}
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(phone._id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <Link to={`/phone/${phone._id}`} className="view-details-link">
                  View Details
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhoneList;
