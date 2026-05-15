import React, { useState, useEffect } from 'react';

const App = () => {
  const [data, setData] = useState(null);
  const [threats, setThreats] = useState([]);
  const [status, setStatus] = useState('OFFLINE');

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/live-monitor');

    ws.onopen = () => setStatus('SCANNING');
    ws.onmessage = (event) => {
      const result = JSON.parse(event.data);
      setData(result);
      if (result.status !== 'SECURE') {
        setThreats(prev => [result, ...prev].slice(0, 10));
      }
    };
    ws.onclose = () => setStatus('OFFLINE');

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-spy-black text-white font-mono p-4 lg:p-8">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-center border-b border-white/10 pb-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tighter text-spy-cyan italic">SPY-IMSICD</h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest">Advanced IMSI Catcher Detector | v1.0.0 PRO</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-gray-400 mb-1">ENGINE STATUS</div>
          <div className={`text-xs font-bold px-3 py-1 rounded border ${status === 'SCANNING' ? 'border-spy-cyan text-spy-cyan animate-pulse' : 'border-red-500 text-red-500'}`}>
            ● {status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN: RADAR & METRICS */}
        <div className="space-y-6">
          <div className="bg-spy-dark border border-white/5 p-6 rounded-3xl backdrop-blur-md">
            <h2 className="text-xs font-bold mb-6 text-gray-400 tracking-widest">SIGNAL RADAR</h2>
            <div className="relative aspect-square flex items-center justify-center border border-spy-cyan/20 rounded-full">
              <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(0,243,255,0.05)_1%,_transparent_70%)]" />
              <div className="w-full h-[1px] bg-spy-cyan/30 absolute animate-spin" style={{animationDuration: '4s'}} />
              <span className="text-[10px] text-spy-cyan font-bold">{data?.metrics.signal || 0} dBm</span>
            </div>
          </div>

          <div className="bg-spy-dark border border-white/5 p-6 rounded-3xl">
            <h2 className="text-xs font-bold mb-4 text-gray-400 tracking-widest">CURRENT CELL DATA</h2>
            <div className="space-y-3">
              <DataRow label="CELL ID" value={data?.tower_info.cid || '---'} />
              <DataRow label="LAC" value={data?.tower_info.lac || '---'} color="text-yellow-400" />
              <DataRow label="MCC/MNC" value={`${data?.tower_info.mcc || '0'}/${data?.tower_info.mnc || '0'}`} />
              <DataRow label="THREAT SCORE" value={`${data?.metrics.score || 0}/100`} color="text-spy-red" />
            </div>
          </div>
        </div>

        {/* CENTER & RIGHT: LOGS & ALERTS */}
        <div className="lg:col-span-2 space-y-6">
          {/* ALERT PANEL */}
          <div className={`p-6 rounded-3xl border transition-all duration-500 ${data?.status === 'CRITICAL' ? 'bg-spy-red/10 border-spy-red' : 'bg-spy-dark border-white/5'}`}>
            <h2 className="text-xs font-bold mb-4 tracking-widest uppercase">System Intelligence Alert</h2>
            {data?.alerts.length > 0 ? (
              data.alerts.map((alert, i) => (
                <div key={i} className="text-sm text-spy-red font-bold mb-1">» {alert}</div>
              ))
            ) : (
              <div className="text-sm text-gray-500 italic">No anomalies detected in the current sector.</div>
            )}
          </div>

          {/* FORENSIC LOGS */}
          <div className="bg-spy-dark border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <h2 className="text-xs font-bold tracking-widest">FORENSIC ACTIVITY LOG</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[11px]">
                <thead className="text-gray-500 uppercase bg-black/20">
                  <tr>
                    <th className="p-4">Time</th>
                    <th className="p-4">Cell ID</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Evidence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {threats.map((t, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">{new Date(t.timestamp * 1000).toLocaleTimeString()}</td>
                      <td className="p-4 font-bold">{t.tower_info.cid}</td>
                      <td className="p-4"><span className="text-spy-red px-2 py-0.5 rounded border border-spy-red/30 bg-spy-red/5">{t.status}</span></td>
                      <td className="p-4 text-gray-400">{t.alerts[0] || 'Unknown anomaly'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DataRow = ({ label, value, color = "text-spy-cyan" }) => (
  <div className="flex justify-between border-b border-white/5 pb-2">
    <span className="text-[10px] text-gray-500 uppercase tracking-tighter">{label}</span>
    <span className={`text-xs font-bold ${color}`}>{value}</span>
  </div>
);

export default App;
