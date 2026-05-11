import React from "react";
import { motion } from "motion/react";

export default function About() {
  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mb-24">
          <h1 className="text-5xl md:text-8xl font-display font-black italic text-white mb-8 tracking-tighter uppercase leading-none">
            BEYOND THE <br />
            <span className="text-neon-green neon-glow-green">MATRIX</span>
          </h1>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em] leading-relaxed">
            Founded in 2024, Neon Vault is not just a casino. It is a cryptographic entertainment hub built for the next generation of risk-takers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-display font-black italic text-white mb-6 uppercase tracking-tight">Our Mission Protocol</h2>
              <p className="text-zinc-500 leading-relaxed font-medium uppercase tracking-wider text-sm">
                We utilize state-of-the-art blockchain-inspired verification seeds to ensure that every sequence generated in our vault is 100% provably fair. Our goal is to provide a zero-latency, high-stakes environment where transparency is the default state.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-display font-black italic text-white mb-6 uppercase tracking-tight">Global Connectivity</h2>
              <p className="text-zinc-500 leading-relaxed font-medium uppercase tracking-wider text-sm">
                With a presence in over 120 digital jurisdictions, we connect thousands of biological units in a shared pursuit of fortune, powered by the most stable payout architecture in the industry.
              </p>
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-neon-green/10 blur-[100px] rounded-full animate-pulse" />
            <div className="relative h-full w-full bg-zinc-900 border border-white/5 flex items-center justify-center italic">
              <div className="text-center">
                <span className="text-9xl font-display font-black text-white/5 select-none">NV</span>
                <div className="mt-[-40px]">
                  <p className="text-neon-green font-display font-black italic text-6xl">2024</p>
                  <p className="text-zinc-600 font-bold uppercase tracking-[0.5em] text-[10px]">ESTABLISHED</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {[
            { label: "Active Units", value: "2M+" },
            { label: "Daily Volume", value: "$4.5M" },
            { label: "Support Latency", value: "<2m" },
            { label: "Certifications", value: "12+" }
          ].map((stat, i) => (
            <div key={i} className="p-10 bg-zinc-900 border border-white/5 italic group hover:border-neon-green/30 transition-all">
              <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2 font-display">{stat.label}</p>
              <p className="text-white font-display font-black text-4xl italic tracking-tighter group-hover:text-neon-green transition-colors">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
