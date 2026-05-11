import React from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Coins, LogIn, Mail, Lock, User, Github } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginForm) => {
    // Firebase auth logic will be implemented here
    console.log("Login Attempt:", data);
    await new Promise(r => setTimeout(r, 1000));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6 relative">
       {/* Background Decor */}
       <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/40 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-flex items-center gap-2 mb-8 group">
            <div className="w-12 h-12 bg-neon-purple rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(188,19,254,0.5)] group-hover:scale-110 transition-transform">
              <Coins className="text-white w-7 h-7" />
            </div>
          </Link>
          <h1 className="text-4xl font-display font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500">Access your digital vault and start winning.</p>
        </div>

        <div className="glass-panel p-10 rounded-3xl border border-white/10 shadow-2xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Terminal</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  {...register("email")}
                  type="email" 
                  placeholder="name@nexus.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none text-white focus:border-neon-purple/50 focus:bg-white/10 transition-all"
                />
              </div>
              {errors.email && <p className="text-neon-pink text-[10px] font-bold mt-1 ml-1 tracking-wider uppercase">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Entry Key</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-neon-blue hover:underline uppercase tracking-wider">Forgot Key?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  {...register("password")}
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none text-white focus:border-neon-purple/50 focus:bg-white/10 transition-all"
                />
              </div>
              {errors.password && <p className="text-neon-pink text-[10px] font-bold mt-1 ml-1 tracking-wider uppercase">{errors.password.message}</p>}
            </div>

            <button 
              disabled={isSubmitting}
              className="w-full casino-button-primary py-4 text-lg mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2">
                {isSubmitting ? "Syncing..." : <>Access Vault <LogIn size={20} /></>}
              </span>
            </button>
          </form>

          <div className="mt-8">
            <div className="relative mb-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase font-bold tracking-widest">
                <span className="bg-casino-card px-4 text-gray-600">Secure Direct Access</span>
              </div>
            </div>

            <button className="w-full glass-panel py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all text-sm font-bold text-white group">
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500 font-medium">
          New operative? <Link to="/register" className="text-neon-purple hover:text-neon-pink transition-colors font-bold">Register Identity</Link>
        </p>
      </motion.div>
    </div>
  );
}
