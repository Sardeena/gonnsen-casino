import React, { useEffect, useState } from "react";
import GameCard, { Game } from "@/src/components/GameCard";
import { Search, Filter, SlidersHorizontal, Trophy, Crown, Medal, TrendingUp, Zap } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";
import { ALL_GAMES } from "../constants/games";
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";

const LEADERBOARD_CATEGORIES = [
    { label: "High Rollers", id: "balance" },
    { label: "Hot Streak", id: "streak" },
    { label: "Legendary Wins", id: "win" }
];

const CATEGORIES = ["All", "Slots", "Table", "Cards", "Progressive", "Instant"];

export default function Games() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [topPlayers, setTopPlayers] = useState<any[]>([]);

    useEffect(() => {
        const topQuery = query(collection(db, "users"), orderBy("balance", "desc"), limit(5));
        const unsub = onSnapshot(topQuery, (snap) => {
            setTopPlayers(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => unsub();
    }, []);

    const filteredGames = ALL_GAMES.filter(g => {
        const matchesSearch = g.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = activeCategory === "All" || g.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="py-20 lg:py-32">
            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-display font-black italic text-white mb-6 uppercase tracking-tighter">Game <span className="text-neon-green neon-glow-green">Universe</span></h1>
                    <p className="text-sm text-gray-500 max-w-2xl uppercase tracking-widest font-medium">Browse our library of over 1,000 premium titles. Filter by category or search for your favorite experience.</p>
                </div>

                {/* Filters */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
                    <div className="flex flex-wrap gap-3">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={cn(
                                    "px-5 py-2.5 text-[10px] font-black italic uppercase tracking-[0.2em] transition-all border",
                                    activeCategory === cat 
                                        ? "bg-neon-green text-black border-neon-green shadow-[0_0_15px_rgba(57,255,20,0.3)]" 
                                        : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-96 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-neon-green transition-colors" size={16} />
                        <input 
                            type="text" 
                            placeholder="SEARCH MATRIX..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-6 outline-none text-white focus:border-neon-green/50 transition-all font-mono text-xs uppercase"
                        />
                    </div>
                </div>

                {/* Grid & Sidebar */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Grid */}
                    <div className="lg:col-span-9 space-y-12">
                        {filteredGames.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {filteredGames.map((game, i) => (
                                    <GameCard key={game.id} game={game} index={i} />
                                ))}
                            </div>
                        ) : (
                            <div className="py-32 text-center">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Search className="text-gray-600" size={32} />
                                </div>
                                <h3 className="text-2xl font-display font-bold text-white mb-2">No games found</h3>
                                <p className="text-gray-500">Try adjusting your filters or search keywords.</p>
                            </div>
                        )}

                        {/* Pagination Placeholder */}
                        <div className="flex justify-center gap-2">
                            {[1, 2, 3, "...", 12].map((p, i) => (
                                <button key={i} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:border-neon-green/50 transition-all font-bold">
                                    {p}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sidebar / Leaderboard */}
                    <aside className="lg:col-span-3 space-y-10">
                        {/* Elite Leaderboard */}
                        <div className="bg-zinc-900 border border-white/5 overflow-hidden">
                            <div className="p-6 border-b border-white/5 bg-zinc-800/50 flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white flex items-center gap-2">
                                    <Trophy size={14} className="text-neon-green" /> 
                                    Elite Operatives
                                </h3>
                                <Crown size={14} className="text-gold animate-pulse" />
                            </div>
                            <div className="p-2">
                                {topPlayers.length === 0 ? (
                                    [1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="p-4 flex items-center gap-4 opacity-50">
                                            <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-[10px] font-mono">{i}</div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-2 w-24 bg-white/5 rounded" />
                                                <div className="h-1.5 w-16 bg-white/5 rounded" />
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    topPlayers.map((player, i) => (
                                        <motion.div 
                                            key={player.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors group cursor-default"
                                        >
                                            <div className={cn(
                                                "w-10 h-10 flex items-center justify-center font-display font-black italic text-lg border",
                                                i === 0 ? "border-gold text-gold bg-gold/5 shadow-[0_0_10px_rgba(212,175,55,0.2)]" :
                                                i === 1 ? "border-silver text-silver bg-silver/5" :
                                                i === 2 ? "border-bronze text-bronze bg-bronze/5" : "border-white/5 text-gray-500"
                                            )}>
                                                {i + 1}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-black uppercase italic tracking-wider text-white truncate group-hover:text-neon-green transition-colors">
                                                    {player.displayName || "Unknown Identity"}
                                                </p>
                                                <div className="flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                                                    <TrendingUp size={10} className="text-neon-green" />
                                                    PROFIT: <span className="text-gray-300">+{Math.floor(Math.random() * 500)}%</span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-black italic text-neon-green">{player.balance?.toLocaleString()}</p>
                                                <p className="text-[8px] font-black uppercase text-gray-600 tracking-tighter">NEON</p>
                                            </div>
                                        </motion.div>
                                    ))
                                )}
                            </div>
                            <div className="p-4 bg-black/40 border-t border-white/5">
                                <button className="w-full py-3 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors">View All Protocols</button>
                            </div>
                        </div>

                        {/* Recent Wins Live Feed */}
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 px-2 flex items-center gap-2">
                                <Zap size={12} className="text-neon-green animate-bounce" />
                                Matrix Stream
                            </h3>
                            <div className="space-y-2">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="p-4 bg-zinc-900 border border-white/5 border-l-2 border-l-neon-green italic group hover:border-white/10 transition-all">
                                        <div className="flex justify-between items-start mb-1">
                                            <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">User_#{Math.floor(Math.random() * 999)}</p>
                                            <span className="text-[8px] font-mono text-gray-700">LIVE</span>
                                        </div>
                                        <p className="text-[11px] font-bold text-white uppercase group-hover:text-neon-green transition-colors">WIN 5,402 NEON ON CYBER REELS</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
