import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const projects = [
  {
    id: 1,
    title: 'Nebula Dashboard',
    description: 'An immersive analytics platform with real-time 3D data visualization and spatial interfaces.',
    tags: ['WebGL', 'React', 'D3.js', 'Three.js'],
    metrics: '2.4M+ Users',
    gradient: 'from-[#00FFA3]/20 via-[#00B8FF]/10 to-transparent',
    accentColor: '#00FFA3',
    year: '2025',
  },
  {
    id: 2,
    title: 'Prism Studio',
    description: 'Creative suite for 3D artists featuring GPU-accelerated rendering and collaborative workflows.',
    tags: ['WebGPU', 'Rust/WASM', 'Shader Art', 'Figma Plugin'],
    metrics: '500K+ Exports',
    gradient: 'from-[#00B8FF]/20 via-[#7000FF]/10 to-transparent',
    accentColor: '#00B8FF',
    year: '2024',
  },
  {
    id: 3,
    title: 'Vertex Engine',
    description: 'Next-generation game engine for the browser with physics simulation and procedural generation.',
    tags: ['TypeScript', 'ECS Architecture', 'Physics', 'Procedural'],
    metrics: '98 Lighthouse',
    gradient: 'from-[#7000FF]/20 via-[#00FFA3]/10 to-transparent',
    accentColor: '#7000FF',
    year: '2024',
  },
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardContainerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardContainerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const stickyTop = 80 + index * 30;

  return (
    <div ref={cardContainerRef} className="relative" style={{ height: '90vh' }}>
      <div
        className="sticky w-full max-w-5xl mx-auto px-4"
        style={{ top: `${stickyTop}px` }}
      >
        <motion.div
          style={{ scale }}
          className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#111216]/90 backdrop-blur-xl p-8 md:p-10 min-h-[500px] flex flex-col origin-top"
        >
          {/* Background gradient */}
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 pointer-events-none`} />

          {/* Top row: tags + year */}
          <div className="relative z-10 flex items-center justify-between mb-8">
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-xs font-mono rounded-full border border-white/10 bg-white/5 text-[#8A8F9E]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="text-xs font-mono text-[#555766]">{project.year}</span>
          </div>

          {/* Main content area */}
          <div className="relative z-10 flex-1 flex flex-col justify-end">
            {/* Metrics badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono mb-4 w-fit">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: project.accentColor }} />
              {project.metrics}
            </div>

            {/* Title */}
            <h3 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-bold leading-tight tracking-tight text-[#EDEDF0] mb-3">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-[#8A8F9E] text-base md:text-lg max-w-xl leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Live Preview Button */}
            <button className="group flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 w-fit cursor-pointer">
              <span className="text-sm font-medium text-[#EDEDF0]">View Project</span>
              <svg
                className="w-4 h-4 text-[#8A8F9E] group-hover:translate-x-1 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProjectsStack() {
  return (
    <section id="projects" className="py-20 relative z-10">
      <div className="max-w-5xl mx-auto px-4 mb-20 text-center">
        <span className="font-mono text-xs tracking-[0.3em] text-[#8A8F9E] uppercase block mb-4">
          SELECTED WORK
        </span>
        <p className="text-[#555766] text-sm">Projects that push digital boundaries.</p>
      </div>

      <div className="pb-32">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
