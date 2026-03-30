import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { updateTask } from '../services/taskService'
import API from '../services/api'

function EditTaskPage() {
  const { id } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('TODO')
  const [assignedToId, setAssignedToId] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Load task details
    API.get(`/api/tasks/${id}`).then(res => {
      const task = res.data
      setTitle(task.title)
      setDescription(task.description || '')
      setStatus(task.status)
      setAssignedToId(task.assignedTo ? task.assignedTo.id : '')
    })

    // Load users if admin
    const role = localStorage.getItem('role')
    if (role === 'ADMIN') {
      API.get('/api/users').then(res => setUsers(res.data)).catch(() => {})
    }
  }, [id])

  const handleUpdate = async () => {
    if (!title) {
      setError('Title is required')
      return
    }
    try {
      await updateTask(id, {
        title,
        description,
        status,
        assignedToId: assignedToId || null
      })
      navigate('/dashboard')
    } catch (err) {
      setError('Failed to update task')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f3f4f6'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '450px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Edit Task</h2>

        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="DONE">Done</option>
        </select>

        <select
          value={assignedToId}
          onChange={(e) => setAssignedToId(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}
        >
          <option value="">Unassigned</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>

        <button
          onClick={handleUpdate}
          style={{ width: '100%', padding: '0.5rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Update Task
        </button>

        <p style={{ textAlign: 'center', marginTop: '1rem' }}>
          <a href="/dashboard" style={{ color: '#3b82f6' }}>← Back to Dashboard</a>
        </p>
      </div>
    </div>
  )
}

export default EditTaskPage;