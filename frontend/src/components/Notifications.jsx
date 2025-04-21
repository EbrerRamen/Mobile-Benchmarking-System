import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getAuth } from 'firebase/auth'

export default function Notifications() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const user = getAuth().currentUser
    if (!user) return
    axios
      .get('http://localhost:1080/api/notifications', { params: { user: user.uid } })
      .then(res => setNotes(res.data))
      .catch(console.error)
  }, [])

  const markRead = async (id) => {
    await axios.put(`http://localhost:1080/api/notifications/${id}/read`)
    setNotes(n => n.map(x => x._id === id ? { ...x, read: true } : x))
  }

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notes.length ? (
        <ul>
          {notes.map(n => (
            <li key={n._id} className={n.read ? 'read' : 'unread'}>
              {n.message}
              {!n.read && <button onClick={() => markRead(n._id)}>Mark Read</button>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  )
}