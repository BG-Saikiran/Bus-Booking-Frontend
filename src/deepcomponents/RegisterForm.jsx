import React, { useState } from 'react'
import api from "../api/axios";


const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await api.post("/api/register/", form);
      setMessage('Registration successful! You can now login.')
      setForm({ username: '', email: '', password: '' })
    } catch (error) {
      setMessage(
        'Registration failed: ' +
          (error.response?.data?.username ||
            error.response?.data?.email ||
            error.message)
      )
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

      {/* Register Content */}
      <div className="relative z-10 w-full max-w-md text-center px-6">

        <h1 className="text-3xl font-semibold mb-2">Create Account</h1>
        <p className="text-sm text-white/80 mb-8">
          Start your journey with us
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

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
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

          {/* Message */}
          {message && (
            <p
              className={`text-sm ${
                message.includes('successful')
                  ? 'text-green-300'
                  : 'text-red-300'
              }`}
            >
              {message}
            </p>
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
            {isLoading ? 'Registering...' : 'REGISTER'}
          </button>

        </form>
      </div>
    </div>
  )
}

export default RegisterForm
