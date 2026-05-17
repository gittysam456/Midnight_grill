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
    <div className="bg-[#2D2834]/80 backdrop-blur-md border border-[#3E3648] p-6 shadow-[4px_4px_15px_rgba(0,0,0,0.1)] rounded-2xl relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#F472B6]/10 border-b border-l border-[#F472B6]/30 text-[#F472B6] font-['var(--font-space-mono)'] font-bold text-xs rounded-bl-xl z-10 shadow-[0_0_10px_rgba(244,114,182,0.1)]">
        CONSENT DASHBOARD
      </div>
      
      <p className="font-['var(--font-space-mono)'] text-[#B9B0C7] mt-4 mb-6 text-sm">Select datasets to share via ZK proofs.</p>

      <div className="grid gap-4 w-full" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))' }}>
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = consents[cat.id];
          
          return (
            <motion.button 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              transition={{ delay: i * 0.05 }}
              key={cat.id} 
              onClick={() => toggleConsent(cat.id, cat.name)}
              className={`flex flex-col items-center p-4 rounded-xl border transition-all duration-300 relative group w-full overflow-hidden
                ${isActive 
                  ? 'bg-[#23202C]/80 border-[#F472B6]/50 shadow-[0_0_15px_rgba(244,114,182,0.15)]' 
                  : 'bg-[#23202C]/40 border-[#3E3648] shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)] hover:bg-[#23202C]/60 hover:border-[#52485D]'
                }`}
            >
              <div className={`p-2.5 mb-3 rounded-lg border transition-colors flex-shrink-0 ${isActive ? 'bg-[#F472B6]/20 border-[#F472B6]/40 text-[#F472B6] shadow-[0_0_10px_rgba(244,114,182,0.2)]' : 'bg-[#2D2834] border-[#3E3648] text-[#7E7890] group-hover:text-[#B9B0C7]'}`}>
                <Icon size={20} />
              </div>
              
              <h3 className={`font-['var(--font-space-mono)'] text-xs sm:text-sm mb-4 uppercase text-center w-full break-words whitespace-normal leading-tight ${isActive ? 'text-[#F5EFE8] font-bold' : 'text-[#B9B0C7]'}`}>
                {cat.name}
              </h3>

              {/* Status Indicators */}
              <div className="w-full flex flex-col gap-2 mt-auto border-t border-[#3E3648]/50 pt-3">
                <div className="flex items-center justify-between text-[10px] font-medium uppercase font-mono w-full">
                  <span className="text-[#7E7890] truncate mr-1">Shared</span>
                  <span className={`shrink-0 ${isActive ? 'text-[#47E5BC] shadow-[0_0_5px_rgba(71,229,188,0.5)]' : 'text-[#F472B6]'}`}>{isActive ? 'YES' : 'NO'}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-medium uppercase font-mono w-full">
                  <span className="text-[#7E7890] truncate mr-1">Shielded</span>
                  <span className="text-[#5EEAD4] shrink-0">YES</span>
                </div>
                <div className="flex items-center justify-between text-[10px] font-medium uppercase font-mono w-full">
                  <span className="text-[#7E7890] truncate mr-1">Encrypted</span>
                  <span className="text-[#5EEAD4] shrink-0">YES</span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
