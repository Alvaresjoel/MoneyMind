"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AgGridReact } from "ag-grid-react";
import { fetchStocks } from "@/lib/data";
import Search from "@/components/search";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef } from "ag-grid-community";

type Stock = {
  stock_id: string;
  isin_id: string;
  stock_symbol: string;
  stock_name: string;
  sector: string;
  market_cap: string;
  current_price: number | null;
  exchange: string;
  index: string;
};

const ITEMS_PER_PAGE = 10;

export default function Stocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getStocks = async () => {
      const fetchedStocks = await fetchStocks();
      setStocks(fetchedStocks);
    };

    getStocks();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
  };

  // **Filtered Data Based on Search**
  const filteredStocks = stocks.filter(({ stock_name }) =>
    stock_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // **AG Grid Column Definitions**
  const columnDefs: ColDef<Stock>[] = [
    {
      field: "stock_name",
      headerName: "Stock Name",
      sortable: true,
      filter: true,
      flex: 2,
      cellRenderer: (params: { value: string; data: Stock }) => {
        return (
          <a
            href={`/stocks/${params.data.stock_id}`}
            className="text-[#00A86D] hover:underline cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/stocks/${params.data.stock_id}`);
            }}
          >
            {params.value}
          </a>
        );
      },
    },
    { field: "stock_symbol", headerName: "Symbol", sortable: true, filter: true, flex: 1 },
    { field: "sector", headerName: "Sector", sortable: true, filter: true, flex: 1 },
    { field: "market_cap", headerName: "Market Cap (₹ Cr)", sortable: true, filter: true, flex: 1 },
    { field: "current_price", headerName: "Price (₹)", sortable: true, filter: true, flex: 1 },
    { field: "exchange", headerName: "Exchange", sortable: true, flex: 1 },
  ];

  return (
    <div className="min-h-screen bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        <h1 className="text-3xl font-bold mb-4 text-[#123E2C]">Stock List</h1>
        <hr className="border-[#00A86D] mb-6" />

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <Search placeholder="Search Stocks..." onSearch={handleSearchChange} />
        </div>

        {/* AG Grid Table */}
        <div className="ag-theme-quartz w-full h-[500px] border border-[#D2E4D6] shadow-md rounded-lg">
          <AgGridReact
            rowData={filteredStocks}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={ITEMS_PER_PAGE}
            rowSelection="single"
            rowClass="hover:bg-[#D2E4D6] transition-all"
          />
        </div>
      </div>
    </div>
  );
}
