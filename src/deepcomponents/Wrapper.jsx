import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  FaBus,
  FaTicketAlt,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa"

const Wrapper = ({ token, handleLogout, children }) => {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    handleLogout()
    navigate("/login")
    setMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-blue-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* LEFT */}
            <Link
              to="/"
              className="flex flex-col leading-tight text-indigo-600 hover:text-indigo-800 transition"
            >
              <div className="flex items-center gap-2 font-bold text-lg">
                <FaBus />
                BusWay Travels
              </div>
              <span className="text-xs text-gray-500 hidden sm:block">
                Safe • Fast • Affordable
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6">
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

            {/* MOBILE TOGGLE */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-indigo-600 text-xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur border-t px-4 py-4 space-y-3">
            {token && (
              <Link
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2 rounded-md
                           text-sm text-gray-700 hover:bg-indigo-50"
              >
                <FaTicketAlt />
                My Bookings
              </Link>
            )}

            {token ? (
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md
                           bg-indigo-600 text-white text-sm"
              >
                <FaSignOutAlt />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md
                             text-sm text-indigo-600 hover:bg-indigo-50"
                >
                  <FaUserPlus />
                  Register
                </Link>

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-md
                             bg-indigo-600 text-white text-sm"
                >
                  <FaSignInAlt />
                  Login
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* MAIN */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-6 border border-white/40">
          {children}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white/70 backdrop-blur border-t border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-600">
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              BusWay Travels
            </h3>
            <p>
              Book bus tickets easily with real-time seat selection,
              secure payments, and trusted operators across India.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Quick Links
            </h3>
            <ul className="space-y-1">
              <li><Link to="/" className="hover:text-indigo-600">Home</Link></li>
              <li><Link to="/my-bookings" className="hover:text-indigo-600">My Bookings</Link></li>
              <li><Link to="/login" className="hover:text-indigo-600">Login</Link></li>
              <li><Link to="/register" className="hover:text-indigo-600">Register</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Support</h3>
            <ul className="space-y-1">
              <li>FAQs</li>
              <li>Cancellation Policy</li>
              <li>Terms & Conditions</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Contact</h3>
            <p className="flex items-center gap-2"><FaPhoneAlt /> +91 98765 43210</p>
            <p className="flex items-center gap-2"><FaEnvelope /> support@buswaytravels.com</p>
            <p className="flex items-center gap-2"><FaMapMarkerAlt /> Bengaluru, India</p>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500 pb-4">
          © {new Date().getFullYear()} BusWay Travels. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Wrapper
