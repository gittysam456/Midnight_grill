"use client";

import { useSimulation } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Database, ShieldAlert, Clock, Users, ShieldCheck, Zap } from "lucide-react";

export default function MarketplaceRequests() {
  const { activeQueries } = useSimulation();

  return (
    <div className="mb-12">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="text-blue-400">3.</span> Live Marketplace Requests
        </h2>
        <p className="text-sm text-gray-400 mt-1">Real-time incoming dataset requests from verified organizations.</p>
      </div>

      <div className="bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
        
        {activeQueries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Database size={48} className="text-gray-700 mb-4" />
            <p className="text-gray-400 font-medium">Awaiting new marketplace demand...</p>
            <p className="text-sm text-gray-600 mt-1">Enable more data vaults to increase match probability.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence initial={false}>
              {activeQueries.map((query) => (
                <motion.div 
                  key={query.id} 
                  initial={{ opacity: 0, y: -20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-5 rounded-2xl border border-gray-800 bg-[#15151c]/80 hover:bg-[#1a1a24] hover:border-gray-700 transition-all duration-300 flex flex-col h-full relative overflow-hidden group"
                >
                  {/* Status Background Indicator */}
                  {query.status === 'Generating proof' && <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 animate-pulse" />}
                  {query.status === 'Proof verified' && <div className="absolute top-0 left-0 w-full h-1 bg-teal-400" />}
                  {query.status === 'Reward distributed' && <div className="absolute inset-0 bg-emerald-500/5" />}

                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{query.id}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                      query.status === 'Generating proof' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      query.status === 'Proof verified' ? 'bg-teal-500/10 text-teal-400 border border-teal-500/20' :
                      query.status === 'Reward distributed' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    }`}>
                      {query.status}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-gray-100 tracking-tight leading-tight mb-1">{query.buyer}</h3>
                  <p className="text-sm font-medium text-emerald-400 mb-4">{query.reward} Reward Pool</p>

                  <div className="bg-black/30 rounded-xl p-3 border border-gray-800/50 mb-4 flex-1">
                    <div className="mb-2">
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Dataset</p>
                      <p className="text-sm font-bold text-gray-300">{query.dataset}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Purpose</p>
                      <p className="text-xs text-gray-400">{query.purpose}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-400">
                      {query.privacyLevel === 'Maximum' ? <ShieldCheck size={14} className="text-indigo-400" /> : <ShieldAlert size={14} className="text-amber-400" />}
                      {query.privacyLevel} Privacy
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500">
                      <Clock size={12} /> {query.timeRemaining}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
