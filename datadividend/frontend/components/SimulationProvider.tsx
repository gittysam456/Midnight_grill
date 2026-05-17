"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface QueryEvent {
  id: string;
  buyer: string;
  dataset: string;
  purpose: string;
  privacyLevel: "Standard" | "Strict" | "Maximum";
  reward: string;
  participants: number;
  status: "Searching datasets" | "Awaiting consent" | "Generating proof" | "Proof verified" | "Reward distributed";
  timeRemaining: string;
  timestamp: number;
}

export interface ProofStep {
  id: string;
  timestamp: number;
  message: string;
  type: "info" | "processing" | "success" | "reward";
}

export interface ActivityEvent {
  id: string;
  timestamp: number;
  message: string;
  category: "marketplace" | "proof" | "reward" | "system";
}

interface SimulationState {
  earnings: number;
  weeklyGrowth: number;
  consents: Record<string, boolean>;
  activeQueries: QueryEvent[];
  proofTimeline: ProofStep[];
  activityFeed: ActivityEvent[];
  privacyScore: number;
  protectedDatasets: number;
  totalProofs: number;
  toggleConsent: (id: string, name: string) => void;
}

const defaultConsents = {
  purchases: true,
  health: false,
  location: true,
  appUsage: false,
  streaming: true,
  financial: false,
};

const mockBuyers = ["RetailAI DAO", "HealthAnalytics Inc", "Urban Mobility Labs", "AdTarget Systems", "Consumer Insight Network"];
const mockDatasets = ["Spending Trends", "Fitness Ranges", "Mobility Heatmap", "App Engagement", "Content Preferences"];
const mockPurposes = ["Market Research", "Academic Study", "Infrastructure Planning", "Behavioral Targeting", "Demographic Analysis"];

const SimulationContext = createContext<SimulationState | null>(null);

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [consents, setConsents] = useState<Record<string, boolean>>(defaultConsents);
  const [earnings, setEarnings] = useState(428.50);
  const [weeklyGrowth, setWeeklyGrowth] = useState(12.4);
  const [activeQueries, setActiveQueries] = useState<QueryEvent[]>([]);
  const [proofTimeline, setProofTimeline] = useState<ProofStep[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>([]);
  const [privacyScore, setPrivacyScore] = useState(96);
  const [protectedDatasets, setProtectedDatasets] = useState(124);
  const [totalProofs, setTotalProofs] = useState(1892);

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("dataDividendConsentsExpanded");
    if (saved) setConsents(JSON.parse(saved));
    
    // Seed initial data
    addFeedEvent("System initialized securely. ZK proving environment ready.", "system");
  }, []);

  const addProofStep = (message: string, type: ProofStep["type"]) => {
    setProofTimeline(prev => [...prev.slice(-15), { id: Math.random().toString(), timestamp: Date.now(), message, type }]);
  };

  const addFeedEvent = (message: string, category: ActivityEvent["category"]) => {
    setActivityFeed(prev => [{ id: Math.random().toString(), timestamp: Date.now(), message, category }, ...prev].slice(0, 20));
  };

  useEffect(() => {
    const activeCount = Object.values(consents).filter(Boolean).length;
    setPrivacyScore(100 - activeCount); // Max sharing = 94% privacy score (still high due to ZK)
    setProtectedDatasets(activeCount * 42);
  }, [consents]);

  const toggleConsent = (id: string, name: string) => {
    setConsents((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      localStorage.setItem("dataDividendConsentsExpanded", JSON.stringify(newState));
      
      if (newState[id]) {
        toast.success(`Vault updated`, { description: `${name} is now queryable.` });
        addFeedEvent(`Consent updated: ${name} sharing enabled`, "system");
        addProofStep(`Dataset [${name.toUpperCase()}] unlocked for matching`, "info");
      } else {
        toast.info(`Vault updated`, { description: `${name} sharing paused.` });
        addFeedEvent(`Consent updated: ${name} sharing revoked`, "system");
      }
      return newState;
    });
  };

  // Demo Simulation Loops
  useEffect(() => {
    const activeCount = Object.values(consents).filter(Boolean).length;
    if (activeCount === 0) return;

    // 1. Live Earnings Ticker
    const earningInterval = setInterval(() => {
      setEarnings(prev => prev + (Math.random() * 0.05));
    }, 2000);

    // 2. Marketplace Logic
    const marketInterval = setInterval(() => {
      setActiveQueries(prev => {
        let updated = prev.map(q => {
          if (q.status === "Reward distributed") return q;
          
          const transitions: Record<string, QueryEvent["status"]> = {
            "Searching datasets": "Awaiting consent",
            "Awaiting consent": "Generating proof",
            "Generating proof": "Proof verified",
            "Proof verified": "Reward distributed"
          };
          
          const nextStatus = transitions[q.status];
          if (nextStatus && Math.random() > 0.4) {
            // Push to timeline/feed based on status change
            if (nextStatus === "Generating proof") addProofStep(`Generating zero-knowledge proof for ${q.buyer}...`, "processing");
            if (nextStatus === "Proof verified") {
              addProofStep(`Proof verified successfully on chain`, "success");
              addFeedEvent(`Proof validated successfully for ${q.dataset}`, "proof");
              setTotalProofs(p => p + 1);
            }
            if (nextStatus === "Reward distributed") {
              const rewardVal = parseFloat(q.reward);
              const cut = (rewardVal * 0.01).toFixed(2);
              addProofStep(`+${cut} DUST credited from ${q.buyer}`, "reward");
              addFeedEvent(`Reward settled: +${cut} DUST`, "reward");
              setEarnings(e => e + parseFloat(cut));
              toast.success("Reward distributed", { description: `+${cut} DUST added to vault` });
            }
            return { ...q, status: nextStatus };
          }
          return q;
        });

        // Add new queries
        if (Math.random() < 0.4 && updated.length < 5) {
          const buyer = mockBuyers[Math.floor(Math.random() * mockBuyers.length)];
          const dataset = mockDatasets[Math.floor(Math.random() * mockDatasets.length)];
          addFeedEvent(`New marketplace demand: ${buyer} is searching for ${dataset}`, "marketplace");
          addProofStep(`Request received from ${buyer} for ${dataset}`, "info");
          
          const newQ: QueryEvent = {
            id: `REQ-${Math.floor(Math.random() * 90000)}`,
            buyer,
            dataset,
            purpose: mockPurposes[Math.floor(Math.random() * mockPurposes.length)],
            privacyLevel: Math.random() > 0.5 ? "Maximum" : "Strict",
            reward: `${(Math.random() * 50 + 10).toFixed(1)} DUST`,
            participants: Math.floor(Math.random() * 10000),
            status: "Searching datasets",
            timeRemaining: `${Math.floor(Math.random() * 20 + 2)}m`,
            timestamp: Date.now(),
          };
          updated = [newQ, ...updated].slice(0, 6);
        }
        return updated.filter(q => q.status !== "Reward distributed" || Date.now() - q.timestamp < 10000);
      });
    }, 4000);

    return () => {
      clearInterval(earningInterval);
      clearInterval(marketInterval);
    };
  }, [consents]);

  return (
    <SimulationContext.Provider value={{ earnings, weeklyGrowth, consents, activeQueries, proofTimeline, activityFeed, privacyScore, protectedDatasets, totalProofs, toggleConsent }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within a SimulationProvider");
  return context;
}
