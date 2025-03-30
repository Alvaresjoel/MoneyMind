"use client";

import React, { useState, useMemo, useEffect } from "react";
import { fetchIndices, fetchStksByIdx } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import IndexDetails from "./indexdetails";
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
  index_cat: string;
  is_active: boolean;
};

type Stocks = {
  stock_id: string;
  isin_id: string;
  stock_symbol: string;
  stock_name: string;
  sector: string;
  market_cap: number;
  exchange: string;
  open: number;
  close: number;
  w_h: number;
  w_l: number;
};

export default function Indices() {
  const [indices, setIndices] = useState<Index[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<Index | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [Stks, setStks] = useState<Stocks[] | null>(null);

  useEffect(() => {
    const getIndex = async (): Promise<void> => {
      const fetchedIndices = await fetchIndices();
      setIndices(fetchedIndices);

      if (fetchedIndices.length > 0) {
        setSelectedCategory(fetchedIndices[0].index_cat);
      }
    };
    getIndex();
  }, []);

  const handleClick = async (index: Index) => {
    setSelectedIndex(index);
    const stks: Stocks[] = await fetchStksByIdx(index.index_id);
    setStks(stks);
  };

  const closeDrawer = () => {
    setSelectedIndex(null);
  };

  const filteredIndices = useMemo(() => {
    return selectedCategory
      ? indices.filter((index) => index.index_cat === selectedCategory)
      : indices;
  }, [selectedCategory, indices]);

  // **AG Grid Column Definitions**
  const columnDefs: ColDef<Index>[] = [
    { field: "index_name", headerName: "Index Name", sortable: true, filter: true, flex: 2 },
    { field: "open", headerName: "Open", sortable: true, filter: true, flex: 1 },
    { field: "close", headerName: "Close", sortable: true, filter: true, flex: 1 },
    { field: "ltp", headerName: "LTP", sortable: true, filter: true, flex: 1 },
    { field: "w_h", headerName: "52W High", sortable: true, filter: true, flex: 1 },
    { field: "w_l", headerName: "52W Low", sortable: true, filter: true, flex: 1 },
  ];

  return (
    <div className="min-h-screen p-6 bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-[#123E2C]">Indices</h1>
        <hr className="border-[#00A86D] mb-6" />

        {/* Category Selection */}
        <div className="mb-4 flex items-center">
          <label htmlFor="category" className="text-sm font-medium text-gray-700 mr-2">
            Select Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none bg-[#2c3749] text-white text-sm py-2 px-4 pr-8 rounded focus:outline-none focus:ring-2 focus:ring-[#3498db] cursor-pointer"
          >
            {[...new Set(indices.map((index) => index.index_cat))].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* AG Grid Table */}
        <div className="ag-theme-quartz w-full h-[500px] border border-[#D2E4D6] shadow-md rounded-lg">
          <AgGridReact
            rowData={filteredIndices}
            columnDefs={columnDefs}
            pagination={true}
            paginationPageSize={10}
            rowSelection="single"
            rowClass="hover:bg-[#D2E4D6] transition-all"
            onRowClicked={(event) => {
              if (event.data) {
                handleClick(event.data);
              }
            }}
          />
        </div>
      </div>

      {/* Drawer for Index Details */}
      <AnimatePresence>
        {selectedIndex && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed right-0 top-0 h-full bg-[#123E2C] p-6 shadow-lg z-50 w-[43rem] border-l-2 border-[#00A86D] overflow-x-auto rounded-l-lg"
          >
            <div className="text-white">
              <h2 className="text-2xl font-bold border-4 border-[#00A86D] rounded-lg p-4 mb-4 text-center">
                {selectedIndex.index_name}
              </h2>

              <IndexDetails selectedIndex={selectedIndex} Stks={Stks} closeDrawer={closeDrawer} />
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
