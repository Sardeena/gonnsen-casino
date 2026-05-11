import React from "react";
import Hero from "@/src/components/Hero";
import GameCard, { Game } from "@/src/components/GameCard";
import { ArrowRight, Trophy, Users, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

import { ALL_GAMES } from "../constants/games";

const FEATURED_GAMES = ALL_GAMES.filter(g => g.isPopular || g.isNew).slice(0, 6);

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Featured Games Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="py-32 bg-casino-dark relative"
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6"
          >
            <div>
              <h2 className="text-5xl md:text-7xl font-display font-black italic text-white mb-4 uppercase tracking-tighter">Featured <span className="text-neon-green neon-glow-green">Matrix</span></h2>
              <p className="text-gray-500 max-w-xl text-sm uppercase tracking-widest font-medium">Dive into our most popular titles, curated for high stakes and maximum immersion.</p>
            </div>
            <Link to="/games" className="group flex items-center gap-2 text-neon-green font-black italic tracking-[0.2em] text-[11px] uppercase">
              Browse All <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {FEATURED_GAMES.map((game, i) => (
              <GameCard key={game.id} game={game} index={i} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Features Grid */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-32 border-y border-white/5 bg-black"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Trophy, title: "VIP Rewards", desc: "Climb the ranks and unlock exclusive neon-tier benefits and monthly rebates.", color: "bg-gold" },
              { icon: Users, title: "Global Lobby", desc: "Join thousands of players in real-time chat and collaborative tournaments.", color: "bg-neon-green" },
              { icon: ShieldCheck, title: "Zero Trust Security", desc: "Your data and funds are secured by state-of-the-art cryptographic protocols.", color: "bg-white/10" }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 bg-zinc-900 border border-white/5 hover:border-neon-green/30 transition-all italic"
              >
                <div className={cn("inline-flex p-4 mb-8 transform group-hover:rotate-6 transition-transform shadow-2xl skew-x-[-12deg]", f.color)}>
                  <f.icon size={28} className={cn(f.color === "bg-neon-green" || f.color === "bg-gold" ? "text-black" : "text-white")} />
                </div>
                <h3 className="text-2xl font-display font-black italic text-white mb-4 uppercase tracking-tighter">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium uppercase tracking-wider">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter */}
      <motion.section 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-40 overflow-hidden relative bg-casino-dark"
      >
         <div className="absolute inset-0 bg-neon-green/5 -z-10" />
         <div className="max-w-4xl mx-auto px-6 text-center">
           <h2 className="text-5xl md:text-8xl font-display font-black italic text-white mb-8 tracking-tighter uppercase leading-none">STAY IN THE <br /><span className="text-neon-green neon-glow-green">LOOP</span></h2>
           <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em] mb-12">DECRYPT EXCLUSIVE OFFERS & MATRIX EVENTS</p>
           
           <form className="flex flex-col sm:flex-row gap-0 max-w-2xl mx-auto border border-white/10 bg-black overflow-hidden group focus-within:border-neon-green/50 transition-all">
             <input 
              type="email" 
              placeholder="ENTER CRYPTO-MAIL IDENTIFIER..." 
              className="flex-grow bg-transparent px-8 py-5 outline-none text-white font-mono text-xs uppercase placeholder:text-zinc-700"
             />
             <button type="submit" className="casino-button-primary border-none shadow-none !py-5 px-10">Sync Now</button>
           </form>
         </div>
      </motion.section>
    </div>
  );
}
