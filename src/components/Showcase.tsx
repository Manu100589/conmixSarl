import React, { useState } from 'react';
import { ArrowRight, Maximize2, Sparkles, Filter, X } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
  location: string;
  clientType: string;
  description: string;
}

export const projectsData: Project[] = [
  {
    id: 'p1',
    title: 'Portail Motorisé Laser Géométrique',
    category: 'Portails & Clôtures',
    year: '2025',
    image: '/imagi/557272334_1108182341377884_7278977532498212781_n.jpg',
    location: 'Neuilly-sur-Seine',
    clientType: 'Résidence Privée Luxe',
    description: 'Portail coulissant motorisé 5m40 avec habillage acier thermo-laqué et découpe laser motif architectural sur-mesure.',
  },
  {
    id: 'p2',
    title: 'Escalier Suspendu & Limon Central',
    category: 'Escaliers',
    year: '2025',
    image: '/imagi/550317449_1099029452293173_6664467472333154406_n.jpg',
    location: 'Lyon Brotteaux',
    clientType: 'Villa Contemporaine',
    description: 'Escalier métallique 1/4 tournant avec marches en chêne massif et garde-corps vitré extra-clair de 15mm.',
  },
  {
    id: 'p3',
    title: 'Verrière Atelier & Cloison Acier',
    category: 'Verrières',
    year: '2024',
    image: '/imagi/550484129_1099029425626509_8910105939628219548_n.jpg',
    location: 'Paris Le Marais',
    clientType: 'Loft Haussmannien',
    description: 'Verrière intérieure avec portes coulissantes à galandage en profilés acier fins thermo-laqués noir mat.',
  },
  {
    id: 'p4',
    title: 'Garde-Corps Balcons & Terrasses',
    category: 'Garde-corps',
    year: '2024',
    image: '/imagi/552793296_1099850212211097_1588584581253692481_n.jpg',
    location: 'Bordeaux Centre',
    clientType: 'Immeuble de Standing',
    description: 'Ensemble de garde-corps balcons en acier galvanisé à chaud avec thermolaquage sablé anti-corrosion.',
  },
  {
    id: 'p5',
    title: 'Passerelle & Structure Métallique',
    category: 'Structures',
    year: '2024',
    image: '/imagi/557284613_1108182218044563_1799444793147620466_n.jpg',
    location: 'Annecy',
    clientType: 'Complexe Tertiaire Agora',
    description: 'Passerelle piétonne suspendue en profilés acier HEB avec plancher verre feuilleté dépoli.',
  },
  {
    id: 'p6',
    title: 'Porte d\'Entrée Métallique Vitrée',
    category: 'Portes',
    year: '2023',
    image: '/imagi/552602831_1099029555626496_8713052199757261741_n.jpg',
    location: 'Strasbourg',
    clientType: 'Boutique Flagship',
    description: 'Devanture et porte métallique haute sécurité blindée avec serrure motorisée 5 points et vitrage anti-effraction.',
  },
  {
    id: 'p7',
    title: 'Structure Métallique Architectural',
    category: 'Structures',
    year: '2024',
    image: '/imagi/555050054_1101447318718053_2981192187399908246_n.jpg',
    location: 'Nantes',
    clientType: 'Projet Immobilier Moderne',
    description: 'Assemblage de charpente métallique et d\'ossature acier pour extension contemporaine de bâtiment.',
  },
  {
    id: 'p8',
    title: 'Chaudronnerie D\'Art & Mobilier',
    category: 'Structures',
    year: '2024',
    image: '/imagi/557745954_1111852477677537_1316729265505768914_n.jpg',
    location: 'Cannes',
    clientType: 'Hôtel Spa Luxe',
    description: 'Création d\'éléments métalliques décoratifs sur mesure avec traitement haute protection anti-corrosion.',
  },
];

