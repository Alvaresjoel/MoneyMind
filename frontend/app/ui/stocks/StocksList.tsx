'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Search from './search';
import Pagination from '../pagination';
import StockDetails from './StockDetails';
import { fetchMfsById, fetchStocks } from '@/lib/data';
import { defaultstocks } from '@/lib/defaultvals';
import { usePathname, useSearchParams } from 'next/navigation';

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

const ITEMS_PER_PAGE = 10;

const StocksList = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [stocks, setStocks] = useState<Stock[]>(defaultstocks);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [Mfs, setMfs] = useState<Fund[]>([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<'name' | 'market_cap'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Fetch stocks data on mount
  useEffect(() => {
    const getStocks = async () => {
      try {
        const fetchedStocks = await fetchStocks();
        setStocks(fetchedStocks);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };
    getStocks();
  }, []);

  // Sorting logic
  const sortedStocks = [...stocks].sort((a, b) => {
    const valueA = sortBy === 'name' ? a.stock_name.toLowerCase() : parseFloat(a.market_cap || '0');
    const valueB = sortBy === 'name' ? b.stock_name.toLowerCase() : parseFloat(b.market_cap || '0');

    if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
    if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Filtered and paginated stocks
  const filteredStocks = sortedStocks.filter(stock =>
    stock.stock_name.toLowerCase().includes(query.toLowerCase())
  );
  const totalPages = Math.ceil(filteredStocks.length / ITEMS_PER_PAGE);
  const displayedStocks = filteredStocks.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Event Handlers
  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as 'name' | 'market_cap');
  };

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleClick = async (stock: Stock) => {
    try {
      setSelectedStock(stock);
      const mfs = await fetchMfsById(stock.stock_id);
      setMfs(mfs);
    } catch (error) {
      console.error('Error fetching mutual funds:', error);
    }
  };

  const closeSidebar = () => {
    setSelectedStock(null);
  };

  // Render
  return (
    <div className="container relative max-w-4xl mx-auto p-8 bg-primary border border-[#38bdf8] shadow-lg">
      <h1 className="text-3xl font-bold mb-4 text-white">Stocks List</h1>
      <hr className="text-[#38bdf8]" />

      <div className="mt-4 flex flex-col items-center gap-4">
        {/* Search and Sorting */}
        <div className="flex items-center justify-between w-full mb-4">
          <Search placeholder="Search stocks..." onSearch={handleSearch} />
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={handleSortChange}
              className="bg-gray-800 text-white p-2 rounded-md"
            >
              <option value="name">Sort by Name</option>
              <option value="market_cap">Sort by Market Cap</option>
            </select>
            <button onClick={handleSortOrderChange} className="btn btn-primary p-2 rounded-md">
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Stocks List */}
        <div className="w-1/2 p-4 space-y-4">
          {displayedStocks.length > 0 ? (
            displayedStocks.map(stock => (
              <button
                key={stock.stock_id}
                className="btn btn-primary w-full"
                onClick={() => handleClick(stock)}
              >
                {stock.stock_name}
              </button>
            ))
          ) : (
            <div className="border border-[#38bdf8] p-4 rounded-lg shadow-sm text-white text-center">
              No stocks found
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-5 w-1/2 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {selectedStock && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className="p-2 border border-[#38bdf8] fixed right-0 top-16 h-[calc(100%-4rem)] bg-primary shadow-lg z-50 w-auto"
          >
            <div className="p-4 text-white">
              <h2 className="text-2xl font-bold text-center border border-[#38bdf8] rounded-lg p-2 mb-2">
                {selectedStock.stock_name}
              </h2>
              <StockDetails stock={selectedStock} mfs={Mfs} />
              <button className="btn btn-primary mt-4" onClick={closeSidebar}>
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StocksList;
