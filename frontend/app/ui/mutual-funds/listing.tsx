"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Search from "@/app/ui/stocks/search";
import StockDetails from "./MutualFundDrawer";
import { fetchFunds, fetchStksById } from "@/lib/data";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ColDef } from "ag-grid-community";

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

export default function Listing() {
  const [Funds, setFunds] = useState<Fund[]>([]);
  const [Stks, setStks] = useState<Stock[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>(Stks);

  useEffect(() => {
    const getFund = async (): Promise<void> => {
      const fetchedFunds = await fetchFunds();
      setFunds(fetchedFunds);
    };

    getFund();
  }, []);

  const handleSearchChange = (query: string): void => {
    setSearchTerm(query);
  };

  const openDrawer = async (fund: Fund) => {
    setSelectedFund(fund);
    const Stocks = await fetchStksById(fund.fund_id);
    setStks(Stocks);
    setFilteredStocks(Stocks);
  };

  const closeDrawer = (): void => {
    setSelectedFund(null);
  };

  const handleStockSearch = (query: string): void => {
    const filtered = Stks.filter((stock: Stock) =>
      stock.s_stock_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStocks(filtered);
  };

  const columnDefs: ColDef<Fund>[] = [
    { field: "fund_name", headerName: "Fund Name", sortable: true, filter: true, flex: 2 },
    { field: "fund_type", headerName: "Type", sortable: true, filter: true, flex: 1 },
    { field: "nav", headerName: "NAV (₹)", sortable: true, filter: true, flex: 1 },
    { field: "expense_ratio", headerName: "Expense Ratio (%)", sortable: true, filter: true, flex: 1 },
    { field: "total_assets", headerName: "AUM (₹ Cr)", sortable: true, filter: true, flex: 1 },
    { field: "manager_name", headerName: "Fund Manager", sortable: true, flex: 1 },
  ];

  const filteredFunds = Funds.filter(({ fund_name }: Fund) =>
    fund_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-6 bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-[#123E2C]">Mutual Funds</h1>
        <hr className="border-[#00A86D] mb-6" />

        {/* Search Bar */}
        <div className="flex justify-between items-center mb-4">
          <Search placeholder="Search Mutual Funds..." onSearch={handleSearchChange} />
        </div>

        {/* AG Grid Table */}
        <div className="ag-theme-quartz w-full h-[500px] border border-[#D2E4D6] shadow-md rounded-lg">
          <AgGridReact
            rowData={filteredFunds}
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
        {selectedFund && (
          <motion.div
            initial={{ opacity: 0, x: 100, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            animate={{ opacity: 1, x: 0, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            exit={{ opacity: 0, x: 100, top: `calc(${NAVBAR_HEIGHT} + 0px)` }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 h-[calc(100%-4rem)] bg-[#123E2C] p-6 shadow-lg z-50 w-[43rem] border-l-2 border-[#00A86D] overflow-x-auto rounded-l-lg"
          >
            <div className="text-white">
              <h2 className="text-2xl font-bold border-4 border-[#00A86D] rounded-lg p-4 mb-4 text-center">
                {selectedFund.fund_name}
              </h2>

              <StockDetails filteredStocks={filteredStocks} closeDrawer={closeDrawer} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
