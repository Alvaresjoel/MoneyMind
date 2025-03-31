"use client";

import React, { useState, useEffect } from "react";
import { Pie, Line } from "react-chartjs-2";
import { fetchUserPortfolio } from "@/lib/data"; // Replace with your API call
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import "chart.js/auto";

type MutualFund = {
  fund_id: string;
  fund_name: string;
  invested_amount: number;
  current_value: number;
  category: string;
  returns: number; // % returns
};

export default function Dashboard() {
  const [portfolio, setPortfolio] = useState<MutualFund[]>([]);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [chartData, setChartData] = useState<any>(null);
  const [pieData, setPieData] = useState<any>(null);

  useEffect(() => {
    async function loadPortfolio() {
      const userFunds = await fetchUserPortfolio(); // Fetch user's mutual fund data
      setPortfolio(userFunds);

      const totalInvested = userFunds.reduce((acc, fund) => acc + fund.invested_amount, 0);
      const totalCurrent = userFunds.reduce((acc, fund) => acc + fund.current_value, 0);
      const profitOrLoss = totalCurrent - totalInvested;

      setTotalInvestment(totalInvested);
      setCurrentValue(totalCurrent);
      setProfitLoss(profitOrLoss);

      // Line Chart Data (Simulated Growth)
      setChartData({
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        datasets: [
          {
            label: "Portfolio Growth (₹)",
            data: [totalInvested * 0.9, totalInvested * 1.1, totalInvested * 1.3, totalInvested * 1.4, totalInvested * 1.6, totalCurrent],
            borderColor: "#00A86D",
            backgroundColor: "rgba(0,168,109,0.2)",
            tension: 0.4,
          },
        ],
      });

      // Pie Chart (Category Allocation)
      const categories = [...new Set(userFunds.map((fund) => fund.category))];
      const categoryData = categories.map((cat) =>
        userFunds.filter((fund) => fund.category === cat).reduce((acc, fund) => acc + fund.current_value, 0)
      );

      setPieData({
        labels: categories,
        datasets: [
          {
            data: categoryData,
            backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4caf50", "#ff9800"],
          },
        ],
      });
    }
    loadPortfolio();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        <h1 className="text-3xl font-bold mb-6 text-[#123E2C]">Dashboard</h1>
        <hr className="border-[#00A86D] mb-6" />

        {/* Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-[#F8FAFC] rounded-lg shadow-md flex items-center">
            <AttachMoneyIcon className="text-green-600 text-4xl mr-4" />
            <div>
              <p className="text-gray-500">Total Investment</p>
              <h2 className="text-lg font-semibold">₹{totalInvestment.toLocaleString()}</h2>
            </div>
          </div>
          <div className="p-4 bg-[#F8FAFC] rounded-lg shadow-md flex items-center">
            <ShowChartIcon className="text-blue-600 text-4xl mr-4" />
            <div>
              <p className="text-gray-500">Current Value</p>
              <h2 className="text-lg font-semibold">₹{currentValue.toLocaleString()}</h2>
            </div>
          </div>
          <div className={`p-4 rounded-lg shadow-md flex items-center ${profitLoss >= 0 ? "bg-green-100" : "bg-red-100"}`}>
            {profitLoss >= 0 ? <TrendingUpIcon className="text-green-600 text-4xl mr-4" /> : <TrendingDownIcon className="text-red-600 text-4xl mr-4" />}
            <div>
              <p className="text-gray-500">Profit/Loss</p>
              <h2 className="text-lg font-semibold">{profitLoss >= 0 ? `+₹${profitLoss.toLocaleString()}` : `-₹${Math.abs(profitLoss).toLocaleString()}`}</h2>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-[#123E2C]">Portfolio Growth</h3>
            {chartData && <Line data={chartData} />}
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-lg font-semibold mb-4 text-[#123E2C]">Asset Allocation</h3>
            {pieData && <Pie data={pieData} />}
          </div>
        </div>

        {/* Holdings Table */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4 text-[#123E2C]">My Investments</h3>
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Fund Name</th>
                  <th className="p-2 border">Invested</th>
                  <th className="p-2 border">Current Value</th>
                  <th className="p-2 border">Returns</th>
                </tr>
              </thead>
              <tbody>
                {portfolio.map((fund) => (
                  <tr key={fund.fund_id} className="text-center">
                    <td className="p-2 border">{fund.fund_name}</td>
                    <td className="p-2 border">₹{fund.invested_amount.toLocaleString()}</td>
                    <td className="p-2 border">₹{fund.current_value.toLocaleString()}</td>
                    <td className="p-2 border">{fund.returns.toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
