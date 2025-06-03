import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getAuth } from 'firebase/auth'
import { Link } from 'react-router-dom'
import './Wishlist.css'

export default function Wishlist() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const user = getAuth().currentUser
    if (!user) return
    axios
      .get('http://localhost:1080/api/wishlist', { params: { user: user.uid } })
      .then(res => setItems(res.data))
      .catch(console.error)
  }, [])

  const handleRemove = async (id) => {
    if (!window.confirm('Remove this item from wishlist?')) return
    try {
      await axios.delete(`http://localhost:1080/api/wishlist/${id}`)
      setItems(prev => prev.filter(i => i._id !== id))
    } catch (err) {
      console.error('Remove failed', err)
      alert('Failed to remove')
    }
  }

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2 className="wishlist-title">Your Wishlist</h2>
      </div>
      {items.length > 0 ? (
        <ul className="wishlist-grid">
          {items
           .filter(w => w.phone)         
           .map(w => (
            <li key={w._id} className="wishlist-card">
              <Link to={`/phone/${w.phone._id}`}>
                <img
                  src={w.phone.imageUrls?.[0] || 'https://via.placeholder.com/150'}
                  alt={w.phone.name}
                  className="wishlist-thumbnail"
                />
                <div className="wishlist-info">
                  <h3>{w.phone.name}</h3>
                  <p className="wishlist-price">${w.phone.price}</p>
                </div>
              </Link>
              <button
                className="wishlist-remove"
                onClick={() => handleRemove(w._id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="wishlist-empty">
          <p>No items in your wishlist.</p>
        </div>
      )}
    </div>
  )
}