'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        body { background: #0d0d0d; }

        @keyframes rise {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .login-wrap {
          animation: rise 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .login-input {
          width: 100%;
          padding: 9px 12px;
          background: #141414;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          color: #ededed;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          -webkit-appearance: none;
        }
        .login-input::placeholder { color: #333; }
        .login-input:focus {
          border-color: rgba(79,142,247,0.5);
          box-shadow: 0 0 0 3px rgba(79,142,247,0.08);
        }

        .login-btn {
          width: 100%;
          padding: 9px 12px;
          border-radius: 8px;
          border: none;
          background: #4f8ef7;
          color: white;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.15s, transform 0.1s;
          letter-spacing: -0.1px;
        }
        .login-btn:hover { opacity: 0.88; }
        .login-btn:active { transform: scale(0.99); }
        .login-btn:disabled { opacity: 0.5; cursor: not-allowed; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        .status-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #2d7d46;
          animation: pulse 3s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <main style={{
        minHeight: '100vh',
        background: '#0d0d0d',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif',
        WebkitFontSmoothing: 'antialiased',
        padding: '0 24px',
      }}>
        <div className="login-wrap" style={{ width: '100%', maxWidth: 360 }}>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 40 }}>
            <div style={{
              width: 28, height: 28,
              borderRadius: 7,
              background: '#4f8ef7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 600, color: 'white',
            }}>K</div>
            <span style={{ fontSize: 15, fontWeight: 500, color: '#ededed', letterSpacing: '-0.2px' }}>
              Kiroo
            </span>
          </div>

          {/* Heading */}
          <h1 style={{
            fontSize: 20, fontWeight: 600,
            color: '#ededed', letterSpacing: '-0.4px',
            marginBottom: 6,
          }}>
            Welcome back
          </h1>
          <p style={{ fontSize: 13, color: '#555', marginBottom: 32, lineHeight: 1.5 }}>
            Sign in to your operating system.
          </p>

          {/* Form */}
          <form onSubmit={handleLogin}>

            <div style={{ marginBottom: 12 }}>
              <label style={{
                display: 'block', fontSize: 12,
                fontWeight: 500, color: '#555',
                marginBottom: 6, letterSpacing: '0.1px',
              }}>
                Email
              </label>
              <input
                className="login-input"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />
            </div>

            <div style={{ marginBottom: 4 }}>
              <label style={{
                display: 'block', fontSize: 12,
                fontWeight: 500, color: '#555',
                marginBottom: 6, letterSpacing: '0.1px',
              }}>
                Password
              </label>
              <input
                className="login-input"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p style={{
                fontSize: 12, color: '#f87171',
                background: 'rgba(248,113,113,0.06)',
                border: '1px solid rgba(248,113,113,0.12)',
                borderRadius: 7, padding: '9px 12px',
                marginTop: 12,
              }}>
                {error}
              </p>
            )}

            <button
              className="login-btn"
              type="submit"
              disabled={loading}
              style={{ marginTop: 20 }}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

          </form>

          {/* Status */}
          <div style={{
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 6,
            marginTop: 32,
          }}>
            <span className="status-dot" />
            <span style={{ fontSize: 11, color: '#333', letterSpacing: '0.1px' }}>
              All systems operational
            </span>
          </div>

        </div>
      </main>
    </>
  )
}