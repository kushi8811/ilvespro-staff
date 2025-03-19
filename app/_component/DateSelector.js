import { useState, useEffect } from "react";

// You can create a function to get the current date in YYYY-MM-DD format
const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Adding 1 because getMonth() returns 0-indexed months
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const BookingDateSelector = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState(getCurrentDate()); // Default to today's date

  useEffect(() => {
    // Trigger data fetch immediately when the component mounts
    onDateChange(selectedDate);

    const intervalId = setInterval(() => {
      const newDate = getCurrentDate();
      setSelectedDate(newDate);
      onDateChange(newDate); // Update the date and fetch new data every day
    }, 24 * 60 * 60 * 1000); // Updates every 24 hours

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // Empty array ensures this effect runs only once

  const handleChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    onDateChange(newDate); // Fetch new data when user selects a date
  };

  return (
    <div>
      <input
        type="date"
        value={selectedDate}
        onChange={handleChange}
        className="border px-4 py-2 rounded-md m-3  text-white"
      />
    </div>
  );
};

export default BookingDateSelector;
