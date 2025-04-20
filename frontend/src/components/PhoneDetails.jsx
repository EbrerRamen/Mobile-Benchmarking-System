import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getAuth } from 'firebase/auth';
import './PhoneDetails.css';

const PhoneDetails = () => {
  const { phoneId } = useParams();
  const [phone, setPhone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const [averageRatings, setAverageRatings] = useState(null);
  const [ratingInput, setRatingInput] = useState({
    camera: 0,
    battery: 0,
    display: 0,
    processor: 0,
    comment: "",
  });
  const [hasRated, setHasRated] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedPhones, setRelatedPhones] = useState([]);

  const handleInputChange = (field, value) => {
    setRatingInput({ ...ratingInput, [field]: value });
  };

  const submitRating = async (e) => {
    e.preventDefault();

    const user = getAuth().currentUser;
    if (!user) {
      alert("You must be logged in to submit a rating");
      return;
    }

    try {
      await axios.post('http://localhost:1080/api/ratings/add', {
        phone: phoneId,
        user: user.uid,
        ratings: {
          camera: parseInt(ratingInput.camera),
          battery: parseInt(ratingInput.battery),
          display: parseInt(ratingInput.display),
          processor: parseInt(ratingInput.processor),
        },
        comment: ratingInput.comment,
      });
      setRatingInput({ camera: 0, battery: 0, display: 0, processor: 0, comment: "" });
      setRefresh(!refresh);
      setHasRated(true);
    } catch (error) {
      console.error("Failed to submit rating:", error);
      alert("Rating submission failed");
    }
  };

  const handlePurchase = () => {
    if (!phone.purchaseLink) {
      alert('Purchase link not available for this product');
      return;
    }
    window.open(phone.purchaseLink, '_blank');
  };

  const fetchAverageRatings = useCallback(async () => {
    try {
      const res = await axios.get(`http://localhost:1080/api/ratings/${phoneId}/average`);
      setAverageRatings(res.data);
    } catch (err) {
      setAverageRatings(null);
    }
  }, [phoneId]);

  const checkIfRated = useCallback(async () => {
    const user = getAuth().currentUser;

    if (!user) {
      setHasRated(false);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:1080/api/ratings/check/${phoneId}/${user.uid}`);
      setHasRated(res.data.hasRated);
    } catch (err) {
      console.error("Error checking if rated:", err);
    }
  }, [phoneId]);

  useEffect(() => {
    const fetchPhone = async () => {
      try {
        const res = await axios.get(`http://localhost:1080/api/phones/${phoneId}`);
        setPhone(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        alert('Failed to load phone details');
        setLoading(false);
      }
    };

    fetchPhone();
    checkIfRated();
  }, [phoneId, checkIfRated]);

  useEffect(() => {
    fetchAverageRatings();
  }, [refresh, phoneId, fetchAverageRatings]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === phone.imageUrls.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [phone, currentImageIndex]);

  useEffect(() => {
    fetch(`http://localhost:1080/api/phones/${phoneId}/related`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Related phones data:", data);
        setRelatedPhones(data || []); // Adjusted based on the data structure
      })
      .catch((err) => {
        console.error("Failed to fetch related phones:", err);
        setRelatedPhones([]); // Fallback to empty array
      });
  }, [phoneId]);
  

  if (loading) return <p>Loading phone details...</p>;
  if (!phone) return <p>Phone not found.</p>;

  return (
    <div className="phone-details-container">
      <h2>{phone.name}</h2>

      <div className="phone-image-gallery">
        {phone.imageUrls && phone.imageUrls.length > 0 ? (
          <>
            <button className="prev-button" onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? phone.imageUrls.length - 1 : prevIndex - 1))}>
              &lt;
            </button>
            <img
              src={phone.imageUrls[currentImageIndex]}
              alt={`${phone.name} - ${currentImageIndex + 1}`}
              className="phone-details-image"
              onClick={() => window.open(phone.imageUrls[currentImageIndex], '_blank')}
            />
            <button className="next-button" onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex === phone.imageUrls.length - 1 ? 0 : prevIndex + 1))}>
              &gt;
            </button>
          </>
        ) : (
          <img
            src="https://via.placeholder.com/200"
            alt={phone.name}
            className="phone-details-image"
          />
        )}
      </div>

      <div className="image-navigation">
        {phone.imageUrls.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>

      <div className="phone-basic-info">
        <p><strong>Brand:</strong> {phone.brand}</p>
        <p><strong>Price:</strong> ${phone.price}</p>
        <button
          onClick={handlePurchase}
          className="purchase-button"
          disabled={!phone.purchaseLink}
        >
          Buy Now
        </button>
      </div>

      <div className="phone-features">
        <h3>Features</h3>
        <ul>
          <li><strong>Camera:</strong> {phone.features?.camera || 'N/A'}</li>
          <li><strong>Battery:</strong> {phone.features?.battery || 'N/A'}</li>
          <li><strong>Display:</strong> {phone.features?.display || 'N/A'}</li>
          <li><strong>Processor:</strong> {phone.features?.processor || 'N/A'}</li>
        </ul>
      </div>

      <div className="rating-section">
        <h3>Average User Ratings</h3>
        {averageRatings ? (
          <ul>
            <li>📸 Camera: {averageRatings.avgCamera?.toFixed(1)} ⭐</li>
            <li>🔋 Battery: {averageRatings.avgBattery?.toFixed(1)} ⭐</li>
            <li>🖥️ Display: {averageRatings.avgDisplay?.toFixed(1)} ⭐</li>
            <li>⚙️ Processor: {averageRatings.avgProcessor?.toFixed(1)} ⭐</li>
            <li>🗳️ Total Ratings: {averageRatings.count}</li>
          </ul>
        ) : (
          <p>No ratings yet.</p>
        )}
      </div>

      {!hasRated ? (
        <div className="submit-rating-section">
          <h3>Submit Your Rating</h3>
          <form onSubmit={submitRating} className="rating-form">
            {["camera", "battery", "display", "processor"].map((feature) => (
              <div key={feature}>
                <label>{feature.toUpperCase()}:</label>
                <select
                  value={ratingInput[feature]}
                  onChange={(e) => handleInputChange(feature, e.target.value)}
                >
                  <option value={0}>Select</option>
                  {[1, 2, 3, 4, 5].map((v) => (
                    <option key={v} value={v}>{v} ⭐</option>
                  ))}
                </select>
              </div>
            ))}
            <label>Comment:</label>
            <textarea
              value={ratingInput.comment}
              onChange={(e) => handleInputChange("comment", e.target.value)}
              placeholder="Write your feedback..."
            />
            <button type="submit">Submit Rating</button>
          </form>
        </div>
      ) : (
        <div className="rating-done-message">
          <h3>Rating Done!</h3>
          <p>Thank you for your feedback. You have already rated this product.</p>
        </div>
      )}

      <h3>
        
        You might also like:</h3>
      <div className="related-phones">
        {Array.isArray(relatedPhones) && relatedPhones.length > 0 ? (
          relatedPhones.map((phone) => (
            <a href={`/phone/${phone._id}`} key={phone._id} className="related-phone-link">
              <div className="related-phone-card">
                <img
                  src={phone.imageUrls && phone.imageUrls.length > 0 ? phone.imageUrls[0] : "https://via.placeholder.com/200"}
                  alt={phone.name}
                />
                <h4>{phone.name}</h4>
                <p>৳{phone.price}</p>
              </div>
            </a>
          ))
        ) : (
          <p>No related phones found.</p>
        )}
      </div>
    </div>

    
  );
};

export default PhoneDetails;
