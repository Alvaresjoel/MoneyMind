"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import { fetchMfsById, fetchStksById } from "@/lib/data";
import BusinessIcon from "@mui/icons-material/Business";
import CategoryIcon from "@mui/icons-material/Category";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";

type Stock = {
  stock_id: string;
  isin_id: string;
  stock_symbol: string;
  stock_name: string;
  sector: string;
  market_cap: string | null;
  current_price: number | null;
  exchange: string;
  index: string;
};

type Fund = {
  fund_id: string;
  fund_name: string;
  amc_id: string;
  fund_type: string;
  total_assets: number | null;
  nav: number | null;
  expense_ratio: number | null;
  manager_name: string | null;
  is_active: boolean;
};

export default function StockPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [stock, setStock] = useState<Stock | null>(null);
  const [mfs, setMfs] = useState<Fund[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStockDetails = async () => {
      const stockData = await fetchStksById(params.id);
      const mutualFunds = await fetchMfsById(params.id);
      setStock(stockData);
      setMfs(mutualFunds);
      setLoading(false);
    };

    getStockDetails();
  }, [params.id]);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  if (!stock) {
    return <div className="text-center mt-10 text-xl">Stock not found.</div>;
  }

  const colDefs: ColDef[] = [
    { field: "fund_name", headerName: "Mutual Fund Name", flex: 2, sortable: true, filter: true },
    { field: "fund_type", headerName: "Fund Type", flex: 1, sortable: true, filter: true },
    { field: "nav", headerName: "NAV (₹)", flex: 1, sortable: true, filter: true },
    { field: "total_assets", headerName: "Total Assets (Cr)", flex: 1, sortable: true, filter: true },
  ];

  return (
    <div className="min-h-screen bg-[#EAFEF3] p-8">
      <div className="container max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        {/* Stock Title */}
        <h1 className="text-3xl font-bold mb-4 text-[#123E2C] text-center">
          {stock.stock_name}
        </h1>
        <hr className="border-[#00A86D] mb-6" />

        {/* Stock Details */}
        <div className="mb-8 flex flex-wrap justify-center gap-6">
          <div className="bg-neutral hover:bg-gray-600 shadow-md rounded-lg p-4 flex items-center space-x-3">
            <BusinessIcon className="text-red-500 text-2xl" />
            <p className="text-lg">
              <strong className="text-red-500">Symbol:</strong> {stock.stock_symbol}
            </p>
          </div>
          <div className="bg-neutral hover:bg-gray-600 shadow-md rounded-lg p-4 flex items-center space-x-3">
            <CategoryIcon className="text-blue-500 text-2xl" />
            <p className="text-lg">
              <strong className="text-blue-500">Sector:</strong> {stock.sector}
            </p>
          </div>
          <div className="bg-neutral hover:bg-gray-600 shadow-md rounded-lg p-4 flex items-center space-x-3">
            <AttachMoneyIcon className="text-green-500 text-2xl" />
            <p className="text-lg">
              <strong className="text-green-500">Market Cap:</strong> ₹{stock.market_cap}
            </p>
          </div>
        </div>

        {/* Mutual Fund Investments Table */}
        <h2 className="text-2xl font-semibold mb-4 text-[#123E2C]">Mutual Funds Investing in {stock.stock_name}</h2>
        <div className="ag-theme-quartz w-full h-[400px] border border-[#D2E4D6] shadow-md rounded-lg">
          {mfs.length > 0 ? (
            <AgGridReact
              rowData={mfs}
              columnDefs={colDefs}
              pagination={true}
              paginationPageSize={10}
              rowHeight={40}
              headerHeight={50}
              overlayNoRowsTemplate="<span class='text-gray-500'>No mutual funds found</span>"
            />
          ) : (
            <div className="text-gray-500 text-center mt-4">
              No mutual funds investing in this stock
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
