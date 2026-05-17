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
    <aside className="w-64 bg-[#2D2834]/60 backdrop-blur-md border-r border-[#3E3648] hidden md:flex flex-col fixed h-[calc(100vh-4rem)] shadow-[4px_0_24px_rgba(0,0,0,0.1)]">
      <div className="p-4 flex flex-col gap-2 font-['var(--font-space-mono)'] text-sm mt-4">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative overflow-hidden group
                ${isActive 
                  ? `bg-[#23202C]/60 text-[#F5EFE8] border border-[#52485D] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]` 
                  : `border border-transparent text-[#B9B0C7] hover:bg-[#23202C]/40 hover:text-[#F5EFE8]`
                }`}
            >
              {isActive && <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#47E5BC] rounded-r-md shadow-[0_0_8px_#47E5BC]" />}
              <Icon size={18} className={`${isActive ? 'text-[#47E5BC]' : 'text-[#7E7890] group-hover:text-[#B9B0C7]'}`} />
              <span className="tracking-wide">{item.label}</span>
              
              {item.id === "buyer" && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 bg-[#F472B6]/10 text-[#F472B6] text-[10px] rounded border border-[#F472B6]/30">
                  BETA
                </span>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-auto p-6 text-center">
        <div className="w-full bg-[#23202C]/60 border border-[#3E3648] p-4 rounded-xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)]">
          <div className="text-[#B9B0C7] font-['var(--font-space-mono)'] text-xs uppercase mb-2">Node Status</div>
          <div className="flex justify-center items-center gap-2 text-[#47E5BC] text-xs font-['var(--font-space-mono)'] uppercase font-bold">
             <span className="w-2 h-2 bg-[#47E5BC] rounded-full shadow-[0_0_8px_#47E5BC] animate-pulse"></span> SYNCING
          </div>
        </div>
      </div>
    </aside>
  );
}
