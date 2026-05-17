"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

export interface QueryEvent {
  id: string;
  buyer: string;
  dataset: string;
  reward: string;
  contributors: number;
  status: "Generating proof..." | "Verifying aggregate..." | "Reward distribution..." | "Complete ✓";
  timestamp: number;
}

export interface ActivityEvent {
  id: string;
  timestamp: number;
  message: string;
  txHash?: string;
  category: "marketplace" | "proof" | "reward" | "system";
}

export interface UploadLog {
  id: string;
  message: string;
  status: "pending" | "success" | "error";
}

interface SimulationState {
  currentBlock: number;
  earnings: number;
  consents: Record<string, boolean>;
  activeQueries: QueryEvent[];
  activityFeed: ActivityEvent[];
  uploadLogs: UploadLog[];
  protectedDatasets: number;
  totalProofs: number;
  weeklyGrowth: number;
  toggleConsent: (id: string, name: string) => void;
  simulateUpload: (filename: string) => void;
}

const defaultConsents = {
  purchases: true,
  health: false,
  location: true,
  appUsage: false,
  fitness: false,
};

const mockBuyers = ["RetailAI DAO", "HealthCorp", "Urban Mobility Labs", "AdTarget Systems"];
const mockQueries = [
  "How many users aged 25-34 workout weekly?",
  "What is the average weekly spending on coffee?",
  "How many users visit downtown > 3x a week?",
  "What is the average screen time per day?",
];

const SimulationContext = createContext<SimulationState | null>(null);

const generateMockTxHash = () => `0x${Array.from({ length: 8 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}...${Array.from({ length: 4 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`;

export function SimulationProvider({ children }: { children: ReactNode }) {
  const [currentBlock, setCurrentBlock] = useState(8921445);
  const [consents, setConsents] = useState<Record<string, boolean>>(defaultConsents);
  const [earnings, setEarnings] = useState(4.82);
  const [activeQueries, setActiveQueries] = useState<QueryEvent[]>([]);
  const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>([]);
  const [uploadLogs, setUploadLogs] = useState<UploadLog[]>([]);
  const [protectedDatasets, setProtectedDatasets] = useState(124);
  const [totalProofs, setTotalProofs] = useState(1892);

  // Load state on mount
  useEffect(() => {
    const saved = localStorage.getItem("dataDividendConsentsV2");
    if (saved) setConsents(JSON.parse(saved));
  }, []);

  const addFeedEvent = (message: string, category: ActivityEvent["category"], withTx = false) => {
    setActivityFeed(prev => [{ 
      id: Math.random().toString(), 
      timestamp: Date.now(), 
      message, 
      category,
      txHash: withTx ? generateMockTxHash() : undefined
    }, ...prev].slice(0, 20));
  };

  useEffect(() => {
    const activeCount = Object.values(consents).filter(Boolean).length;
    setProtectedDatasets(activeCount * 42);
  }, [consents]);

  const toggleConsent = (id: string, name: string) => {
    setConsents((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      localStorage.setItem("dataDividendConsentsV2", JSON.stringify(newState));
      
      if (newState[id]) {
        toast.success(`Vault updated`, { description: `${name} is now shielded.` });
        addFeedEvent(`Shielded record committed: ${name}`, "system", true);
      } else {
        toast.info(`Vault updated`, { description: `${name} sharing paused.` });
        addFeedEvent(`Consent updated: ${name} sharing revoked`, "system", true);
      }
      return newState;
    });
  };

  const simulateUpload = (filename: string) => {
    setUploadLogs([]);
    const logs = [
      { msg: `${filename} uploaded`, delay: 500 },
      { msg: `${Math.floor(Math.random() * 5000 + 1000)} rows parsed`, delay: 1500 },
      { msg: `Categories detected`, delay: 2500 },
      { msg: `Encrypted locally ✓`, delay: 4000 },
      { msg: `Committed to Midnight ✓`, delay: 5500 }
    ];

    logs.forEach((log, index) => {
      setTimeout(() => {
        setUploadLogs(prev => [...prev, { id: Math.random().toString(), message: log.msg, status: "success" }]);
        if (index === logs.length - 1) {
            addFeedEvent(`New dataset committed to vault`, "system", true);
            setProtectedDatasets(p => p + 14);
        }
      }, log.delay);
    });
  };

  // Demo Simulation Loops
  useEffect(() => {
    const activeCount = Object.values(consents).filter(Boolean).length;
    if (activeCount === 0) return;

    // 1. Block Ticker
    const blockInterval = setInterval(() => {
      setCurrentBlock(prev => prev + 1);
    }, 12000); // Average block time

    // 2. Marketplace Logic
    const marketInterval = setInterval(() => {
      setActiveQueries(prev => {
        let updated = prev.map(q => {
          if (q.status === "Complete ✓") return q;
          
          const transitions: Record<string, QueryEvent["status"]> = {
            "Generating proof...": "Verifying aggregate...",
            "Verifying aggregate...": "Reward distribution...",
            "Reward distribution...": "Complete ✓"
          };
          
          const nextStatus = transitions[q.status];
          if (nextStatus && Math.random() > 0.4) {
            if (nextStatus === "Verifying aggregate...") {
                addFeedEvent(`ZK proof verified for ${q.buyer} query`, "proof", true);
            }
            if (nextStatus === "Complete ✓") {
              const rewardVal = parseFloat(q.reward);
              const cut = (rewardVal * 0.05).toFixed(2);
              addFeedEvent(`Reward distributed: +${cut} DUST`, "reward", true);
              setTotalProofs(p => p + 1);
              setEarnings(e => parseFloat((e + parseFloat(cut)).toFixed(2)));
              toast.success("Reward distributed", { description: `+${cut} DUST added to vault` });
            }
            return { ...q, status: nextStatus };
          }
          return q;
        });

        // Add new queries
        if (Math.random() < 0.4 && updated.length < 4) {
          const buyer = mockBuyers[Math.floor(Math.random() * mockBuyers.length)];
          const dataset = mockQueries[Math.floor(Math.random() * mockQueries.length)];
          addFeedEvent(`${buyer} query executed`, "marketplace", true);
          
          const newQ: QueryEvent = {
            id: `REQ-${Math.floor(Math.random() * 90000)}`,
            buyer,
            dataset,
            reward: `${(Math.random() * 5 + 1).toFixed(1)} DUST`,
            contributors: Math.floor(Math.random() * 300) + 50,
            status: "Generating proof...",
            timestamp: Date.now(),
          };
          updated = [newQ, ...updated].slice(0, 5);
        }
        return updated.filter(q => q.status !== "Complete ✓" || Date.now() - q.timestamp < 8000);
      });
    }, 5000);

    return () => {
      clearInterval(blockInterval);
      clearInterval(marketInterval);
    };
  }, [consents]);

  return (
    <SimulationContext.Provider value={{ currentBlock, earnings, consents, activeQueries, activityFeed, uploadLogs, protectedDatasets, totalProofs, toggleConsent, simulateUpload }}>
      {children}
    </SimulationContext.Provider>
  );
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within a SimulationProvider");
  return context;
}
