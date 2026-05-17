"use client";

import { useState } from "react";
import { Terminal, Target, Database, Activity, Search } from "lucide-react";
import { toast } from "sonner";
import { useSimulation } from "./SimulationProvider";

export default function MarketplaceBuyer() {
  const { currentBlock } = useSimulation();
  const [isExecuting, setIsExecuting] = useState(false);
  const [queryText, setQueryText] = useState("SELECT COUNT(id) FROM Users WHERE age BETWEEN 25 AND 34 AND visits_gym > 2;");

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
      <div className="bg-[#21212b] border-4 border-black p-8 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
        <div className="absolute top-0 right-0 px-4 py-2 bg-rose-400 border-l-4 border-b-4 border-black text-black font-['var(--font-vt323)'] font-bold text-2xl">
          BUYER MARKETPLACE
        </div>
        
        <h2 className="font-['var(--font-vt323)'] text-white text-3xl uppercase drop-shadow-[2px_2px_0_#000] mb-2 mt-4">Execute ZK Query</h2>
        <p className="text-gray-400 font-mono text-sm mb-8">Deploy zero-knowledge circuits to query encrypted datasets without compromising user privacy.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-4">
            
            <div className="flex flex-col gap-2">
              <label className="font-['var(--font-vt323)'] text-gray-300 text-xl tracking-wider">Query Definition (SQL-like syntax)</label>
              <div className="bg-black border-4 border-[#333] p-1 focus-within:border-teal-400 transition-colors">
                <textarea 
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  className="w-full bg-transparent text-teal-400 font-mono text-sm p-3 outline-none resize-none h-32"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="font-['var(--font-vt323)'] text-gray-300 text-xl tracking-wider">Target Audience</label>
                <div className="bg-[#16161d] border-2 border-black flex items-center px-3 py-2">
                  <Target size={16} className="text-pink-400 mr-2" />
                  <select className="bg-transparent text-white font-mono text-sm outline-none w-full">
                    <option>Health & Fitness</option>
                    <option>Purchases</option>
                    <option>Location</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="font-['var(--font-vt323)'] text-gray-300 text-xl tracking-wider">Reward Pool (DUST)</label>
                <div className="bg-[#16161d] border-2 border-black flex items-center px-3 py-2">
                  <span className="text-yellow-400 mr-2 font-bold">∑</span>
                  <input type="number" defaultValue={500} className="bg-transparent text-white font-mono text-sm outline-none w-full" />
                </div>
              </div>
            </div>

          </div>

          <div className="bg-[#16161d] border-4 border-black p-5 flex flex-col gap-4">
            <h3 className="font-['var(--font-vt323)'] text-gray-300 text-xl border-b-2 border-gray-800 pb-2">Execution Cost Estimate</h3>
            
            <div className="flex justify-between items-center text-sm font-mono text-gray-400">
              <span>Base Fee:</span>
              <span className="text-gray-200">12.5 DUST</span>
            </div>
            <div className="flex justify-between items-center text-sm font-mono text-gray-400">
              <span>Circuit Complexity:</span>
              <span className="text-gray-200">High</span>
            </div>
            <div className="flex justify-between items-center text-sm font-mono text-gray-400">
              <span>Estimated Reach:</span>
              <span className="text-gray-200">~4,200 nodes</span>
            </div>
            
            <div className="mt-auto pt-4 border-t-2 border-gray-800 flex justify-between items-center">
              <span className="font-['var(--font-vt323)'] text-gray-300 text-lg">Total Cost:</span>
              <span className="font-['var(--font-vt323)'] text-yellow-400 text-2xl drop-shadow-[1px_1px_0_#000]">512.5 DUST</span>
            </div>

            <button 
              onClick={handleExecute}
              disabled={isExecuting}
              className="mt-4 w-full bg-rose-400 hover:bg-rose-300 border-4 border-black text-black font-['var(--font-vt323)'] text-xl py-3 shadow-[4px_4px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 active:translate-x-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {isExecuting ? <span className="animate-pulse">COMPILING...</span> : <>EXECUTE QUERY <Activity size={18} /></>}
            </button>
          </div>
        </div>
      </div>

      {/* Mock Aggregate Result Card */}
      <div className="bg-[#21212b] border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative opacity-75">
         <div className="absolute top-0 right-0 px-3 py-1 bg-gray-600 border-l-4 border-b-4 border-black text-black font-['var(--font-vt323)'] font-bold text-lg">
          LAST RESULT
        </div>
        <h3 className="font-['var(--font-vt323)'] text-gray-300 text-2xl mb-4 flex items-center gap-2">
          <Database size={20} className="text-gray-400" />
          Query Q-4921
        </h3>
        <div className="bg-black border-2 border-[#333] p-4 font-mono text-sm text-emerald-400">
          <p className="text-gray-500 mb-2">// ZK Proof verified at block {currentBlock - 14}</p>
          <p>{`{`}</p>
          <p className="pl-4">{`"query_id": "Q-4921",`}</p>
          <p className="pl-4">{`"aggregate_count": 184,`}</p>
          <p className="pl-4">{`"confidence": "99.9%"`}</p>
          <p>{`}`}</p>
        </div>
      </div>
    </div>
  );
}
