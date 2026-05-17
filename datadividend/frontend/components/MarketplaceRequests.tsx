"use client";

import { useSimulation } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal } from "lucide-react";

export default function MarketplaceRequests() {
  const { activeQueries } = useSimulation();

  return (
    <div className="bg-[#21212b] border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative h-full flex flex-col">
      <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-400 border-l-4 border-b-4 border-black text-black font-['var(--font-vt323)'] font-bold text-lg">
        ACTIVE QUERIES
      </div>
      
      <p className="font-['var(--font-vt323)'] text-gray-300 mt-4 mb-6 text-xl">Live ZK queries executing on-chain.</p>

      {activeQueries.length === 0 ? (
        <div className="flex-1 flex items-center justify-center border-4 border-dashed border-gray-700 bg-[#16161d]">
          <p className="font-['var(--font-vt323)'] text-gray-500 text-lg">WAITING FOR BUYERS...</p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence initial={false}>
            {activeQueries.map((query) => (
              <motion.div 
                key={query.id} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="p-4 border-4 border-black bg-[#16161d] relative group"
              >
                {/* Status Indicator line */}
                {query.status === 'Generating proof...' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-yellow-400 animate-pulse" />}
                {query.status === 'Verifying aggregate...' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-teal-400" />}
                {query.status === 'Reward distribution...' && <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-400" />}
                
                <div className="flex justify-between items-start mb-2 pl-2">
                  <h3 className="font-['var(--font-vt323)'] text-xl text-yellow-300 drop-shadow-[1px_1px_0_#000] uppercase">{query.buyer}</h3>
                  <span className="text-[10px] bg-black text-gray-400 px-2 py-1 font-mono uppercase font-bold border border-gray-800">
                    {query.status}
                  </span>
                </div>

                <div className="bg-black border-2 border-gray-800 p-3 mb-3 ml-2 flex items-start gap-2">
                  <Terminal size={14} className="text-gray-600 mt-0.5 shrink-0" />
                  <p className="text-xs text-gray-300 font-mono">"{query.dataset}"</p>
                </div>

                <div className="flex items-center justify-between ml-2">
                  <p className="font-['var(--font-vt323)'] text-emerald-400 text-lg">REWARD: {query.reward}</p>
                  <p className="font-['var(--font-vt323)'] text-gray-500 text-sm">{query.contributors} PEERS</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
