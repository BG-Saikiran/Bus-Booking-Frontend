import React, { useState } from 'react'
import api from "../api/axios";
import { useNavigate } from 'react-router-dom'


const LoginForm = ({ onLogin }) => {
  const [form, setForm] = useState({ username: '', password: '' })
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await api.post("/api/login/", form);
      onLogin && onLogin(res.data.token, res.data.user_id)
      navigate('/')
    } catch {
      setMessage('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center text-white relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1509749837427-ac94a2553d0e')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-indigo-900/60"></div>

      {/* Login Content */}
      <div className="relative z-10 w-full max-w-md text-center px-6">

        <h1 className="text-3xl font-semibold mb-2">Welcome Back</h1>
        <p className="text-sm text-white/80 mb-8">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Username */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-full 
                       bg-white/20 backdrop-blur-lg 
                       placeholder-white/70 text-white
                       focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 rounded-full 
                       bg-white/20 backdrop-blur-lg 
                       placeholder-white/70 text-white
                       focus:outline-none focus:ring-2 focus:ring-white/60"
          />

          {/* Error */}
          {message && (
            <p className="text-red-300 text-sm">{message}</p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-full 
                       bg-[#FFD3B6] text-gray-800 font-semibold
                       hover:bg-[#ffc3a0] transition
                       disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'SIGN IN'}
          </button>

          {/* Extras */}
          <div className="flex justify-between text-xs text-white/80 mt-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-white" />
              Remember me
            </label>
            <span className="cursor-pointer hover:underline">
              Forgot Password?
            </span>
          </div>

        </form>
      </div>
    </div>
  )
}

export default LoginForm
