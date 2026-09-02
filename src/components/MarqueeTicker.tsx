import React from 'react';

const partners = ['Figma', 'Vercel', 'Stripe', 'Linear', 'OpenAI', 'Supabase'];
const capabilities = [
  '01 / WEBGL EXPERIENCES',
  '02 / SHADER PROGRAMMING',
  '03 / SPATIAL DESIGN',
  '04 / BRAND SYSTEMS',
];

export default function MarqueeTicker() {
  return (
    <section className="py-20 bg-[#08080A] overflow-hidden">
      <div className="rotate-[-2deg] scale-110 border-y border-white/5 flex flex-col gap-0">
        {/* Row 1 - Brand Partners */}
        <div className="overflow-hidden mask-edges py-4">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marquee 30s linear infinite' }}
          >
            {[...partners, ...partners, ...partners].map((item, i) => (
              <React.Fragment key={`row1-${i}`}>
                <span className="mx-6 flex items-center gap-2 uppercase tracking-widest text-[#8A8F9E] text-sm font-medium">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00FFA3] to-[#00B8FF]" />
                  {item}
                </span>
                <span className="mx-6 text-[#8A8F9E] text-xs">◆</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Row 2 - Capabilities */}
        <div className="overflow-hidden mask-edges py-4 border-t border-white/5">
          <div
            className="flex whitespace-nowrap"
            style={{ animation: 'marquee-reverse 35s linear infinite' }}
          >
            {[...capabilities, ...capabilities, ...capabilities].map((item, i) => (
              <React.Fragment key={`row2-${i}`}>
                <span className="mx-6 font-mono text-xs tracking-wider text-[#555766]">
                  {item}
                </span>
                <span className="mx-6 text-[#555766] text-xs">•</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
