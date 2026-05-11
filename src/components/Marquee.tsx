import { motion } from "motion/react";

export default function Marquee() {
  const announcements = [
    "JACKPOT: $2,450,291.00 WINNER ON 'CYBER REELS'!",
    "NEW GAME: 'NEON DRAGON SLOTS' IS NOW LIVE!",
    "DAILY REWARDS: CLAIM YOUR 500 NEON CHIPS NOW!",
    "CHAMPIONSHIP TOURNEY STARTS IN 2 HOURS!",
    "BOOST: 2X MULTIPLIER ON ALL ROULETTE TABLES TODAY!",
  ];

  return (
    <div className="bg-[#111] border-y border-white/5 h-8 flex items-center overflow-hidden">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap gap-20 items-center px-10"
      >
        {[...announcements, ...announcements, ...announcements].map((text, i) => (
          <div key={i} className="flex items-center gap-6">
            <motion.span 
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
              className="text-[#39FF14]"
            >
              •
            </motion.span>
            <motion.span 
              animate={{ 
                textShadow: [
                  "0 0 4px rgba(57, 255, 20, 0.3)",
                  "0 0 12px rgba(57, 255, 20, 0.8)",
                  "0 0 25px rgba(57, 255, 20, 1)",
                  "0 0 12px rgba(57, 255, 20, 0.8)",
                  "0 0 4px rgba(57, 255, 20, 0.3)"
                ],
                opacity: [0.6, 1, 0.8, 1, 0.6],
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity, 
                ease: "easeInOut",
                delay: i * 0.15 
              }}
              className="font-mono text-[10px] uppercase tracking-[0.4em] font-black italic text-[#39FF14]"
            >
              {text}
            </motion.span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
