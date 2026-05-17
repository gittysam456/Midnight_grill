"use client";

import { useSimulation } from "./SimulationProvider";
import { Shield, Activity, Coins, Zap } from "lucide-react";

export default function StatsRow() {
  const { earnings } = useSimulation();

  const stats = [
    { label: "Shielded Records", value: "142.5K", icon: Shield, color: "text-[#47E5BC]" },
    { label: "Active Queries", value: "28", icon: Activity, color: "text-[#C084FC]" },
    { label: "Total Earnings", value: `${earnings.toFixed(2)} DUST`, icon: Coins, color: "text-[#D4B15A]" },
    { label: "ZK Proofs Gen", value: "8,941", icon: Zap, color: "text-[#5EEAD4]" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div 
            key={i}
            className="bg-[#2D2834]/80 backdrop-blur-md border border-[#3E3648] p-5 rounded-2xl shadow-[4px_4px_15px_rgba(0,0,0,0.1)] flex items-center justify-between group transition-all hover:bg-[#2D2834]/90 hover:-translate-y-1 hover:shadow-[4px_8px_20px_rgba(0,0,0,0.15)]"
          >
            <div>
              <p className="font-['var(--font-space-mono)'] text-[#B9B0C7] text-xs uppercase mb-2 tracking-wider">
                {stat.label}
              </p>
              <p className={`font-['var(--font-space-mono)'] text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
            <div className={`p-3 bg-[#23202C]/60 border border-[#3E3648] rounded-xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.2)] ${stat.color}`}>
              <Icon size={24} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
