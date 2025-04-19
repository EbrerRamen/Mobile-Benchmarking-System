// components/AverageRatingDisplay.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const AverageRatingDisplay = ({ phoneId }) => {
  const [averages, setAverages] = useState(null);

  useEffect(() => {
    const fetchAverages = async () => {
      try {
        const res = await axios.get(`/api/ratings/${phoneId}/average`);
        setAverages(res.data);
      } catch (err) {
        console.error("Failed to fetch averages", err);
      }
    };

    fetchAverages();
  }, [phoneId]);

  if (!averages) return <p>No ratings yet.</p>;

  return (
    <div className="average-ratings">
      <h4>Average Ratings</h4>
      <p>📸 Camera: {averages.avgCamera?.toFixed(1)} ⭐</p>
      <p>🔋 Battery: {averages.avgBattery?.toFixed(1)} ⭐</p>
      <p>🖥️ Display: {averages.avgDisplay?.toFixed(1)} ⭐</p>
      <p>⚙️ Processor: {averages.avgProcessor?.toFixed(1)} ⭐</p>
      <p>🗳️ Total Ratings: {averages.count}</p>
    </div>
  );
};

export default AverageRatingDisplay;
