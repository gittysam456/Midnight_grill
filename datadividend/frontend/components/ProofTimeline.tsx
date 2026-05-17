"use client";

import { useSimulation } from "./SimulationProvider";
import { Terminal, CheckCircle2, CircleDashed, Info, Coins } from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProofTimeline() {
  const { proofTimeline } = useSimulation();
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [proofTimeline]);

  return (
    <div className="mb-12">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="text-indigo-400">4.</span> ZK Proof Activity Timeline
        </h2>
        <p className="text-sm text-gray-400 mt-1">Live terminal view of cryptographic proofs being generated and verified on the Midnight Network.</p>
      </div>

      <div className="bg-[#08080b] border border-gray-800 rounded-2xl shadow-2xl relative overflow-hidden font-mono text-sm">
        {/* Terminal Header */}
        <div className="bg-[#101015] border-b border-gray-800 p-3 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gray-700" />
            <div className="w-3 h-3 rounded-full bg-gray-700" />
            <div className="w-3 h-3 rounded-full bg-gray-700" />
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest ml-2">
            <Terminal size={14} /> zkp-verifier-node-01
          </div>
        </div>

        {/* Terminal Body */}
        <div className="p-4 h-[300px] overflow-y-auto custom-scrollbar flex flex-col gap-2">
          <AnimatePresence initial={false}>
            {proofTimeline.map((step) => {
              const time = new Date(step.timestamp).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
              
              let Icon = Info;
              let color = "text-gray-400";
              let bg = "";
              
              if (step.type === 'processing') {
                Icon = CircleDashed;
                color = "text-indigo-400";
              } else if (step.type === 'success') {
                Icon = CheckCircle2;
                color = "text-teal-400";
              } else if (step.type === 'reward') {
                Icon = Coins;
                color = "text-emerald-400";
                bg = "bg-emerald-900/10";
              }

              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-3 py-1.5 px-2 rounded-lg ${bg}`}
                >
                  <span className="text-gray-600 shrink-0">[{time}]</span>
                  <div className={`shrink-0 mt-0.5 ${color} ${step.type === 'processing' ? 'animate-spin' : ''}`}>
                    <Icon size={14} />
                  </div>
                  <span className={`${color} leading-relaxed break-words`}>
                    {step.message}
                  </span>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={endRef} className="h-1" />
        </div>
      </div>
    </div>
  );
}
