import React, { useState, useEffect } from 'react';
import MapTracker from './components/MapTracker';
import RadarDisplay from './components/RadarDisplay';
import TowerTable from './components/TowerTable';

/**
 * SPY-IMSICD MAIN DASHBOARD
 * Brand: Indonesia OSINT / SPY-E
 * Style: Glassmorphism Cyber-Forensics
 */

const App = () => {
  const [data, setData] = useState(null);
  const [threats, setThreats] = useState([]);
  const [status, setStatus] = useState('OFFLINE');

  useEffect(() => {
    // Pastikan backend FastAPI jalan di port 8000
    // Gunakan 'ws://[IP_ANONIM]:8000/ws/live-monitor' jika di VPS
    const ws = new WebSocket('ws://localhost:8000/ws/live-monitor');

    ws.onopen = () => {
      setStatus('SCANNING');
      console.log("Connected to SPY-IMSICD Engine");
    };

    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      setData(result);
      
      // Jika terdeteksi ancaman (Bukan SECURE), masukkan ke log forensik
      if (result.status !== 'SECURE') {
        setThreats(prev => [result, ...prev].slice(0, 50));
      }
    };

    ws.onclose = () => {
      setStatus('OFFLINE');
      console.log("Disconnected from Engine");
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-mono p-4 lg:p-8 selection:bg-cyan-500/30">
      
      {/* --- HEADER BAR --- */}
      <header className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
        <div className="relative">
          <h1 className="text-3xl font-black tracking-tighter text-cyan-400 italic italic">
            SPY-IMSICD
            <span className="absolute -top-1 -right-12 text-[9px] bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-cyan-400 not-italic uppercase tracking-widest">PRO</span>
          </h1>
          <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-1">Indonesia OSINT • Signal Intelligence</p>
        </div>

        <div className="flex gap-6 items-center">
          <div className="hidden md:block text-right">
            <div className="text-[9px] text-slate-500 mb-1 uppercase">SDR Module</div>
            <div className="text-xs font-bold text-slate-300">RTL-SDR / HACKRF ONE</div>
          </div>
          <div className="h-10 w-[1px] bg-white/10 hidden md:block"></div>
          <div className="text-right">
            <div className="text-[9px] text-slate-500 mb-1 uppercase tracking-widest text-right">Engine Status</div>
            <div className={`flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full border ${status === 'SCANNING' ? 'border-cyan-500/30 text-cyan-400 bg-cyan-400/5 shadow-[0_0_10px_rgba(34,211,238,0.1)]' : 'border-red-500/30 text-red-500 bg-red-500/5'}`}>
              <span className={`w-2 h-2 rounded-full ${status === 'SCANNING' ? 'bg-cyan-400 animate-pulse' : 'bg-red-500'}`}></span>
              {status}
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN GRID SYSTEM --- */}
      <div className="grid grid-cols-12 gap-6">
        
        {/* LEFT COLUMN (Radar & Stats) */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          
          {/* Radar Visualization */}
          <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <h3 className="text-[10px] font-bold text-slate-500 mb-6 uppercase tracking-[0.2em]">Signal Spectrum Radar</h3>
            <RadarDisplay active={status === 'SCANNING'} threatLevel={data?.status} />
          </div>

          {/* Current Cell Metrics */}
          <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl backdrop-blur-xl">
             <h3 className="text-[10px] font-bold text-slate-500 mb-6 uppercase tracking-[0.2em]">Cellular Telemetry</h3>
             <div className="space-y-4">
                <StatRow label="Cell ID (CID)" value={data?.tower_info?.cid || '---'} />
                <StatRow label="Location Area (LAC)" value={data?.tower_info?.lac || '---'} color="text-yellow-400" />
                <StatRow label="Operator (MCC/MNC)" value={`${data?.tower_info?.mcc || '0'}/${data?.tower_info?.mnc || '0'}`} />
                <StatRow label="Power Level" value={`${data?.metrics?.signal || '0'} dBm`} />
                <div className="pt-4 mt-4 border-t border-white/5">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] text-slate-500 uppercase">Threat Score</span>
                    <span className={`text-xl font-black ${data?.metrics?.score > 40 ? 'text-red-500' : 'text-cyan-400'}`}>
                      {data?.metrics?.score || '0'}<span className="text-[10px] text-slate-600 ml-1">/100</span>
                    </span>
                  </div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${data?.metrics?.score > 40 ? 'bg-red-500' : 'bg-cyan-400'}`} 
                      style={{ width: `${data?.metrics?.score || 0}%` }}
                    />
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Map, Alerts & Logs) */}
        <div className="col-span-12 lg:col-span-8 space-y-6">
          
          {/* Geo-Intelligence Map Integration */}
          <div className="bg-white/[0.03] border border-white/10 p-2 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="p-4 flex justify-between items-center">
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Geospatial Intelligence Map</h3>
               <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                  <span className="text-[9px] text-green-500 font-bold uppercase">Live GPS Feed</span>
               </div>
            </div>
            <MapTracker towerData={data} />
          </div>

          {/* System Intelligence Alerts */}
          <div className={`p-6 rounded-3xl border-2 transition-all duration-500 ${data?.status === 'CRITICAL' ? 'bg-red-500/10 border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.15)]' : 'bg-white/[0.03] border-white/10'}`}>
             <h3 className="text-[10px] font-bold text-slate-500 mb-4 uppercase tracking-[0.2em]">Intel Alert Analysis</h3>
             {data?.alerts?.length > 0 ? (
               <div className="space-y-2">
                 {data.alerts.map((alert, i) => (
                   <div key={i} className="flex items-start gap-3 text-red-400 font-bold text-sm">
                     <span className="animate-pulse">⚠</span>
                     <span className="tracking-tight uppercase">{alert}</span>
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-sm text-slate-500 italic">Sector clear. Monitoring radio environment for anomalies...</p>
             )}
          </div>

          {/* Forensic Activity Table */}
          <div className="bg-white/[0.03] border border-white/10 rounded-3xl backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Forensic Activity Archive</h3>
               <button className="text-[9px] font-bold text-cyan-400 border border-cyan-400/30 px-3 py-1 rounded hover:bg-cyan-400/10 transition active:scale-95">DOWNLOAD DB</button>
            </div>
            <TowerTable logs={threats} />
          </div>

        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer className="mt-12 text-center border-t border-white/5 pt-8 pb-4">
        <p className="text-[10px] text-slate-600 tracking-[0.5em] uppercase">SPY-IMSICD • Secure Communications Protocol • 2026</p>
      </footer>
    </div>
  );
};

/**
 * Reusable Component for Statistics Row
 */
const StatRow = ({ label, value, color = "text-cyan-400" }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-2">
    <span className="text-[10px] text-slate-500 uppercase tracking-tighter font-medium">{label}</span>
    <span className={`text-sm font-bold tracking-tight ${color}`}>{value}</span>
  </div>
);

export default App;
