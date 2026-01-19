import React, { useState, useEffect } from 'react'
import api from "../api/axios"
import { useNavigate } from 'react-router-dom'
import { FaBusAlt, FaSearch, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import { MdClear } from "react-icons/md"

const BusList = ({ token }) => {
    const [buses, setBuses] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterOrigin, setFilterOrigin] = useState('')
    const [filterDestination, setFilterDestination] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        const fetchBuses = async () => {
            try {
                const response = await api.get("/api/buses/")
                setBuses(response.data)
            } catch (error) {
                setError('Failed to load buses. Please try again later.')
            } finally {
                setIsLoading(false)
            }
        }
        fetchBuses()
    }, [])

    const handleViewSeats = (id) => {
        navigate(`/bus/${id}`)
    }

    const filteredBuses = buses.filter(bus => {
        const matchesSearch =
            bus.bus_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            bus.number.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesOrigin = filterOrigin ? bus.origin.toLowerCase() === filterOrigin.toLowerCase() : true
        const matchesDestination = filterDestination ? bus.destination.toLowerCase() === filterDestination.toLowerCase() : true
        return matchesSearch && matchesOrigin && matchesDestination
    })

    const uniqueOrigins = [...new Set(buses.map(bus => bus.origin))]
    const uniqueDestinations = [...new Set(buses.map(bus => bus.destination))]

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="max-w-4xl mx-auto mt-6">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <FaBusAlt className="text-indigo-600" />
                Available Buses
            </h1>

            {/* Filters */}
            <div className="bg-white p-5 rounded-xl shadow-md mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    
                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1 flex items-center gap-2">
                            <FaSearch /> Search
                        </label>
                        <input
                            type="text"
                            placeholder="Bus name or number"
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1">From</label>
                        <select
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            value={filterOrigin}
                            onChange={(e) => setFilterOrigin(e.target.value)}
                        >
                            <option value="">All Origins</option>
                            {uniqueOrigins.map(origin => (
                                <option key={origin} value={origin}>{origin}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-600 mb-1">To</label>
                        <select
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500"
                            value={filterDestination}
                            onChange={(e) => setFilterDestination(e.target.value)}
                        >
                            <option value="">All Destinations</option>
                            {uniqueDestinations.map(destination => (
                                <option key={destination} value={destination}>{destination}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex items-end">
                        <button
                            onClick={() => {
                                setSearchTerm('')
                                setFilterOrigin('')
                                setFilterDestination('')
                            }}
                            className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 font-semibold py-2 rounded"
                        >
                            <MdClear />
                            Clear
                        </button>
                    </div>
                </div>
            </div>

            {/* Bus Cards */}
            {filteredBuses.length === 0 ? (
                <p className="text-center text-gray-500">No buses found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredBuses.map(bus => (
                        <div
                            key={bus.id}
                            className="bg-white rounded-xl shadow hover:shadow-lg transition"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-bold">{bus.bus_name}</h2>
                                        <p className="text-gray-500 text-sm">Bus No: {bus.number}</p>
                                    </div>
                                    <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                                        Available
                                    </span>
                                </div>

                                <div className="mt-4 space-y-2 text-gray-600 text-sm">
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-indigo-500" />
                                        {bus.origin} → {bus.destination}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-indigo-500" />
                                        Depart: {bus.start_time}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-indigo-500" />
                                        Arrive: {bus.reach_time}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleViewSeats(bus.id)}
                                    className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
                                >
                                    View Seats & Book
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default BusList
