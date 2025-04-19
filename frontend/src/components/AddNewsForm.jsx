import React, { useState } from 'react';
import axios from 'axios';
import './AddNewsForm.css';

const AddNewsForm = ({ isOpen, closeModal }) => {
    const [newsData, setNewsData] = useState({
        title: '',
        summary: '',
        imageUrl: '',
        sourceLink: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewsData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:1080/api/news/add', newsData);
            if (res.status === 201) {
                setNewsData({
                    title: '',
                    summary: '',
                    imageUrl: '',
                    sourceLink: '',
                });
                closeModal();
            }
        } catch (err) {
            console.error('Error adding news:', err);
            alert('Failed to add news');
        }
    };

    const handleCancel = () => {
        setNewsData({
            title: '',
            summary: '',
            imageUrl: '',
            sourceLink: '',
        });
        closeModal();
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="news-form-modal">
                <h2>Add News Article</h2>
                <form onSubmit={handleSubmit} className="news-form">
                    <div className="form-group">
                        <label htmlFor="title">News Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={newsData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="summary">Summary</label>
                        <textarea
                            id="summary"
                            name="summary"
                            value={newsData.summary}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={newsData.imageUrl}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="sourceLink">Source Link</label>
                        <input
                            type="text"
                            id="sourceLink"
                            name="sourceLink"
                            value={newsData.sourceLink}
                            onChange={handleChange}
                            placeholder="https://example.com/article"
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit">Submit News</button>
                        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddNewsForm;
