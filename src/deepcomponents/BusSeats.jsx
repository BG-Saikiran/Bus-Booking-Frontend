import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { FaChair } from "react-icons/fa"
import { toast } from "react-toastify"
import api from "../api/axios"

const BusSeats = ({ token }) => {
    const [bus, setBus] = useState(null)
    const [seats, setSeats] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [selectedSeat, setSelectedSeat] = useState(null)

    const { busId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBusDetails = async () => {
            try {
                const res = await api.get(`/api/buses/${busId}`)
                setBus(res.data)
                setSeats(res.data.seats || [])
            } catch {
                setError("Failed to load bus details.")
            } finally {
                setIsLoading(false)
            }
        }
        fetchBusDetails()
    }, [busId])

    const handleBook = async (seatId) => {
        if (!token) {
            navigate("/login")
            return
        }

        try {
            await api.post(
                "/api/booking/",
                { seat: seatId },
                { headers: { Authorization: `Token ${token}` } }
            )

            toast.success("🎉 Seat booked successfully!")

            setSelectedSeat(seatId)
            setSeats((prev) =>
                prev.map((seat) =>
                    seat.id === seatId
                        ? { ...seat, is_booked: true }
                        : seat
                )
            )
        } catch (err) {
            toast.error(
                err.response?.data?.detail || "❌ Seat already booked!"
            )
        }
    }

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin h-12 w-12 border-4 border-indigo-500 border-t-transparent rounded-full"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center text-red-600 font-medium">
                {error}
            </div>
        )
    }

    return (
        <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
            {/* BUS DETAILS */}
            {bus && (
                <div className="bg-white rounded-xl shadow p-4 sm:p-6 mb-6 sm:mb-8">
                    <h1 className="text-xl sm:text-2xl font-bold mb-4">
                        {bus.bus_name}
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                            <p>
                                <b>Route:</b> {bus.origin} →{" "}
                                {bus.destination}
                            </p>
                            <p>
                                <b>Departure:</b> {bus.start_time}
                            </p>
                            <p>
                                <b>Arrival:</b> {bus.reach_time}
                            </p>
                            <p>
                                <b>Bus No:</b> {bus.number}
                            </p>
                        </div>

                        {/* LEGEND */}
                        <div>
                            <h3 className="font-semibold mb-2">
                                Seat Legend
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                    <FaChair className="text-green-600" />
                                    Available
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaChair className="text-red-600" />
                                    Booked
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaChair className="text-yellow-500" />
                                    Selected
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* SEATS */}
            <div className="bg-white rounded-xl shadow p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6">
                    Select Your Seat
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4">
                    {seats.map((seat) => {
                        const isSelected = selectedSeat === seat.id

                        return (
                            <button
                                key={seat.id}
                                disabled={seat.is_booked}
                                onClick={() => handleBook(seat.id)}
                                className={`p-3 sm:p-4 rounded-lg flex flex-col items-center justify-center transition
                                    ${
                                        seat.is_booked
                                            ? "bg-red-100 cursor-not-allowed"
                                            : isSelected
                                            ? "bg-yellow-100 ring-2 ring-yellow-400"
                                            : "bg-green-100 hover:bg-green-200"
                                    }
                                `}
                            >
                                <FaChair
                                    className={`text-xl sm:text-2xl ${
                                        seat.is_booked
                                            ? "text-red-600"
                                            : isSelected
                                            ? "text-yellow-600"
                                            : "text-green-600"
                                    }`}
                                />
                                <span className="mt-1 text-xs sm:text-sm font-medium">
                                    {seat.seat_number}
                                </span>
                            </button>
                        )
                    })}
                </div>
            </div>

            <button
                onClick={() => navigate("/my-bookings")}
                className="mt-6 w-full sm:w-auto px-6 py-3 sm:py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
                View Booking Details
            </button>
        </div>
    )
}

export default BusSeats
