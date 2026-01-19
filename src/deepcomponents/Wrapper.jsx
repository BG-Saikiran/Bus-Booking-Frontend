import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  FaBus,
  FaTicketAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from 'react-icons/fa'

const Wrapper = ({ token, handleLogout, children }) => {
  const navigate = useNavigate()

  const logout = () => {
    handleLogout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-100">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* LEFT */}
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex flex-col leading-tight text-indigo-600 hover:text-indigo-800 transition"
              >
                <div className="flex items-center gap-2 font-bold text-lg">
                  <FaBus />
                  BusWay Travels
                </div>
                <span className="text-xs text-gray-500">
                  Safe • Fast • Affordable
                </span>
              </Link>

              {token && (
                <Link
                  to="/my-bookings"
                  className="flex items-center gap-2 px-3 py-2 rounded-md
                             text-sm font-medium text-gray-700
                             hover:text-indigo-600 hover:bg-white/60 transition"
                >
                  <FaTicketAlt />
                  My Bookings
                </Link>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {token ? (
                <button
                  onClick={logout}
                  className="flex items-center gap-2 px-4 py-2 rounded-md
                             bg-indigo-600 hover:bg-indigo-700 text-white
                             text-sm font-medium transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              ) : (
                <>
                  <Link
                    to="/register"
                    className="flex items-center gap-2 px-4 py-2 rounded-md
                               text-sm font-medium text-indigo-600
                               hover:bg-indigo-100 transition"
                  >
                    <FaUserPlus />
                    Register
                  </Link>

                  <Link
                    to="/login"
                    className="flex items-center gap-2 px-4 py-2 rounded-md
                               bg-indigo-600 hover:bg-indigo-700 text-white
                               text-sm font-medium transition"
                  >
                    <FaSignInAlt />
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* MAIN */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-white/40">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/70 backdrop-blur border-t border-white/40">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm text-gray-600">

          {/* About */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">BusWay Travels</h3>
            <p>
              Book bus tickets easily with real-time seat selection,
              secure payments, and trusted operators across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
              <li><Link to="/my-bookings" className="hover:text-indigo-600">My Bookings</Link></li>
              <li><Link to="/login" className="hover:text-indigo-600">Login</Link></li>
              <li><Link to="/register" className="hover:text-indigo-600">Register</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
            <ul className="space-y-2">
              <li>FAQs</li>
              <li>Cancellation Policy</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2">
                <FaPhoneAlt /> +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <FaEnvelope /> support@BusWaytravels.com
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt /> Bengaluru, India
              </p>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pb-6">
          © {new Date().getFullYear()} BusWay Travels. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Wrapper
// const res = await api.get(`/api/buses/`);