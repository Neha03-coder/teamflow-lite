import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTasks } from '../services/taskService'

function CalendarWidget() {
  const [selectedDate, setSelectedDate] = useState(null)
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const firstDay = new Date(currentYear, currentMonth, 1).getDay()
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1) }
    else setCurrentMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1) }
    else setCurrentMonth(m => m + 1)
  }

  const days = []
  for (let i = 0; i < firstDay; i++) days.push(null)
  for (let i = 1; i <= daysInMonth; i++) days.push(i)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <button onClick={prevMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea', fontSize: '1.2rem' }}>‹</button>
        <span style={{ fontWeight: 'bold', color: '#1e293b', fontSize: '0.9rem' }}>{monthNames[currentMonth]} {currentYear}</span>
        <button onClick={nextMonth} style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea', fontSize: '1.2rem' }}>›</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', marginBottom: '4px' }}>
        {dayNames.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.65rem', color: '#94a3b8', fontWeight: 'bold', padding: '2px' }}>{d}</div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px' }}>
        {days.map((day, i) => (
          <div key={i} onClick={() => day && setSelectedDate(day)} style={{
            textAlign: 'center', padding: '6px 2px', borderRadius: '8px',
            fontSize: '0.8rem', cursor: day ? 'pointer' : 'default',
            backgroundColor:
              day === selectedDate ? '#667eea' :
              day === today.getDate() && currentMonth === today.getMonth() ? '#ede9fe' : 'transparent',
            color:
              day === selectedDate ? 'white' :
              day === today.getDate() && currentMonth === today.getMonth() ? '#667eea' :
              day ? '#1e293b' : 'transparent',
            fontWeight: day === today.getDate() && currentMonth === today.getMonth() ? 'bold' : 'normal'
          }}>
            {day || ''}
          </div>
        ))}
      </div>
      {selectedDate && (
        <p style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.75rem', color: '#667eea', fontWeight: 'bold' }}>
          📅 {monthNames[currentMonth]} {selectedDate}, {currentYear}
        </p>
      )}
    </div>
  )
}

