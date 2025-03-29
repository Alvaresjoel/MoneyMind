'use client';

import React from 'react';
import Link from 'next/link';
import { FaChartLine, FaChartPie, FaClipboardList, FaChartBar, FaCog, FaSignOutAlt} from 'react-icons/fa';

const Sidebar: React.FC = () => {
  return (
    <div className="h-screen w-64 bg-web1 shadow-lg p-6 fixed left-0 top-0 flex flex-col justify-between">

      {/* Logo / Brand */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-white">MoneyMind</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1">
        <SidebarLink href="/compare-funds" icon={<FaChartLine />} label="Compare Funds" /> {/* Stock market trend */}
        <SidebarLink href="/indexes" icon={<FaChartPie />} label="Index" /> {/* Pie chart for indices */}
        <SidebarLink href="/mutual-funds" icon={<FaClipboardList />} label="Mutual Fund" /> {/* List representation */}
        <SidebarLink href="/stocks" icon={<FaChartBar />} label="Stocks" /> {/* Stock performance */}
      </nav>

      {/* Settings & Logout */}
      <div>
        <SidebarLink href="/settings" icon={<FaCog />} label="Settings" />
        <SidebarLink href="/logout" icon={<FaSignOutAlt />} label="Sign Out" />
      </div>
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) => (
  <Link href={href} className="flex items-center space-x-3 p-3 text-white hover:bg-web2 rounded-lg transition">
    <span className="text-xl">{icon}</span>
    <span className="text-md">{label}</span>
  </Link>
);

export default Sidebar;
