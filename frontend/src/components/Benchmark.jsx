import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Benchmark.css';

const Benchmark = () => {
  const [phones, setPhones] = useState([]);
  const [phoneA, setPhoneA] = useState('');
  const [phoneB, setPhoneB] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:1080/api/phones') // Ensure this path is correct
      .then(res => {
        console.log('Phones fetched:', res.data); // Log the data
        setPhones(res.data); // Directly update the phones list
      })
      .catch(err => console.error('Error fetching phones:', err));
  }, []);

  const handleCompare = () => {
    if (phoneA && phoneB && phoneA !== phoneB) {
      axios.get(`http://localhost:1080/api/phones/benchmark?phoneAId=${phoneA}&phoneBId=${phoneB}`)
        .then(res => setResult(res.data))
        .catch(err => console.error('Benchmark error:', err));
    } else {
      alert('Please select two different phones.');
    }
  };

  return (
    <div className="benchmark-page">
      <h2>Phone Benchmark</h2>
  
      <div className="benchmark-selectors">
        <select value={phoneA} onChange={(e) => setPhoneA(e.target.value)}>
          <option value="">Select Phone A</option>
          {phones.map(phone => (
            <option key={phone._id} value={phone._id}>{phone.name}</option>
          ))}
        </select>
  
        <select value={phoneB} onChange={(e) => setPhoneB(e.target.value)}>
          <option value="">Select Phone B</option>
          {phones.map(phone => (
            <option key={phone._id} value={phone._id}>{phone.name}</option>
          ))}
        </select>
  
        <button onClick={handleCompare}>Compare</button>
      </div>
  
      {result && result.phoneA && result.phoneB && (
        <div className="benchmark-result">
          <h3>Benchmark Result</h3>
  
          <div className="score-bars">
            <div className="score-item">
              <p>{result.phoneA.name}</p>
              <div className="progress-bar">
                <div style={{ width: `${result.phoneA.score * 100}%` }}>
                  {Math.round(result.phoneA.score * 100)}
                </div>
              </div>
            </div>
            <div className="score-item">
              <p>{result.phoneB.name}</p>
              <div className="progress-bar">
                <div style={{ width: `${result.phoneB.score * 100}%` }}>
                  {Math.round(result.phoneB.score * 100)}
                </div>
              </div>
            </div>
          </div>
  
          {result.phoneA.imageUrls && result.phoneB.imageUrls && (
            <div className="image-comparison">
              <img src={result.phoneA.imageUrls[0]} alt={result.phoneA.name} />
              <img src={result.phoneB.imageUrls[0]} alt={result.phoneB.name} />
            </div>
          )}
  
          <table className="specs-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>{result.phoneA.name}</th>
                <th>{result.phoneB.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Processor</td>
                <td>{result.phoneA.processor}</td>
                <td>{result.phoneB.processor}</td>
              </tr>
              <tr>
                <td>RAM</td>
                <td>{result.phoneA.ram} GB</td>
                <td>{result.phoneB.ram} GB</td>
              </tr>
              <tr>
                <td>Storage</td>
                <td>{result.phoneA.storage} GB</td>
                <td>{result.phoneB.storage} GB</td>
              </tr>
              <tr>
                <td>Battery</td>
                <td>{result.phoneA.battery} mAh</td>
                <td>{result.phoneB.battery} mAh</td>
              </tr>
              <tr>
                <td>Display</td>
                <td>{result.phoneA.display}</td>
                <td>{result.phoneB.display}</td>
              </tr>
              <tr>
                <td>Camera</td>
                <td>{result.phoneA.camera}</td>
                <td>{result.phoneB.camera}</td>
              </tr>
              <tr>
                <td>Charging Speed</td>
                <td>{result.phoneA.chargingSpeed}</td>
                <td>{result.phoneB.chargingSpeed}</td>
              </tr>
              <tr>
                <td>Cores</td>
                <td>{result.phoneA.cores}</td>
                <td>{result.phoneB.cores}</td>
              </tr>
              <tr>
                <td>Clock Speed</td>
                <td>{result.phoneA.clockSpeed} GHz</td>
                <td>{result.phoneB.clockSpeed} GHz</td>
              </tr>
            </tbody>
          </table>
  
          {result.verdict && (
  <div className={`verdict-box ${result.verdict === 'It’s a tie!' ? 'tie' : (result.winner._id === phoneA ? 'phone-a' : 'phone-b')}`}>
    🏆 {result.verdict}
  </div>
)}
  
          {result.analysis && result.winner && (
            <div className="benchmark-analysis">
              <h4>Why {result.winner.name} wins:</h4>
              <ul>
                {result.analysis.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
  
          {/* Add Benchmark Breakdown */}
          {result.breakdown && typeof result.breakdown === 'object' && (
            <div className="benchmark-breakdown">
              <h4>Benchmark Breakdown</h4>
              <table className="breakdown-table">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>{result.phoneA.name}</th>
                    <th>{result.phoneB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(result.breakdown).map((key, index) => (
                    <tr key={index}>
                      <td>{key.charAt(0).toUpperCase() + key.slice(1)}</td>
                      <td>{result.breakdown[key].phoneA}</td>
                      <td>{result.breakdown[key].phoneB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
  
        </div>
      )}
    </div>
  );
  
  
};

export default Benchmark;
