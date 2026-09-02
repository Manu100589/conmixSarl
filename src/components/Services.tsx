import React from 'react';
import { ArrowUpRight, Layers, FileText, Building2, Wrench, HardHat, GraduationCap } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  tags: string[];
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
}

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const servicesData: ServiceItem[] = [
  {
    id: '01',
    title: 'ÉTUDE DE PROJET',
    shortDesc: 'Analyse technique, métrés 3D BIM, notes de calculs d\'ingénierie et modélisation CAO.',
    fullDesc: 'Conception complète de vos projets métalliques et de construction. Nous réalisons les études de faisabilité, relevés 3D sur site, notes de calculs selon les normes Eurocodes, modélisation BIM et plans d\'exécution détaillés pour garantir une parfaite faisabilité technique.',
    image: '/images/etude_de_projet.jpg',
    tags: ['BIM 3D', 'Note de Calculs', 'Relevé Laser'],
    features: ['Modélisation CAO 3D haute précision', 'Validation des charges et calculs d\'ingénierie', 'Cahier des charges sur-mesure', 'Plans d\'exécution d\'atelier'],
    icon: FileText,
  },
  {
    id: '02',
    title: 'CONSTRUCTION MÉTALLIQUE',
    shortDesc: 'Fabrication et montage de charpentes acier, passerelles, ossatures et structures.',
    fullDesc: 'Réalisation de structures métalliques complexes et charpentes industrielles ou architecturales. Fabrication dans nos ateliers équipés et assemblage sur site avec grutage et contrôles de sécurité rigoureux.',
    image: '/imagi/557284613_1108182218044563_1799444793147620466_n.jpg',
    tags: ['Charpente Acier', 'Passerelle', 'Structure BIM'],
    features: ['Fabrication en atelier certifié', 'Soudure TIG/MIG & assemblages de précision', 'Montage et levage sécurisé sur site', 'Traçabilité des aciers S355'],
    icon: Building2,
  },
  {
    id: '03',
    title: 'MENUISERIE MÉTALLIQUE',
    shortDesc: 'Portes, verrières, escaliers d\'art, garde-corps, baies et portails motorisés sur-mesure.',
    fullDesc: 'Ouvrages d\'art en acier, inox et aluminium pour particuliers, professionnels et édifices de standing. Fabrication de verrières d\'atelier, portes blindées, escaliers suspendus, garde-corps et clôtures sur-mesure.',
    image: '/imagi/550317449_1099029452293173_6664467472333154406_n.jpg',
    tags: ['Verrières', 'Escaliers d\'Art', 'Portes & Baies'],
    features: ['Finition thermo-laquée époxy cuite au four', 'Rupture de pont thermique & isolation', 'Combinaison acier, verre feuilleté & bois', 'Norme de sécurité NF P01-012'],
    icon: Wrench,
  },
  {
    id: '04',
    title: 'GÉNIE CIVIL',
    shortDesc: 'Travaux de fondations, dallages industriels, gros œuvre et ouvrages d\'art béton/acier.',
    fullDesc: 'Prise en charge intégrale des travaux de génie civil et d\'infrastructure. Fondations spéciales, dalles en béton armé, ancrages d\'ouvrages métalliques, superstructures et maçonnerie industrielle.',
    image: '/images/genie_civil.jpg',
    tags: ['Fondations', 'Béton Armé', 'Gros Œuvre'],
    features: ['Étude de sol & calculs de structure béton', 'Coulage de dalles hautes charges', 'Interface parfaite Métal & Béton armé', 'Conformité aux normes DTU'],
    icon: HardHat,
  },
  {
    id: '05',
    title: 'FORMATION',
    shortDesc: 'Formation professionnelle aux métiers de la métallerie, soudure TIG/MIG et sécurité.',
    fullDesc: 'Transmission de l\'expertise CONMIX SARL à travers des programmes de formation certifiants. Perfectionnement en soudure haute précision, chaudronnerie, lecture de plans d\'ingénierie et règles de sécurité sur chantier.',
    image: '/images/formation.jpg',
    tags: ['Soudure TIG/MIG', 'Chaudronnerie', 'Sécurité Chantier'],
    features: ['Ateliers pratiques avec équipements pro', 'Pratique de la soudure sur aciers & inox', 'Lecture de plans CAO & métrologie', 'Attestation de compétence certifiée'],
    icon: GraduationCap,
  },
];

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="relative py-24 sm:py-32 bg-[#1A1D20] text-white overflow-hidden border-b border-white/10">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A71D2A]/10 blur-[150px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-metal-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-space text-[#C82333] uppercase tracking-widest mb-3 font-semibold">
              <Layers className="w-4 h-4" />
              <span>02 / EXPERTISE DE L'ENTREPRISE</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              NOS SERVICES
            </h2>
          </div>
          <p className="text-base text-[#9CA3AF] font-outfit max-w-md">
            Une offre de services 360° couvrant l'ingénierie, la construction métallique, la menuiserie d'art, le génie civil et la formation professionnelle.
          </p>
        </div>

        {/* 5 Core Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComp = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service)}
                className="interactive group relative bg-[#0B0D0F] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-[#A71D2A] hover:shadow-2xl hover:shadow-[#A71D2A]/30 cursor-pointer"
              >
                <div className="relative h-56 w-full overflow-hidden bg-[#1A1D20]">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/40 to-transparent" />

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#0B0D0F]/85 backdrop-blur-md border border-white/15 text-[#C82333] font-space font-bold text-xs tracking-wider flex items-center space-x-2">
                    <span>{service.id}</span>
                  </div>

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#A71D2A] group-hover:rotate-45 transition-all duration-300 shadow-md">
                    <ArrowUpRight className="w-5 h-5" />
                  </div>

                  {/* Icon Badge Overlay */}
                  <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-[#0B0D0F]/90 backdrop-blur-md border border-white/15 text-[#C82333]">
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-syne font-bold text-xl text-white group-hover:text-[#C82333] transition-colors flex items-center justify-between">
                      <span>{service.title}</span>
                    </h3>

                    <div className="h-[2px] w-0 group-hover:w-full bg-[#C82333] transition-all duration-500 my-2" />

                    <p className="text-xs sm:text-sm text-[#9CA3AF] font-outfit leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {service.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-[#1A1D20] text-[10px] font-space text-[#9CA3AF] border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-space font-semibold text-[#C82333] group-hover:text-white transition-colors">
                    <span>Découvrir l'expertise complète</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
