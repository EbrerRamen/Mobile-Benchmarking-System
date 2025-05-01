import React, { useState, useEffect } from 'react';
import './FaqPage.css';

const FaqPage = () => {
  const [faqs, setFaqs] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [message, setMessage] = useState('');

  // Load FAQs from localStorage on component mount
  useEffect(() => {
    const storedFaqs = JSON.parse(localStorage.getItem('faqs'));
    if (storedFaqs) {
      setFaqs(storedFaqs);
    }
  }, []);

  // Save FAQs to localStorage whenever they change
  useEffect(() => {
    if (faqs.length > 0) {
      localStorage.setItem('faqs', JSON.stringify(faqs));
    }
  }, [faqs]);

  const handleQuestionChange = (e) => {
    setNewQuestion(e.target.value);
  };

  const handleAnswerChange = (e) => {
    setNewAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newQuestion && newAnswer) {
      const newFaq = {
        question: newQuestion,
        answer: newAnswer,
      };
      const updatedFaqs = [...faqs, newFaq];
      setFaqs(updatedFaqs);
      setNewQuestion('');
      setNewAnswer('');
      setMessage('FAQ added successfully!');
    } else {
      setMessage('Please fill in both fields.');
    }
  };

  return (
    <div className="custom-faq-page">
      <h2 className="custom-faq-title">Frequently Asked Questions</h2>

      {/* Display existing FAQs */}
      <div className="custom-faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="custom-faq-item">
            <div className="custom-faq-question">{faq.question}</div>
            <div className="custom-faq-answer">{faq.answer}</div>
          </div>
        ))}
      </div>

      {/* Display the "Post Your Question and Answer" form */}
      <div className="custom-faq-form">
        <h3>Post Your Question and Answer</h3>
        <form onSubmit={handleSubmit}>
          <div className="custom-form-group">
            <label htmlFor="newQuestion">Your Question</label>
            <input
              type="text"
              id="newQuestion"
              value={newQuestion}
              onChange={handleQuestionChange}
              placeholder="Enter your question here"
              required
            />
          </div>
          <div className="custom-form-group">
            <label htmlFor="newAnswer">Your Answer</label>
            <textarea
              id="newAnswer"
              value={newAnswer}
              onChange={handleAnswerChange}
              placeholder="Enter your answer here"
              required
            />
          </div>
          <button type="submit" className="custom-submit-button">Submit FAQ</button>
        </form>
        {message && <p className="custom-faq-message">{message}</p>}
      </div>
    </div>
  );
};

export default FaqPage;
