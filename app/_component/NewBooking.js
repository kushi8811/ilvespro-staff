"use client";
import { useEffect, useState } from "react";
import { getNewBookings } from "../_lib/api";
import { FaBell } from "react-icons/fa";

const NewBooking = () => {
  const [booking, setBooking] = useState([]);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const fetchNewBookings = async () => {
      try {
        const newBooking = await getNewBookings();
        setBooking(newBooking);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNewBookings();
  }, []);

  const handleDeleteNotification = (id) => {
    setBooking((prevBookings) => prevBookings.filter((b) => b.id !== id));
    const deletedBookings =
      JSON.parse(localStorage.getItem("deletedBookings")) || [];
    if (!deletedBookings.includes(id)) {
      deletedBookings.push(id);
      localStorage.setItem("deletedBookings", JSON.stringify(deletedBookings));
    }
  };

  const filteredBookings = booking.filter((b) => {
    const deletedBookings =
      JSON.parse(localStorage.getItem("deletedBookings")) || [];
    return !deletedBookings.includes(b.id);
  });

  const handleNotificationClick = () => {
    setShowPanel(!showPanel);
  };

  return (
    <div>
      <button
        onClick={handleNotificationClick}
        className="fixed top-5 right-5 z-50 p-3 bg-blue-500 text-white rounded-full cursor-pointer shadow-md hover:bg-blue-600"
      >
        <div className="relative">
          <FaBell className="text-xl" />
          {filteredBookings.length > 0 && (
            <span className="absolute top-5 right-5 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {filteredBookings.length}
            </span>
          )}
        </div>
      </button>

      {showPanel && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowPanel(false)}
        />
      )}

      {showPanel && (
        <div className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
          <div className="flex justify-between items-center p-4 bg-blue-500 text-white">
            <h3 className="text-lg font-semibold">New Bookings</h3>
            <button
              onClick={() => setShowPanel(false)}
              className="text-white text-xl font-semibold"
            >
              ✖
            </button>
          </div>
          <div className="p-4 space-y-4">
            {filteredBookings.length === 0 ? (
              <p>No new bookings</p>
            ) : (
              filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="p-4 bg-blue-500 text-white rounded-lg shadow-md"
                >
                  <p className="font-semibold">{b.name}</p>
                  <p className="text-sm">
                    {b.date} at {b.time}
                  </p>
                  <p className="text-xs">Guests: {b.guests}</p>
                  <p className="text-xs">Email: {b.email}</p>
                  <p className="text-xs">Phone: {b.phone}</p>
                  <p className="text-xs">
                    Special Request: {b.specialRequest || "None"}
                  </p>
                  <button
                    onClick={() => handleDeleteNotification(b.id)}
                    className="text-red-500 border-1 rounded-md text-sm mt-2 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NewBooking;
