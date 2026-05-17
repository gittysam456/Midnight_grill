"use client";

import { useState, useRef, useEffect } from "react";
import { Coins, Copy, LogOut, ChevronDown, Activity, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { WalletState } from "@/lib/midnight";
import { motion, AnimatePresence } from "framer-motion";

interface WalletDropdownProps {
  walletState: WalletState;
  onDisconnect: () => void;
}

export default function WalletDropdown({ walletState, onDisconnect }: WalletDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const address = typeof walletState.address === 'string' 
    ? walletState.address 
    : JSON.stringify(walletState.address) || "Unknown";

  const shortAddress = address.length > 14 
    ? `${address.slice(0, 8)}...${address.slice(-6)}` 
    : address;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 bg-[#181820]/80 border border-gray-700/80 hover:border-gray-600 hover:bg-[#202028] py-2 pl-4 pr-3 rounded-2xl shadow-inner transition-all duration-300"
      >
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span className="text-sm font-mono text-gray-200 font-medium">
            {shortAddress}
          </span>
        </div>
        <div className="h-5 w-px bg-gray-700 mx-1" />
        <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-400">
          <Coins size={14} />
          <span>42.5 DUST</span>
        </div>
        <ChevronDown size={16} className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-3 w-64 bg-[#101016] border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div className="p-4 border-b border-gray-800/80 bg-[#181820]/40">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Connected Network</p>
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-emerald-500" />
                <span className="text-sm text-gray-200 font-medium">Midnight Preprod</span>
              </div>
            </div>
            
            <div className="p-2 flex flex-col gap-1">
              <button 
                onClick={copyToClipboard}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#181820] rounded-xl transition-colors w-full text-left"
              >
                <Copy size={16} className="text-gray-500" />
                <span>Copy Full Address</span>
              </button>
              
              <button 
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-300 hover:text-white hover:bg-[#181820] rounded-xl transition-colors w-full text-left"
                onClick={() => {
                  toast.info("Opening Midnight Explorer...");
                  setIsOpen(false);
                }}
              >
                <ExternalLink size={16} className="text-gray-500" />
                <span>View on Explorer</span>
              </button>
              
              <div className="h-px bg-gray-800/80 my-1 mx-2" />
              
              <button 
                onClick={() => {
                  onDisconnect();
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 px-3 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors w-full text-left"
              >
                <LogOut size={16} className="text-red-500" />
                <span>Disconnect</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
