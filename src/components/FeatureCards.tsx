import { motion } from 'framer-motion';

export default function FeatureCards() {
  return (
    <div className="flex flex-col sm:flex-row items-end gap-0 z-30 shadow-2xl">
      {/* Security Card (White background) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        whileHover={{ y: -4 }}
        className="bg-white text-[#0A2239] p-7 md:p-8 w-full sm:w-[320px] md:w-[360px] flex flex-col justify-between border-t border-l border-b border-black/5 shadow-lg relative"
      >
        <div>
          {/* Lock Icon */}
          <div className="mb-6">
            <svg
              className="w-8 h-8 text-[#0A2239]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2.2"
            >
              <rect x="5" y="11" width="14" height="10" rx="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11V7a4 4 0 018 0v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          {/* Security Pill Tag */}
          <div className="inline-block bg-[#EFECE6] text-[#0A2239] text-[10px] font-bold tracking-[0.2em] uppercase px-3.5 py-1 rounded-full mb-4">
            SECURITY
          </div>

          {/* Title */}
          <h3 className="text-[#0A2239] text-xl font-bold leading-[1.25] tracking-tight font-sans">
            Security Designed for Modern AI Systems
          </h3>
        </div>
      </motion.div>

      {/* AI-Driven Card (Deep Navy background #0A2239) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        whileHover={{ y: -4 }}
        className="bg-[#0A2239] text-white p-7 md:p-8 w-full sm:w-[260px] md:w-[290px] flex flex-col justify-between border border-white/10 shadow-xl relative"
      >
        <div>
          {/* Orange AI Sparkle Icon */}
          <div className="mb-6">
            <div className="w-11 h-11 rounded-lg border-2 border-[#FF6B00]/80 bg-[#FF6B00]/10 flex items-center justify-center gap-0.5 text-[#FF6B00]">
              <span className="font-bold text-sm tracking-tighter">AI</span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
              </svg>
            </div>
          </div>

          {/* Paragraph Description */}
          <p className="text-white/80 text-xs md:text-[13px] leading-relaxed font-normal mb-8">
            Automate repetitive workflows across sales, support, finance, and ops.
          </p>
        </div>

        {/* AI-Driven Outlined Button */}
        <button className="w-full border border-white/40 hover:border-white text-white hover:bg-white/10 text-xs font-semibold py-2.5 px-4 text-center transition-all cursor-pointer">
          AI-Driven
        </button>
      </motion.div>
    </div>
  );
}
