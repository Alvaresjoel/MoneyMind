"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { fetchMfsById, fetchFunds } from "@/lib/data";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";
import Search from "@/components/search";

type Stock = {
  f_shares_held: number;
  f_holding_percentage: number;
  s_stock_id: string;
  s_stock_name: string;
  s_market_cap: number;
  s_close: number;
};

type Fund = {
  fund_id: string;
  fund_name: string;
  fund_type: string;
  total_assets: number | null;
  nav: number | null;
  expense_ratio: number | null;
  manager_name: string | null;
};

export default function FundDetails() {
  const { id } = useParams();
  console.log("Fund ID:", id); // Debugging line to check the fund ID
  const [fund, setFund] = useState<Fund | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const getFundDetails = async () => {
      const fetchedFunds = await fetchFunds();
      const selectedFund = fetchedFunds.find((fund: Fund) => fund.fund_id === id);
      if (selectedFund) setFund(selectedFund);

      if (typeof id === "string") {
        const fetchedStocks = await fetchMfsById(id);
        setStocks(fetchedStocks);
      }
    };

    getFundDetails();
  }, [id]);

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
  };

  const filteredStocks = stocks.filter(({ s_stock_name }) =>
    s_stock_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columnDefs: ColDef<Stock>[] = [
    { field: "s_stock_name", headerName: "Stock Name", sortable: true, filter: true, flex: 2 },
    { field: "s_market_cap", headerName: "Market Cap (₹ Cr)", sortable: true, filter: true, flex: 1 },
    { field: "s_close", headerName: "Close Price (₹)", sortable: true, filter: true, flex: 1 },
    { field: "f_shares_held", headerName: "Shares Held", sortable: true, filter: true, flex: 1 },
    { field: "f_holding_percentage", headerName: "Holding (%)", sortable: true, filter: true, flex: 1 },
  ];

  return (
    <div className="min-h-screen p-6 bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        
        {/* Fund Details */}
        {fund && (
          <>
            <h1 className="text-3xl font-bold mb-4 text-[#123E2C]">{fund.fund_name}</h1>
            <p><strong>Type:</strong> {fund.fund_type}</p>
            <p><strong>Assets Under Management (AUM):</strong> ₹{fund.total_assets} Cr</p>
            <p><strong>Net Asset Value (NAV):</strong> ₹{fund.nav}</p>
            <p><strong>Expense Ratio:</strong> {fund.expense_ratio}%</p>
            <p><strong>Fund Manager:</strong> {fund.manager_name}</p>
            <hr className="border-[#00A86D] my-6" />
          </>
        )}

        {/* Search Bar for Stocks */}
        <Search placeholder="Search Stocks..." onSearch={handleSearchChange} />

        {/* Stocks Table */}
        <div className="ag-theme-quartz w-full h-[500px] border border-[#D2E4D6] shadow-md rounded-lg mt-4">
          <AgGridReact
            rowData={filteredStocks}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            rowSelection="single"
          />
        </div>
      </div>
    </div>
  );
}
