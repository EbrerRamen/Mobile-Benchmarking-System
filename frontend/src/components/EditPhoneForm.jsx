import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPhoneForm.css'; // Import the CSS file

const EditPhoneForm = ({ phone, onUpdate, onCancel, isOpen, closeModal }) => {
  // Initialize state for edited phone with multiple images (imageUrls)
  const [editedPhone, setEditedPhone] = useState({
    ...phone,
    imageUrls: phone.imageUrls || [''], // Initialize as an array (empty or existing)
    features: phone.features || { camera: '', battery: '', display: '', processor: '' } // Initialize features
  });

  useEffect(() => {
    setEditedPhone({
      ...phone,
      imageUrls: phone.imageUrls || [''], // Handle missing image URLs
      features: phone.features || { camera: '', battery: '', display: '', processor: '' }
    });
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

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImageUrls = [...editedPhone.imageUrls];
    newImageUrls[index] = value; // Update the image URL at the given index
    setEditedPhone({
      ...editedPhone,
      imageUrls: newImageUrls
    });
  };

  const handleAddImage = () => {
    setEditedPhone({
      ...editedPhone,
      imageUrls: [...editedPhone.imageUrls, ''] // Add a new empty image input field
    });
  };

  const handleRemoveImage = (index) => {
    const newImageUrls = editedPhone.imageUrls.filter((_, i) => i !== index);
    setEditedPhone({
      ...editedPhone,
      imageUrls: newImageUrls
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update API call with imageUrls (array of images)
      await axios.put(`http://localhost:1080/api/phones/${editedPhone._id}`, editedPhone);
      onUpdate(editedPhone);
      closeModal();  // Close modal after successful update
    } catch (err) {
      console.error(err);
      alert('Failed to update phone');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="phone-form-modal" onClick={(e) => e.stopPropagation()}>
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

          {/* Multiple Image URLs Input */}
          <div className="form-group">
            <label htmlFor="imageUrls">Image URLs</label>
            {editedPhone.imageUrls.map((imageUrl, index) => (
              <div key={index} className="image-url-input">
                <input
                  type="text"
                  name={`imageUrl-${index}`}
                  value={imageUrl}
                  onChange={(e) => handleImageChange(e, index)}
                  placeholder={`Enter image URL ${index + 1}`}
                />
                {editedPhone.imageUrls.length > 1 && (
                  <button
                    type="button"
                    className="remove-image-button"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={handleAddImage}>Add another image</button>
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
          <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditPhoneForm;