function DashboardPage() {
  const [tasks, setTasks] = useState([])
  const [filterStatus, setFilterStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const name = localStorage.getItem('name')
  const role = localStorage.getItem('role')

  useEffect(() => {
    fetchTasks()
  }, [filterStatus])

  const fetchTasks = async () => {
    try {
      const response = await getTasks(filterStatus)
      setTasks(response.data)
    } catch (err) {
      console.error('Failed to fetch tasks')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const totalTasks = tasks.length
  const todoCount = tasks.filter(t => t.status === 'TODO').length
  const inProgressCount = tasks.filter(t => t.status === 'IN_PROGRESS').length
  const doneCount = tasks.filter(t => t.status === 'DONE').length

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8f7ff', fontFamily: 'Segoe UI, sans-serif' }}>

      {/* Sidebar - Icons only */}
      <div style={{
        width: '70px',
        background: 'linear-gradient(180deg, #0f0c29, #302b63)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1.5rem 0',
        gap: '0.5rem',
        minHeight: '100vh'
      }}>
        {/* Logo */}
        <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '1.5rem' }}>T</div>

        {/* Nav icons */}
        {[
          { icon: '⊞', path: '/dashboard', active: true, tip: 'Dashboard' },
          { icon: '✓', path: '/dashboard', tip: 'Tasks' },
          { icon: '💬', path: '/dashboard', tip: 'Messages' },
          { icon: '👤', path: '/dashboard', tip: 'Profile' },
        ].map((item, i) => (
          <div key={i} onClick={() => navigate(item.path)} title={item.tip} style={{
            width: '44px', height: '44px',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            backgroundColor: item.active ? 'rgba(102,126,234,0.3)' : 'transparent',
            color: item.active ? 'white' : 'rgba(255,255,255,0.4)',
            fontSize: '1.1rem',
            border: item.active ? '1px solid rgba(102,126,234,0.5)' : '1px solid transparent'
          }}>
            {item.icon}
          </div>
        ))}

        {role === 'ADMIN' && (
          <div onClick={() => navigate('/users')} title="Users" style={{
            width: '44px', height: '44px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'rgba(255,255,255,0.4)', fontSize: '1.1rem'
          }}>👥</div>
        )}

        {/* Logout at bottom */}
        <div style={{ marginTop: 'auto' }}>
          <div onClick={handleLogout} title="Logout" style={{
            width: '44px', height: '44px', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fca5a5', fontSize: '1.1rem',
            backgroundColor: 'rgba(239,68,68,0.15)'
          }}>⎋</div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>

        {/* Top Bar */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '1rem 2rem',
          backgroundColor: 'white',
          borderBottom: '1px solid #f1f5f9'
        }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: '#f8f7ff', borderRadius: '10px', padding: '0.5rem 1rem', width: '250px', border: '1px solid #e2e8f0' }}>
            <span style={{ color: '#94a3b8' }}>🔍</span>
            <input placeholder="Search tasks..." style={{ border: 'none', background: 'none', outline: 'none', color: '#64748b', fontSize: '0.85rem', width: '100%' }} />
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => navigate('/tasks/create')} style={{
              padding: '0.5rem 1.2rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white', border: 'none', borderRadius: '10px',
              cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem'
            }}>+ New Task</button>

            {/* Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 'bold', fontSize: '0.9rem'
              }}>
                {name ? name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 'bold', color: '#1e293b' }}>{name}</p>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#667eea' }}>{role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem 2rem', display: 'flex', gap: '1.5rem' }}>

          {/* Left Main Panel */}
          <div style={{ flex: 1 }}>

            {/* Welcome Banner */}
            <div style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '20px',
              padding: '2rem',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '150px'
            }}>
              {/* Background decoration */}
              <div style={{ position: 'absolute', right: '200px', top: '-30px', width: '150px', height: '150px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />
              <div style={{ position: 'absolute', right: '150px', bottom: '-50px', width: '200px', height: '200px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.05)' }} />

              <div style={{ zIndex: 1 }}>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0 0 0.25rem' }}>Good day, {name}! 👋</p>
                <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: 'bold', margin: '0 0 0.5rem' }}>Today's Tasks</h2>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', margin: '0 0 1rem' }}>Check your daily tasks and schedules</p>
                <button onClick={() => navigate('/tasks/create')} style={{
                  padding: '0.5rem 1.2rem',
                  backgroundColor: 'white',
                  color: '#667eea',
                  border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem'
                }}>
                  Today's Schedule →
                </button>
              </div>

              {/* Character in banner */}
              <img
                src="/src/assets/photo8.svg"
                alt="character"
                style={{ width: '180px', position: 'absolute', right: '1rem', bottom: 0, opacity: 0.95, zIndex: 1 }}
              />
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Total Tasks', value: totalTasks, color: '#667eea', bg: '#ede9fe', icon: '📋' },
                { label: 'To Do', value: todoCount, color: '#f59e0b', bg: '#fef3c7', icon: '📝' },
                { label: 'In Progress', value: inProgressCount, color: '#3b82f6', bg: '#dbeafe', icon: '🔄' },
                { label: 'Done', value: doneCount, color: '#10b981', bg: '#d1fae5', icon: '✅' },
              ].map((card, i) => (
                <div key={i} style={{
                  backgroundColor: 'white',
                  borderRadius: '16px',
                  padding: '1.25rem',
                  boxShadow: '0 2px 8px rgba(102,126,234,0.08)',
                  borderTop: `3px solid ${card.color}`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <p style={{ color: '#94a3b8', fontSize: '0.75rem', margin: 0 }}>{card.label}</p>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: card.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>{card.icon}</div>
                  </div>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: card.color, margin: 0 }}>{card.value}</p>
                </div>
              ))}
            </div>

            {/* Task Cards */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(102,126,234,0.08)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <h3 style={{ margin: 0, color: '#1e293b', fontSize: '1rem', fontWeight: 'bold' }}>Task Overview</h3>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8rem', color: '#64748b', backgroundColor: '#f8f7ff' }}
                >
                  <option value="">All Status</option>
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="DONE">Done</option>
                </select>
              </div>

              {loading ? (
                <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading tasks...</p>
              ) : tasks.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p style={{ fontSize: '2rem' }}>📭</p>
                  <p style={{ color: '#94a3b8' }}>No tasks found</p>
                  <button onClick={() => navigate('/tasks/create')} style={{ padding: '0.5rem 1rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Create your first task
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {tasks.map(task => (
                    <div key={task.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1rem 1.25rem',
                      borderRadius: '12px',
                      backgroundColor: '#f8f7ff',
                      border: '1px solid #ede9fe',
                      cursor: 'pointer'
                    }} onClick={() => navigate(`/tasks/edit/${task.id}`)}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                        <div style={{
                          width: '10px', height: '10px', borderRadius: '50%',
                          backgroundColor:
                            task.status === 'TODO' ? '#f59e0b' :
                            task.status === 'IN_PROGRESS' ? '#3b82f6' : '#10b981',
                          flexShrink: 0
                        }} />
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: '600', color: '#1e293b', fontSize: '0.9rem' }}>{task.title}</p>
                          <p style={{ margin: '0.15rem 0 0', color: '#94a3b8', fontSize: '0.75rem' }}>
                            {task.assignedTo ? `Assigned to ${task.assignedTo.name}` : 'Unassigned'} · Created by {task.createdBy ? task.createdBy.name : '-'}
                          </p>
                          {/* Progress bar */}
                          <div style={{ marginTop: '0.4rem', width: '200px', backgroundColor: '#e2e8f0', borderRadius: '999px', height: '4px' }}>
                            <div style={{
                              width: task.status === 'DONE' ? '100%' : task.status === 'IN_PROGRESS' ? '50%' : '10%',
                              backgroundColor: task.status === 'DONE' ? '#10b981' : task.status === 'IN_PROGRESS' ? '#667eea' : '#f59e0b',
                              height: '4px', borderRadius: '999px'
                            }} />
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{
                          padding: '0.2rem 0.7rem', borderRadius: '999px',
                          fontSize: '0.7rem', fontWeight: 'bold',
                          backgroundColor:
                            task.status === 'TODO' ? '#fef3c7' :
                            task.status === 'IN_PROGRESS' ? '#dbeafe' : '#d1fae5',
                          color:
                            task.status === 'TODO' ? '#92400e' :
                            task.status === 'IN_PROGRESS' ? '#1e40af' : '#065f46'
                        }}>
                          {task.status}
                        </span>
                        <button
                          onClick={(e) => { e.stopPropagation(); navigate(`/tasks/edit/${task.id}`) }}
                          style={{ padding: '0.2rem 0.6rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem' }}
                        >
                          Edit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel */}
          <div style={{ width: '280px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            {/* Calendar */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(102,126,234,0.08)' }}>
              <CalendarWidget />
            </div>

            {/* Task Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(102,126,234,0.08)' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#1e293b', fontSize: '0.9rem', fontWeight: 'bold' }}>Progress</h4>
              {[
                { label: 'To Do', count: todoCount, color: '#f59e0b', total: totalTasks },
                { label: 'In Progress', count: inProgressCount, color: '#667eea', total: totalTasks },
                { label: 'Done', count: doneCount, color: '#10b981', total: totalTasks },
              ].map((item, i) => (
                <div key={i} style={{ marginBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.label}</span>
                    <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: item.color }}>{item.count}</span>
                  </div>
                  <div style={{ width: '100%', backgroundColor: '#f1f5f9', borderRadius: '999px', height: '6px' }}>
                    <div style={{
                      width: `${item.total > 0 ? (item.count / item.total) * 100 : 0}%`,
                      backgroundColor: item.color, height: '6px', borderRadius: '999px'
                    }} />
                  </div>
                </div>
              ))}
              <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>
                  {totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0}% completed
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '1.5rem', boxShadow: '0 2px 8px rgba(102,126,234,0.08)' }}>
              <h4 style={{ margin: '0 0 1rem', color: '#1e293b', fontSize: '0.9rem', fontWeight: 'bold' }}>Quick Actions</h4>
              <button onClick={() => navigate('/tasks/create')} style={{ width: '100%', padding: '0.6rem', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                + Create Task
              </button>
              {role === 'ADMIN' && (
                <button onClick={() => navigate('/users')} style={{ width: '100%', padding: '0.6rem', backgroundColor: '#f8f7ff', color: '#667eea', border: '1px solid #ede9fe', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
                  👥 Manage Users
                </button>
              )}
            </div>

            {/* Character */}
            <div style={{ textAlign: 'center' }}>
              <img src="/src/assets/photo7.svg" alt="character" style={{ width: '100%', opacity: 0.9 }} />
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage;