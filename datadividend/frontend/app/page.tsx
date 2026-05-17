"use client";

import { useState } from "react";
import { connectMidnightWallet, WalletState } from "@/lib/midnight";
import { Shield, Fingerprint, Database, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Section Components
import HeroOverview from "@/components/HeroOverview";
import ConsentDashboard from "@/components/ConsentDashboard";
import MarketplaceRequests from "@/components/MarketplaceRequests";
import ProofTimeline from "@/components/ProofTimeline";
import Analytics from "@/components/Analytics";
import PrivacyTrustPanel from "@/components/PrivacyTrustPanel";
import ActivityFeed from "@/components/ActivityFeed";

export default function Home() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [walletState, setWalletState] = useState<WalletState | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const handleDisconnect = () => {
    setWalletState(null);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-gray-100 selection:bg-indigo-500/30 overflow-x-hidden font-sans">
      
      {/* Immersive Background Elements */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
      <div className="fixed bottom-[-10%] right-[-20%] w-[60%] h-[60%] bg-blue-900/10 rounded-full blur-[180px] pointer-events-none mix-blend-screen" />
      <div className="fixed top-[40%] right-[10%] w-[30%] h-[30%] bg-purple-900/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-[0.03] pointer-events-none" />

      <main className="max-w-[1200px] mx-auto px-6 pt-10 pb-32 relative z-10">

        {walletState ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col w-full"
          >
            {/* 1. HERO OVERVIEW */}
            <HeroOverview walletState={walletState} onDisconnect={handleDisconnect} />
            
            {/* 2. DATA VAULT CONSENT CENTER */}
            <ConsentDashboard />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 3. LIVE MARKETPLACE REQUESTS */}
              <div className="flex flex-col">
                <MarketplaceRequests />
              </div>
              
              {/* 4. ZK PROOF ACTIVITY TIMELINE */}
              <div className="flex flex-col">
                <ProofTimeline />
              </div>
            </div>

            {/* 5. REVENUE ANALYTICS */}
            <Analytics />

            {/* 6. PRIVACY TRUST PANEL & 7. LIVE ACTIVITY FEED */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="flex flex-col">
                <PrivacyTrustPanel />
              </div>
              <div className="flex flex-col">
                <ActivityFeed />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mt-32 text-center max-w-3xl mx-auto flex flex-col items-center relative"
          >
            {/* Disconnected State Hero */}
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none rounded-[3rem]" />
            
            <div className="w-28 h-28 bg-[#101016]/80 border border-gray-800 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl relative group">
              <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-[2rem] group-hover:bg-indigo-500/30 transition-colors duration-500" />
              <Shield size={48} className="text-indigo-400 relative z-10" />
              
              <div className="absolute -top-4 -right-4 bg-[#181820] border border-gray-700 p-2 rounded-xl shadow-xl shadow-black/50 animate-bounce">
                <Sparkles size={20} className="text-emerald-400" />
              </div>
              <div className="absolute -bottom-2 -left-4 bg-[#181820] border border-gray-700 p-2 rounded-xl shadow-xl shadow-black/50">
                <Database size={16} className="text-blue-400" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500 mb-8 tracking-tighter leading-tight">
              Monetize your data with <br/> zero-knowledge privacy.
            </h1>
            
            <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl font-medium">
              Companies pay for aggregate insights. Your raw data never leaves your device. 
              Connect your Midnight wallet to start earning passive <span className="text-emerald-400 font-bold">DUST</span>.
            </p>
            
            {error && (
              <div className="mb-6 flex items-center gap-2 text-red-400 text-sm bg-red-950/40 px-4 py-2 rounded-xl border border-red-500/20">
                <AlertCircle size={16} />
                <span>{error}</span>
              </div>
            )}

            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="group relative bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-extrabold py-5 px-12 rounded-2xl text-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(99,102,241,0.3)] hover:shadow-[0_0_60px_rgba(99,102,241,0.5)] disabled:opacity-50 flex items-center gap-3"
            >
              {isConnecting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Connecting Wallet...</span>
                </>
              ) : (
                <>
                  <span>Launch Dashboard</span>
                  <Fingerprint size={22} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
