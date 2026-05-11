import { Link } from "react-router-dom";
import { Twitter, Github, Instagram, ShieldCheck, Mail } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-casino-dark border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6 group">
            <Logo size={32} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-display font-black tracking-tighter uppercase text-white">
              GONNSEN'S <span className="text-neon-green neon-glow-green">CASINO</span>
            </span>
          </Link>
          <p className="text-gray-500 text-[10px] font-black uppercase tracking-widest leading-relaxed mb-8">
            The world's premier cyberpunk casino experience. Secure, fair, and powered by high-performance neural protocols.
          </p>
          <div className="flex gap-4">
            {[Twitter, Github, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-neon-green hover:text-black transition-all">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display font-black text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Gaming</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">
            <li><Link to="/games" className="hover:text-neon-green transition-colors">Slots Matrix</Link></li>
            <li><Link to="/games" className="hover:text-neon-green transition-colors">Digital Roulette</Link></li>
            <li><Link to="/games" className="hover:text-neon-green transition-colors">Cyber Blackjack</Link></li>
            <li><Link to="/games" className="hover:text-neon-green transition-colors">Live Dealers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-black text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Company</h4>
          <ul className="space-y-4 text-[10px] font-black uppercase tracking-widest text-gray-500 italic">
            <li><Link to="/about" className="hover:text-neon-green transition-colors">Our Mission</Link></li>
            <li><Link to="/contact" className="hover:text-neon-green transition-colors">Affiliate Program</Link></li>
            <li><Link to="/about" className="hover:text-neon-green transition-colors">Gaming License</Link></li>
            <li><Link to="/contact" className="hover:text-neon-green transition-colors">Support Center</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-black text-white mb-6 uppercase tracking-[0.2em] text-[10px]">Security</h4>
          <div className="flex items-start gap-3 p-6 bg-zinc-900 border border-white/5 mb-4 italic">
            <ShieldCheck className="text-neon-green shrink-0" size={20} />
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider leading-relaxed">SSL Encrypted & Provably Fair. Assets protected by quantum-safe encryption.</p>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-gray-500 font-mono">
            <Mail size={14} className="text-neon-green" />
            <span>HQ@gonnsen.casino</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 text-[10px] text-gray-600 font-black uppercase tracking-widest italic">
        <p>© 2026 Gonnsen's Casino Entertainment Ltd. Be Gamble Aware. 18+</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Legal Manifest</a>
        </div>
      </div>
    </footer>
  );
}
