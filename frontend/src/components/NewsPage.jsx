import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import AddNewsForm from './AddNewsForm';
import './News.css'; // Import the CSS file

const NewsPage = () => {
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddNewsFormOpen, setIsAddNewsFormOpen] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            user.getIdTokenResult().then(token => {
                setIsAdmin(token.claims.admin === true);
            });
        }
    }, []);

    const fetchNews = async () => {
        try {
            const response = await axios.get('http://localhost:1080/api/news');
            setNewsItems(response.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch news');
            setLoading(false);
            console.error('Error fetching news:', err);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleAddNews = () => {
        setEditingNews(null);
        setIsAddNewsFormOpen(true);
    };

    const handleEditNews = (news) => {
        setEditingNews(news);
        setIsAddNewsFormOpen(true);
    };

    const handleDeleteNews = async (id) => {
        if (!window.confirm('Are you sure you want to delete this news article?')) return;
        
        try {
            await axios.delete(`http://localhost:1080/api/news/${id}`);
            setMessage('News deleted successfully!');
            fetchNews();
        } catch (err) {
            console.error('Error deleting news:', err);
            setMessage('Failed to delete news');
        }
    };

    const handleCloseModal = () => {
        setIsAddNewsFormOpen(false);
        setEditingNews(null);
        fetchNews();
    };

    if (loading) return <div className="news-page"><h1 className="news-title">Loading news...</h1></div>;
    if (error) return <div className="news-page"><h1 className="news-title">{error}</h1></div>;

    return (
        <div className="news-page">
            <div className="news-header">
                <h1 className="news-title">Latest Phone News</h1>
                {isAdmin && (
                    <button 
                        onClick={handleAddNews}
                        className="add-news-button"
                    >
                        Add News
                    </button>
                )}
            </div>
            
            {message && <div className="news-message">{message}</div>}
            
            <div className="news-grid">
                {newsItems.map((item) => (
                    <div key={item._id} className="news-item">
                        <img src={item.imageUrl} alt={item.title} className="news-image" />
                        <div className="news-content">
                            <h5 className="news-item-title">{item.title}</h5>
                            <p className="news-item-text">{item.summary}</p>
                            <div className="news-actions">
                                <a href={item.sourceLink} className="read-more-btn" target="_blank" rel="noopener noreferrer">Read More</a>
                                {isAdmin && (
                                    <div className="admin-actions">
                                        <button 
                                            onClick={() => handleEditNews(item)}
                                            className="edit-button"
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            onClick={() => handleDeleteNews(item._id)}
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isAddNewsFormOpen && (
                <AddNewsForm 
                    isOpen={isAddNewsFormOpen} 
                    closeModal={handleCloseModal}
                    editingNews={editingNews}
                />
            )}
        </div>
    );
};

export default NewsPage;
