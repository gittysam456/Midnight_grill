"use client";

import { useState } from "react";
import { connectMidnightWallet, WalletState } from "@/lib/midnight";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Fingerprint, AlertCircle } from "lucide-react";

// Components
import TopNavbar from "@/components/TopNavbar";
import LeftSidebar from "@/components/LeftSidebar";
import StatsRow from "@/components/StatsRow";
import DataVaultUpload from "@/components/DataVaultUpload";
import ConsentDashboard from "@/components/ConsentDashboard";
import MarketplaceRequests from "@/components/MarketplaceRequests";
import ActivityFeed from "@/components/ActivityFeed";
import MarketplaceBuyer from "@/components/MarketplaceBuyer";

export default function Home() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    try {
      const connection = await connectMidnightWallet("preprod");
      setWalletState(connection.state);
    } catch (err: any) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setIsConnecting(false);
    }
  };

  const renderContent = () => {
    if (activeTab === "buyer") {
      return (
        <motion.div
          key="buyer"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="p-8 pb-32"
        >
          <MarketplaceBuyer />
        </motion.div>
      );
    }

    // Default Dashboard Layout
    return (
      <motion.div
        key="dashboard"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className="p-8 pb-32 max-w-7xl mx-auto"
      >
        <StatsRow />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <DataVaultUpload />
          <ConsentDashboard />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
          <MarketplaceRequests />
          <ActivityFeed />
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-[#1e1e24] text-gray-200 selection:bg-pink-400 selection:text-black flex flex-col font-sans overflow-hidden">
      
      {/* Background Pixel Grid */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

      {walletState ? (
        <>
          <TopNavbar walletState={walletState} onDisconnect={() => setWalletState(null)} />
          <div className="flex flex-1 relative z-10 pt-16 mt-[-4rem]"> {/* Adjust for fixed navbar */}
            <LeftSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="flex-1 md:ml-64 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden custom-scrollbar">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </main>
          </div>
        </>
      ) : (
        <main className="flex-1 flex flex-col items-center justify-center relative z-10 px-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#21212b] border-4 border-black p-10 md:p-16 max-w-2xl w-full text-center shadow-[16px_16px_0px_rgba(0,0,0,1)] relative"
          >
            <div className="w-24 h-24 bg-teal-400 border-4 border-black shadow-[4px_4px_0_#000] mx-auto mb-8 flex items-center justify-center">
              <ShieldCheck size={48} className="text-black" />
            </div>

            <h1 className="text-5xl md:text-6xl font-['var(--font-vt323)'] uppercase text-white drop-shadow-[4px_4px_0_#000] mb-6">
              DataDividend
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 font-medium">
              Zero-knowledge data monetization. 
              <br/> Earn <span className="text-pink-400 font-bold drop-shadow-[1px_1px_0_#000]">DUST</span> while keeping your raw data locally encrypted.
            </p>

            {error && (
              <div className="mb-8 flex items-center justify-center gap-2 text-red-400 bg-red-950/50 p-4 border-2 border-red-500 shadow-[4px_4px_0_rgba(239,68,68,1)]">
                <AlertCircle size={20} />
                <span className="font-['var(--font-vt323)'] text-xl">{error}</span>
              </div>
            )}

            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full md:w-auto mx-auto bg-pink-400 hover:bg-pink-300 border-4 border-black text-black font-['var(--font-vt323)'] text-2xl py-4 px-12 shadow-[8px_8px_0px_rgba(0,0,0,1)] active:shadow-[0px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:translate-x-2 transition-all disabled:opacity-50 flex items-center justify-center gap-3"
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-4 border-black border-t-transparent animate-spin" />
                  CONNECTING...
                </>
              ) : (
                <>
                  CONNECT WALLET <Fingerprint size={24} />
                </>
              )}
            </button>
          </motion.div>
        </main>
      )}
    </div>
  );
}
