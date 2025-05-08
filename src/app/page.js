"use client";

import Head from "next/head";
import { useEffect, useState } from "react";

export default function Home() {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDay, setSelectedDay] = useState();
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000),
  });
  const [timeLeft, setTimeLeft] = useState();
  const [currentTime, setCurrentTime] = useState(new Date());

  const years = Array.from({ length: 100 }, (_, i) => 1970 + i);

  const getDaysArray = (month, year) => {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDayOfMonth; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const daysArray = getDaysArray(currentMonth, currentYear);

  useEffect(() => {
    if (!range?.startDate || !range?.endDate) return;
    const end = new Date(range.endDate);
    const interval = setInterval(() => {
      const now = new Date();
      const diff = end.getTime() - now.getTime();
      if (diff <= 0) {
        clearInterval(interval);
        setTimeLeft(null);
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, [range]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleMonthChange = (e) => setCurrentMonth(Number(e.target.value));
  const handleYearChange = (e) => setCurrentYear(Number(e.target.value));

  const isInRange = (day) => {
    if (!range || !day) return false;
    const date = new Date(currentYear, currentMonth, day);
    return date >= new Date(range.startDate) && date <= new Date(range.endDate);
  };

  const start = new Date(range.startDate);
  const end = new Date(range.endDate);
  const diffDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <>
     
      <div className="px-4 sm:px-6 md:px-8 py-6 max-w-5xl mx-auto min-h-screen bg-gradient-to-br from-gray-600 to-blue-500">
        <style>
          {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }
          @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
          .animate-pulse { animation: pulse 2s infinite; }
          .animate-slideIn { animation: slideIn 0.6s ease-out; }
          .calendar-day:hover {
            transform: scale(1.1);
            transition: transform 0.2s ease;
          }
        `}
        </style>

        {/* Header with Current Time */}
        <div className="fixed top-0 left-0 w-full bg-white shadow text-center py-3 z-10 animate-slideIn">
          <h3 className="text-xs text-gray-600">Current Time</h3>
          <p className="text-xl font-bold text-gray-800 animate-pulse">
            {currentTime.toLocaleTimeString()}
          </p>
        </div>

        <div className="mt-20"></div>

        {/* Date Picker */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-fadeIn">
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={range.startDate.toISOString().split("T")[0]}
              onChange={(e) =>
                setRange((prev) => ({
                  ...prev,
                  startDate: new Date(e.target.value),
                }))
              }
              className="w-full rounded-md px-3 py-2 bg-white text-gray-800 shadow focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-white mb-1">
              End Date
            </label>
            <input
              type="date"
              value={range.endDate.toISOString().split("T")[0]}
              onChange={(e) =>
                setRange((prev) => ({
                  ...prev,
                  endDate: new Date(e.target.value),
                }))
              }
              className="w-full rounded-md px-3 py-2 bg-white text-gray-800 shadow focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Range Info */}
        <div className="bg-white text-gray-900 rounded-xl p-5 shadow mb-6 animate-fadeIn">
          <h2 className="text-lg sm:text-xl font-semibold mb-3 text-blue-700">
            Date Range Info
          </h2>
          <p>
            <strong>From:</strong> {start.toDateString()}
          </p>
          <p>
            <strong>To:</strong> {end.toDateString()}
          </p>
          <p>
            <strong>Total Days:</strong> {diffDays}
          </p>
          {timeLeft && (
            <div className="mt-4 text-sm font-mono bg-blue-50 p-3 rounded-lg shadow-inner animate-pulse">
              ⏳ Countdown: {timeLeft.days}d {timeLeft.hours}h{" "}
              {timeLeft.minutes}m {timeLeft.seconds}s
            </div>
          )}
        </div>

        {/* Calendar Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-4 animate-slideIn">
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border bg-white text-sm focus:ring-2 focus:ring-blue-400"
          >
            {monthNames.map((month, i) => (
              <option key={month} value={i}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="w-full sm:w-1/2 px-4 py-2 rounded-lg border bg-white text-sm focus:ring-2 focus:ring-blue-400"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center text-sm font-semibold text-white mb-2">
          {dayNames.map((day) => (
            <div key={day} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-2">
          {daysArray.map((day, i) => (
            <div
              key={i}
              className={`h-14 sm:h-16 flex items-center justify-center text-sm sm:text-base rounded-lg transition cursor-pointer calendar-day ${
                !day
                  ? ""
                  : isInRange(day)
                  ? "bg-blue-300 text-blue-900 font-semibold animate-fadeIn"
                  : selectedDay === day
                  ? "bg-blue-600 text-white font-semibold animate-pulse"
                  : "hover:bg-gray-100 text-gray-800 bg-white/80"
              }`}
              onClick={() => day && setSelectedDay(day)}
            >
              {day || ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
