"use client";

import { useSimulation } from "./SimulationProvider";
import { motion } from "framer-motion";
import { Coins, Database, Fingerprint, TrendingUp, ShieldCheck } from "lucide-react";
import WalletDropdown from "./WalletDropdown";
import { WalletState } from "@/lib/midnight";

interface HeroOverviewProps {
  walletState: WalletState;
  onDisconnect: () => void;
}

export default function HeroOverview({ walletState, onDisconnect }: HeroOverviewProps) {
  const { earnings, privacyScore, protectedDatasets, weeklyGrowth, activeQueries } = useSimulation();

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
      {/* Left side: Branding & Metrics */}
      <div className="lg:col-span-8 bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden group flex flex-col justify-between">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
        
        <div className="flex items-start justify-between mb-8 relative z-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter text-white flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center border border-indigo-500/30">
                <ShieldCheck size={24} className="text-indigo-400" />
              </div>
              DataDividend
            </h1>
            <p className="text-gray-400 mt-2 text-sm font-medium tracking-wide">Decentralized ZK Data Marketplace</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
          <div className="bg-[#181820]/60 border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center">
            <Coins size={18} className="text-emerald-400 mb-2" />
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Total Earnings</p>
            <motion.p key={earnings} className="text-xl font-black text-emerald-400 tabular-nums">
              {earnings.toFixed(2)} DUST
            </motion.p>
          </div>
          
          <div className="bg-[#181820]/60 border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center">
            <TrendingUp size={18} className="text-teal-400 mb-2" />
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Weekly Yield</p>
            <p className="text-xl font-black text-gray-200 tabular-nums">+{weeklyGrowth.toFixed(1)}%</p>
          </div>
          
          <div className="bg-[#181820]/60 border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center">
            <Fingerprint size={18} className="text-blue-400 mb-2" />
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Privacy Score</p>
            <p className="text-xl font-black text-gray-200 tabular-nums">{privacyScore}%</p>
          </div>
          
          <div className="bg-[#181820]/60 border border-gray-800 rounded-2xl p-4 flex flex-col items-center text-center">
            <Database size={18} className="text-indigo-400 mb-2" />
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Protected Datasets</p>
            <p className="text-xl font-black text-gray-200 tabular-nums">{protectedDatasets}</p>
          </div>
        </div>
      </div>

      {/* Right side: Wallet connection */}
      <div className="lg:col-span-4 bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-8 shadow-2xl relative overflow-hidden group flex flex-col justify-center items-center text-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-transparent pointer-events-none" />
        
        <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Active Connection</p>
        
        <WalletDropdown walletState={walletState} onDisconnect={onDisconnect} />
        
        <div className="mt-8 flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm font-bold text-emerald-400">Marketplace Online</span>
        </div>
        <p className="text-xs text-gray-500 mt-3 font-medium">{activeQueries.length} active buyers currently seeking data</p>
      </div>
    </div>
  );
}
