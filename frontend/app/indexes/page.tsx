"use client";

import React, { useState, useEffect, useMemo } from "react";
import { fetchIndices } from "@/lib/data";
import { useRouter } from "next/navigation";
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

export default function Indices() {
  const [indices, setIndices] = useState<Index[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getIndices = async (): Promise<void> => {
      const fetchedIndices = await fetchIndices();
      setIndices(fetchedIndices);
      if (fetchedIndices.length > 0) {
        setSelectedCategory(fetchedIndices[0].index_cat);
      }
    };
    getIndices();
  }, []);

  const filteredIndices = useMemo(() => {
    return selectedCategory
      ? indices.filter((index) => index.index_cat === selectedCategory)
      : indices;
  }, [selectedCategory, indices]);

  const columnDefs: ColDef<Index>[] = [
    {
      field: "index_name",
      headerName: "Index Name",
      sortable: true,
      filter: true,
      flex: 2,
      cellRenderer: (params: { value: string; data: Index }) => {
        return (
          <a
            href={`/indexes/${params.data.index_id}`}
            className="text-[#00A86D] hover:underline cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/indexes/${params.data.index_id}`);
            }}
          >
            {params.value}
          </a>
        );
      },
    },
    { field: "open", headerName: "Open", sortable: true, filter: true, flex: 1 },
    { field: "close", headerName: "Close", sortable: true, filter: true, flex: 1 },
    { field: "ltp", headerName: "LTP", sortable: true, filter: true, flex: 1 },
    { field: "w_h", headerName: "52W High", sortable: true, filter: true, flex: 1 },
    { field: "w_l", headerName: "52W Low", sortable: true, filter: true, flex: 1 },
  ];

  return (
    <div className="min-h-screen p-6 bg-[#EAFEF3]">
      <div className="container max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-lg border border-[#D2E4D6]">
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
            className="bg-[#2c3749] text-white text-sm py-2 px-4 rounded cursor-pointer"
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
            rowClass="hover:bg-[#D2E4D6] transition-all cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
