import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Coins, UserPlus, Mail, Lock, User, ShieldCheck, CheckSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterForm) => {
    console.log("Registration Attempt:", data);
    await new Promise(r => setTimeout(r, 1500));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 relative">
       {/* Background Decor */}
       <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 w-[600px] h-[600px] bg-neon-purple/40 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-12 h-12 bg-neon-purple rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(188,19,254,0.5)] group-hover:scale-110 transition-transform">
              <Coins className="text-white w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Create Identity</h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Join the elite world of Gonnsen's Casino and claim your 1,000 NEON bonus.</p>
        </div>

        <div className="glass-panel p-10 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Codename</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  {...register("username")}
                  placeholder="TheNexusKing"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none text-white focus:border-neon-purple/50 focus:bg-white/10 transition-all"
                />
              </div>
              {errors.username && <p className="text-neon-pink text-[10px] font-bold mt-1 ml-1 tracking-wider uppercase">{errors.username.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Digital Mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  {...register("email")}
                  placeholder="operative@nexus.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none text-white focus:border-neon-purple/50 focus:bg-white/10 transition-all"
                />
              </div>
              {errors.email && <p className="text-neon-pink text-[10px] font-bold mt-1 ml-1 tracking-wider uppercase">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Entry Key</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      {...register("password")}
                      type="password" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none text-white focus:border-neon-purple/50 focus:bg-white/10 transition-all font-mono"
                    />
                  </div>
                  {errors.password && <p className="text-neon-pink text-[10px] font-bold mt-1 ml-1 tracking-wider uppercase">{errors.password.message}</p>}
               </div>
               <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Verify Key</label>
                  <div className="relative">
                    <CheckSquare className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                    <input 
                      {...register("confirmPassword")}
                      type="password" 
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none text-white focus:border-neon-purple/50 focus:bg-white/10 transition-all font-mono"
                    />
                  </div>
                  {errors.confirmPassword && <p className="text-neon-pink text-[10px] font-bold mt-1 ml-1 tracking-wider uppercase">{errors.confirmPassword.message}</p>}
               </div>
            </div>

            <div className="p-4 bg-neon-purple/5 border border-neon-purple/20 rounded-2xl flex items-start gap-3">
               <ShieldCheck className="text-neon-purple mt-0.5 shrink-0" size={18} />
               <p className="text-[10px] leading-relaxed text-gray-400 font-medium">By initializing identity, you agree to the Terms of Matrix Access and confirm you are at least 18 cycles of age.</p>
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full casino-button-primary py-4 text-lg mt-4 disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? "Initializing..." : <>Register Identity <UserPlus size={20} /></>}
              </span>
            </button>
          </form>

          <div className="mt-8">
            <button className="w-full glass-panel py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all text-sm font-bold text-white group">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              Sync with Google DNA
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          Already verified? <Link to="/login" className="text-neon-blue hover:text-neon-cyan transition-colors font-bold">Log In Operative</Link>
        </p>
      </motion.div>
    </div>
  );
}
