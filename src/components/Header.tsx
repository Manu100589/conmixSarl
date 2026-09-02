import { motion } from 'framer-motion';

export default function Header() {
  const navLinks = ['SOLUTIONS', 'PRODUCT', 'PRICING', 'COMPANY', 'BLOG'];

  return (
    <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between z-40 relative">
      {/* Brand Logo */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-2.5 cursor-pointer group"
      >
        {/* Triquetra / Atom Logo Icon */}
        <div className="relative w-7 h-7 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full text-[#0A2239] fill-current">
            <path d="M50 15 C35 15 25 30 25 45 C25 60 40 70 50 85 C60 70 75 60 75 45 C75 30 65 15 50 15 Z" opacity="0.85" />
            <path d="M20 60 C10 45 20 25 35 25 C50 25 60 40 75 45 C60 50 45 65 30 75 C20 70 15 65 20 60 Z" opacity="0.75" />
            <path d="M80 60 C85 45 75 25 60 25 C45 25 35 40 20 45 C35 50 50 65 65 75 C75 70 80 65 80 60 Z" opacity="0.75" />
            <circle cx="50" cy="48" r="8" className="fill-[#0A2239]" />
          </svg>
        </div>
        <span className="font-bold tracking-tight text-xl text-[#0A2239] font-sans uppercase">
          OPERON AI
        </span>
      </motion.div>

      {/* Navigation Links */}
      <motion.nav 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="hidden md:flex items-center gap-8"
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-[12px] font-bold tracking-widest text-[#0A2239]/80 hover:text-[#0A2239] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#0A2239] hover:after:w-full after:transition-all after:duration-300"
          >
            {link}
          </a>
        ))}
      </motion.nav>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <button className="bg-white text-[#0A2239] text-xs font-semibold px-5 py-2.5 rounded-sm hover:bg-white/90 transition-all shadow-sm border border-black/5 hover:shadow cursor-pointer active:scale-95">
          Book Demo
        </button>
      </motion.div>
    </header>
  );
}
