import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { getAuth } from 'firebase/auth'
import './Notifications.css'

export default function Notifications() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const user = getAuth().currentUser
    if (!user) return
    axios
      .get('/api/notifications', { params: { user: user.uid } })
      .then(res => setNotes(res.data))
      .catch(console.error)
  }, [])

  const markRead = async (id) => {
    try {
      await axios.put(`/api/notifications/${id}/read`)
      setNotes(n => n.map(x => x._id === id ? { ...x, read: true } : x))
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notes.length ? (
        <ul>
          {notes.map(n => (
            <li key={n._id} className={n.read ? 'read' : 'unread'}>
              <p>{n.message}</p>
              {!n.read && (
                <button onClick={() => markRead(n._id)}>
                  Mark as Read
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  )
}