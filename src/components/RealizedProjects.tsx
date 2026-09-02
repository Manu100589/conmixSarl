import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ChevronLeft, ChevronRight, X, Layers, Image as ImageIcon } from 'lucide-react';

export interface RealizedProject {
  id: string;
  folder: string;
  badge: string;
  title: string;
  category: string;
  coverImage: string;
  allImages: string[];
  activities: string[];
  specs: {
    client: string;
    domain: string;
    completion: string;
    location: string;
  };
}

export const realizedProjectsData: RealizedProject[] = [
  {
    id: 'p1',
    folder: 'p1',
    badge: 'PROJET 01 / AGRO-INDUSTRIE',
    title: "CONSTRUCTION D'UNE USINE ALIMENTAIRE POUR PISCICULTURE",
    category: "Usine d'Agro-industrie & Unité Aquacole",
    coverImage: '/imagi/p1/536285203_122121635270943958_391702572223612830_n.jpg',
    allImages: [
      '/imagi/p1/536285203_122121635270943958_391702572223612830_n.jpg',
      '/imagi/p1/535091344_122120664026943958_5443771902590030817_n.jpg',
      '/imagi/p1/535342987_122120664074943958_6210365238675769020_n.jpg',
      '/imagi/p1/535392246_122121635096943958_541208982612310117_n.jpg',
      '/imagi/p1/535432753_122120664218943958_1887498328178600783_n.jpg',
      '/imagi/p1/536253919_122120664128943958_1832153367465863924_n.jpg',
      '/imagi/p1/536271976_122120664176943958_8655245637971859912_n.jpg',
      '/imagi/p1/536288515_122121635312943958_6480135660281657525_n.jpg',
      '/imagi/p1/537704701_122121635228943958_7187070563864871423_n.jpg',
      '/imagi/p1/558153570_122135286566943958_6269064291229654951_n.jpg',
      '/imagi/p1/558294179_122135286512943958_7049380060912036423_n.jpg',
      '/imagi/p1/559456199_122135286470943958_4311398195755760957_n.jpg',
    ],
    activities: [
      'Pose des lisses de bardage sur la ligne 2',
      'Assemblage des fermes sur la ligne 3',
      'Pose des liernes et bretelles sur la ligne 2',
      'Pose des PVC sur la ligne 2',
    ],
    specs: {
      client: 'Complexe Agro-Alimentaire',
      domain: 'Charpente, Bardage & Assemblage Lignes 2 & 3',
      completion: '100% Réalisé',
      location: 'Zone Industrielle',
    },
  },
  {
    id: 'p2',
    folder: 'p2',
    badge: 'PROJET 02 / INDUSTRIE LOURDE',
    title: "CONSTRUCTION D'UNE USINE DE FABRICATION DE LA PÂTE À PAPIER",
    category: 'Unité Industrielle Papetière & Mezzanine',
    coverImage: '/imagi/p2/563533017_122137129292943958_6481099730030983437_n.jpg',
    allImages: [
      '/imagi/p2/563533017_122137129292943958_6481099730030983437_n.jpg',
      '/imagi/p2/563470948_122137129436943958_6654783264433614292_n.jpg',
      '/imagi/p2/564178744_122137129184943958_4115060533246867613_n.jpg',
      '/imagi/p2/565780800_122137129136943958_5239731644803058813_n.jpg',
    ],
    activities: [
      'Fabrication et pose des corbeaux',
      'Réglage de la structure',
      'Travaux de modification de la mezzanine',
    ],
    specs: {
      client: 'Filière Industrielle Papetière',
      domain: 'Pose Corbeaux, Réglage Structure & Mezzanine',
      completion: '100% Réalisé',
      location: 'Site Industriel Papeterie',
    },
  },
  {
    id: 'p3',
    folder: 'p3',
    badge: 'PROJET 03 / COMPLEXE INDUSTRIEL',
    title: "CONSTRUCTION DE L'USINE SOCORPA",
    category: 'Usine SOCORPA & Modification Mezzanine',
    coverImage: '/imagi/p3/557883311_122133599048943958_6937136502097676123_n.jpg',
    allImages: [
      '/imagi/p3/557883311_122133599048943958_6937136502097676123_n.jpg',
      '/imagi/p3/556554775_122134035266943958_6752556585890533037_n.jpg',
      '/imagi/p3/557597895_122134035404943958_7762703606637524866_n.jpg',
      '/imagi/p3/557598672_122134035338943958_4310536569972026056_n.jpg',
    ],
    activities: [
      'Pose des bretelles ligne K',
      'Réglage de la structure',
      'Travaux de modification de la mezzanine',
    ],
    specs: {
      client: 'SOCORPA SARL',
      domain: 'Bretelles Ligne K, Réglage & Mezzanine',
      completion: '100% Réalisé',
      location: 'Parc Industriel SOCORPA',
    },
  },
];

