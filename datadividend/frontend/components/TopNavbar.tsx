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
    <header className="h-16 bg-[#2D2834]/80 backdrop-blur-md border-b border-[#3E3648] flex items-center justify-between px-6 sticky top-0 z-50">
      
      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-[#47E5BC]/10 border border-[#47E5BC]/30 flex items-center justify-center rounded-lg">
          <ShieldCheck size={18} className="text-[#47E5BC]" />
        </div>
        <h1 className="text-xl font-bold font-['var(--font-space-mono)'] tracking-wider text-[#F5EFE8] uppercase">
          DataDividend
        </h1>
      </div>

      {/* Network & Wallet Info */}
      <div className="flex items-center gap-6 font-['var(--font-space-mono)'] text-sm text-[#F5EFE8]">
        
        {/* Block Number */}
        <div className="hidden md:flex items-center gap-2 bg-[#23202C]/50 px-3 py-1.5 border border-[#3E3648] rounded-md">
          <Blocks size={14} className="text-[#C084FC]" />
          <span className="text-[#B9B0C7]">Block: <span className="text-[#C084FC]">{currentBlock}</span></span>
        </div>

        {/* Status */}
        <div className="hidden sm:flex items-center gap-2">
          <div className="w-2 h-2 bg-[#47E5BC] rounded-full shadow-[0_0_8px_#47E5BC]" />
          <span className="text-[#47E5BC] text-xs">Preprod</span>
        </div>

        {/* Wallet Area */}
        {walletState ? (
          <div className="flex items-center gap-3 bg-[#23202C]/50 border border-[#3E3648] px-3 py-1.5 rounded-md">
            <div className="flex items-center gap-1.5 text-[#D4B15A]">
              <Zap size={14} />
              <span>{earnings.toFixed(2)} DUST</span>
            </div>
            <div className="w-[1px] h-4 bg-[#3E3648] mx-1" />
            <button 
              onClick={onDisconnect}
              className="flex items-center gap-2 text-[#B9B0C7] hover:text-[#47E5BC] transition-colors"
            >
              <Wallet size={14} />
              <span>
                {typeof walletState.address === 'string' ? `${walletState.address.slice(0,6)}...${walletState.address.slice(-4)}` : 'Connected'}
              </span>
            </button>
          </div>
        ) : (
          <div className="px-4 py-1.5 bg-[#23202C]/50 border border-[#3E3648] text-[#B9B0C7] rounded-md text-xs">
            Disconnected
          </div>
        )}

      </div>
    </header>
  );
}
