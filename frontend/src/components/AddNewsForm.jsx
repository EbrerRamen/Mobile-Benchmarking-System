import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddNewsForm.css';

const AddNewsForm = ({ isOpen, closeModal, editingNews }) => {
    const [formData, setFormData] = useState({
        title: '',
        summary: '',
        imageUrl: '',
        sourceLink: ''
    });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editingNews) {
            setFormData({
                title: editingNews.title,
                summary: editingNews.summary,
                imageUrl: editingNews.imageUrl,
                sourceLink: editingNews.sourceLink
            });
        } else {
            setFormData({
                title: '',
                summary: '',
                imageUrl: '',
                sourceLink: ''
            });
        }
    }, [editingNews]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNews) {
                await axios.put(`http://localhost:1080/api/news/${editingNews._id}`, formData);
                setMessage('News updated successfully!');
            } else {
                await axios.post('http://localhost:1080/api/news', formData);
                setMessage('News added successfully!');
            }
            setTimeout(() => {
                closeModal();
            }, 1500);
        } catch (err) {
            console.error('Error saving news:', err);
            setMessage('Failed to save news');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={closeModal}>
            <div className="news-form-modal" onClick={(e) => e.stopPropagation()}>
                <h2>{editingNews ? 'Edit News' : 'Add News'}</h2>
                {message && <div className="message">{message}</div>}
                <form onSubmit={handleSubmit} className="news-form">
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            placeholder="Enter news title"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="summary">Summary</label>
                        <textarea
                            id="summary"
                            name="summary"
                            value={formData.summary}
                            onChange={handleChange}
                            required
                            placeholder="Enter news summary"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="url"
                            id="imageUrl"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            placeholder="Enter image URL"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="sourceLink">Source Link</label>
                        <input
                            type="url"
                            id="sourceLink"
                            name="sourceLink"
                            value={formData.sourceLink}
                            onChange={handleChange}
                            required
                            placeholder="Enter source URL"
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-button">
                            {editingNews ? 'Update News' : 'Add News'}
                        </button>
                        <button type="button" onClick={closeModal} className="cancel-button">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewsForm;