export const RealizedProjects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<RealizedProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const openGallery = (project: RealizedProject) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  const nextImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedProject.allImages.length);
  };

  const prevImage = () => {
    if (!selectedProject) return;
    setActiveImageIndex((prev) => (prev - 1 + selectedProject.allImages.length) % selectedProject.allImages.length);
  };

  return (
    <section id="projets-realises" className="relative py-24 sm:py-32 bg-[#0B0D0F] text-white overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-metal-grid opacity-15 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#A71D2A]/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-space text-[#C82333] uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-4 h-4 text-[#C82333]" />
              <span>03 / GRANDES CHANTIERS NATIONAUX</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              NOS PROJETS RÉALISÉS
            </h2>
          </div>
          <p className="text-base text-[#9CA3AF] font-outfit max-w-md">
            Découvrez nos réalisations phares en construction métallique d'usines complexes, pose de bardage, fermes et mezzanines industrielles.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {realizedProjectsData.map((project) => (
            <div
              key={project.id}
              className="interactive group bg-[#1A1D20]/70 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-[#A71D2A] hover:shadow-2xl hover:shadow-[#A71D2A]/30"
            >
              <div className="relative h-72 w-full overflow-hidden bg-black">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D20] via-[#1A1D20]/30 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0B0D0F]/85 backdrop-blur-md border border-white/15 text-[11px] font-space font-bold text-[#C82333] tracking-widest uppercase">
                  {project.badge}
                </div>

                <div className="absolute bottom-4 right-4 flex items-center space-x-1 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md text-xs font-space text-white border border-white/15">
                  <ImageIcon className="w-3.5 h-3.5 text-[#C82333]" />
                  <span>{project.allImages.length} Photos</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <span className="text-xs font-space text-[#9CA3AF] uppercase tracking-wider block">
                    {project.category}
                  </span>

                  <h3 className="font-syne font-bold text-xl sm:text-2xl text-white group-hover:text-[#C82333] transition-colors leading-tight">
                    {project.title}
                  </h3>

                  <div className="p-4 rounded-xl bg-[#0B0D0F]/80 border border-white/10 space-y-3">
                    <div className="flex items-center space-x-2 text-xs font-space font-semibold text-[#C82333] uppercase tracking-wider">
                      <Layers className="w-4 h-4" />
                      <span>ACTIVITÉS RÉALISÉES</span>
                    </div>

                    <ul className="space-y-2 text-xs font-outfit text-[#9CA3AF]">
                      {project.activities.map((act, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C82333] shrink-0 mt-0.5" />
                          <span className="text-white/90">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={() => openGallery(project)}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#A71D2A] to-[#8B0000] text-white font-space font-bold text-xs uppercase tracking-wider hover:from-[#C82333] hover:to-[#A71D2A] transition-all shadow-lg shadow-[#A71D2A]/30 flex items-center justify-center space-x-2 group/btn"
                >
                  <span>Consulter la Galerie Photos ({project.allImages.length})</span>
                  <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Gallery Lightbox Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/95 backdrop-blur-2xl animate-in fade-in duration-300">
          <div className="relative w-full max-w-5xl bg-[#1A1D20] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#0B0D0F]">
              <div>
                <span className="text-xs font-space text-[#C82333] uppercase font-bold tracking-widest block">
                  {selectedProject.badge}
                </span>
                <h3 className="font-syne font-bold text-lg sm:text-2xl text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2.5 rounded-full bg-white/10 text-white hover:bg-[#A71D2A] transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Main Image Slider View */}
            <div className="relative flex-1 bg-black min-h-[350px] sm:min-h-[480px] flex items-center justify-center overflow-hidden">
              <img
                src={selectedProject.allImages[activeImageIndex]}
                alt={`${selectedProject.title} photo ${activeImageIndex + 1}`}
                className="max-h-[60vh] sm:max-h-[70vh] w-auto object-contain transition-all duration-300"
              />

              {/* Slider Controls */}
              {selectedProject.allImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#A71D2A] hover:border-[#A71D2A] transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 p-3 rounded-full bg-black/70 border border-white/20 text-white hover:bg-[#A71D2A] hover:border-[#A71D2A] transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Image Counter Badge */}
              <div className="absolute bottom-4 left-4 px-3.5 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-xs font-space text-white">
                Photo <strong className="text-[#C82333]">{activeImageIndex + 1}</strong> sur {selectedProject.allImages.length}
              </div>
            </div>

            {/* Thumbnail Strip & Activities Summary */}
            <div className="p-4 sm:p-6 bg-[#0B0D0F] border-t border-white/10 space-y-4">
              {/* Thumbnails */}
              <div className="flex items-center space-x-3 overflow-x-auto pb-2 scrollbar-thin">
                {selectedProject.allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-[#C82333] scale-105 shadow-md shadow-[#C82333]/50' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-white/10">
                {selectedProject.activities.map((act, idx) => (
                  <div key={idx} className="flex items-center space-x-2 text-xs font-outfit text-white/90">
                    <CheckCircle2 className="w-4 h-4 text-[#C82333] shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
