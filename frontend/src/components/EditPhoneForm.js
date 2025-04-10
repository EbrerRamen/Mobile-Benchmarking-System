import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PhoneForm.css'; // Import the CSS file

const EditPhoneForm = ({ phone, onUpdate, onCancel }) => {
  const [editedPhone, setEditedPhone] = useState(phone);

  useEffect(() => {
    setEditedPhone(phone);
  }, [phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPhone({
      ...editedPhone,
      [name]: value
    });
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setEditedPhone({
      ...editedPhone,
      features: {
        ...editedPhone.features,
        [name]: value
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1080/api/phones/${editedPhone._id}`, editedPhone);
      onUpdate(editedPhone);
    } catch (err) {
      console.error(err);
      alert('Failed to update phone');
    }
  };

  return (
    <div className="phone-form-container">
      <h2 className="phone-form-header">Edit Phone</h2>
      <form className="phone-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Phone Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedPhone.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={editedPhone.brand}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={editedPhone.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* New Input for Image URL */}
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={editedPhone.imageUrl || ''}  // Ensure it's controlled and can be empty
            onChange={handleChange}
            placeholder="Enter image URL"
          />
        </div>

        <div className="form-group">
          <label>Features</label>
          <div>
            <input
              type="text"
              name="camera"
              value={editedPhone.features.camera}
              onChange={handleFeatureChange}
              placeholder="Camera"
            />
            <input
              type="text"
              name="battery"
              value={editedPhone.features.battery}
              onChange={handleFeatureChange}
              placeholder="Battery"
            />
            <input
              type="text"
              name="display"
              value={editedPhone.features.display}
              onChange={handleFeatureChange}
              placeholder="Display"
            />
            <input
              type="text"
              name="processor"
              value={editedPhone.features.processor}
              onChange={handleFeatureChange}
              placeholder="Processor"
            />
          </div>
        </div>

        <button type="submit">Update Phone</button>
        <button type="button" className="cancel-button" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPhoneForm;
