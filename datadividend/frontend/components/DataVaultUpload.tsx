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
    <div className="bg-[#21212b] border-4 border-black p-6 shadow-[8px_8px_0px_rgba(0,0,0,1)] relative">
      <div className="absolute top-0 right-0 px-3 py-1 bg-teal-400 border-l-4 border-b-4 border-black text-black font-['var(--font-vt323)'] font-bold text-lg">
        VAULT UPLOAD
      </div>
      
      <div className="flex flex-col gap-4 mt-4">
        
        {/* Dropzone */}
        <div 
          onClick={!isUploading ? handleUpload : undefined}
          className={`border-4 border-dashed border-gray-600 bg-[#16161d] p-8 text-center cursor-pointer transition-colors ${!isUploading ? 'hover:border-teal-400 hover:bg-[#1a1a24]' : 'opacity-50 cursor-not-allowed'}`}
        >
          <Upload size={32} className="text-gray-400 mx-auto mb-3" />
          <p className="font-['var(--font-vt323)'] text-gray-300 text-xl drop-shadow-[1px_1px_0_#000]">
            CLICK TO SELECT OR DRAG CSV/JSON
          </p>
          <p className="text-xs text-gray-500 mt-2 font-mono uppercase tracking-wider">End-to-End Encrypted</p>
        </div>

        {/* Upload Terminal */}
        <div className="h-40 bg-black border-4 border-[#333] p-4 font-mono text-xs text-gray-400 flex flex-col gap-1 overflow-y-auto">
          {uploadLogs.length === 0 && !isUploading && (
            <span className="text-gray-600">&gt; Awaiting file drop...</span>
          )}
          
          <AnimatePresence>
            {uploadLogs.map((log) => (
              <motion.div 
                key={log.id}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-2"
              >
                <span className="text-pink-400">&gt;</span>
                <span className={log.message.includes('✓') ? 'text-emerald-400' : 'text-gray-300'}>{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isUploading && uploadLogs.length > 0 && uploadLogs.length < 5 && (
            <motion.div animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="flex items-center gap-2 mt-1">
              <span className="text-teal-400">&gt;</span>
              <div className="w-2 h-4 bg-teal-400" />
            </motion.div>
          )}
        </div>

      </div>
    </div>
  );
}
