"use client";

import { useState } from "react";
import { useSimulation } from "./SimulationProvider";
import { Upload, FileJson, CheckSquare, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function DataVaultUpload() {
  const { simulateUpload, uploadLogs } = useSimulation();
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
    simulateUpload("health_metrics_2026.csv");
    setTimeout(() => {
      setIsUploading(false);
    }, 6000);
  };

  return (
    <div className="bg-[#2D2834]/80 backdrop-blur-md border border-[#3E3648] p-6 shadow-[4px_4px_15px_rgba(0,0,0,0.1)] rounded-2xl relative overflow-hidden flex flex-col h-full">
      <div className="absolute top-0 right-0 px-4 py-1.5 bg-[#47E5BC]/10 border-b border-l border-[#47E5BC]/30 text-[#47E5BC] font-['var(--font-space-mono)'] font-bold text-xs rounded-bl-xl z-10 shadow-[0_0_10px_rgba(71,229,188,0.1)]">
        VAULT UPLOAD
      </div>
      
      <div className="flex flex-col gap-5 mt-4 flex-1">
        
        {/* Dropzone */}
        <div 
          onClick={!isUploading ? handleUpload : undefined}
          className={`border-2 border-dashed border-[#52485D] bg-[#23202C]/40 rounded-xl p-8 text-center transition-all flex flex-col items-center justify-center
            ${!isUploading 
              ? 'hover:border-[#47E5BC]/50 hover:bg-[#47E5BC]/5 cursor-pointer hover:shadow-[0_0_15px_rgba(71,229,188,0.05)]' 
              : 'opacity-50 cursor-not-allowed'
            }`}
        >
          <Upload size={32} className={`${isUploading ? 'text-[#7E7890]' : 'text-[#B9B0C7] group-hover:text-[#47E5BC]'} mb-3`} />
          <p className="font-['var(--font-space-mono)'] text-[#F5EFE8] text-sm mb-2">
            Click to select or drag CSV/JSON
          </p>
          <p className="text-[10px] text-[#7E7890] font-mono uppercase tracking-wider bg-[#23202C] px-2 py-1 rounded border border-[#3E3648]">End-to-End Encrypted</p>
        </div>

        {/* Upload Terminal */}
        <div className="h-40 bg-[#23202C]/80 border border-[#3E3648] rounded-xl p-4 font-mono text-xs flex flex-col gap-1.5 overflow-y-auto shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]">
          {uploadLogs.length === 0 && !isUploading && (
            <span className="text-[#7E7890]">&gt; Awaiting file drop...</span>
          )}
          
          <AnimatePresence>
            {uploadLogs.map((log) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-start gap-2 leading-relaxed"
              >
                <span className="text-[#C084FC] mt-0.5">&gt;</span>
                <span className={log.message.includes('✓') ? 'text-[#47E5BC]' : 'text-[#B9B0C7]'}>{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isUploading && uploadLogs.length > 0 && uploadLogs.length < 5 && (
            <motion.div animate={{ opacity: [1, 0.4, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="flex items-center gap-2 mt-1">
              <span className="text-[#5EEAD4]">&gt;</span>
              <div className="w-1.5 h-3 bg-[#5EEAD4]" />
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