export const Showcase: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['Tous', 'Escaliers', 'Verrières', 'Portails & Clôtures', 'Garde-corps', 'Structures'];

  const filteredProjects =
    activeFilter === 'Tous'
      ? projectsData
      : projectsData.filter((p) => p.category === activeFilter);

  return (
    <section id="showcase" className="relative py-24 sm:py-32 bg-[#0B0D0F] text-white overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-metal-grid opacity-15 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#A71D2A]/10 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-space text-[#C82333] uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>03 / GALERIE PROJETS CONMIX</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              DES OUVRAGES QUI <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#C82333] to-[#F87171]">
                PARLENT POUR NOUS.
              </span>
            </h2>
          </div>

          <p className="text-base text-[#9CA3AF] font-outfit max-w-md">
            Parcourez une sélection de nos réalisations récentes métalliques sur-mesure pour villas, lofts et édifices professionnels.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2 mr-4 text-xs font-space text-[#9CA3AF]">
            <Filter className="w-4 h-4 text-[#C82333]" />
            <span>Filtrer par :</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`interactive px-4 py-2 rounded-full text-xs font-space font-medium tracking-wide transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-[#A71D2A] text-white shadow-lg shadow-[#A71D2A]/40 scale-105'
                  : 'bg-[#1A1D20] text-white/70 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="interactive group relative bg-[#1A1D20]/60 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-[#A71D2A]/70 hover:shadow-2xl hover:shadow-[#A71D2A]/30 cursor-pointer"
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-black">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/30 to-transparent opacity-80" />

                <div className="absolute top-4 left-4 flex items-center space-x-2">
                  <span className="px-3 py-1 rounded-full bg-[#0B0D0F]/85 backdrop-blur-md border border-white/15 text-xs font-space font-semibold text-[#C82333]">
                    {project.category}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] font-space text-white/80">
                    {project.year}
                  </span>
                </div>

                <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#0B0D0F]/85 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                  <Maximize2 className="w-4 h-4 text-[#C82333]" />
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between text-xs font-space text-[#9CA3AF]">
                  <span>{project.location}</span>
                  <span className="text-[#C82333] font-medium">{project.clientType}</span>
                </div>

                <h3 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#C82333] transition-colors leading-snug">
                  {project.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#9CA3AF] font-outfit line-clamp-2">
                  {project.description}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-space text-white group-hover:text-[#C82333] transition-colors">
                  <span>Voir le projet complet</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
          <div className="relative w-full max-w-4xl bg-[#1A1D20] border border-white/20 rounded-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#A71D2A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div className="lg:col-span-7 relative bg-black min-h-[300px] lg:min-h-[450px]">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-xs font-space text-[#C82333]">
                    <span className="px-2.5 py-0.5 rounded bg-[#A71D2A]/20 border border-[#A71D2A]/40 font-semibold">
                      {selectedProject.category}
                    </span>
                    <span>• {selectedProject.year}</span>
                  </div>

                  <h3 className="font-syne font-bold text-2xl text-white">
                    {selectedProject.title}
                  </h3>

                  <div className="text-xs font-space text-[#9CA3AF] space-y-1">
                    <p>📍 Localisation : <strong className="text-white">{selectedProject.location}</strong></p>
                    <p>🏢 Maître d'Ouvrage : <strong className="text-white">{selectedProject.clientType}</strong></p>
                  </div>

                  <p className="text-sm font-outfit text-[#9CA3AF] leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="p-4 rounded-xl bg-black/40 border border-white/10 text-xs font-space text-white/90 space-y-1">
                    <span className="text-[#C82333] font-semibold block mb-1">Spécifications Techniques :</span>
                    <p>• Acier thermo-laqué finition fine texture RAL Noir Profond</p>
                    <p>• Découpe numérique haute précision au 1/10e de mm</p>
                    <p>• Pose étanche et fixations invisibles de sécurité</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-full py-3 bg-[#A71D2A] text-white font-space font-semibold uppercase text-xs rounded-xl tracking-wider hover:bg-[#8B0000] transition-colors"
                >
                  Fermer la vue détaillée
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
