import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { Play, TrendingUp, Shield, Zap } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "@/src/lib/auth";

export default function Hero() {
  const { user, loading } = useAuth();

  return (
    <section className="relative min-h-[90vh] flex items-center pt-10 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neon-green/10 blur-[150px] rounded-full" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-zinc-800/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-lg bg-zinc-900 border border-white/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_8px_#39FF14]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Biological Units Online: 2,492</span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-display font-black italic leading-[0.8] text-white mb-10 tracking-tighter uppercase">
            DOUBLE YOUR <br />
            <span className="text-neon-green neon-glow-green">FORTUNE</span>
          </h1>
          
          <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed mb-12 max-w-md uppercase tracking-wider">
            Experience the world's most advanced online casino with exclusive digital titles and instant crypto-level payouts.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link 
              to={loading ? "#" : (user ? "/games" : "/register")} 
              className={cn("casino-button-primary", loading && "opacity-50 cursor-wait")}
            >
              {loading ? "Initializing..." : "Play Now"}
            </Link>
            <Link to="/register" className="casino-button-outline group">
              Join Matrix
            </Link>
          </div>

          <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-white/5 pt-10">
            {[
               { label: "VIP Rank", value: "GOLD", color: "text-gold" },
               { label: "Daily Pool", value: "$4.5M", color: "text-neon-green" },
               { label: "Latency", value: "2.4ms", color: "text-zinc-500" }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-600 mb-1">{stat.label}</span>
                <span className={cn("text-2xl font-display font-black italic", stat.color)}>{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative z-10 rounded-[40px] overflow-hidden border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <img 
              src="https://images.unsplash.com/photo-1596838132731-dd9fd73ef441?auto=format&fit=crop&q=80&w=1200" 
              alt="Casino Main" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-casino-dark via-transparent to-transparent" />
          </div>
          
          {/* Floating Asset Decor */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 -right-10 w-40 h-40 glass-panel rounded-3xl flex items-center justify-center p-6 rotate-12"
          >
            <div className="text-center">
              <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Weekly Pool</p>
              <p className="text-2xl font-display font-bold text-neon-green">$15.2M</p>
              <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-neon-green w-[75%]" />
              </div>
            </div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-6 -left-10 w-48 h-48 glass-panel rounded-3xl flex items-center justify-center p-6 -rotate-6"
          >
             <div className="text-center">
              <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Recent Winner</p>
              <p className="text-lg font-display font-bold text-neon-blue">@CyberX29</p>
              <p className="text-2xl font-display font-bold text-white">+$4,290</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
