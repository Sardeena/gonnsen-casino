import React from "react";
import { motion } from "motion/react";
import { Mail, Phone, Send, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject is too short"),
  message: z.string().min(10, "Message is too short"),
});

type ContactForm = z.infer<typeof contactSchema>;

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactForm) => {
    console.log("Contact Submission:", data);
    await new Promise(r => setTimeout(r, 1500));
    reset();
    alert("TRANSMISSION_SUCCESS: Message received by the Matrix.");
  };

  return (
    <div className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Left Side: Info */}
          <div>
            <motion.div
               initial={{ opacity: 0, x: -30 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
              <h1 className="text-5xl md:text-8xl font-display font-black italic text-white mb-8 tracking-tighter uppercase leading-none">
                SECURE <br />
                <span className="text-neon-green neon-glow-green">COMMS</span>
              </h1>
              <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.3em] mb-12 max-w-md leading-relaxed">
                Need assistance with your vault access or protocol verification? Our operatives are online 24/7.
              </p>

              <div className="space-y-10">
                {[
                  { icon: Mail, label: "Encrypted Mail", value: "support@neonvault.matrix", color: "text-neon-green" },
                  { icon: MessageSquare, label: "Direct Sync", value: "Live Chat (v4.2)", color: "text-gold" },
                  { icon: Phone, label: "Satellite Link", value: "+1 (888) NEON-000", color: "text-zinc-500" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 items-center group">
                    <div className="w-12 h-12 bg-zinc-900 border border-white/5 flex items-center justify-center transition-transform group-hover:rotate-12">
                      <item.icon size={20} className={item.color} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-1 font-display">{item.label}</p>
                      <p className="text-white font-mono text-xs uppercase tracking-tight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Form */}
          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="bg-zinc-900 p-10 border border-white/5 shadow-2xl relative italic"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-neon-green/5 blur-3xl -z-10" />
            <h2 className="text-2xl font-display font-black italic text-white mb-10 uppercase tracking-tight">Transmission Entry</h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 font-display">Identifier</label>
                    <input 
                      {...register("name")}
                      placeholder="NAME_REQUIRED"
                      className="w-full bg-black border border-white/10 px-6 py-4 text-white font-mono text-xs uppercase outline-none focus:border-neon-green/40 transition-all placeholder:text-zinc-800"
                    />
                    {errors.name && <p className="text-neon-pink text-[9px] font-black mt-1 ml-1 uppercase">{errors.name.message}</p>}
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 font-display">Neural ID</label>
                    <input 
                      {...register("email")}
                      placeholder="EMAIL_REQUIRED"
                      className="w-full bg-black border border-white/10 px-6 py-4 text-white font-mono text-xs uppercase outline-none focus:border-neon-green/40 transition-all placeholder:text-zinc-800"
                    />
                    {errors.email && <p className="text-neon-pink text-[9px] font-black mt-1 ml-1 uppercase">{errors.email.message}</p>}
                 </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 font-display">Encryption Subject</label>
                <input 
                  {...register("subject")}
                  placeholder="SUBJECT_IDENTIFIER"
                  className="w-full bg-black border border-white/10 px-6 py-4 text-white font-mono text-xs uppercase outline-none focus:border-neon-green/40 transition-all placeholder:text-zinc-800"
                />
                {errors.subject && <p className="text-neon-pink text-[9px] font-black mt-1 ml-1 uppercase">{errors.subject.message}</p>}
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest ml-1 font-display">Payload Content</label>
                <textarea 
                  {...register("message")}
                  rows={5}
                  placeholder="MESSAGE_PAYLOAD..."
                  className="w-full bg-black border border-white/10 px-6 py-4 text-white font-mono text-xs uppercase outline-none focus:border-neon-green/40 transition-all resize-none placeholder:text-zinc-800"
                />
                {errors.message && <p className="text-neon-pink text-[9px] font-black mt-1 ml-1 uppercase">{errors.message.message}</p>}
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full casino-button-primary border-none !py-5 italic text-sm disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  {isSubmitting ? "TRANSMITTING..." : <>Send Transmission <Send size={18} /></>}
                </span>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
