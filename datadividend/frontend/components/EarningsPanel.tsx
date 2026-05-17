"use client";

import { Wallet, TrendingUp, ArrowUpRight } from "lucide-react";
import { useSimulation } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function EarningsPanel() {
  const { earnings, weeklyGrowth } = useSimulation();
  const [displayedEarnings, setDisplayedEarnings] = useState(earnings);

  // Smooth animation effect for earnings ticking up
  useEffect(() => {
    if (earnings > displayedEarnings) {
      const diff = earnings - displayedEarnings;
      const steps = 10;
      const stepValue = diff / steps;
      let current = displayedEarnings;
      
      const interval = setInterval(() => {
        current += stepValue;
        if (current >= earnings) {
          setDisplayedEarnings(earnings);
          clearInterval(interval);
        } else {
          setDisplayedEarnings(current);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [earnings, displayedEarnings]);

  return (
    <div className="bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-7 shadow-2xl relative overflow-hidden group h-full hover:border-gray-700/80 transition-colors flex flex-col">
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20 shadow-inner">
          <Wallet size={26} />
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Your Earnings</h2>
      </div>

      <div className="flex flex-col items-center justify-center flex-1 py-4">
        <p className="text-xs text-gray-500 uppercase tracking-[0.2em] mb-3 font-semibold">Total Yield</p>
        
        <div className="flex items-baseline gap-2 relative">
          <motion.div 
            key={displayedEarnings.toFixed(2)}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-teal-200 drop-shadow-md tabular-nums tracking-tighter"
          >
            {displayedEarnings.toFixed(2)}
          </motion.div>
          <span className="text-xl font-bold text-emerald-500/80">DUST</span>
        </div>
        
        <div className="mt-6 flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 shadow-inner shadow-emerald-500/10">
          <TrendingUp size={16} className="animate-pulse" />
          <span className="font-semibold">+{weeklyGrowth.toFixed(1)}% this week</span>
        </div>
      </div>

      <div className="mt-auto pt-8">
        <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-gray-900 font-extrabold text-lg transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2">
          <span>Withdraw to Wallet</span>
          <ArrowUpRight size={20} strokeWidth={3} />
        </button>
        <p className="text-center text-xs text-gray-500 mt-4">Withdrawals settled instantly on Midnight Network</p>
      </div>
    </div>
  );
}
