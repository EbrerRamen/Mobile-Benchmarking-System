import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPhoneForm.css';

const EditPhoneForm = ({ phone, onUpdate, onCancel, isOpen, closeModal }) => {
  const [editedPhone, setEditedPhone] = useState({
    ...phone,
    imageUrls: phone.imageUrls || [''],
    features: phone.features || {
      camera: {
        main: '',
        ultraWide: '',
        front: '',
        videoRecording: ''
      },
      battery: {
        capacity: '',
        chargingSpeed: '',
        type: ''
      },
      display: {
        size: '',
        type: '',
        resolution: '',
        refreshRate: ''
      },
      processor: {
        name: '',
        benchmarkScore: '',
        cores: '',
        clockSpeed: ''
      },
      memory: {
        ram: '',
        storage: '',
        storageType: '',
        expandable: false
      }
    }
  });

  useEffect(() => {
    setEditedPhone({
      ...phone,
      imageUrls: phone.imageUrls || [''],
      features: phone.features || {
        camera: {
          main: '',
          ultraWide: '',
          front: '',
          videoRecording: ''
        },
        battery: {
          capacity: '',
          chargingSpeed: '',
          type: ''
        },
        display: {
          size: '',
          type: '',
          resolution: '',
          refreshRate: ''
        },
        processor: {
          name: '',
          benchmarkScore: '',
          cores: '',
          clockSpeed: ''
        },
        memory: {
          ram: '',
          storage: '',
          storageType: '',
          expandable: false
        }
      }
    });
  }, [phone]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPhone(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (section, field, value) => {
    setEditedPhone((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [section]: {
          ...prev.features?.[section],
          [field]: value,
        },
      },
    }));
  };
  
  

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    setEditedPhone(prev => {
      const updatedUrls = [...prev.imageUrls];
      updatedUrls[index] = value;
      return { ...prev, imageUrls: updatedUrls };
    });
  };

  const handleAddImage = () => {
    setEditedPhone(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, '']
    }));
  };

  const handleRemoveImage = (index) => {
    setEditedPhone(prev => {
      const updatedUrls = prev.imageUrls.filter((_, i) => i !== index);
      return { ...prev, imageUrls: updatedUrls };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedData = {
      ...editedPhone,
      imageUrls: editedPhone.imageUrls.filter(url => url.trim() !== '')
    };

    try {
      await axios.put(`http://localhost:1080/api/phones/${editedPhone._id}`, cleanedData);
      onUpdate(cleanedData);
      closeModal();
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
          {/* Phone Name */}
          <div className="form-group">
            <label htmlFor="name">Phone Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedPhone.name || ''}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Brand */}
          <div className="form-group">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={editedPhone.brand || ''}
              onChange={handleChange}
            />
          </div>
  
          {/* Price */}
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={editedPhone.price || ''}
              onChange={handleChange}
              required
            />
          </div>
  
          {/* Image URLs */}
          <div className="form-group">
            <label>Image URLs</label>
            {editedPhone.imageUrls.map((imageUrl, index) => (
              <div key={`image-${index}`} className="image-url-input">
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => handleImageChange(e, index)}
                  placeholder={`Image URL ${index + 1}`}
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
  
          {/* Features */}
          <div className="form-group">
            <label>Camera Features</label>
            <input
              type="number"
              value={editedPhone.features.camera.main || ''}
              onChange={(e) => handleFeatureChange('camera', 'main', e.target.value)}
              placeholder="Main Camera (MP)"
            />
            <input
              type="number"
              value={editedPhone.features.camera.ultraWide || ''}
              onChange={(e) => handleFeatureChange('camera', 'ultraWide', e.target.value)}
              placeholder="Ultra Wide Camera (MP)"
            />
            <input
              type="number"
              value={editedPhone.features.camera.front || ''}
              onChange={(e) => handleFeatureChange('camera', 'front', e.target.value)}
              placeholder="Front Camera (MP)"
            />
            <input
              type="text"
              value={editedPhone.features.camera.videoRecording || ''}
              onChange={(e) => handleFeatureChange('camera', 'videoRecording', e.target.value)}
              placeholder="Video Recording (e.g., 4K@60fps)"
            />
          </div>
  
          <div className="form-group">
            <label>Battery Features</label>
            <input
              type="number"
              value={editedPhone.features.battery.capacity || ''}
              onChange={(e) => handleFeatureChange('battery', 'capacity', e.target.value)}
              placeholder="Battery Capacity (mAh)"
            />
            <input
              type="number"
              value={editedPhone.features.battery.chargingSpeed || ''}
              onChange={(e) => handleFeatureChange('battery', 'chargingSpeed', e.target.value)}
              placeholder="Charging Speed (W)"
            />
            <input
              type="text"
              value={editedPhone.features.battery.type || ''}
              onChange={(e) => handleFeatureChange('battery', 'type', e.target.value)}
              placeholder="Battery Type (e.g., Li-Po)"
            />
          </div>
  
          <div className="form-group">
            <label>Display Features</label>
            <input
              type="number"
              value={editedPhone.features.display.size || ''}
              onChange={(e) => handleFeatureChange('display', 'size', e.target.value)}
              placeholder="Display Size (inches)"
            />
            <input
              type="text"
              value={editedPhone.features.display.type || ''}
              onChange={(e) => handleFeatureChange('display', 'type', e.target.value)}
              placeholder="Display Type (e.g., AMOLED)"
            />
            <input
              type="text"
              value={editedPhone.features.display.resolution || ''}
              onChange={(e) => handleFeatureChange('display', 'resolution', e.target.value)}
              placeholder="Resolution (e.g., 1080x2400)"
            />
            <input
              type="number"
              value={editedPhone.features.display.refreshRate || ''}
              onChange={(e) => handleFeatureChange('display', 'refreshRate', e.target.value)}
              placeholder="Refresh Rate (Hz)"
            />
          </div>
  
          <div className="form-group">
            <label>Processor Features</label>
            <input
              type="text"
              value={editedPhone.features.processor.name || ''}
              onChange={(e) => handleFeatureChange('processor', 'name', e.target.value)}
              placeholder="Processor Name"
            />
            <input
              type="number"
              value={editedPhone.features.processor.benchmarkScore || ''}
              onChange={(e) => handleFeatureChange('processor', 'benchmarkScore', e.target.value)}
              placeholder="Benchmark Score"
            />
            <input
              type="number"
              value={editedPhone.features.processor.cores || ''}
              onChange={(e) => handleFeatureChange('processor', 'cores', e.target.value)}
              placeholder="Cores"
            />
            <input
              type="number"
              value={editedPhone.features.processor.clockSpeed || ''}
              onChange={(e) => handleFeatureChange('processor', 'clockSpeed', e.target.value)}
              placeholder="Clock Speed (GHz)"
            />
          </div>
  
          <div className="form-group">
            <label>Memory Features</label>
            <input
              type="number"
              value={editedPhone.features.memory.ram || ''}
              onChange={(e) => handleFeatureChange('memory', 'ram', e.target.value)}
              placeholder="RAM (GB)"
            />
            <input
              type="number"
              value={editedPhone.features.memory.storage || ''}
              onChange={(e) => handleFeatureChange('memory', 'storage', e.target.value)}
              placeholder="Storage (GB)"
            />
            <input
              type="text"
              value={editedPhone.features.memory.storageType || ''}
              onChange={(e) => handleFeatureChange('memory', 'storageType', e.target.value)}
              placeholder="Storage Type (e.g., UFS 3.1)"
            />
            <label>
              Expandable
              <input
                type="checkbox"
                checked={editedPhone.features.memory.expandable}
                onChange={(e) => handleFeatureChange('memory', 'expandable', e.target.checked)}
              />
            </label>
          </div>
  
          <div className="form-buttons">
            <button type="submit">Update Phone</button>
            <button type="button" className="cancel-button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
  
};

export default EditPhoneForm;
