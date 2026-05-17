"use client";

import { useState } from "react";
import { Terminal, Target, Database, Activity, Search } from "lucide-react";
import { toast } from "sonner";
import { useSimulation } from "./SimulationProvider";

export default function MarketplaceBuyer() {
  const { currentBlock } = useSimulation();
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryText, setQueryText] = useState("SELECT COUNT(id) FROM Users\nWHERE age BETWEEN 25 AND 34\nAND visits_gym > 2;");

  const handleExecute = () => {
    setIsExecuting(true);
    toast.info("Compiling ZK Circuit...");
    
    setTimeout(() => {
      toast.success("Query Executed", { description: "Broadcasting to shielded network." });
      setIsExecuting(false);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
      <div className="bg-[#2D2834]/80 backdrop-blur-md border border-[#3E3648] p-8 shadow-[4px_4px_15px_rgba(0,0,0,0.15)] rounded-2xl relative">
        <div className="absolute top-0 right-0 px-5 py-2 bg-[#F472B6]/10 border-b border-l border-[#F472B6]/30 text-[#F472B6] font-['var(--font-space-mono)'] font-bold text-sm rounded-bl-xl shadow-[0_0_10px_rgba(244,114,182,0.1)]">
          BUYER MARKETPLACE
        </div>
        
        <h2 className="font-['var(--font-space-mono)'] text-[#F5EFE8] text-2xl uppercase mb-2 mt-4 tracking-tight">Execute ZK Query</h2>
        <p className="text-[#B9B0C7] text-sm mb-8 max-w-2xl leading-relaxed">Deploy zero-knowledge circuits to query encrypted datasets without compromising user privacy.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-5">
            
            <div className="flex flex-col gap-2">
              <label className="font-['var(--font-space-mono)'] text-[#B9B0C7] text-sm tracking-wider uppercase">Query Definition</label>
              <div className="bg-[#23202C] border border-[#3E3648] p-1 rounded-xl shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] focus-within:border-[#47E5BC]/50 focus-within:shadow-[0_0_15px_rgba(71,229,188,0.1)] transition-all">
                <textarea 
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="w-full bg-transparent text-[#5EEAD4] font-mono text-[13px] p-4 outline-none resize-none h-32 leading-relaxed"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-['var(--font-space-mono)'] text-[#B9B0C7] text-sm tracking-wider uppercase">Target Audience</label>
                <div className="bg-[#23202C]/60 border border-[#3E3648] flex items-center px-4 py-3 rounded-xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
                  <Target size={16} className="text-[#F472B6] mr-3" />
                  <select className="bg-transparent text-[#F5EFE8] font-mono text-sm outline-none w-full">
                    <option>Health & Fitness</option>
                    <option>Purchases</option>
                    <option>Location</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['var(--font-space-mono)'] text-[#B9B0C7] text-sm tracking-wider uppercase">Reward Pool</label>
                <div className="bg-[#23202C]/60 border border-[#3E3648] flex items-center px-4 py-3 rounded-xl shadow-[inset_0_1px_3px_rgba(0,0,0,0.1)]">
                  <span className="text-[#D4B15A] mr-3 font-bold">DUST</span>
                  <input type="number" defaultValue={500} className="bg-transparent text-[#F5EFE8] font-mono text-sm outline-none w-full" />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[#23202C]/40 border border-[#3E3648] rounded-xl p-6 flex flex-col gap-4 shadow-[inset_0_1px_5px_rgba(0,0,0,0.1)]">
            <h3 className="font-['var(--font-space-mono)'] text-[#F5EFE8] text-base border-b border-[#3E3648]/50 pb-3 mb-2">Cost Estimate</h3>
            
            <div className="flex justify-between items-center text-xs font-mono text-[#7E7890]">
              <span>Base Fee:</span>
              <span className="text-[#B9B0C7]">12.5 DUST</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-[#7E7890]">
              <span>Complexity:</span>
              <span className="text-[#B9B0C7]">High</span>
            </div>
            <div className="flex justify-between items-center text-xs font-mono text-[#7E7890]">
              <span>Est. Reach:</span>
              <span className="text-[#B9B0C7]">~4,200 nodes</span>
            </div>
            
            <div className="mt-auto pt-5 border-t border-[#3E3648]/50 flex justify-between items-center">
              <span className="font-['var(--font-space-mono)'] text-[#B9B0C7] text-sm uppercase">Total Cost:</span>
              <span className="font-['var(--font-space-mono)'] text-[#D4B15A] text-xl font-bold">512.5 DUST</span>
            </div>

            <button 
              onClick={handleExecute}
              disabled={isExecuting}
              className="mt-6 w-full bg-[#47E5BC] hover:bg-[#5EEAD4] border border-[#3E3648] text-[#2D2834] font-['var(--font-space-mono)'] font-bold text-sm py-3.5 rounded-xl shadow-[0_4px_15px_rgba(71,229,188,0.2)] hover:shadow-[0_6px_20px_rgba(71,229,188,0.3)] active:translate-y-1 transition-all disabled:opacity-50 flex justify-center items-center gap-2"
            >
              {isExecuting ? <span className="animate-pulse">COMPILING...</span> : <>EXECUTE QUERY <Activity size={16} /></>}
            </button>
          </div>
        </div>
      </div>

      {/* Mock Aggregate Result Card (Matching Reference Image Exact) */}
      <div className="bg-[#2D2834] border border-[#3E3648] p-6 shadow-[8px_8px_0px_#1A171F] relative">
         <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#4A474D] border-b border-l border-[#3E3648] text-[#B9B0C7] font-['var(--font-space-mono)'] font-bold text-xs shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
          LAST RESULT
        </div>
        <h3 className="font-['var(--font-space-mono)'] text-[#F5EFE8] text-lg mb-4 flex items-center gap-2">
          <Database size={18} className="text-[#B9B0C7]" />
          Query Q-4921
        </h3>
        <div className="bg-[#23202C] border border-[#3E3648] p-5 font-mono text-xs shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)] leading-relaxed">
          <p className="text-[#7E7890] mb-4">// ZK Proof verified at block {currentBlock - 14}</p>
          <p className="text-[#47E5BC]">{`{`}</p>
          <p className="pl-4"><span className="text-[#5EEAD4]">"query_id"</span><span className="text-[#B9B0C7]">:</span> <span className="text-[#47E5BC]">"Q-4921"</span><span className="text-[#B9B0C7]">,</span></p>
          <p className="pl-4"><span className="text-[#5EEAD4]">"aggregate_count"</span><span className="text-[#B9B0C7]">:</span> <span className="text-[#47E5BC]">184</span><span className="text-[#B9B0C7]">,</span></p>
          <p className="pl-4"><span className="text-[#5EEAD4]">"confidence"</span><span className="text-[#B9B0C7]">:</span> <span className="text-[#47E5BC]">"99.9%"</span></p>
          <p className="text-[#47E5BC]">{`}`}</p>
        </div>
      </div>
    </div>
  );
}
