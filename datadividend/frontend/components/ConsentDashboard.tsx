"use client";

import { useSimulation } from "./SimulationProvider";
import { ShoppingCart, Activity, MapPin, Smartphone, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "purchases", name: "Purchases", icon: ShoppingCart },
  { id: "fitness", name: "Fitness", icon: Activity },
  { id: "location", name: "Location", icon: MapPin },
  { id: "appUsage", name: "App Usage", icon: Smartphone },
  { id: "health", name: "Health", icon: ShieldCheck },
];

export default function ConsentDashboard() {
  const { consents, toggleConsent } = useSimulation();

  return (
    <div className="bg-[#21212b] border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
      <div className="absolute top-0 right-0 px-3 py-1 bg-pink-400 border-l-4 border-b-4 border-black text-black font-['var(--font-vt323)'] font-bold text-lg">
        CONSENT DASHBOARD
      </div>
      
      <p className="font-['var(--font-vt323)'] text-gray-300 mt-4 mb-6 text-xl">Select datasets to share via ZK proofs.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = consents[cat.id];
          
          return (
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={cat.id} 
              onClick={() => toggleConsent(cat.id, cat.name)}
              className={`flex flex-col items-center p-4 border-4 transition-all duration-200 relative group
                ${isActive 
                  ? 'bg-[#1a1a24] border-pink-400 shadow-[4px_4px_0px_rgba(244,114,182,1)] translate-y-[-2px] translate-x-[-2px]' 
                  : 'bg-[#16161d] border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] hover:bg-[#1a1a24]'
                }`}
            >
              <div className={`p-3 mb-3 border-2 border-black ${isActive ? 'bg-pink-400 text-black' : 'bg-[#2b2b36] text-gray-400'}`}>
                <Icon size={24} />
              </div>
              
              <h3 className={`font-['var(--font-vt323)'] text-xl mb-3 uppercase drop-shadow-[1px_1px_0_#000] ${isActive ? 'text-pink-400' : 'text-gray-300'}`}>
                {cat.name}
              </h3>

              {/* Status Indicators */}
              <div className="w-full flex flex-col gap-1.5 mt-auto">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase font-mono">
                  <span className="text-gray-500">Shared</span>
                  <span className={isActive ? 'text-emerald-400' : 'text-red-400'}>{isActive ? 'YES' : 'NO'}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase font-mono">
                  <span className="text-gray-500">Shielded</span>
                  <span className="text-teal-400">YES</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase font-mono">
                  <span className="text-gray-500">Encrypted</span>
                  <span className="text-teal-400">YES</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
