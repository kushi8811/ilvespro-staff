"use client";
import React, { useState, useEffect } from "react";
import { getBookingsByDate } from "./../_lib/api"; // Adjust your API call accordingly
import dayjs from "dayjs";
import Link from "next/link";

const tables = [
  { id: 1, x: 10, y: 90, capacity: 4 },
  { id: 2, x: 10, y: 70, capacity: 4 },
  { id: 3, x: 10, y: 50, capacity: 4 },
  { id: 4, x: 15, y: 30, capacity: 5 },
  { id: 5, x: 10, y: 10, capacity: 4 },
  { id: 6, x: 70, y: 90, capacity: 4 },
  { id: 7, x: 40, y: 70, capacity: 2 },
  { id: 8, x: 60, y: 70, capacity: 2 },
  { id: 9, x: 50, y: 55, capacity: 2 },
  { id: 10, x: 50, y: 45, capacity: 2 },
  { id: 11, x: 40, y: 30, capacity: 2 },
  { id: 12, x: 60, y: 30, capacity: 2 },
  { id: 13, x: 60, y: 10, capacity: 4 },
  { id: 14, x: 90, y: 60, capacity: 4 },
  { id: 15, x: 90, y: 40, capacity: 4 },
  { id: 16, x: 85, y: 10, capacity: 4 },
];

const SeatingLayout = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [assignedBookings, setAssignedBookings] = useState({});
  const [isTableSelected, setIsTableSelected] = useState(false);

  useEffect(() => {
    const loadBookings = async () => {
      const today = dayjs().format("YYYY-MM-DD");
      console.log("Fetching bookings for:", today);
      const data = await getBookingsByDate(today);
      console.log("Booking fetched", data);
      setBookings(data);
    };
    loadBookings();
  }, []);

  const handleTableClick = (tableId) => {
    if (assignedBookings[tableId]) {
      setSelectedBooking(assignedBookings[tableId]);
      setSelectedTable(tableId);
      setIsTableSelected(false);
    } else {
      setSelectedTable(tableId);
      setIsTableSelected(true);
    }
  };

  const handleBookingClick = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    setSelectedBooking(booking);
  };

  const handleAssignBooking = () => {
    if (selectedTable && selectedBooking) {
      setAssignedBookings((prevAssignments) => ({
        ...prevAssignments,
        [selectedTable]: selectedBooking,
      }));
      setSelectedTable(null);
      setSelectedBooking(null);
      setIsTableSelected(false);
    }
  };

  const handleResetTable = () => {
    if (selectedTable) {
      setAssignedBookings((prevAssignments) => {
        const newAssignments = { ...prevAssignments };
        delete newAssignments[selectedTable];
        return newAssignments;
      });
      setSelectedTable(null);
      setSelectedBooking(null);
      setIsTableSelected(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedTable(null);
    setSelectedBooking(null);
  };

  return (
    <>
      <Link
        href="/"
        className="text-white mt-[45px] ml-6 border-2 rounded-md p-2 "
      >
        Indietro
      </Link>
      <h1 className="m-6 text-center text-2xl font-bold text-white">
        Prenotazioni Tavoli
      </h1>
      <div className="flex flex-col m-6 md:flex-row gap-10 justify-center items-start">
        {/* Booking List */}
        <div className=" md:w-1/3 bg-gray-100 w-[350px] p-4 rounded-md border">
          <h2 className="text-xl  font-bold mb-4 text-center">Prenotazioni</h2>
          {bookings.length === 0 ? (
            <p className="text-sm">Nessuna prenotazione</p>
          ) : (
            bookings.map((booking) => (
              <div
                key={booking.id}
                className={`p-2 mb-2 bg-gray-200 justify-center w-[150px] border rounded text-sm ${
                  selectedBooking && selectedBooking.id === booking.id
                    ? "bg-yellow-500"
                    : ""
                }`}
                onClick={() => handleBookingClick(booking.id)}
              >
                {booking.name} ({booking.guests} persone)
              </div>
            ))
          )}
        </div>

        {/* Tables Layout */}
        <div className="relative w-full md:w-2/3 h-[500px] bg-gray-500 border border-gray-500">
          {tables.map((table) => (
            <div
              key={table.id}
              className={`absolute flex items-center justify-center bg-blue-500 text-white font-bold rounded-md w-12 h-12 shadow-lg ${
                assignedBookings[table.id]
                  ? "bg-green-500"
                  : isTableSelected && selectedTable === table.id
                  ? "bg-yellow-500"
                  : ""
              }`}
              style={{
                left: `${table.x}%`,
                top: `${table.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              onClick={() => handleTableClick(table.id)}
            >
              {table.id} ({table.capacity})
            </div>
          ))}
        </div>
      </div>

      {/* Confirmation Modal */}
      {selectedTable && selectedBooking && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2">Assign Booking</h3>
            <p>
              Assign booking &quot;{selectedBooking.name}&quot; to Table{" "}
              {selectedTable}?
            </p>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleAssignBooking}
              >
                Confirm
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Show details of booking on table */}
      {selectedTable && assignedBookings[selectedTable] && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white p-4 rounded shadow-lg w-72"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-2">Booking Details</h3>
            <p>
              <strong>Name:</strong> {assignedBookings[selectedTable].name}
            </p>
            <p>
              <strong>Time:</strong> {assignedBookings[selectedTable].time}
            </p>
            <p>
              <strong>Guests:</strong> {assignedBookings[selectedTable].guests}
            </p>
            <p>
              <strong>Date:</strong> {assignedBookings[selectedTable].date}
            </p>
            <div className="mt-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded mr-2"
                onClick={handleResetTable}
              >
                Reset Table
              </button>
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={handleCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SeatingLayout;
