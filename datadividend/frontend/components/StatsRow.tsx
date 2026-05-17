"use client";

import { useSimulation } from "./SimulationProvider";
import { motion } from "framer-motion";
import { ShieldCheck, Database, Coins, Zap } from "lucide-react";

export default function StatsRow() {
  const { protectedDatasets, activeQueries, earnings, totalProofs } = useSimulation();

  const stats = [
    { label: "Shielded Records", value: protectedDatasets, icon: ShieldCheck, color: "bg-teal-400" },
    { label: "Active Queries", value: activeQueries.length, icon: Database, color: "bg-pink-400" },
    { label: "Total Earnings", value: `${earnings.toFixed(2)} DUST`, icon: Coins, color: "bg-yellow-400" },
    { label: "Proofs Generated", value: totalProofs, icon: Zap, color: "bg-purple-400" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#2b2b36] border-2 border-black p-5 shadow-[4px_4px_0px_rgba(0,0,0,1)] relative overflow-hidden"
          >
            {/* Scanline effect */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSJ0cmFuc3BhcmVudCIvPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMikiLz4KPC9zdmc+')] opacity-20 pointer-events-none" />
            
            <div className="flex items-start justify-between relative z-10">
              <div>
                <p className="text-gray-400 font-['var(--font-vt323)'] uppercase text-sm tracking-wider drop-shadow-[1px_1px_0_#000] mb-2">{stat.label}</p>
                <motion.h3 
                  key={stat.value}
                  initial={{ scale: 1.1, color: "#fff" }}
                  animate={{ scale: 1, color: "#e5e7eb" }}
                  className="text-3xl font-['var(--font-vt323)'] text-white drop-shadow-[2px_2px_0_#000]"
                >
                  {stat.value}
                </motion.h3>
              </div>
              <div className={`p-2 border-2 border-black ${stat.color} shadow-[2px_2px_0px_rgba(0,0,0,1)]`}>
                <Icon size={24} className="text-black" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
