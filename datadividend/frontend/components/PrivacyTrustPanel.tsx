"use client";

import { useSimulation } from "./SimulationProvider";
import { ShieldCheck, LockKeyhole, Fingerprint, EyeOff, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function PrivacyTrustPanel() {
  const { privacyScore, protectedDatasets } = useSimulation();

  return (
    <div className="mb-12">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="text-purple-400">6.</span> Privacy Trust Panel
        </h2>
        <p className="text-sm text-gray-400 mt-1">Mathematical guarantees protecting your identity on the Midnight Network.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Trust Score Card */}
        <div className="bg-[#101016]/80 backdrop-blur-xl border border-purple-500/20 rounded-3xl p-8 shadow-[0_0_50px_rgba(168,85,247,0.05)] relative overflow-hidden group flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-32 bg-purple-500/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-purple-500/10 transition-colors duration-700" />
          
          <div className="relative z-10">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
              <Fingerprint size={16} className="text-purple-400" /> Zero-Knowledge Anonymity Index
            </h3>
            
            <div className="flex items-end gap-3 mb-2">
              <span className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">
                {privacyScore}
              </span>
              <span className="text-2xl text-purple-500/80 font-bold mb-2">%</span>
            </div>
            
            <p className="text-sm font-medium text-gray-300 mt-4 max-w-sm leading-relaxed">
              Your identity is mathematically decoupled from your data. Only cryptographic proofs are shared, never raw records.
            </p>
          </div>

          <div className="mt-8 relative z-10">
            <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${privacyScore}%` }}
                transition={{ duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Guarantees List */}
        <div className="flex flex-col gap-4">
          <div className="bg-[#181820]/60 border border-gray-800 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 bg-red-500/10 text-red-400 rounded-xl mt-1">
              <EyeOff size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-200 mb-1">Raw Data Shared: NEVER</p>
              <p className="text-xs text-gray-500 leading-relaxed">Your personal information stays encrypted locally in your data vault. Buyers only receive statistical aggregates.</p>
            </div>
          </div>

          <div className="bg-[#181820]/60 border border-gray-800 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl mt-1">
              <LockKeyhole size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-200 mb-1">Encryption Status: ACTIVE</p>
              <p className="text-xs text-gray-500 leading-relaxed">{protectedDatasets} datasets are currently shielded by Midnight's shielded state mechanics.</p>
            </div>
          </div>

          <div className="bg-[#181820]/60 border border-gray-800 rounded-2xl p-5 flex items-start gap-4">
            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl mt-1">
              <ShieldCheck size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-200 mb-1">ZK Proofs Generated</p>
              <p className="text-xs text-gray-500 leading-relaxed">Every marketplace transaction is verified on-chain without revealing the underlying input data.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
