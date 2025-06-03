import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import './FaqPage.css';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      user.getIdTokenResult().then(token => {
        setIsAdmin(token.claims.admin === true);
      });
    }
  }, []);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get('http://localhost:1080/api/faqs');
      setFaqs(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching FAQs:', err);
      setMessage('Failed to load FAQs');
      setLoading(false);
    }
  };

  const handleQuestionChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setNewAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdmin) {
      setMessage('Only admins can add FAQs');
      return;
    }

    if (newQuestion && newAnswer) {
      try {
        await axios.post('http://localhost:1080/api/faqs', {
          question: newQuestion,
          answer: newAnswer
        });
        setNewQuestion('');
        setNewAnswer('');
        setMessage('FAQ added successfully!');
        fetchFaqs(); // Refresh the FAQ list
      } catch (err) {
        console.error('Error adding FAQ:', err);
        setMessage('Failed to add FAQ');
      }
    } else {
      setMessage('Please fill in both fields.');
    }
  };

  const handleDelete = async (id) => {
    if (!isAdmin) {
      setMessage('Only admins can delete FAQs');
      return;
    }

    try {
      await axios.delete(`http://localhost:1080/api/faqs/${id}`);
      setMessage('FAQ deleted successfully!');
      fetchFaqs(); // Refresh the FAQ list
    } catch (err) {
      console.error('Error deleting FAQ:', err);
      setMessage('Failed to delete FAQ');
    }
  };

  if (loading) return <div className="custom-faq-page"><h2>Loading FAQs...</h2></div>;

  return (
    <div className="custom-faq-page">
      <h2 className="custom-faq-title">Frequently Asked Questions</h2>

      {isAdmin && (
        <form onSubmit={handleSubmit} className="faq-form">
          <div className="form-group">
            <input
              type="text"
              value={newQuestion}
              onChange={handleQuestionChange}
              placeholder="Enter your question"
              required
            />
          </div>
          <div className="form-group">
            <textarea
              value={newAnswer}
              onChange={handleAnswerChange}
              placeholder="Enter your answer"
              required
            />
          </div>
          <button type="submit" className="submit-button">Add FAQ</button>
        </form>
      )}

      {message && <div className="message">{message}</div>}

      <div className="custom-faq-list">
        {faqs.map((faq) => (
          <div key={faq._id} className="custom-faq-item">
            <div className="custom-faq-question">{faq.question}</div>
            <div className="custom-faq-answer">{faq.answer}</div>
            {isAdmin && (
              <button
                onClick={() => handleDelete(faq._id)}
                className="delete-button"
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqPage;
