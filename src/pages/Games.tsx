import React from "react";
import GameCard, { Game } from "@/src/components/GameCard";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

const ALL_GAMES: Game[] = [
    { 
        id: "g1", title: "Cyber Reels", category: "Slots", 
        image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800", rating: 4.9, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-cyber-connection-loop-23429-large.mp4",
        isPopular: true 
    },
    { 
        id: "g2", title: "Neon Roulette", category: "Table", 
        image: "https://images.unsplash.com/photo-1596838132731-dd9fd73ef441?auto=format&fit=crop&q=80&w=800", rating: 4.8, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-bright-neon-lights-pulsing-in-pink-and-blue-40015-large.mp4",
        isNew: true 
    },
    { 
        id: "g3", title: "Blackjack Zero", category: "Cards", 
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800", rating: 4.7,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-futuristic-binary-code-screens-23439-large.mp4"
    },
    { 
        id: "g4", title: "Matrix Jackpot", category: "Progressive", 
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", rating: 5.0, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-digital-circuit-board-animation-loop-23420-large.mp4",
        isPopular: true 
    },
    { 
        id: "g5", title: "Dragon Spins", category: "Slots", 
        image: "https://images.unsplash.com/photo-1614741484745-4200424564ad?auto=format&fit=crop&q=80&w=800", rating: 4.6, 
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-energetic-bright-neon-tunnel-movement-40011-large.mp4",
        isNew: true 
    },
    { 
        id: "g6", title: "Virtual Poker", category: "Cards", 
        image: "https://images.unsplash.com/photo-1543282834-6019316cd465?auto=format&fit=crop&q=80&w=800", rating: 4.5,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-shimmering-geometric-structure-23428-large.mp4"
    },
    { 
        id: "g7", title: "Retro Keno", category: "Instant", 
        image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?auto=format&fit=crop&q=80&w=800", rating: 4.2,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-intro-for-a-sci-fi-high-tech-movie-23424-large.mp4"
    },
    { 
        id: "g8", title: "Laser Dice", category: "Table", 
        image: "https://images.unsplash.com/photo-1605806616949-1e87b487fc2f?auto=format&fit=crop&q=80&w=800", rating: 4.4,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-bright-neon-lights-pulsing-in-pink-and-blue-40015-large.mp4"
    },
    { 
        id: "g9", title: "Titan Slots", category: "Slots", 
        image: "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?auto=format&fit=crop&q=80&w=800", rating: 4.8,
        previewVideo: "https://assets.mixkit.co/videos/preview/mixkit-abstract-cyber-connection-loop-23429-large.mp4"
    },
];

const CATEGORIES = ["All", "Slots", "Table", "Cards", "Progressive", "Instant"];

export default function Games() {
    const [search, setSearch] = React.useState("");
    const [activeCategory, setActiveCategory] = React.useState("All");

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

                {/* Grid */}
                {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                <div className="mt-20 flex justify-center gap-2">
                    {[1, 2, 3, "...", 12].map((p, i) => (
                        <button key={i} className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:border-neon-blue transition-all font-bold">
                            {p}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
