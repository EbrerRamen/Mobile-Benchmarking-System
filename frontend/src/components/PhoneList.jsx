import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditPhoneForm from './EditPhoneForm';
import useAdminStatus from '../hooks/useAdminStatus';
import PhoneFinderForm from './PhoneFinderForm';
import './PhoneList.css';

const PhoneList = ({ openAddPhoneForm }) => {
  const [phones, setPhones] = useState([]);
  const [editingPhone, setEditingPhone] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin, isLoading } = useAdminStatus();
  const [isFinderOpen, setIsFinderOpen] = useState(false);

  useEffect(() => {
    fetchPhones();
  }, []);

  const fetchPhones = async (filters = {}) => {
    try {
      const params = new URLSearchParams(filters).toString();
      const res = await axios.get(`http://localhost:1080/api/phones?${params}`);
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
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    setEditingPhone(null);
    setIsModalOpen(false);
    fetchPhones();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPhone(null);
  };

  return (
    <div className="phone-list-container">
      {isModalOpen && (
        <EditPhoneForm
          phone={editingPhone}
          onUpdate={handleUpdate}
          onCancel={handleCloseModal}
          isOpen={isModalOpen}
          closeModal={handleCloseModal}
        />
        
      )}
      <div className="finder-button-container">
  <button onClick={() => setIsFinderOpen(true)} className="finder-button">
    🔍 Open Phone Finder
  </button>
</div>
{isFinderOpen && (
  <PhoneFinderForm
    isOpen={isFinderOpen}
    onClose={() => setIsFinderOpen(false)}
    onSearch={(filters) => {
      fetchPhones(filters);
      setIsFinderOpen(false);
    }}
  />
)}

      {phones.length === 0 ? (
        <p>No phones available.</p>
      ) : (
        
        <ul className="phone-list">
          {/* ✅ Admin Add Button as part of the grid */}
          {!isLoading && isAdmin && (
            <li className="phone-item">
              <div className="add-phone-item" onClick={openAddPhoneForm}>
                <div className="add-phone-content">
                  <div className="plus-icon">+</div>
                </div>
              </div>
            </li>
          )}

          {phones.map((phone) => (
            <li key={phone._id} className="phone-item">
              <Link to={`/phone/${phone._id}`} className="phone-item-info-link">
                <div className="phone-item-info">
                  {phone.imageUrls && phone.imageUrls.length > 0 && (
                    <img
                      src={phone.imageUrls[0] || 'https://via.placeholder.com/80'}
                      alt={phone.name}
                      className="phone-thumbnail"
                    />
                  )}
                  <div>
                    <strong>{phone.name}</strong> - {phone.brand} - ${phone.price}
                  </div>
                </div>
              </Link>

              {!isLoading && isAdmin && (
                <div className="phone-item-actions">
                  <button onClick={() => handleEditClick(phone)} className="edit-button">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(phone._id)} className="delete-button">
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PhoneList;
