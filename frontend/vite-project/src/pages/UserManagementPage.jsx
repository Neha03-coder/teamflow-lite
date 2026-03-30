import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

function UserManagementPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    API.get('/api/users')
      .then(res => setUsers(res.data))
      .catch(() => navigate('/dashboard'))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>User Management</h2>
        <button
          onClick={() => navigate('/dashboard')}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#3b82f6', color: 'white' }}>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '0.75rem', textAlign: 'left' }}>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '0.75rem' }}>{user.name}</td>
                <td style={{ padding: '0.75rem' }}>{user.email}</td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    backgroundColor: user.role === 'ADMIN' ? '#fde8e8' : '#e8f5e9',
                    color: user.role === 'ADMIN' ? '#c81e1e' : '#1b5e20'
                  }}>
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserManagementPage;