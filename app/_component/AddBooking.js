import { useState } from "react";
import { addBooking } from "../_lib/api"; // Import the addBooking function

const AddBooking = () => {
  const [showForm, setShowForm] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: "",
    date: "",
    time: "",
    guests: 1,
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails({ ...bookingDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, date, time, guests, phone } = bookingDetails;

    if (!name || !date || !time || !guests) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      const { data, error } = await addBooking(bookingDetails); // Call the addBooking function

      if (error) throw error;

      alert("Booking added successfully!");
      setShowForm(false); // Close form after submission
      setBookingDetails({
        name: "",
        date: "",
        time: "",
        guests: 1,
        phone: "",
      }); // Reset form
    } catch (error) {
      console.error("Error adding booking:", error);
      alert("Failed to add booking.");
    }
  };

  return (
    <div className="relative  dark">
      {/* Button to show form */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="border px-4 py-2 rounded-md m-5  text-white"
      >
        Add Booking
      </button>

      {/* Booking Form */}
      {showForm && (
        <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 mt-16 mx-auto">
          <h2 className="text-2xl font-bold text-gray-200 mb-4">New Booking</h2>

          <form className="flex flex-col" onSubmit={handleSubmit}>
            {/* Customer Name */}
            <input
              type="text"
              name="name"
              value={bookingDetails.name}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Customer Name"
            />

            {/* Date */}
            <input
              type="date"
              name="date"
              value={bookingDetails.date}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />

            {/* Time */}
            <input
              type="time"
              name="time"
              value={bookingDetails.time}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            />

            {/* Number of Guests */}
            <input
              type="number"
              name="guests"
              value={bookingDetails.guests}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              min="1"
              placeholder="Number of Guests"
            />

            {/* Phone (Optional) */}
            <input
              type="text"
              name="phone"
              value={bookingDetails.phone}
              onChange={handleInputChange}
              className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
              placeholder="Phone (Optional)"
            />

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            >
              Add Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddBooking;
