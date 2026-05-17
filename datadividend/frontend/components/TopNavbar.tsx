"use client";

import { useSimulation } from "./SimulationProvider";
import { WalletState } from "@/lib/midnight";
import { Blocks, Wallet, Zap, ShieldCheck } from "lucide-react";

interface TopNavbarProps {
  walletState: WalletState | null;
  onDisconnect: () => void;
}

export default function TopNavbar({ walletState, onDisconnect }: TopNavbarProps) {
  const { currentBlock, earnings } = useSimulation();

  return (
    <header className="h-16 bg-[#21212b] border-b-4 border-[#16161d] flex items-center justify-between px-6 sticky top-0 z-50">
      
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-teal-400 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_rgba(0,0,0,1)]">
          <ShieldCheck size={18} className="text-black" />
        </div>
        <h1 className="text-xl font-bold font-['var(--font-vt323)'] tracking-wider text-white uppercase drop-shadow-[2px_2px_0_rgba(0,0,0,1)]">
          DataDividend
        </h1>
      </div>

      {/* Network & Wallet Info */}
      <div className="flex items-center gap-6 font-['var(--font-vt323)'] text-lg">
        
        {/* Block Number */}
        <div className="hidden md:flex items-center gap-2 text-gray-400 bg-[#16161d] px-3 py-1 border-2 border-[#16161d] shadow-[inset_2px_2px_0px_rgba(0,0,0,0.5)]">
          <Blocks size={14} className="text-pink-400" />
          <span>Block: <span className="text-pink-400">{currentBlock}</span></span>
        </div>

        {/* Status */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-400 border border-black shadow-[1px_1px_0_#000] animate-pulse" />
          <span className="text-emerald-400 uppercase drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">Midnight Preprod</span>
        </div>

        {/* Wallet Area */}
        {walletState ? (
          <div className="flex items-center gap-3 bg-[#2b2b36] border-2 border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] px-3 py-1">
            <div className="flex items-center gap-1.5 text-yellow-300">
              <Zap size={14} />
              <span>{earnings.toFixed(2)} DUST</span>
            </div>
            <div className="w-0.5 h-4 bg-black mx-1" />
            <button 
              onClick={onDisconnect}
              className="flex items-center gap-2 text-white hover:text-pink-400 transition-colors"
            >
              <Wallet size={14} />
              <span>
                {typeof walletState.address === 'string' ? `${walletState.address.slice(0,6)}...${walletState.address.slice(-4)}` : 'Connected'}
              </span>
            </button>
          </div>
        ) : (
          <div className="px-4 py-1.5 bg-gray-700 border-2 border-black text-gray-400 shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Disconnected
          </div>
        )}

      </div>
    </header>
  );
}
