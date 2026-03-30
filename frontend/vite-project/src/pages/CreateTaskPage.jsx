import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createTask } from '../services/taskService'
import API from '../services/api'

function CreateTaskPage() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('TODO')
  const [assignedToId, setAssignedToId] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const role = localStorage.getItem('role')
    if (role === 'ADMIN') {
      API.get('/api/users').then(res => setUsers(res.data)).catch(() => {})
    }
  }, [])

  const handleSubmit = async () => {
    if (!title) {
      setError('Title is required')
      return
    }
    try {
      await createTask({
        title,
        description,
        status,
        assignedToId: assignedToId || null
      })
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to create task')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 60%, #1a1a4e 100%)',
      fontFamily: 'Segoe UI, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Grid Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Glowing orbs */}
      {[
        { top: '10%', left: '5%', size: 200, color: 'rgba(102,126,234,0.12)' },
        { top: '50%', right: '5%', size: 250, color: 'rgba(118,75,162,0.1)' },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute', top: orb.top, left: orb.left, right: orb.right,
          width: orb.size, height: orb.size, borderRadius: '50%',
          backgroundColor: orb.color, filter: 'blur(60px)'
        }} />
      ))}

      {/* Top Bar */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 2rem',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        zIndex: 10, position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>T</div>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.1rem' }}>TeamFlow</span>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{
          padding: '0.5rem 1rem',
          backgroundColor: 'rgba(255,255,255,0.08)',
          color: 'white', border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem'
        }}>
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Content */}
      <div style={{ padding: '2rem', maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 5 }}>

        {/* Page Title */}
        <div style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 0.25rem' }}>
            Create New Task
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', margin: 0 }}>
            Fill in the details below to add a new task to your board
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>

          {/* Left Character */}
          <div style={{ width: '220px', flexShrink: 0, textAlign: 'center', paddingTop: '2rem' }}>
            <img
              src="/src/assets/task1.svg"
              alt="character"
              style={{ width: '100%', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
            />
            <div style={{
              backgroundColor: 'rgba(102,126,234,0.15)',
              border: '1px solid rgba(102,126,234,0.25)',
              borderRadius: '12px', padding: '0.75rem',
              marginTop: '0.75rem'
            }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: 0, lineHeight: 1.5 }}>
                📋 Assign tasks clearly to keep your team on track!
              </p>
            </div>
          </div>

          {/* Center Form */}
          <div style={{ flex: 1 }}>

            {error && (
              <div style={{ backgroundColor: 'rgba(220,38,38,0.15)', color: '#fca5a5', padding: '0.75rem 1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.85rem', border: '1px solid rgba(220,38,38,0.25)' }}>
                ⚠️ {error}
              </div>
            )}

            {/* Main Form Card */}
            <div style={{
              backgroundColor: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}>

              {/* Top accent */}
              <div style={{ height: '2px', background: 'linear-gradient(90deg, #667eea, #764ba2)', borderRadius: '999px', marginBottom: '1.5rem' }} />

              {/* GENERAL section */}
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 1rem' }}>GENERAL</p>

              {/* Title */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '500' }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Design the login page"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  style={{
                    width: '100%', padding: '0.8rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px', color: 'white',
                    fontSize: '0.9rem', outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Description */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '500' }}>
                  Description
                </label>
                <textarea
                  placeholder="Describe what needs to be done..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  style={{
                    width: '100%', padding: '0.8rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px', color: 'white',
                    fontSize: '0.9rem', outline: 'none',
                    boxSizing: 'border-box', resize: 'vertical'
                  }}
                />
              </div>

              {/* DETAILS section */}
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', margin: '0.5rem 0 1rem' }}>DETAILS</p>

              {/* Status + Priority row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>

                {/* Status */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '500' }}>
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={{
                      width: '100%', padding: '0.8rem 1rem',
                      backgroundColor: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '10px', color: 'white',
                      fontSize: '0.9rem', outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="TODO" style={{ backgroundColor: '#302b63' }}>📝 To Do</option>
                    <option value="IN_PROGRESS" style={{ backgroundColor: '#302b63' }}>🔄 In Progress</option>
                    <option value="DONE" style={{ backgroundColor: '#302b63' }}>✅ Done</option>
                  </select>
                </div>

                {/* Priority */}
                <div>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '500' }}>
                    Priority
                  </label>
                  <select
                    style={{
                      width: '100%', padding: '0.8rem 1rem',
                      backgroundColor: 'rgba(255,255,255,0.07)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      borderRadius: '10px', color: 'white',
                      fontSize: '0.9rem', outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="high" style={{ backgroundColor: '#302b63' }}>🔴 High</option>
                    <option value="medium" style={{ backgroundColor: '#302b63' }}>🟡 Medium</option>
                    <option value="low" style={{ backgroundColor: '#302b63' }}>🟢 Low</option>
                  </select>
                </div>
              </div>

              {/* Assign To */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', marginBottom: '0.4rem', fontWeight: '500' }}>
                  Assign To
                </label>
                <select
                  value={assignedToId}
                  onChange={(e) => setAssignedToId(e.target.value)}
                  style={{
                    width: '100%', padding: '0.8rem 1rem',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px', color: 'white',
                    fontSize: '0.9rem', outline: 'none',
                    boxSizing: 'border-box'
                  }}
                >
                  <option value="" style={{ backgroundColor: '#302b63' }}>👤 Unassigned</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id} style={{ backgroundColor: '#302b63' }}>{user.name}</option>
                  ))}
                </select>
              </div>

              {/* Live Preview */}
              <div style={{
                backgroundColor: 'rgba(102,126,234,0.1)',
                border: '1px solid rgba(102,126,234,0.2)',
                borderRadius: '12px', padding: '1rem',
                marginBottom: '1.5rem'
              }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 0.75rem' }}>PREVIEW</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%', flexShrink: 0,
                    backgroundColor: status === 'TODO' ? '#f59e0b' : status === 'IN_PROGRESS' ? '#667eea' : '#10b981'
                  }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ color: 'white', fontWeight: '600', fontSize: '0.9rem', margin: '0 0 0.15rem' }}>
                      {title || 'Task Title...'}
                    </p>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', margin: 0 }}>
                      {description || 'No description'}
                    </p>
                  </div>
                  <span style={{
                    padding: '0.2rem 0.6rem', borderRadius: '999px', fontSize: '0.7rem', fontWeight: 'bold',
                    backgroundColor: status === 'TODO' ? 'rgba(245,158,11,0.2)' : status === 'IN_PROGRESS' ? 'rgba(102,126,234,0.2)' : 'rgba(16,185,129,0.2)',
                    color: status === 'TODO' ? '#fcd34d' : status === 'IN_PROGRESS' ? '#a5b4fc' : '#6ee7b7'
                  }}>
                    {status}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => navigate('/dashboard')}
                  style={{
                    flex: 1, padding: '0.85rem',
                    backgroundColor: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '10px', cursor: 'pointer', fontSize: '0.9rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    flex: 2, padding: '0.85rem',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    color: 'white', border: 'none',
                    borderRadius: '10px', cursor: 'pointer',
                    fontSize: '0.9rem', fontWeight: 'bold',
                    boxShadow: '0 4px 15px rgba(102,126,234,0.4)'
                  }}
                >
                  🚀 Create Task
                </button>
              </div>
            </div>
          </div>

          {/* Right Characters */}
          <div style={{ width: '220px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem', paddingTop: '2rem' }}>

            <img
              src="/src/assets/task2.svg"
              alt="character"
              style={{ width: '100%', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
            />

            <img
              src="/src/assets/task3.svg"
              alt="character"
              style={{ width: '100%', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
            />

            {/* Tips */}
            <div style={{
              backgroundColor: 'rgba(102,126,234,0.15)',
              border: '1px solid rgba(102,126,234,0.25)',
              borderRadius: '12px', padding: '1rem'
            }}>
              <p style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>💡 Tips</p>
              {[
                'Be specific with task titles',
                'Add description for context',
                'Set correct priority level',
              ].map((tip, i) => (
                <p key={i} style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', margin: '0 0 0.3rem', paddingLeft: '0.5rem', borderLeft: '2px solid rgba(102,126,234,0.4)' }}>
                  {tip}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateTaskPage;