import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Play, ShieldCheck, Trophy, Info, ChevronLeft, Star, Heart, Share2, Coins } from "lucide-react";
import confetti from "canvas-confetti";

const GAMES_DB = {
    "g1": { title: "Cyber Reels", rtp: "98.2%", maxWin: "50,000x", volatility: "High", provider: "NeonGaming" },
    "g2": { title: "Neon Roulette", rtp: "97.3%", maxWin: "36x", volatility: "Medium", provider: "StaticCore" },
    "g3": { title: "Blackjack Zero", rtp: "99.5%", maxWin: "3:2", volatility: "Low", provider: "NeonGaming" },
    "g4": { title: "Matrix Jackpot", rtp: "94.0%", maxWin: "1,000,000x", volatility: "Extreme", provider: "OmegaSlots" },
};

export default function GameDetails() {
  const { id } = useParams();
  const game = GAMES_DB[id as keyof typeof GAMES_DB] || { title: "Unknown Game", rtp: "0%", maxWin: "0", volatility: "N/A", provider: "N/A" };

  const handleDemo = () => {
    confetti({
      particleCount: 150,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#39ff14", "#D4AF37", "#ffffff"]
    });
  };

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/games" className="inline-flex items-center gap-2 text-zinc-600 hover:text-white transition-colors mb-12 font-black italic tracking-widest text-[10px] uppercase">
          <ChevronLeft size={14} /> Back to Library
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content */}
          <div className="lg:col-span-8">
             <div className="relative aspect-video glass-panel border border-white/5 mb-12 group overflow-hidden shadow-2xl">
                <img 
                    src={`https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1920`} 
                    className="w-full h-full object-cover grayscale opacity-40 transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100" 
                    alt={game.title}
                    referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-[1px]">
                   <button 
                    onClick={handleDemo}
                    className="w-24 h-24 bg-neon-green rounded-lg rotate-12 flex items-center justify-center text-black shadow-[0_0_40px_rgba(57,255,20,0.4)] hover:scale-110 hover:rotate-0 transition-transform"
                   >
                     <Play size={40} fill="currentColor" className="ml-1" />
                   </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                   <div className="flex gap-2">
                     <span className="px-3 py-1 bg-black/80 text-[9px] font-black italic text-white uppercase border border-white/10 tracking-[0.2em] skew-x-[-10deg]">Demo Protocol</span>
                     <span className="px-3 py-1 bg-neon-green text-[9px] font-black italic text-black uppercase tracking-[0.2em] skew-x-[-10deg]">Authenticated</span>
                   </div>
                   <div className="flex gap-2">
                      <button className="p-4 bg-black/80 text-white hover:text-neon-pink transition-colors border border-white/10"><Heart size={16} /></button>
                      <button className="p-4 bg-black/80 text-white hover:text-neon-green transition-colors border border-white/10"><Share2 size={16} /></button>
                   </div>
                </div>
             </div>

             <div className="mb-16">
               <div className="flex items-center gap-6 mb-6">
                 <h1 className="text-5xl md:text-7xl font-display font-black italic text-white uppercase tracking-tighter">{game.title}</h1>
                 <div className="flex items-center gap-2 text-gold font-mono text-sm font-bold bg-white/5 px-4 py-2 border border-gold/20">
                    <Star size={14} fill="currentColor" />
                    <span>4.9</span>
                 </div>
               </div>
               <p className="text-gray-500 leading-relaxed text-base uppercase tracking-wider font-medium mb-12">
                 Experience the peak of digital craftsmanship with {game.title}. Developed by {game.provider}, this experience combines high-frequency mechanics with a sprawling neon aesthetic that pushes the boundaries of modern entertainment.
               </p>

               <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                 {[
                   { label: "RTP", value: game.rtp },
                   { label: "Max Bonus", value: game.maxWin },
                   { label: "Latency", value: game.volatility },
                   { label: "Provider", value: game.provider },
                 ].map((stat, i) => (
                   <div key={i} className="p-6 bg-zinc-900 border border-white/5 italic">
                     <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest mb-2 font-display">{stat.label}</p>
                     <p className="text-white font-display font-black text-xl italic uppercase tracking-tight">{stat.value}</p>
                   </div>
                 ))}
               </div>
             </div>

             <div className="space-y-12">
                <h3 className="text-3xl font-display font-black italic text-white uppercase tracking-tighter">System Protocols</h3>
                <div className="space-y-4">
                   {[
                     "Set your digital stake using the control panel below the matrix.",
                     "Verify the encryption seed to ensure a provably fair result.",
                     "Initiate the sequence and watch the neon patterns align.",
                     "Accumulate matching tokens to trigger a jackpot protocol."
                   ].map((step, i) => (
                     <div key={i} className="flex gap-6 items-start p-6 bg-zinc-900 border border-white/5 italic group hover:border-gold/30 transition-all">
                        <span className="w-10 h-10 bg-gold/10 border border-gold/30 flex items-center justify-center text-gold shrink-0 font-black italic font-display">0{i+1}</span>
                        <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-1.5 leading-relaxed group-hover:text-white transition-colors">{step}</p>
                     </div>
                   ))}
                </div>
             </div>

             <div className="mt-20">
                <div className="flex items-center justify-between mb-10">
                  <h3 className="text-3xl font-display font-black italic text-white uppercase tracking-tighter">Payout Architecture</h3>
                  <div className="px-4 py-2 border border-white/10 bg-black/50 text-[10px] font-bold text-zinc-500 uppercase tracking-widest italic">
                    Unit: Multiplier
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
                   {[
                     { symbol: "V-Token (Gold)", combination: "5 Matching", payout: "500.0x", tier: "Legendary" },
                     { symbol: "Cyber Disk", combination: "5 Matching", payout: "100.0x", tier: "Elite" },
                     { symbol: "Neural Link", combination: "4 Matching", payout: "50.0x", tier: "Premium" },
                     { symbol: "Neon Spike", combination: "4 Matching", payout: "20.0x", tier: "Priority" },
                     { symbol: "Pulse Core", combination: "3 Matching", payout: "10.0x", tier: "Standard" },
                     { symbol: "Static Fragment", combination: "3 Matching", payout: "2.5x", tier: "Basic" },
                   ].map((row, i) => (
                     <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        whileHover={{ y: -10, backgroundColor: "rgba(57, 255, 20, 0.05)", borderColor: "rgba(57, 255, 20, 0.4)", boxShadow: "0 10px 30px rgba(57,255,20,0.1)" }}
                        className="bg-zinc-900 p-8 flex items-center justify-between group border border-white/5 cursor-default"
                     >
                        <div className="flex items-center gap-6">
                           <motion.div 
                             whileHover={{ rotate: 15, scale: 1.1 }}
                             className="w-14 h-14 bg-black border border-white/5 flex items-center justify-center italic text-2xl font-display font-black text-white/20 group-hover:text-neon-green group-hover:border-neon-green/30 transition-all shadow-inner"
                           >
                              {row.symbol[0]}
                           </motion.div>
                           <div>
                              <p className="text-white font-black italic uppercase tracking-tight mb-1 group-hover:text-neon-green transition-colors">{row.symbol}</p>
                              <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{row.combination}</p>
                           </div>
                        </div>
                        <div className="text-right">
                           <motion.p 
                             animate={{ scale: [1, 1.05, 1] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                             className="text-neon-green font-display font-black italic text-3xl tracking-tighter mb-1"
                           >
                             {row.payout}
                           </motion.p>
                           <p className={`text-[8px] font-black uppercase tracking-[0.2em] px-2 py-0.5 inline-block ${
                             row.tier === 'Legendary' ? 'bg-gold text-black' : 
                             row.tier === 'Elite' ? 'bg-neon-pink text-white' : 
                             'bg-zinc-800 text-zinc-400'
                           }`}>
                             {row.tier}
                           </p>
                        </div>
                     </motion.div>
                   ))}
                </div>
                <div className="mt-8 p-6 border border-white/5 bg-zinc-900/50 flex items-center gap-4 italic">
                  <Info size={16} className="text-zinc-600" />
                  <p className="text-[10px] text-zinc-600 font-medium uppercase tracking-widest leading-relaxed">
                    Values above represent base multipliers. Bonus rounds may trigger variable encryption boosts up to 10,000x of original stake.
                  </p>
                </div>
             </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 self-start space-y-12">
             <div className="p-10 bg-zinc-900 border-l-8 border-neon-green shadow-2xl relative overflow-hidden">
                <div className="absolute -right-10 -top-10 text-[120px] font-black italic text-white/[0.02] select-none">$</div>
                <h3 className="text-xl font-display font-black italic text-white mb-8 tracking-wide flex items-center gap-3 uppercase">
                  <Coins className="text-neon-green" size={24} /> Digital Ledger
                </h3>
                <p className="text-[10px] text-zinc-500 mb-2 font-black uppercase tracking-[0.4em]">Current Liquidity</p>
                <p className="text-5xl font-display font-black italic text-neon-green mb-10 tracking-tight">$1,000.00</p>
                <div className="space-y-4">
                   <button className="w-full casino-button-primary border-none text-sm italic">Initialize Game</button>
                   <button className="w-full casino-button-outline text-[10px] !py-4 italic border-white/10 text-zinc-400">Sync Credits</button>
                </div>
             </div>

             <div className="p-10 bg-zinc-900 border border-white/5 italic">
                <h3 className="text-sm font-display font-black italic text-white mb-8 uppercase tracking-[0.3em] flex items-center gap-3">
                  <ShieldCheck className="text-gold" size={18} /> Elite Operatives
                </h3>
                <div className="space-y-8">
                   {[
                     { user: "@cyberPunker", amount: "$15,290", game: "Matrix" },
                     { user: "@neonQueen", amount: "$8,401", game: "Reels" },
                     { user: "@ghostX", amount: "$4,110", game: "Roulette" }
                   ].map((winner, i) => (
                     <div key={i} className="flex items-center justify-between border-b border-white/5 pb-6 last:border-0 last:pb-0">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-black border border-white/10 flex items-center justify-center text-white">
                            <Trophy size={16} className="text-gold" />
                          </div>
                          <div>
                            <p className="text-sm font-black italic text-white uppercase tracking-tight">{winner.user}</p>
                            <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">{winner.game}</p>
                          </div>
                       </div>
                       <p className="text-neon-green font-black italic text-xl font-display tracking-tighter">{winner.amount}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
