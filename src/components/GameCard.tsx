import { motion } from "motion/react";
import { Play, Info, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/src/lib/utils";

export interface Game {
  id: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  previewVideo?: string;
  isNew?: boolean;
  isPopular?: boolean;
}

interface GameCardProps {
  game: Game;
  index: number;
}

export default function GameCard({ game, index }: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -16, scale: 1.05, borderColor: "rgba(57,255,20,0.8)", boxShadow: "0 20px 60px rgba(57,255,20,0.25)" }}
      className="group relative bg-zinc-900 overflow-hidden border border-white/5 transition-all duration-500 shadow-2xl"
    >
      {/* Badge */}
      {(game.isNew || game.isPopular) && (
        <div className={cn(
          "absolute top-4 left-4 z-10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em]",
          game.isNew ? "bg-neon-green text-black" : "bg-red-600 text-white"
        )}>
          {game.isNew ? "New Entry" : "Hot Activity"}
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover grayscale opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 group-hover:opacity-100"
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Video Preview */}
        {game.previewVideo ? (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
            <video
              src={game.previewVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
            {/* Digital Scanlines/Noise Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none opacity-30 group-hover:opacity-50 transition-opacity" />
            <div className="absolute inset-0 bg-neon-green/5 mix-blend-overlay animate-pulse" />
          </div>
        ) : (
          /* Fallback dynamic effect for the image if no video is available */
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-neon-green mix-blend-overlay transition-opacity duration-500 pointer-events-none" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        
        {/* Play Overlay */}
        <div className="absolute inset-x-4 bottom-4">
           <Link
              to={`/games/${game.id}`}
              className="w-full py-4 bg-neon-green text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-[1.02] shadow-[0_0_20px_rgba(57,255,20,0.5)]"
            >
              Play Demo
            </Link>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 card-gradient">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{game.category}</span>
          <div className="text-zinc-600 font-mono text-[9px]">ID: 00{index+1}</div>
        </div>
        <h3 className="text-lg font-display font-black italic text-white uppercase tracking-tighter group-hover:text-neon-green transition-colors">
          {game.title}
        </h3>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">MIN: $0.10</span>
          <div className="flex items-center gap-1 text-gold">
            <Star size={10} fill="currentColor" />
            <span className="text-[10px] font-black">{game.rating}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
