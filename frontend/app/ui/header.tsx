'use client';

import '@/app/globals.css'
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaChartLine, FaUniversity, FaLayerGroup } from 'react-icons/fa';
import { GrUserAdmin } from "react-icons/gr";
import { SiMoneygram } from "react-icons/si";
import Link from 'next/link';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  return (
  <header style={{ backgroundColor: '#38BDF8' }} className="p-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold">
          OverlapTracker
        </Link>
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            <FaBars className="w-6 h-6" />
          </button>
        </div>
        <div className='hidden lg:flex '>
              <Link href="/stocks" className="flex items-center space-x-2 text-black hover:opacity-25 mr-14 border-black border-2 rounded-lg p-2" onClick={closeMenu}>
                <FaChartLine className="w-6 h-6" />
                <span>STOCKS</span>
              </Link>
              <Link href="/mutual-funds" className="flex items-center space-x-2 text-black hover:opacity-25 mr-14 border-black border-2 rounded-lg p-2" onClick={closeMenu}>
                <FaUniversity className="w-6 h-6" />
                <span>MUTUAL FUNDS</span>
              </Link>
              <Link href="/indexes" className="flex items-center space-x-2 text-black hover:opacity-25 mr-14 border-black border-2 rounded-lg p-2" onClick={closeMenu}>
                <SiMoneygram className="w-6 h-6"  />
                <span>INDEX</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2 text-black hover:opacity-25 mr-14 border-black border-2 rounded-lg p-2" onClick={closeMenu}>
                <FaLayerGroup className="w-6 h-6" />
                <span>OVERLAP</span>
              </Link>
              <Link href="/admin" className="flex items-center space-x-2 text-black hover:opacity-25 border-black border-2 rounded-lg p-2" onClick={closeMenu}>
                <GrUserAdmin className="w-6 h-6"/>
                <span>ADMIN</span>
              </Link>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 mt-4 p-4 rounded-lg shadow-lg"
          >
            <nav className="space-y-2">
              <Link href="/admin" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <GrUserAdmin className="w-6 h-6"/>
                <span>ADMIN</span>
              </Link>
              <Link href="/stocks" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <FaChartLine className="w-6 h-6" />
                <span>STOCKS</span>
              </Link>
              <Link href="/mutual-funds" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <FaUniversity className="w-6 h-6" />
                <span>MUTUAL FUNDS</span>
              </Link>
              <Link href="/indexes" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <SiMoneygram className="w-6 h-6"  />
                <span>INDEX</span>
              </Link>
              <Link href="/" className="flex items-center space-x-2 text-blue-500 hover:text-blue-700" onClick={closeMenu}>
                <FaLayerGroup className="w-6 h-6" />
                <span>OVERLAP</span>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;