"use client";

import { useSimulation } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";

export default function ActivityFeed() {
  const { activityFeed } = useSimulation();

  return (
    <div className="bg-[#2D2834] border border-[#3E3648] p-6 shadow-[8px_8px_0px_#1A171F] relative h-full flex flex-col">
      <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#4A474D] border-b border-l border-[#3E3648] text-[#B9B0C7] font-['var(--font-space-mono)'] font-bold text-xs shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
        PROTOCOL LOGS
      </div>
      
      <div className="flex items-center gap-2 mt-2 mb-6">
        <Activity size={16} className="text-[#B9B0C7]" />
        <h2 className="font-['var(--font-space-mono)'] text-[#F5EFE8] text-lg">System Events</h2>
      </div>

      <div className="flex-1 bg-[#23202C] border border-[#3E3648] p-4 font-mono text-[11px] overflow-y-auto custom-scrollbar flex flex-col gap-3 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
        <AnimatePresence initial={false}>
          {activityFeed.map((event) => {
            const time = new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            let color = "text-[#B9B0C7]";
            if (event.category === 'reward') color = "text-[#D4B15A]";
            if (event.category === 'proof') color = "text-[#47E5BC]";
            if (event.category === 'marketplace') color = "text-[#F472B6]";
            
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-1 border-b border-[#3E3648]/40 pb-3"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[#7E7890] mt-0.5">[{time}]</span>
                  <span className={`${color} leading-relaxed flex-1`}>{event.message}</span>
                </div>
                {event.txHash && (
                  <div className="pl-16 text-[#7E7890] flex items-center gap-2">
                    <span className="text-[#C084FC]">TX:</span> 
                    <span className="text-[#5EEAD4]/70 hover:text-[#5EEAD4] cursor-pointer underline decoration-[#5EEAD4]/30 underline-offset-2 transition-colors">
                      {event.txHash}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
