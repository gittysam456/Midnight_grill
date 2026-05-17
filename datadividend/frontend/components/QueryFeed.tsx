"use client";

import { Activity, Database, Users, Lock, ChevronRight } from "lucide-react";
import { useSimulation, QueryEvent } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function QueryFeed() {
  const { activeQueries } = useSimulation();

  return (
    <div className="bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-7 shadow-2xl relative overflow-hidden group hover:border-gray-700/80 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-500/20 shadow-inner">
            <Database size={26} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Marketplace Feed</h2>
            <p className="text-sm text-gray-400 mt-1">Live ZK queries executing on the network</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-bold text-blue-400 shadow-inner">
          <Activity size={14} className="animate-pulse" />
          <span className="uppercase tracking-wider">Network Active</span>
        </div>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        <AnimatePresence initial={false}>
          {activeQueries.map((query) => (
            <motion.div 
              key={query.id} 
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="p-5 rounded-2xl border border-gray-800/80 bg-[#181820]/60 hover:bg-[#181820] hover:border-gray-700 transition-all duration-300 cursor-pointer group/card relative overflow-hidden"
            >
              {query.status === 'completed' && (
                <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-black text-gray-500 uppercase tracking-widest">{query.id}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                      query.status === 'processing' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                      query.status === 'active' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    }`}>
                      {query.status}
                    </span>
                    <span className="text-xs text-gray-600 font-medium ml-2">
                      {Math.floor((Date.now() - query.timestamp) / 1000)}s ago
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-100 tracking-tight">{query.buyer}</h3>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 drop-shadow-sm">{query.reward}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-black/40 p-3.5 rounded-xl border border-gray-800/50 mb-5 shadow-inner">
                <Lock size={16} className="text-gray-500" />
                <code className="text-xs text-indigo-300/90 font-mono flex-1 truncate font-medium tracking-wide">
                  {query.predicate}
                </code>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-gray-400 font-medium">
                  <div className="flex items-center gap-2">
                    <Users size={16} className="text-gray-500" />
                    <span>{query.participants.toLocaleString()} matches</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800/50 shadow-inner">
                    <motion.div 
                      className={`h-full rounded-full ${
                        query.status === 'completed' ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-gradient-to-r from-blue-600 to-indigo-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${query.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <ChevronRight size={18} className="text-gray-600 group-hover/card:text-blue-400 group-hover/card:translate-x-1 transition-all" />
                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Fade out at bottom of list */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#101016] to-transparent pointer-events-none rounded-b-3xl" />
    </div>
  );
}
