"use client";

import { useSimulation } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database } from "lucide-react";

export default function MarketplaceRequests() {
  const { activeQueries } = useSimulation();

  return (
    <div className="bg-[#2D2834] border border-[#3E3648] p-6 shadow-[8px_8px_0px_#1A171F] relative h-full flex flex-col">
      <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#4A474D] border-b border-l border-[#3E3648] text-[#B9B0C7] font-['var(--font-space-mono)'] font-bold text-xs shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
        ACTIVE QUERIES
      </div>
      
      <div className="flex items-center gap-2 mt-2 mb-6">
        <Database size={16} className="text-[#B9B0C7]" />
        <h2 className="font-['var(--font-space-mono)'] text-[#F5EFE8] text-lg">Live Network Execution</h2>
      </div>

      {activeQueries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border border-[#3E3648] bg-[#23202C] shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
          <p className="font-['var(--font-space-mono)'] text-[#7E7890] text-sm">Waiting for incoming queries...</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {activeQueries.map((query) => (
              <motion.div 
                key={query.id} 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="p-4 border border-[#3E3648] bg-[#23202C] relative group shadow-[inset_0_2px_8px_rgba(0,0,0,0.2)]"
              >
                {/* Status Indicator line */}
                {query.status === 'Generating proof...' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4B15A] opacity-80 animate-pulse" />}
                {query.status === 'Verifying aggregate...' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#5EEAD4] opacity-80" />}
                {query.status === 'Reward distribution...' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F472B6] opacity-80" />}
                
                <div className="flex justify-between items-start mb-3 pl-2">
                  <h3 className="font-['var(--font-space-mono)'] text-[#F5EFE8]">{query.buyer}</h3>
                  <span className="text-[10px] text-[#47E5BC] bg-[#47E5BC]/10 px-2 py-0.5 font-mono uppercase border border-[#47E5BC]/30 rounded">
                    {query.status}
                  </span>
                </div>

                <div className="bg-[#1A171F] border border-[#2D2834] p-3 mb-3 ml-2 flex items-start gap-2 shadow-[inset_0_1px_3px_rgba(0,0,0,0.5)]">
                  <Terminal size={14} className="text-[#7E7890] mt-0.5 shrink-0" />
                  <p className="text-[11px] text-[#B9B0C7] font-mono leading-relaxed">"{query.dataset}"</p>
                </div>

                <div className="flex items-center justify-between ml-2 font-['var(--font-space-mono)'] text-xs">
                  <p className="text-[#D4B15A]">Reward: {query.reward}</p>
                  <p className="text-[#7E7890]">{query.contributors} Peers</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
