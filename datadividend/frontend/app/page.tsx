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
    <div className="min-h-screen bg-[#E9D7CC] text-[#F5EFE8] selection:bg-[#47E5BC] selection:text-[#2D2834] flex flex-col overflow-hidden">
      
      {/* Soft Dotted Grid (Matching Reference) */}
      <div className="fixed inset-0 pointer-events-none opacity-20 z-0" style={{ backgroundImage: 'radial-gradient(#52485D 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

      {walletState ? (
        <>
          <TopNavbar walletState={walletState} onDisconnect={() => setWalletState(null)} />
          <div className="flex flex-1 relative z-10 pt-16 mt-[-4rem]">
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
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="bg-[#2D2834]/80 backdrop-blur-md border border-[#3E3648] p-10 md:p-16 max-w-2xl w-full text-center shadow-[4px_4px_15px_rgba(0,0,0,0.15)] rounded-2xl relative"
          >
            <div className="w-20 h-20 bg-[#47E5BC]/10 border border-[#47E5BC]/30 shadow-[0_0_15px_rgba(71,229,188,0.2)] mx-auto mb-8 flex items-center justify-center rounded-xl">
              <ShieldCheck size={40} className="text-[#47E5BC]" />
            </div>

            <h1 className="text-4xl md:text-5xl font-['var(--font-space-mono)'] uppercase text-[#F5EFE8] mb-6 tracking-tight">
              DataDividend
            </h1>
            
            <p className="text-[#B9B0C7] mb-12 font-medium leading-relaxed max-w-md mx-auto">
              Secure blockchain terminal. 
              <br/> Earn <span className="text-[#D4B15A] font-bold">DUST</span> while keeping your raw data locally encrypted.
            </p>

            {error && (
              <div className="mb-8 flex items-center justify-center gap-2 text-[#F472B6] bg-[#F472B6]/10 p-4 border border-[#F472B6]/30 rounded-xl">
                <AlertCircle size={20} />
                <span className="font-['var(--font-space-mono)'] text-sm">{error}</span>
              </div>
            )}

            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="w-full md:w-auto mx-auto bg-[#47E5BC] hover:bg-[#5EEAD4] border border-[#3E3648] text-[#2D2834] font-['var(--font-space-mono)'] font-bold text-lg py-3 px-10 shadow-[0_4px_15px_rgba(71,229,188,0.3)] hover:shadow-[0_6px_20px_rgba(71,229,188,0.4)] active:translate-y-1 transition-all disabled:opacity-50 flex items-center justify-center gap-3 rounded-xl"
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#2D2834] border-t-transparent animate-spin rounded-full" />
                  CONNECTING
                </>
              ) : (
                <>
                  CONNECT TERMINAL <Fingerprint size={20} />
                </>
              )}
            </button>
          </motion.div>
        </main>
      )}
    </div>
  );
}
