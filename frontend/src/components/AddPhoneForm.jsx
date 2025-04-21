import React, { useState } from 'react';
import axios from 'axios';
import './AddPhoneForm.css';

const AddPhoneForm = ({ isOpen, closeModal }) => {
  const [newPhone, setNewPhone] = useState({
    name: '',
    brand: '',
    price: '',
    purchaseLink: '',
    imageUrls: [''],
    features: {
      camera: {
        main: '',
        ultraWide: '',
        front: '',
        videoRecording: '',
      },
      battery: {
        capacity: '',
        chargingSpeed: '',
        type: '',
      },
      display: {
        size: '',
        type: '',
        resolution: '',
        refreshRate: '',
      },
      processor: {
        name: '',
        benchmarkScore: '',
        cores: '',
        clockSpeed: '',
      },
      memory: {
        ram: '',
        storage: '',
        storageType: '',
        expandable: false,
      },
      os: '',
      network: [],
      sim: '',
      dimensions: '',
      weight: '',
    },
  });

  const handleChange = (e) => {
    const { name, value, id, checked } = e.target;

    if (id.startsWith('imageUrl')) {
      const index = parseInt(id.replace('imageUrl', '')) || 0;
      const updatedUrls = [...newPhone.imageUrls];
      updatedUrls[index] = value;
      setNewPhone((prev) => ({ ...prev, imageUrls: updatedUrls }));
    } else if (name === 'expandable') {
      setNewPhone((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          memory: {
            ...prev.features.memory,
            expandable: checked,
          },
        },
      }));
    } else if (name === 'network') {
      setNewPhone((prev) => ({
        ...prev,
        features: {
          ...prev.features,
          network: value.split(',').map((n) => n.trim()),
        },
      }));
    } else {
      setNewPhone((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNestedChange = (section, field, value) => {
    setNewPhone((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        ...(section
          ? {
              [section]: {
                ...prev.features[section],
                [field]: value,
              },
            }
          : { [field]: value }),
      },
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1080/api/phones/add', newPhone);
      if (res.status === 201) {
        // alert('Phone added successfully!');
        closeModal();
        setNewPhone({
          name: '',
          brand: '',
          price: '',
          purchaseLink: '',
          imageUrls: [''],
          features: {
            camera: { main: '', ultraWide: '', front: '', videoRecording: '' },
            battery: { capacity: '', chargingSpeed: '', type: '' },
            display: { size: '', type: '', resolution: '', refreshRate: '' },
            processor: { name: '', benchmarkScore: '', cores: '', clockSpeed: '' },
            memory: { ram: '', storage: '', storageType: '', expandable: false },
            os: '',
            network: [],
            sim: '',
            dimensions: '',
            weight: '',
          },
        });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to add phone');
    }
  };

  const addImageUrlField = () => {
    setNewPhone((prev) => ({
      ...prev,
      imageUrls: [...prev.imageUrls, ''],
    }));
  };

  return (
    <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
      <div className="phone-form-modal">
        <h2>Add New Phone</h2>
        <form onSubmit={handleSubmit} className="phone-form">
          {/* Basic Info */}
          <div className="form-group">
            <label>Phone Name</label>
            <input name="name" value={newPhone.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Brand</label>
            <input name="brand" value={newPhone.brand} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input type="number" name="price" value={newPhone.price} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Purchase Link</label>
            <input name="purchaseLink" value={newPhone.purchaseLink} onChange={handleChange} />
          </div>

          {/* Image URLs */}
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
            <button type="button" onClick={addImageUrlField}>Add More Images</button>
          </div>

          {/* Features */}
          <h4>Camera</h4>
          <div className="form-group">
            <input placeholder="Main MP" onChange={(e) => handleNestedChange('camera', 'main', e.target.value)} />
            <input placeholder="UltraWide MP" onChange={(e) => handleNestedChange('camera', 'ultraWide', e.target.value)} />
            <input placeholder="Front MP" onChange={(e) => handleNestedChange('camera', 'front', e.target.value)} />
            <input placeholder="Video (e.g. 4K@60fps)" onChange={(e) => handleNestedChange('camera', 'videoRecording', e.target.value)} />
          </div>

          <h4>Battery</h4>
          <div className="form-group">
            <input placeholder="Capacity (mAh)" onChange={(e) => handleNestedChange('battery', 'capacity', e.target.value)} />
            <input placeholder="Charging Speed (W)" onChange={(e) => handleNestedChange('battery', 'chargingSpeed', e.target.value)} />
            <input placeholder="Type (Li-Po, etc)" onChange={(e) => handleNestedChange('battery', 'type', e.target.value)} />
          </div>

          <h4>Display</h4>
          <div className="form-group">
            <input placeholder="Size (inches)" onChange={(e) => handleNestedChange('display', 'size', e.target.value)} />
            <input placeholder="Type (AMOLED, IPS)" onChange={(e) => handleNestedChange('display', 'type', e.target.value)} />
            <input placeholder="Resolution (e.g. 1080x2400)" onChange={(e) => handleNestedChange('display', 'resolution', e.target.value)} />
            <input placeholder="Refresh Rate" onChange={(e) => handleNestedChange('display', 'refreshRate', e.target.value)} />
          </div>

          <h4>Processor</h4>
          <div className="form-group">
            <input placeholder="Name" onChange={(e) => handleNestedChange('processor', 'name', e.target.value)} />
            <input placeholder="Benchmark Score" onChange={(e) => handleNestedChange('processor', 'benchmarkScore', e.target.value)} />
            <input placeholder="Cores" onChange={(e) => handleNestedChange('processor', 'cores', e.target.value)} />
            <input placeholder="Clock Speed (GHz)" onChange={(e) => handleNestedChange('processor', 'clockSpeed', e.target.value)} />
          </div>

          <h4>Memory</h4>
          <div className="form-group">
            <input placeholder="RAM (GB)" onChange={(e) => handleNestedChange('memory', 'ram', e.target.value)} />
            <input placeholder="Storage (GB)" onChange={(e) => handleNestedChange('memory', 'storage', e.target.value)} />
            <input placeholder="Storage Type (UFS, eMMC)" onChange={(e) => handleNestedChange('memory', 'storageType', e.target.value)} />
            <label>
              Expandable Storage:
              <input type="checkbox" name="expandable" checked={newPhone.features.memory.expandable} onChange={handleChange} />
            </label>
          </div>

          <div className="form-group">
            <label>Operating System</label>
            <input name="os" value={newPhone.features.os} onChange={(e) => handleNestedChange(null, 'os', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Network (comma separated)</label>
            <input name="network" value={newPhone.features.network.join(', ')} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>SIM Type</label>
            <input name="sim" value={newPhone.features.sim} onChange={(e) => handleNestedChange(null, 'sim', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Dimensions</label>
            <input name="dimensions" value={newPhone.features.dimensions} onChange={(e) => handleNestedChange(null, 'dimensions', e.target.value)} />
          </div>

          <div className="form-group">
            <label>Weight (g)</label>
            <input name="weight" value={newPhone.features.weight} onChange={(e) => handleNestedChange(null, 'weight', e.target.value)} />
          </div>

          <div className="form-actions">
            <button type="submit">Add Phone</button>
            <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPhoneForm;
