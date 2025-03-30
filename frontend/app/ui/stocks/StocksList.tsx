"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AgGridReact } from "ag-grid-react";
import { fetchStocks, fetchMfsById } from "@/lib/data";
import Search from "./search";
import StockDetails from "./StockDetails";
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

const ITEMS_PER_PAGE = 10;
const NAVBAR_HEIGHT = "4rem";

export default function StocksList() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [Mfs, setMfs] = useState<Fund[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const getStocks = async (): Promise<void> => {
      const fetchedStocks = await fetchStocks();
      setStocks(fetchedStocks);
    };

    getStocks();
  }, []);

  const handleSearchChange = (query: string): void => {
    setSearchTerm(query);
  };

  const openDrawer = async (stock: Stock) => {
    setSelectedStock(stock);
    const mfs = await fetchMfsById(stock.stock_id);
    setMfs(mfs);
  };

  const closeDrawer = (): void => {
    setSelectedStock(null);
  };

  // **AG Grid Column Definitions**
  const columnDefs: ColDef<Stock>[] = [
    { field: "stock_name", headerName: "Stock Name", sortable: true, filter: true, flex: 2 },
    { field: "stock_symbol", headerName: "Symbol", sortable: true, filter: true, flex: 1 },
    { field: "sector", headerName: "Sector", sortable: true, filter: true, flex: 1 },
    { field: "market_cap", headerName: "Market Cap (₹ Cr)", sortable: true, filter: true, flex: 1 },
    { field: "current_price", headerName: "Price (₹)", sortable: true, filter: true, flex: 1 },
    { field: "exchange", headerName: "Exchange", sortable: true, flex: 1 },
  ];

  // **Filtered Data Based on Search**
  const filteredStocks = stocks.filter(({ stock_name }: Stock) =>
    stock_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        
        {/* Title */}
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
            onRowClicked={(event) => {
              if (event.data) {
                openDrawer(event.data);
              }
            }}
          />
        </div>
      </div>

      {/* Drawer for Stock Details */}
      <AnimatePresence>
        {selectedStock && (
          <motion.div
            initial={{ opacity: 0, x: 100, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            animate={{ opacity: 1, x: 0, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            exit={{ opacity: 0, x: 100, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 h-[calc(100%-4rem)] bg-[#123E2C] p-6 shadow-lg z-50 w-[43rem] border-l-2 border-[#00A86D] overflow-x-auto rounded-l-lg"
          >
            <div className="text-white">
              <h2 className="text-2xl font-bold border-4 border-[#00A86D] rounded-lg p-4 mb-4 text-center">
                {selectedStock.stock_name}
              </h2>

              <StockDetails stock={selectedStock} mfs={Mfs} />
              <div className="flex justify-center mt-4">
                <button className="bg-[#00A86D] hover:bg-[#008C5A] text-white font-bold py-2 px-4 rounded-lg" onClick={closeDrawer}>
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
