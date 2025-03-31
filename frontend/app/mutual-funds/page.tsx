"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Search from "@/components/search";
import { fetchFunds } from "@/lib/data";
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import { ColDef } from "ag-grid-community";

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

export default function Listing() {
  const [Funds, setFunds] = useState<Fund[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getFunds = async () => {
      const fetchedFunds = await fetchFunds();
      setFunds(fetchedFunds);
    };

    getFunds();
  }, []);

  const handleSearchChange = (query: string) => {
    setSearchTerm(query);
  };

  const columnDefs: ColDef<Fund>[] = [
    {
      field: "fund_name",
      headerName: "Fund Name",
      sortable: true,
      filter: true,
      flex: 2,
      cellRenderer: (params: { data: Fund; value: string }) => {
        return (
          <a
            href={`/mutual-funds/${params.data.fund_id}`}
            className="text-[#00A86D] hover:underline cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              router.push(`/mutual-funds/${params.data.fund_id}`);
            }}
          >
            {params.value}
          </a>
        );
      },
    },
    { field: "fund_type", headerName: "Type", sortable: true, filter: true, flex: 1 },
    { field: "nav", headerName: "NAV (₹)", sortable: true, filter: true, flex: 1 },
    { field: "expense_ratio", headerName: "Expense Ratio (%)", sortable: true, filter: true, flex: 1 },
    { field: "total_assets", headerName: "AUM (₹ Cr)", sortable: true, filter: true, flex: 1 },
    { field: "manager_name", headerName: "Fund Manager", sortable: true, flex: 1 },
  ];

  const filteredFunds = Funds.filter(({ fund_name }) =>
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
                router.push(`/mutualfund/${event.data.fund_id}`);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
