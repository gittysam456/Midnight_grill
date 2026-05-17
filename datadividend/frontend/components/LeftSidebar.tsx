"use client";

import { LayoutDashboard, Shield, Database, Coins, Terminal, Settings, Store } from "lucide-react";
import { motion } from "framer-motion";

interface LeftSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, color: "text-blue-400" },
  { id: "vault", label: "Data Vault", icon: Shield, color: "text-emerald-400" },
  { id: "queries", label: "Queries", icon: Database, color: "text-purple-400" },
  { id: "earnings", label: "Earnings", icon: Coins, color: "text-yellow-400" },
  { id: "activity", label: "Activity", icon: Terminal, color: "text-pink-400" },
  { id: "buyer", label: "Buyer Market", icon: Store, color: "text-rose-400" },
  { id: "settings", label: "Settings", icon: Settings, color: "text-gray-400" },
];

export default function LeftSidebar({ activeTab, setActiveTab }: LeftSidebarProps) {
  return (
    <aside className="w-64 bg-[#21212b] border-r-4 border-[#16161d] hidden md:flex flex-col fixed h-[calc(100vh-4rem)]">
      <div className="p-4 flex flex-col gap-2 font-['var(--font-vt323)'] text-xl mt-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 border-2 transition-all relative
                ${isActive 
                  ? `bg-[#2b2b36] border-black text-white shadow-[2px_2px_0px_rgba(0,0,0,1)] translate-x-1` 
                  : `border-transparent text-gray-400 hover:bg-[#262631] hover:text-gray-200`
                }`}
            >
              <Icon size={20} className={`${isActive ? item.color : 'text-gray-500'}`} />
              <span className="uppercase tracking-wide drop-shadow-[1px_1px_0_rgba(0,0,0,0.5)]">{item.label}</span>
              
              {item.id === "buyer" && (
                <span className="absolute right-2 top-2 px-1.5 py-0.5 bg-rose-500 text-white text-[10px] border border-black shadow-[1px_1px_0_#000]">BETA</span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto p-6 text-center">
        <div className="w-full bg-[#16161d] border-2 border-black p-4 shadow-[inset_2px_2px_0px_rgba(0,0,0,0.5)]">
          <div className="text-pink-400 font-['var(--font-vt323)'] text-lg uppercase mb-1 drop-shadow-[1px_1px_0_#000]">Node Status</div>
          <div className="flex justify-center items-center gap-2 text-emerald-400 text-sm font-['var(--font-vt323)'] uppercase">
             <span className="w-2 h-2 bg-emerald-400 border border-black shadow-[1px_1px_0_#000]"></span> Syncing
          </div>
        </div>
      </div>
    </aside>
  );
}
