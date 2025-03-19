import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { getGuestStats } from "./../_lib/api"; // Adjust the path based on your project structure

const Dashboard = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getGuestStats();

        if (!data || !data.length) {
          throw new Error("No data available");
        }

        // Process data for the chart (group by 4 weeks of the month)
        const bookingsPerWeek = processBookingsData(data);
        setChartData(bookingsPerWeek);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const processBookingsData = (data) => {
    const weeks = [
      { name: "Week 1", totalGuests: 0 },
      { name: "Week 2", totalGuests: 0 },
      { name: "Week 3", totalGuests: 0 },
      { name: "Week 4", totalGuests: 0 },
    ];

    data.forEach((booking) => {
      const date = new Date(booking.date);
      const weekIndex = getWeekOfMonth(date) - 1; // Convert to 0-based index

      if (weekIndex >= 0 && weekIndex < 4) {
        weeks[weekIndex].totalGuests += 1;
      }
    });

    return weeks.map((week) => ({
      name: week.name,
      guests: week.totalGuests,
    }));
  };

  const getWeekOfMonth = (date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return Math.ceil((date.getDate() + firstDay.getDay()) / 7);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!chartData.length) {
    return <div>No data available</div>;
  }

  return (
    <div className="dashboard  mt-[150px]">
      <h2 className="text-white text-center text-2xl m-5">
        Weekly Guest Stats
      </h2>
      <div className="chart-container w-[50%] h-[50%]">
        <BarChart width={800} height={400} data={chartData}>
          <Bar dataKey="guests" fill="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
        </BarChart>
      </div>
    </div>
  );
};

export default Dashboard;
