import React, { useEffect, useState } from "react"
import {
  FaBus,
  FaChair,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa"
import api from "../api/axios"

const UserBookings = ({ token, userId }) => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token || !userId) {
      setLoading(false)
      return
    }

    api
      .get(`/api/user/${userId}/bookings/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        setBookings(res.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.data?.detail || err.message)
        setLoading(false)
      })
  }, [token, userId])

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10">
        Loading bookings...
      </p>
    )

  if (error)
    return (
      <p className="text-center text-red-500 mt-10">
        Error: {error}
      </p>
    )

  return (
    <div className="min-h-screen px-3 sm:px-4 py-8 sm:py-10 bg-gradient-to-br from-indigo-50 to-blue-100">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-10 text-gray-800">
        Your Bookings
      </h2>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-600">
          No bookings found.
        </p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white/80 backdrop-blur-xl border border-white/50
                         rounded-2xl shadow-xl p-4 sm:p-6
                         transition hover:scale-[1.01]"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-4">
                <div className="flex items-center gap-2 text-indigo-600">
                  <FaBus />
                  <h3 className="text-base sm:text-lg font-semibold">
                    {booking.bus
                      ? `${booking.bus.bus_name} (${booking.bus.number})`
                      : "Bus Details"}
                  </h3>
                </div>

                <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full w-fit">
                  Confirmed
                </span>
              </div>

              {/* Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-700 text-sm sm:text-base">
                <p className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" />
                  <span>
                    <strong>Route:</strong>{" "}
                    {booking.origin || "N/A"} →{" "}
                    {booking.destination || "N/A"}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <FaChair className="text-green-600" />
                  <span>
                    <strong>Seat:</strong>{" "}
                    {booking.seat
                      ? booking.seat.seat_number
                      : "N/A"}
                  </span>
                </p>

                <p className="flex items-center gap-2">
                  <FaMoneyBillWave className="text-indigo-500" />
                  <span>
                    <strong>Price:</strong> ₹
                    {booking.price || "N/A"}
                  </span>
                </p>

                <p>
                  <strong>Booked At:</strong>{" "}
                  {new Date(
                    booking.booking_time
                  ).toLocaleString()}
                </p>
              </div>

              {/* Action */}
              <button
                className="mt-5 sm:mt-6 w-full sm:w-auto px-6 py-3 sm:py-2
                           bg-indigo-600 hover:bg-indigo-700
                           text-white rounded-md font-medium transition"
                onClick={() =>
                  console.log(
                    `Proceeding to payment for booking ${booking.id}`
                  )
                }
              >
                Proceed to Payment
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserBookings
