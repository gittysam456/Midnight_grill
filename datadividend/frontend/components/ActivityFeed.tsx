"use client";

import { useSimulation } from "./SimulationProvider";
import { motion, AnimatePresence } from "framer-motion";

export default function ActivityFeed() {
  const { activityFeed } = useSimulation();

  return (
    <div className="bg-[#21212b] border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative h-full flex flex-col">
      <div className="absolute top-0 right-0 px-3 py-1 bg-teal-400 border-l-4 border-b-4 border-black text-black font-['var(--font-vt323)'] font-bold text-lg">
        PROTOCOL LOGS
      </div>
      
      <p className="font-['var(--font-vt323)'] text-gray-300 mt-4 mb-4 text-xl">Live blockchain and ZK proof events.</p>

      <div className="flex-1 bg-black border-4 border-[#333] p-4 font-mono text-xs overflow-y-auto custom-scrollbar flex flex-col gap-3">
        <AnimatePresence initial={false}>
          {activityFeed.map((event) => {
            const time = new Date(event.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
            
            let color = "text-gray-400";
            if (event.category === 'reward') color = "text-yellow-400";
            if (event.category === 'proof') color = "text-teal-400";
            if (event.category === 'marketplace') color = "text-pink-400";
            
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-1 border-b border-gray-900 pb-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">[{time}]</span>
                  <span className={color}>{event.message}</span>
                </div>
                {event.txHash && (
                  <div className="pl-20 text-gray-600">
                    TX: <span className="text-gray-500 hover:text-gray-400 cursor-pointer underline decoration-gray-700 underline-offset-2">{event.txHash}</span>
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
