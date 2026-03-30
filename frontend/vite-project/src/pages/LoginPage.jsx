import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await login({ email, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('role', response.data.role)
      localStorage.setItem('name', response.data.name)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    }
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
        position: 'absolute',
        inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      {/* Glowing orbs */}
      {[
        { top: '20%', left: '10%', size: 200, color: 'rgba(102,126,234,0.15)' },
        { top: '30%', right: '10%', size: 250, color: 'rgba(118,75,162,0.12)' },
        { top: '60%', left: '30%', size: 300, color: 'rgba(102,126,234,0.08)' },
      ].map((orb, i) => (
        <div key={i} style={{
          position: 'absolute',
          top: orb.top,
          left: orb.left,
          right: orb.right,
          width: orb.size,
          height: orb.size,
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
          color: 'rgba(255,255,255,0.5)',
          fontSize: i % 3 === 0 ? '14px' : i % 3 === 1 ? '8px' : '10px'
        }}>✦</div>
      ))}

      {/* Birds */}
      {[
        { top: '22%', left: '18%', size: 1 },
        { top: '20%', left: '21%', size: 0.7 },
        { top: '25%', right: '18%', size: 1 },
        { top: '23%', right: '21%', size: 0.7 },
        { top: '18%', left: '45%', size: 0.8 },
      ].map((bird, i) => (
        <svg key={i} style={{
          position: 'absolute',
          top: bird.top, left: bird.left, right: bird.right,
          width: `${22 * bird.size}px`, opacity: 0.6
        }} viewBox="0 0 40 20">
          <path d="M0 10 Q10 0 20 10 Q30 0 40 10" stroke="white" strokeWidth="2" fill="none"/>
        </svg>
      ))}

      {/* Navbar */}
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 2.5rem',
        zIndex: 10,
        boxSizing: 'border-box',
        borderBottom: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '34px', height: '34px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '1rem' }}>T</div>
          <span style={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem', letterSpacing: '0.5px' }}>TeamFlow</span>
        </div>

        <div style={{ display: 'flex', gap: '2.5rem' }}>
          {['Home', 'About', 'Features', 'Contact'].map(link => (
            <a key={link} href="#" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.2s' }}>
              {link}
            </a>
          ))}
        </div>

        <a href="/register" style={{
          padding: '0.5rem 1.3rem',
          border: '1px solid rgba(255,255,255,0.25)',
          borderRadius: '8px',
          color: '#c4b5fd',
          fontWeight:'bold',
          textDecoration: 'none',
          fontSize: '0.85rem',
          backgroundColor: 'rgba(255,255,255,0.05)'
        }}>
          Register
        </a>
      </div>

      {/* Tagline */}
      <div style={{ textAlign: 'center', marginTop: '1rem', zIndex: 5 }}>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', letterSpacing: '4px', textTransform: 'uppercase', margin: 0 }}>
          ✦ Collaborate · Organize · Achieve ✦
        </p>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 5, padding: '1rem 2rem', position: 'relative' }}>

        {/* Left Character (people with plants) */}
        <div style={{ position: 'absolute', left: '2%', bottom: '180px', zIndex: 4 }}>
          <img
            src="/src/assets/photo1.svg"
            alt="characters"
            style={{ width: '320px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
          />
        </div>

        {/* Right Character (person walking) */}
        <div style={{ position: 'absolute', right: '2%', bottom: '180px', zIndex: 4 }}>
          <img
            src="/src/assets/photo2.svg"
            alt="character"
            style={{ width: '280px', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}
          />
        </div>

        {/* Login Card - Center */}
        <div style={{
          backgroundColor: 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(24px)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '24px',
          padding: '2.5rem',
          width: '400px',
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          zIndex: 10,
          position: 'relative'
        }}>

          {/* Card top accent */}
          <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: '2px', background: 'linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)', borderRadius: '999px' }} />

          <h2 style={{ color: 'white', fontSize: '2rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '0.4rem', margin: '0 0 0.4rem' }}>
            WELCOME!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '2rem', fontSize: '0.85rem' }}>
            Sign in to your TeamFlow account
          </p>

          {error && (
            <div style={{ backgroundColor: 'rgba(220,38,38,0.15)', color: '#fca5a5', padding: '0.75rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.85rem', textAlign: 'center', border: '1px solid rgba(220,38,38,0.2)' }}>
              {error}
            </div>
          )}

          {/* Email */}
          <div style={{ position: 'relative', marginBottom: '1rem' }}>
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>✉</span>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.2rem',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative', marginBottom: '1.5rem' }}>
            <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 2.2rem',
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '10px',
                color: 'white',
                fontSize: '0.9rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <button
            onClick={handleLogin}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              letterSpacing: '1px',
              boxShadow: '0 4px 15px rgba(102,126,234,0.4)'
            }}
          >
            LOGIN
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
            <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>or</span>
            <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
          </div>

          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', margin: 0 }}>
            Don't have an account?{' '}
            <a href="/register" style={{ color: '#a78bfa', fontWeight: 'bold', textDecoration: 'none' }}>
              Create Account
            </a>
          </p>
        </div>
      </div>

      {/* City Scenery Background - Bottom */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 3
      }}>
        <img
          src="/src/assets/photo3.svg"
          alt="city scenery"
          style={{
            width: '100%',
            display: 'block',
            opacity: 0.85
          }}
        />
      </div>

      {/* Man with laptop - sitting on scenery */}
      <div style={{
        position: 'absolute',
        bottom: '60px',
        left: '25%',
        zIndex: 4
      }}>
        <img
          src="/src/assets/photo4.svg"
          alt="working"
          style={{ width: '180px', filter: 'drop-shadow(0 5px 10px rgba(0,0,0,0.4))' }}
        />
      </div>

      {/* Bottom dots */}
      <div style={{ position: 'absolute', bottom: '15px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.5rem', zIndex: 10 }}>
        {[1,2,3,4,5].map(i => (
          <div key={i} style={{
            width: '8px', height: '8px', borderRadius: '50%',
            backgroundColor: i === 1 ? '#667eea' : 'rgba(255,255,255,0.25)'
          }} />
        ))}
      </div>

    </div>
  )
}

export default LoginPage;