import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Coins, User, Shield } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useAuth } from "../lib/auth";
import Logo from "./Logo";

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const location = useLocation();
  const { user, profile, logout } = useAuth();

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Games", path: "/games" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (profile?.isAdmin) {
    navLinks.push({ name: "Admin", path: "/admin" });
  }

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-casino-dark/80 backdrop-blur-xl border-b border-white/10 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Logo size={48} className="group-hover:scale-110 transition-transform duration-300" />
          <span className="text-2xl font-display font-black tracking-tighter uppercase text-white">
            GONNSEN'S<span className="text-neon-green neon-glow-green">CASINO</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "font-display text-[11px] uppercase tracking-[0.2em] font-bold hover:text-neon-green transition-colors relative flex items-center gap-2",
                location.pathname === link.path ? "text-neon-green" : "text-gray-500"
              )}
            >
              {link.name === "Admin" && <Shield size={12} />}
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6">
          {user ? (
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                <Coins size={14} className="text-neon-green" />
                <span className="text-xs font-mono font-bold tracking-widest text-white">
                  {profile?.balance?.toLocaleString() || 0} <span className="text-[8px] text-neon-green">NEON</span>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Active Operative</p>
                  <p className="text-[11px] font-bold text-white uppercase italic">{profile?.displayName || user.email?.split('@')[0]}</p>
                </div>
                <button 
                  onClick={logout}
                  className="w-10 h-10 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <User size={18} />
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-[11px] uppercase font-bold text-gray-400 hover:text-white transition-colors tracking-widest py-2 px-6 border border-white/10 hover:bg-white/5">
                Login
              </Link>
              <Link to="/register" className="casino-button-primary text-xs !py-2">
                Join Now
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-400 hover:text-white">
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-casino-dark/95 border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-display font-medium text-gray-300 hover:text-neon-green transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-4">
                {user ? (
                  <button onClick={() => { logout(); setIsOpen(false); }} className="text-gray-400">
                    Log Out
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-400">
                      Log In
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="casino-button-primary">
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
