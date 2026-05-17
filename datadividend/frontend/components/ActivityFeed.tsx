"use client";

import { useSimulation } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, Coins, ShieldCheck, Database, Settings } from "lucide-react";

export default function ActivityFeed() {
  const { activityFeed } = useSimulation();

  return (
    <div className="mb-12">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="text-rose-400">7.</span> Live Activity Feed
        </h2>
        <p className="text-sm text-gray-400 mt-1">Global events, marketplace demand updates, and system logs.</p>
      </div>

      <div className="bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent pointer-events-none" />
        
        <div className="h-[400px] overflow-y-auto custom-scrollbar pr-2 relative z-10 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {activityFeed.map((event) => {
              const time = new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
              
              let Icon = Activity;
              let bg = "bg-gray-800/50";
              let text = "text-gray-400";
              
              if (event.category === 'reward') {
                Icon = Coins;
                bg = "bg-emerald-500/10 border-emerald-500/20";
                text = "text-emerald-400";
              } else if (event.category === 'proof') {
                Icon = ShieldCheck;
                bg = "bg-indigo-500/10 border-indigo-500/20";
                text = "text-indigo-400";
              } else if (event.category === 'marketplace') {
                Icon = Database;
                bg = "bg-blue-500/10 border-blue-500/20";
                text = "text-blue-400";
              } else if (event.category === 'system') {
                Icon = Settings;
                bg = "bg-rose-500/10 border-rose-500/20";
                text = "text-rose-400";
              }

              return (
                <motion.div 
                  key={event.id}
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: "auto", scale: 1 }}
                  className={`flex items-center gap-4 p-3 rounded-2xl border ${bg} transition-colors`}
                >
                  <div className={`p-2 rounded-xl bg-black/20 ${text}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-200">{event.message}</p>
                  </div>
                  <div className="text-xs font-mono text-gray-500 font-medium shrink-0">
                    {time}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#101016] to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
