"use client";

import { useSimulation } from "./SimulationProvider";
import { ShoppingCart, Activity, MapPin, Smartphone, Tv, CreditCard, Shield } from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { id: "purchases", name: "Purchase History", icon: ShoppingCart, desc: "E-commerce receipts", est: "12 DUST/wk", risk: "Low", buyers: 4 },
  { id: "health", name: "Health & Fitness", icon: Activity, desc: "Step counts & vitals", est: "18 DUST/wk", risk: "Medium", buyers: 7 },
  { id: "location", name: "Location Data", icon: MapPin, desc: "Aggregated GPS", est: "25 DUST/wk", risk: "High", buyers: 12 },
  { id: "appUsage", name: "App Usage", icon: Smartphone, desc: "Screen time stats", est: "8 DUST/wk", risk: "Low", buyers: 3 },
  { id: "streaming", name: "Streaming Preferences", icon: Tv, desc: "Watch history", est: "15 DUST/wk", risk: "Low", buyers: 5 },
  { id: "financial", name: "Financial Behavior", icon: CreditCard, desc: "DeFi activity", est: "40 DUST/wk", risk: "High", buyers: 9 },
];

export default function ConsentDashboard() {
  const { consents, toggleConsent } = useSimulation();

  return (
    <div className="mb-12">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="text-indigo-400">2.</span> Data Vault Consent Center
        </h2>
        <p className="text-sm text-gray-400 mt-1">Control exactly which datasets are queryable via Zero-Knowledge proofs. Toggle to adjust your yield.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          const isActive = consents[cat.id];
          return (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              key={cat.id} 
              className={`group/item flex flex-col p-6 rounded-3xl border transition-all duration-300 cursor-pointer relative overflow-hidden ${
                isActive 
                  ? 'bg-indigo-900/10 border-indigo-500/30 hover:bg-indigo-900/20 shadow-[0_4px_30px_rgba(99,102,241,0.05)]' 
                  : 'bg-[#101016]/80 border-gray-800 hover:border-gray-700 hover:bg-[#15151c]'
              }`}
              onClick={() => toggleConsent(cat.id, cat.name)}
            >
              {isActive && (
                <div className="absolute top-0 right-0 p-20 bg-indigo-500/10 rounded-full blur-[50px] pointer-events-none" />
              )}
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-2xl transition-all duration-300 ${isActive ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' : 'bg-gray-800 text-gray-400'}`}>
                  <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out flex items-center ${isActive ? 'bg-indigo-500' : 'bg-gray-700'}`}>
                  <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ease-in-out flex items-center justify-center ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>
              
              <div className="relative z-10 mb-5 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-bold text-lg transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-300'}`}>{cat.name}</h3>
                  {isActive && <Shield size={14} className="text-emerald-400" />}
                </div>
                <p className="text-xs text-gray-500">{cat.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-auto relative z-10 pt-4 border-t border-gray-800/60">
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Est. Yield</p>
                  <p className={`text-sm font-bold ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}>{cat.est}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Demand</p>
                  <p className="text-sm font-bold text-gray-300">{cat.buyers} Active Buyers</p>
                </div>
                <div className="col-span-2 flex justify-between items-center mt-2 bg-black/20 p-2 rounded-xl">
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Privacy Risk</span>
                  <span className={`text-xs font-bold ${cat.risk === 'Low' ? 'text-emerald-400' : cat.risk === 'Medium' ? 'text-amber-400' : 'text-red-400'}`}>{cat.risk}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
