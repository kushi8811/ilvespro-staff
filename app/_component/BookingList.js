"use client";

import { useState, useEffect } from "react";
import { getBookingsByDate } from "../_lib/api";

const BookingList = ({ selectedDate }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const bookingsData = await getBookingsByDate(selectedDate);
        setBookings(bookingsData);
      } catch (err) {
        setError("An error occurred while fetching bookings.");
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      fetchBookings();
    }
  }, [selectedDate]);

  const handleDelete = async (id) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    setBookings(updatedBookings);
  };

  const handleEdit = (id) => {
    console.log(`Edit booking with ID: ${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-10 h-10"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="flex-col  p-4 container mx-auto">
      <h2 className="text-2xl text-center text-white font-semibold mb-4">
        Prenotazioni per {selectedDate}
      </h2>
      {bookings.length === 0 ? (
        <p className="text-center text-white ">
          No prenotazioni a questa data.
        </p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full table-auto shadow-md rounded-md bg-gray-800">
            <thead>
              <tr className="border-b bg-gray-800">
                <th className="px-4 py-2 text-left text-lg font-medium text-white">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-lg font-medium text-white">
                  Time
                </th>
                <th className="px-4 py-2 text-left text-lg font-medium text-white">
                  Guests
                </th>
                <th className="px-4 py-2 text-left text-lg font-medium text-white">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-lg font-medium text-white">
                  Phone
                </th>
                <th className="px-4 py-2 text-left text-lg font-medium text-white">
                  Special Request
                </th>
                <th className="px-4 py-2 text-left text-lg font-medium text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"
                  } hover:bg-gray-500 transition-all`}
                >
                  <td className="px-4 py-2 text-white">{booking.name}</td>
                  <td className="px-4 py-2 text-white">{booking.time}</td>
                  <td className="px-4 py-2 text-white">{booking.guests}</td>
                  <td className="px-4 py-2 text-white">{booking.email}</td>
                  <td className="px-4 py-2 text-white">{booking.phone}</td>
                  <td className="px-4 py-2 text-white">
                    {booking.specialRequest ? booking.specialRequest : "None"}
                  </td>
                  <td className="px-4 py-2 text-white">
                    <button
                      onClick={() => handleEdit(booking.id)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-all mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(booking.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BookingList;
