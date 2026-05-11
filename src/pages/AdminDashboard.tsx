import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  LayoutDashboard, 
  Users, 
  Gamepad2, 
  History, 
  Settings, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  Search,
  Plus,
  MoreVertical,
  ShieldAlert,
  Loader2,
  RefreshCw,
  Clock,
  Terminal
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "../lib/auth";
import { Navigate } from "react-router-dom";
import { collection, onSnapshot, query, updateDoc, doc, limit, orderBy, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

const REVENUE_DATA = [
  { name: '00:00', value: 4000 },
  { name: '04:00', value: 3000 },
  { name: '08:00', value: 2000 },
  { name: '12:00', value: 2780 },
  { name: '16:00', value: 1890 },
  { name: '20:00', value: 2390 },
  { name: '23:59', value: 3490 },
];

const USER_ACTIVITY_DATA = [
  { name: 'Mon', count: 400 },
  { name: 'Tue', count: 300 },
  { name: 'Wed', count: 200 },
  { name: 'Thu', count: 500 },
  { name: 'Fri', count: 800 },
  { name: 'Sat', count: 1200 },
  { name: 'Sun', count: 900 },
];

// Stats with real counters where possible
const INITIAL_STATS = [
  { label: "Total Revenue", value: "---", change: "---", icon: DollarSign, color: "text-neon-green" },
  { label: "Active Users", value: "---", change: "---", icon: Users, color: "text-blue-400" },
  { label: "Total Bets", value: "---", change: "---", icon: Activity, color: "text-purple-400" },
  { label: "System Health", value: "99.9%", change: "Stable", icon: TrendingUp, color: "text-orange-400" },
];

export default function AdminDashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [usersBoard, setUsersBoard] = useState<any[]>([]);
  const [stats, setStats] = useState(INITIAL_STATS);
  const [loading, setLoading] = useState(true);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    if (!profile?.isAdmin) return;

    // Real-time Users List
    const usersQuery = query(collection(db, "users"), limit(20));
    const unsubUsers = onSnapshot(usersQuery, (snap) => {
      const usersData = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsersBoard(usersData);
      
      // Update Stats
      setStats(prev => prev.map(s => {
        if (s.label === "Active Users") return { ...s, value: snap.size.toString(), change: "LIVE" };
        if (s.label === "Total Revenue") return { ...s, value: "$142,850", change: "+4.2%" };
        if (s.label === "Total Bets") return { ...s, value: "852k", change: "+12.8%" };
        return s;
      }));
      setLoading(false);
    });

    // Real-time Audit Logs
    const logsQuery = query(collection(db, "audit_logs"), orderBy("timestamp", "desc"), limit(50));
    const unsubLogs = onSnapshot(logsQuery, (snap) => {
      setAuditLogs(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubUsers();
      unsubLogs();
    };
  }, [profile]);

  const logAdminAction = async (action: string, targetId: string, details: string) => {
    try {
      await addDoc(collection(db, "audit_logs"), {
        adminId: user?.uid,
        adminName: profile?.displayName || user?.email,
        action,
        targetId,
        details,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.error("Failed to log admin action:", err);
    }
  };

  const handleUpdateBalance = async (userId: string, currentBalance: number, amount: number) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        balance: currentBalance + amount
      });
      await logAdminAction("BALANCE_UPDATE", userId, `Adjusted balance by ${amount}. New: ${currentBalance + amount}`);
    } catch (err) {
      console.error("Failed to update balance:", err);
    }
  };

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        isAdmin: !currentStatus
      });
      await logAdminAction("ADMIN_TOGGLE", userId, `Changed admin status to ${!currentStatus}`);
    } catch (err) {
      console.error("Failed to toggle admin status:", err);
    }
  };

  if (authLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Loader2 className="text-neon-green animate-spin" size={48} />
    </div>
  );

  // Requirement: Only accessible by users with isAdmin: true
  if (!user || !profile?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white pt-20">
      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <aside className="w-64 border-r border-white/5 bg-zinc-950/50 backdrop-blur-xl p-6 hidden md:block">
          <div className="mb-10 px-2">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 mb-6 flex items-center gap-2">
              <ShieldAlert size={12} className="text-neon-green" /> 
              Admin Control
            </h2>
            <nav className="space-y-1">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "users", label: "User Records", icon: Users },
                { id: "games", label: "Game Control", icon: Gamepad2 },
                { id: "logs", label: "Audit Logs", icon: History },
                { id: "settings", label: "Global Settings", icon: Settings },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all italic",
                    activeTab === item.id 
                      ? "text-neon-green bg-neon-green/5 border-l-2 border-neon-green" 
                      : "text-gray-500 hover:text-white hover:bg-white/5"
                  )}
                >
                  <item.icon size={16} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-4 bg-zinc-900/50 border border-white/5 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mainframe Status</span>
            </div>
            <p className="text-[9px] text-gray-600 font-mono">LATENCY: 12ms | OPS: 1.2k/s</p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-8 lg:p-12 custom-scrollbar">
          {activeTab === "overview" && (
            <div className="space-y-10">
              <div className="flex items-end justify-between">
                <div>
                  <h1 className="text-4xl md:text-6xl font-display font-black italic uppercase tracking-tighter mb-2">
                    System <span className="text-neon-green neon-glow-green">Summary</span>
                  </h1>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">Operational Pulse Monitor</p>
                </div>
                <div className="flex gap-4">
                   <button className="casino-button-primary scale-75 flex items-center gap-2">
                     <RefreshCw size={14} /> Refresh Data
                   </button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-6 bg-zinc-900 border border-white/5 hover:border-neon-green/30 transition-all"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={cn("p-2 rounded bg-black border border-white/5", stat.color)}>
                        <stat.icon size={20} />
                      </div>
                      <span className="text-[10px] font-black text-neon-green flex items-center gap-1 uppercase">
                        {stat.change} <ArrowUpRight size={10} />
                      </span>
                    </div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-gray-500 mb-1">{stat.label}</p>
                    <h3 className="text-2xl font-display font-black italic">{stat.value}</h3>
                  </motion.div>
                ))}
              </div>

              {/* Data Visualization Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="p-8 bg-zinc-900 border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase italic tracking-widest">Revenue Matrix</h3>
                    <div className="flex gap-2">
                       <div className="w-3 h-3 bg-neon-green" />
                       <span className="text-[10px] font-mono text-gray-500 uppercase">Live Intake</span>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={REVENUE_DATA}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#39FF14" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#39FF14" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#4b5563" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#4b5563" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                          tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', fontSize: '10px' }}
                          itemStyle={{ color: '#39FF14' }}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#39FF14" 
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="p-8 bg-zinc-900 border border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-black uppercase italic tracking-widest">User Protocols</h3>
                    <div className="flex gap-2">
                       <span className="text-[10px] font-mono text-gray-500 uppercase">Weekly Engagement</span>
                    </div>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={USER_ACTIVITY_DATA}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                        <XAxis 
                          dataKey="name" 
                          stroke="#4b5563" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <YAxis 
                          stroke="#4b5563" 
                          fontSize={10} 
                          tickLine={false} 
                          axisLine={false}
                        />
                        <Tooltip 
                          cursor={{fill: '#ffffff05'}}
                          contentStyle={{ backgroundColor: '#18181b', border: '1px solid #ffffff10', fontSize: '10px' }}
                          itemStyle={{ color: '#39FF14' }}
                        />
                        <Bar dataKey="count" fill="#39FF14" radius={[4, 4, 0, 0]}>
                           {USER_ACTIVITY_DATA.map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                cursor="pointer" 
                                fill={index === 5 ? '#39FF14' : '#39FF1460'} 
                              />
                           ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* User management in overview for quick access */}
              <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-black uppercase italic tracking-wider">Identity Records</h3>
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
                        <input 
                          type="text" 
                          placeholder="Search identity..." 
                          className="bg-black border border-white/10 pl-10 pr-4 py-2 text-[10px] font-mono focus:border-neon-green/50 outline-none w-48"
                        />
                      </div>
                      <button className="p-2 border border-white/10 hover:border-neon-green/50 transition-colors">
                        <Plus size={16} className="text-neon-green" />
                      </button>
                    </div>
                  </div>

                  <div className="border border-white/5 bg-zinc-950 overflow-hidden">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-white/5 bg-zinc-900/50">
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Identity</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Inventory (NEON)</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Privilege</th>
                          <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersBoard.map((user, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <span className="text-sm font-black italic uppercase tracking-wider">{user.displayName}</span>
                                <span className="text-[10px] text-gray-500 font-mono">{user.email}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 font-mono text-sm">
                              <div className="flex items-center gap-3">
                                <span className="text-neon-green">{user.balance?.toLocaleString()}</span>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleUpdateBalance(user.id, user.balance, 1000)} className="w-6 h-6 flex items-center justify-center bg-green-500/10 text-green-500 border border-green-500/20 text-[10px]">+</button>
                                  <button onClick={() => handleUpdateBalance(user.id, user.balance, -1000)} className="w-6 h-6 flex items-center justify-center bg-red-500/10 text-red-500 border border-red-500/20 text-[10px]">-</button>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={() => toggleAdmin(user.id, user.isAdmin)}
                                className={cn(
                                  "px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded-full border transition-all",
                                  user.isAdmin ? "border-neon-green/40 text-neon-green bg-neon-green/10" : "border-gray-500/20 text-gray-500 bg-gray-500/5 hover:border-white hover:text-white"
                                )}
                              >
                                {user.isAdmin ? "SYSTEM_ADMIN" : "STANDARD_USER"}
                              </button>
                            </td>
                            <td className="px-6 py-4">
                              <button className="text-gray-500 hover:text-white transition-colors">
                                <MoreVertical size={16} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
          )}

          {activeTab === "logs" && (
            <div className="space-y-10">
               <div>
                  <h1 className="text-4xl md:text-6xl font-display font-black italic uppercase tracking-tighter mb-2">
                    Audit <span className="text-neon-green neon-glow-green">Logs</span>
                  </h1>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">Protocol Action Serialization</p>
                </div>

                <div className="space-y-4">
                  {auditLogs.length === 0 ? (
                    <div className="p-12 border border-dashed border-white/10 rounded-xl text-center">
                       <Terminal className="mx-auto text-gray-700 mb-4" size={48} />
                       <p className="text-gray-600 font-mono text-xs uppercase tracking-widest">No active protocols detected in buffer</p>
                    </div>
                  ) : (
                    auditLogs.map((log) => (
                      <div key={log.id} className="p-6 bg-zinc-900 border border-white/5 flex items-start gap-6 hover:border-neon-green/30 transition-all">
                        <div className="p-3 bg-black border border-white/5 text-neon-green">
                           <Clock size={16} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                             <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-green">{log.action}</span>
                                <span className="text-gray-700">•</span>
                                <span className="text-[10px] font-mono text-gray-500">{new Date(log.timestamp?.toDate()).toLocaleString()}</span>
                             </div>
                             <span className="text-[9px] font-mono text-gray-600">ID: {log.id.slice(0, 8)}</span>
                          </div>
                          <p className="text-sm font-bold text-white mb-2">{log.details}</p>
                          <div className="flex items-center gap-4 text-[10px] font-mono">
                             <span className="text-gray-500 uppercase tracking-widest">Operator: <span className="text-white">{log.adminName}</span></span>
                             <span className="text-gray-500 uppercase tracking-widest">Target: <span className="text-blue-400">{log.targetId}</span></span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
            </div>
          )}

          {activeTab !== "overview" && activeTab !== "logs" && (
            <div className="flex flex-col items-center justify-center h-full opacity-30 italic">
               <Activity size={80} className="text-neon-green mb-6 animate-pulse" />
               <h3 className="text-4xl font-black uppercase">Segment <span className="text-neon-green">Encrypted</span></h3>
               <p className="text-gray-500 text-sm mt-4 tracking-[0.4em] uppercase font-bold">Awaiting Data Population</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
