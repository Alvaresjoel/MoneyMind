"use client";

import React, { useEffect, useState } from "react";
import { fetchStksByIdx, fetchIndices } from "@/lib/data";
import { useParams } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";

type Index = {
  index_id: string;
  index_name: string;
  open: number;
  close: number;
  ltp: number;
  w_h: number;
  w_l: number;
};

type Stock = {
  stock_id: string;
  stock_symbol: string;
  stock_name: string;
  sector: string;
  market_cap: number;
  exchange: string;
  open: number;
  close: number;
};

export default function IndexDetails() {
  const { id } = useParams();
  const [selectedIndex, setSelectedIndex] = useState<Index | null>(null);
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allIndices: Index[] = await fetchIndices();
      const foundIndex = allIndices.find((index) => index.index_id === id);
      if (foundIndex) {
        setSelectedIndex(foundIndex);
        const fetchedStocks = await fetchStksByIdx(foundIndex.index_id);
        setStocks(fetchedStocks);
      }
    };
    fetchData();
  }, [id]);

  const stockColumns: ColDef<Stock>[] = [
    { field: "stock_symbol", headerName: "Symbol", sortable: true, filter: true, flex: 1 },
    { field: "stock_name", headerName: "Stock Name", sortable: true, filter: true, flex: 2 },
    { field: "sector", headerName: "Sector", sortable: true, filter: true, flex: 1 },
    { field: "market_cap", headerName: "Market Cap (₹ Cr)", sortable: true, flex: 1 },
    { field: "exchange", headerName: "Exchange", sortable: true, flex: 1 },
    { field: "open", headerName: "Open", sortable: true, filter: true, flex: 1 },
    { field: "close", headerName: "Close", sortable: true, filter: true, flex: 1 },
  ];

  if (!selectedIndex) return <div className="text-center text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen p-6 bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        
        <h1 className="text-3xl font-bold mb-4 text-[#123E2C]">{selectedIndex.index_name}</h1>
        <hr className="border-[#00A86D] mb-6" />

        {/* Index Info */}
        <div className="grid grid-cols-2 gap-4 text-lg text-gray-800 mb-6">
          <p><strong>Open:</strong> ₹{selectedIndex.open}</p>
          <p><strong>Close:</strong> ₹{selectedIndex.close}</p>
          <p><strong>LTP:</strong> ₹{selectedIndex.ltp}</p>
          <p><strong>52W High:</strong> ₹{selectedIndex.w_h}</p>
          <p><strong>52W Low:</strong> ₹{selectedIndex.w_l}</p>
        </div>

        {/* Stocks Table */}
        <div className="ag-theme-quartz w-full h-[500px] border border-[#D2E4D6] shadow-md rounded-lg">
          <AgGridReact
            rowData={stocks}
            columnDefs={stockColumns}
            pagination={true}
            paginationPageSize={10}
          />
        </div>
      </div>
    </div>
  );
}
