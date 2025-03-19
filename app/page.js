"use client";
import { useState } from "react";
import DateSelector from "./_component/DateSelector";
import BookingList from "./_component/BookingList";
import NewBooking from "./_component/NewBooking";
import AddBooking from "./_component/AddBooking";
import Dashboard from "./_component/Dashboard";
import { isAuthenticated, login, logout } from "./utils/auth";
import { Playfair_Display } from "next/font/google";
import Image from "next/image";
import logo from "@/public/images/logo2.png";
import Link from "next/link";

const eagle = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});
const BookingsPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [loggedIn, setLoggedIn] = useState(isAuthenticated());
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (login(credentials.username, credentials.password)) {
      setLoggedIn(true);
    } else {
      alert("Invalid credentials!");
    }
    setCredentials(null);
  };

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
  };

  if (!loggedIn) {
    // Show login form if not authenticated
    return (
      <>
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={150}
          className="mx-auto"
        />
        <h1
          className={`${eagle.className} mb-2 text-2xl text-white text-center`}
        >
          Il Vespro - staff
        </h1>
        <div className="login mt-[10px] flex flex-col items-center justify-center  bg-[#203354]">
          <form
            onSubmit={handleLogin}
            className="p-6 mt-2 bg-white shadow-md rounded-md w-80"
          >
            <h2 className="text-xl font-bold mb-4 text-center">Staff Login</h2>
            <input
              type="text"
              placeholder="Username"
              className="p-2 border rounded w-full mb-2"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="p-2 border rounded w-full mb-4"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
            />
            <button
              type="submit"
              className="p-2 bg-blue-500 text-white rounded w-full"
            >
              Login
            </button>
          </form>
        </div>
      </>
    );
  }

  return (
    <div>
      <button
        onClick={handleLogout}
        className="relative top-5 left-5 z-50 p-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>

      <h1 className="text-center text-xl font-extrabold text-white ">
        Prenotazioni - Il Vespro (STAFF)
      </h1>

      <DateSelector onDateChange={handleDateChange} className="m-3" />
      <AddBooking className="m-5" />
      <Link
        href="/tables"
        className="border px-4 py-2 rounded-md m-5 bt-2 text-white"
      >
        Tavoli{" "}
      </Link>
      <NewBooking />

      {selectedDate && <BookingList selectedDate={selectedDate} />}
      <Dashboard className="mt-4" />
    </div>
  );
};

export default BookingsPage;
