import React, { useState } from 'react';
import axios from 'axios';
import './AddPhoneForm.css';

const AddPhoneForm = ({ isOpen, closeModal }) => {
  const [newPhone, setNewPhone] = useState({
    name: '',
    brand: '',
    price: '',
    purchaseLink: '',
    imageUrls: [''], // Array to hold multiple image URLs
    features: {
      camera: '',
      battery: '',
      display: '',
      processor: '',
    },
  });

  const handleChange = (e) => {
    const { name, value, id } = e.target;

    // Special handling for imageUrls array
    if (id.startsWith('imageUrl')) {
      const index = parseInt(id.replace('imageUrl', '')) || 0;
      const updatedUrls = [...newPhone.imageUrls];
      updatedUrls[index] = value;

      setNewPhone((prevState) => ({
        ...prevState,
        imageUrls: updatedUrls,
      }));
    } else {
      setNewPhone((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addImageUrlField = () => {
    setNewPhone((prevState) => ({
      ...prevState,
      imageUrls: [...prevState.imageUrls, ''], // Add a new empty URL field
    }));
  };

  const handleFeatureChange = (e) => {
    const { name, value } = e.target;
    setNewPhone((prevState) => ({
      ...prevState,
      features: {
        ...prevState.features,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:1080/api/phones/add', newPhone);
      if (response.status === 201) {
        // Reset the form
        setNewPhone({
          name: '',
          brand: '',
          price: '',
          purchaseLink: '',
          imageUrls: [''],
          features: {
            camera: '',
            battery: '',
            display: '',
            processor: '',
          },
        });
        closeModal();
      }
    } catch (err) {
      console.error('Error adding phone:', err);
      alert('Failed to add phone');
    }
  };

  const handleCancel = () => {
    setNewPhone({
      name: '',
      brand: '',
      price: '',
      purchaseLink: '',
      imageUrls: [''],
      features: {
        camera: '',
        battery: '',
        display: '',
        processor: '',
      },
    });
    closeModal();
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="phone-form-modal">
        <h2>Add New Phone</h2>
        <form onSubmit={handleSubmit} className="phone-form">
          <div className="form-group">
            <label htmlFor="name">Phone Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newPhone.name}
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
              value={newPhone.brand}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={newPhone.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="purchaseLink">Purchase Link</label>
            <input
              type="text"
              id="purchaseLink"
              name="purchaseLink"
              value={newPhone.purchaseLink}
              onChange={handleChange}
              placeholder="https://example.com/buy"
            />
          </div>

          <div className="form-group">
            <label>Image URLs</label>
            {newPhone.imageUrls.map((url, index) => (
              <input
                key={index}
                type="text"
                id={`imageUrl${index}`}
                value={url}
                onChange={handleChange}
                placeholder={`Image URL ${index + 1}`}
              />
            ))}
            <button
              type="button"
              onClick={addImageUrlField}
            >
              Add More Images
            </button>
          </div>

          <div className="form-group">
            <label>Features</label>
            <input
              type="text"
              name="camera"
              value={newPhone.features.camera}
              onChange={handleFeatureChange}
              placeholder="Camera"
            />
            <input
              type="text"
              name="battery"
              value={newPhone.features.battery}
              onChange={handleFeatureChange}
              placeholder="Battery"
            />
            <input
              type="text"
              name="display"
              value={newPhone.features.display}
              onChange={handleFeatureChange}
              placeholder="Display"
            />
            <input
              type="text"
              name="processor"
              value={newPhone.features.processor}
              onChange={handleFeatureChange}
              placeholder="Processor"
            />
          </div>

          <div className="form-actions">
            <button type="submit">Add Phone</button>
            <button type="button" onClick={handleCancel} className="cancel-button">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhoneForm;
