"use client";

import { useSimulation } from "./SimulationProvider";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar } from 'recharts';
import { useEffect, useState } from "react";
import { TrendingUp, Database, Coins, Activity } from "lucide-react";

const revenueData = [
  { day: 'Mon', revenue: 45 },
  { day: 'Tue', revenue: 52 },
  { day: 'Wed', revenue: 88 },
  { day: 'Thu', revenue: 110 },
  { day: 'Fri', revenue: 154 },
  { day: 'Sat', revenue: 195 },
  { day: 'Sun', revenue: 230 },
];

const categoryData = [
  { name: 'Financial', value: 85 },
  { name: 'Location', value: 65 },
  { name: 'Health', value: 45 },
  { name: 'Shopping', value: 30 },
];

export default function Analytics() {
  const { weeklyGrowth, totalProofs } = useSimulation();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="mb-12">
      <div className="flex flex-col mb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
          <span className="text-emerald-400">5.</span> Revenue Analytics
        </h2>
        <p className="text-sm text-gray-400 mt-1">Detailed breakdown of your data monetization performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-7 shadow-2xl relative overflow-hidden group flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs">Weekly Revenue Growth</h3>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full">
              <TrendingUp size={14} /> +{weeklyGrowth.toFixed(1)}%
            </div>
          </div>
          
          <div className="flex-1 w-full h-[250px]">
            {mounted && (
              <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#181820', borderColor: '#374151', borderRadius: '12px', color: '#fff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Side Metrics */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-6 shadow-2xl">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Top Earning Category</h3>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-400 rounded-xl">
                <Database size={24} />
              </div>
              <div>
                <p className="text-lg font-bold text-gray-200">Financial Behavior</p>
                <p className="text-sm text-emerald-400 font-medium">~40 DUST/week</p>
              </div>
            </div>
          </div>

          <div className="bg-[#101016]/80 backdrop-blur-xl border border-gray-800/80 rounded-3xl p-6 shadow-2xl flex-1 flex flex-col">
            <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4">Proofs Served</h3>
            <div className="flex items-end gap-2 mb-4">
              <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {totalProofs.toLocaleString()}
              </span>
              <span className="text-sm text-gray-500 font-bold mb-1">lifetime</span>
            </div>
            
            <div className="flex-1 w-full mt-auto h-[80px]">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%" minHeight={80}>
                  <BarChart data={categoryData}>
                    <Tooltip cursor={{ fill: '#1f2937' }} contentStyle={{ backgroundColor: '#181820', borderColor: '#374151', borderRadius: '8px', color: '#fff' }} />
                    <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
