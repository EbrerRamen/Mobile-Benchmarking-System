import React, { useState } from 'react';
import axios from 'axios';

const AddPhoneForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: '',
    features: {
      camera: '',
      battery: '',
      display: '',
      processor: ''
    },
    imageUrl: '', // New field for image URL
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["camera", "battery", "display", "processor"].includes(name)) {
      setFormData({
        ...formData,
        features: {
          ...formData.features,
          [name]: value
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:1080/api/phones/add', formData);
      alert('Phone added successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to add phone.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="phone-form">
  <h2>Add Phone</h2>
  <div className="form-grid">
    <input name="name" placeholder="Phone Name" onChange={handleChange} required />
    <input name="brand" placeholder="Brand" onChange={handleChange} />
    <input name="price" type="number" placeholder="Price" onChange={handleChange} />
    <input name="camera" placeholder="Camera" onChange={handleChange} />
    <input name="battery" placeholder="Battery" onChange={handleChange} />
    <input name="display" placeholder="Display" onChange={handleChange} />
    <input name="processor" placeholder="Processor" onChange={handleChange} />
    <input name="imageUrl" placeholder="Image URL" onChange={handleChange} />
  </div>
  <button type="submit" className="submit-btn">Add Phone</button>
</form>
  );
};

export default AddPhoneForm;
