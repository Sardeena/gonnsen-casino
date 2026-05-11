import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Marquee from "./Marquee";
import ScrollToTop from "./ScrollToTop";
import { motion, AnimatePresence } from "motion/react";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation();
  const [isInitialLoading, setIsInitialLoading] = React.useState(true);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatePresence mode="wait">
        {isInitialLoading && (
          <motion.div
            key="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-casino-dark flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 90, 180, 270, 360]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 border-4 border-neon-purple border-t-transparent rounded-full shadow-[0_0_20px_rgba(188,19,254,0.5)]"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 font-display font-bold text-white tracking-[0.5em] uppercase text-xs"
            >
              Initializing Matrix...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <Header />
      <main className="flex-grow pt-20">
        <Marquee />
        {children}
      </main>
      <Footer />
      <ScrollToTop />
      
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-neon-green/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-zinc-800/10 blur-[100px] rounded-full" />
      </div>
    </div>
  );
}
