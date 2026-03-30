import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const response = await register({ name, email, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.role)
      localStorage.setItem('name', response.data.name)
      navigate('/dashboard')
    } catch (err) {
      setError('Registration failed. Email may already exist.')
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '0.85rem 1rem',
    marginBottom: '1rem',
    backgroundColor: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.15)',
    borderRadius: '10px',
    color: 'white',
    fontSize: '0.95rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'Segoe UI, sans-serif',
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #1a1a4e 100%)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Segoe UI, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Grid Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Glowing orbs */}
      {[
        { top: '20%', left: '5%', size: 200, color: 'rgba(102,126,234,0.12)' },
        { top: '40%', right: '5%', size: 250, color: 'rgba(118,75,162,0.1)' },
        { top: '65%', left: '40%', size: 300, color: 'rgba(102,126,234,0.07)' },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: orb.top, left: orb.left, right: orb.right,
          width: orb.size, height: orb.size,
          borderRadius: '50%',
          backgroundColor: orb.color,
          filter: 'blur(60px)'
        }} />
      ))}

      {/* Stars */}
      {[
        { top: '5%', left: '15%' }, { top: '8%', left: '35%' },
        { top: '4%', right: '20%' }, { top: '10%', right: '38%' },
        { top: '15%', left: '55%' }, { top: '6%', left: '70%' },
        { top: '12%', left: '80%' }, { top: '18%', right: '15%' },
      ].map((star, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: star.top, left: star.left, right: star.right,
          color: 'rgba(255,255,255,0.4)',
          fontSize: i % 3 === 0 ? '14px' : i % 3 === 1 ? '8px' : '10px'
        }}>✦</div>
      ))}

      {/* Birds */}
      {[
        { top: '14%', left: '20%', size: 1 },
        { top: '12%', left: '23%', size: 0.7 },
        { top: '16%', right: '20%', size: 1 },
        { top: '14%', right: '23%', size: 0.7 },
      ].map((bird, i) => (
        <svg key={i} style={{
          position: 'absolute',
          top: bird.top, left: bird.left, right: bird.right,
          width: `${22 * bird.size}px`, opacity: 0.5
        }} viewBox="0 0 40 20">
          <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      ))}

      {/* Decorative diamonds */}
      {[
        { top: '8%', left: '6%', size: 55 },
        { top: '22%', left: '12%', size: 30 },
        { top: '10%', right: '7%', size: 40 },
        { top: '28%', right: '11%', size: 60 },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: d.top, left: d.left, right: d.right,
          width: d.size, height: d.size,
          border: `1px solid rgba(${i % 2 === 0 ? '102,126,234' : '167,139,250'},0.15)`,
          transform: 'rotate(45deg)',
          borderRadius: '4px',
        }} />
      ))}

      {/* Navbar */}
      <div style={{
        width: '100%',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1.2rem 2.5rem',
        zIndex: 10, boxSizing: 'border-box',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>T</div>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>TeamFlow</span>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Home', 'About', 'Features', 'Contact'].map(link => (
            <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.9rem' }}>{link}</a>
          ))}
        </div>
        <a href="/login" style={{
          padding: '0.5rem 1.3rem',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '8px', color: 'white',
          textDecoration: 'none', fontSize: '0.85rem',
          backgroundColor: 'rgba(255,255,255,0.05)'
        }}>Login</a>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', marginTop: '0.75rem', zIndex: 5 }}>
        <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>
          ✦ Stop being stuck · Start achieving ✦
        </p>
      </div>

      {/* Story text top */}
      <div style={{ textAlign: 'center', marginTop: '0.5rem', zIndex: 5 }}>
        <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem', margin: 0 }}>
          🤔 Confused about task management? → 🚀 TeamFlow has the answer!
        </p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, padding: '0.5rem 2rem', position: 'relative' }}>

        {/* Left — Stuck character (reg1) */}
        <div style={{ position: 'absolute', left: '1%', bottom: '200px', zIndex: 4, textAlign: 'center' }}>
          <img
            src="/src/assets/reg1.svg"
            alt="confused"
            style={{ width: '300px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }}
          />
          <div style={{
            backgroundColor: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '12px',
            padding: '0.4rem 0.8rem',
            marginTop: '0.5rem',
            display: 'inline-block'
          }}>
            <p style={{ color: '#fca5a5', fontSize: '0.75rem', margin: 0 }}>😕 Stuck & confused...</p>
          </div>
        </div>

        {/* Right — Solution character (reg4) */}
        <div style={{ position: 'absolute', right: '1%', bottom: '200px', zIndex: 4, textAlign: 'center' }}>
          <img
            src="/src/assets/reg4.svg"
            alt="solution"
            style={{ width: '300px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.4))' }}
          />
          <div style={{
            backgroundColor: 'rgba(16,185,129,0.15)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '12px',
            padding: '0.4rem 0.8rem',
            marginTop: '0.5rem',
            display: 'inline-block'
          }}>
            <p style={{ color: '#6ee7b7', fontSize: '0.75rem', margin: 0 }}>🎉 Found the solution!</p>
          </div>
        </div>

        {/* Arrow between characters */}
        <div style={{
          position: 'absolute',
          bottom: '280px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 4,
          textAlign: 'center'
        }}>
          <div style={{
            backgroundColor: 'rgba(102,126,234,0.2)',
            border: '1px solid rgba(102,126,234,0.3)',
            borderRadius: '20px',
            padding: '0.3rem 1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span style={{ color: '#fca5a5', fontSize: '0.75rem' }}>😕</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>──────→</span>
            <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: 'bold' }}>TeamFlow</span>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem' }}>──────→</span>
            <span style={{ color: '#6ee7b7', fontSize: '0.75rem' }}>🎉</span>
          </div>
        </div>

        {/* Register Card */}
        <div style={{
          display: 'flex',
          width: '820px',
          borderRadius: '24px', overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0,0,0,0.5)',
          border: '1px solid rgba(255,255,255,0.1)',
          zIndex: 10,
          position: 'relative'
        }}>

          {/* Left info panel */}
          <div style={{
            width: '310px',
            background: 'linear-gradient(160deg, rgba(102,126,234,0.22) 0%, rgba(118,75,162,0.28) 100%)',
            backdropFilter: 'blur(20px)',
            padding: '2.5rem 2rem',
            display: 'flex', flexDirection: 'column',
            justifyContent: 'space-between',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: 'rgba(167,139,250,0.15)',
                border: '1px solid rgba(167,139,250,0.3)',
                borderRadius: '20px', padding: '0.3rem 0.9rem',
                marginBottom: '1.5rem',
              }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#a78bfa' }} />
                <span style={{ color: '#a78bfa', fontSize: '0.75rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase' }}>
                  Free Forever
                </span>
              </div>

              <h2 style={{ color: 'white', fontSize: '1.6rem', fontWeight: '800', lineHeight: 1.25, margin: '0 0 0.75rem 0' }}>
                Stop being stuck. Start achieving. 🚀
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7, margin: 0 }}>
                Join thousands of teams who found their way out of chaos with TeamFlow.
              </p>
            </div>

            {/* Story steps */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
              {[
                { icon: '😕', label: 'Confused about task priorities?', color: '#fca5a5' },
                { icon: '📋', label: 'No clear ownership of work?', color: '#fcd34d' },
                { icon: '🔄', label: 'Missing deadlines constantly?', color: '#93c5fd' },
                { icon: '✅', label: 'TeamFlow solves all of this!', color: '#6ee7b7' },
              ].map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', flexShrink: 0,
                  }}>{f.icon}</div>
                  <span style={{ color: f.color, fontSize: '0.82rem' }}>{f.label}</span>
                </div>
              ))}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase', margin: 0 }}>
              ✦ Stop being stuck · Start achieving ✦
            </p>
          </div>

          {/* Right form panel */}
          <div style={{
            flex: 1,
            backgroundColor: 'rgba(15,12,41,0.9)',
            backdropFilter: 'blur(20px)',
            padding: '2.5rem 2.5rem',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
          }}>

            {/* Top accent line */}
            <div style={{ position: 'absolute', top: 0, left: '38%', right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)', borderRadius: '999px' }} />

            <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: '700', margin: '0 0 0.3rem 0' }}>
              Create your account
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: '0 0 1.5rem 0' }}>
              Join TeamFlow and find your solution today!
            </p>

            {error && (
              <div style={{
                backgroundColor: 'rgba(220,38,38,0.15)', color: '#fca5a5',
                padding: '0.75rem 1rem', borderRadius: '10px',
                marginBottom: '1rem', fontSize: '0.85rem',
                border: '1px solid rgba(220,38,38,0.25)',
              }}>
                {error}
              </div>
            )}

            {/* Step indicator */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              {['Name', 'Email', 'Password'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    width: '22px', height: '22px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', color: 'white', fontWeight: '700',
                  }}>{i + 1}</div>
                  <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.75rem' }}>{label}</span>
                  {i < 2 && <div style={{ width: '18px', height: '1px', backgroundColor: 'rgba(255,255,255,0.15)' }} />}
                </div>
              ))}
            </div>

            {/* Name input */}
            <div style={{ position: 'relative', marginBottom: '0' }}>
              <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>👤</span>
              <input type="text" placeholder="Full Name" value={name}
                onChange={(e) => setName(e.target.value)}
                style={{ ...inputStyle, paddingLeft: '2.2rem' }} />
            </div>

            {/* Email input */}
            <div style={{ position: 'relative', marginBottom: '0' }}>
              <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>✉</span>
              <input type="email" placeholder="Email Address" value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ ...inputStyle, paddingLeft: '2.2rem' }} />
            </div>

            {/* Password input */}
            <div style={{ position: 'relative', marginBottom: '0' }}>
              <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>🔒</span>
              <input type="password" placeholder="Password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...inputStyle, paddingLeft: '2.2rem', marginBottom: '1.25rem' }} />
            </div>

            <button onClick={handleRegister} style={{
              width: '100%', padding: '0.9rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white', border: 'none', borderRadius: '10px',
              fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer',
              letterSpacing: '0.5px',
              boxShadow: '0 4px 15px rgba(102,126,234,0.4)'
            }}>
              🚀 Create Account & Find My Solution
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>or</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            </div>

            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', margin: 0 }}>
              Already have an account?{' '}
              <a href="/login" style={{
                color: '#c4b5fd', fontWeight: 'bold', textDecoration: 'none',
                textShadow: '0 0 10px rgba(167,139,250,0.6)'
              }}>
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scenery (reg3 - city people walking) */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        zIndex: 3
      }}>
        <img
          src="/src/assets/reg3.svg"
          alt="city scenery"
          style={{ width: '100%', display: 'block', opacity: 0.5 }}
        />
      </div>

      {/* reg2 - man with map - background left */}
      <div style={{
        position: 'absolute',
        bottom: '120px',
        left: '20%',
        zIndex: 2,
        opacity: 0.4
      }}>
        <img
          src="/src/assets/reg2.svg"
          alt="background character"
          style={{ width: '150px' }}
        />
      </div>

      {/* Bottom dots */}
      <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: i === 2 ? '#764ba2' : 'rgba(255,255,255,0.25)'
          }} />
        ))}
      </div>

    </div>
  )
}

export default RegisterPage;