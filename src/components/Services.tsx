import React from 'react';
import { ArrowUpRight, Layers } from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  tags: string[];
  features: string[];
}

interface ServicesProps {
  onSelectService: (service: ServiceItem) => void;
}

export const servicesData: ServiceItem[] = [
  {
    id: '01',
    title: 'PORTES MÉTALLIQUES',
    shortDesc: 'Conception et fabrication de portes métalliques robustes, blindées ou vitrées.',
    fullDesc: 'Portes métalliques d\'entrée, d\'atelier ou techniques sur-mesure. Nous combinons sécurité anti-effraction élevée, isolation thermique/phonique performante et finitions esthétiques thermo-laquées.',
    image: '/imagi/552602831_1099029555626496_8713052199757261741_n.jpg',
    tags: ['Porte Blindée', 'Vitrage Sécurité', 'Serrure 5 Points'],
    features: ['Acier haute résistance 3mm', 'Isolation laine de roche', 'Thermo-laquage RAL au choix', 'Certification A2P'],
  },
  {
    id: '02',
    title: 'FENÊTRES & BAIES',
    shortDesc: 'Solutions métalliques adaptées aux projets résidentiels et professionnels.',
    fullDesc: 'Menuiseries métalliques fines à rupture de pont thermique. Baies vitrées coulissantes ou à galandage de grandes dimensions offrant un apport lumineux maximal avec un design ultra-fin.',
    image: '/imagi/550484129_1099029425626509_8910105939628219548_n.jpg',
    tags: ['Rupture Pont Thermique', 'Grande Hauteur', 'Design Extra-Fin'],
    features: ['Profilés acier ou aluminium extra-fins', 'Double & Triple vitrage isolation renforcée', 'Joints d\'étanchéité EPDM', 'Conforme RE2020'],
  },
  {
    id: '03',
    title: 'ESCALIERS MÉTALLIQUES',
    shortDesc: 'Escaliers modernes, industriels et suspendus réalisés sur mesure.',
    fullDesc: 'Escaliers hélicoïdaux, droits, quart-tournants ou suspendus. Alliage harmonieux de l\'acier avec le verre, le bois noble (chêne, noyer) ou la pierre pour un rendu architectural unique.',
    image: '/imagi/552317415_1099029342293184_4066768090408243718_n.jpg',
    tags: ['Hélicoïdal', 'Suspendu', 'Limon Central'],
    features: ['Étude de charge & calculs de structure BIM', 'Marches bois, verre ou tôle larmée', 'Assemblage sans soudures apparentes', 'Conception modulaire'],
  },
  {
    id: '04',
    title: 'GARDE-CORPS',
    shortDesc: 'Garde-corps métalliques pour balcons, escaliers, terrasses et mezzanines.',
    fullDesc: 'Systèmes de protection sur-mesure répondant strictement à la norme NF P01-012. Remplissage barreaudage vertical, câbles inox, tôle perforée à motif laser ou panneaux de verre feuilleté.',
    image: '/imagi/552793296_1099850212211097_1588584581253692481_n.jpg',
    tags: ['Norme NF P01-012', 'Inox & Verre', 'Découpe Laser'],
    features: ['Fixation à la française ou en anglaise', 'Main courante Inox 316 / Acier', 'Traitement anti-corrosion milieu marin', 'Test d\'impact certifié'],
  },
  {
    id: '05',
    title: 'PORTAILS & CLÔTURES',
    shortDesc: 'Portails et clôtures personnalisés combinant sécurité, motorisation et esthétique.',
    fullDesc: 'Portails battants ou coulissants autoportants avec motorisation intégrée. Motifs géométriques exclusifs découpés au laser pour habiller les façades contemporaines.',
    image: '/imagi/557272334_1108182341377884_7278977532498212781_n.jpg',
    tags: ['Motorisé', 'Autoportant', 'Motif Sur-Mesure'],
    features: ['Découpe laser personnalisée', 'Compatibilité domotique & visiophonie', 'Structure renforcée anti-vent', 'Traitement galvanisé à chaud'],
  },
  {
    id: '06',
    title: 'STRUCTURES MÉTALLIQUES',
    shortDesc: 'Fabrication de structures métalliques adaptées aux projets architecturaux complexes.',
    fullDesc: 'Charpentes métalliques légères, extensions ossature acier, passerelles suspendues, mezzanines industrielles et pergolas bioclimatiques avec modélisation 3D avancée.',
    image: '/imagi/557284613_1108182218044563_1799444793147620466_n.jpg',
    tags: ['Charpente Acier', 'Extension Loft', 'Passerelle'],
    features: ['Note de calculs d\'ingénierie Eurocodes', 'Assemblages boulonnés / soudés', 'Grutage et manutention spéciale', 'Traçabilité des aciers S355'],
  },
  {
    id: '07',
    title: 'VERRIÈRES',
    shortDesc: 'Verrières métalliques contemporaines pour intérieurs et espaces professionnels.',
    fullDesc: 'Cloisons vitrées style atelier d\'artiste avec portes coulissantes ou battantes intégrées. Séparez vos espaces tout en conservant la fluidité visuelle et la lumière naturelle.',
    image: '/imagi/557759899_1111852721010846_8317688947392489645_n.jpg',
    tags: ['Style Atelier', 'Porte Coulissante', 'Isolation Acoustique'],
    features: ['Profilés T et cornières acier d\'antan ou modernes', 'Vitrage feuilleté de sécurité 33.2 / 44.2', 'Finition patinée, brute ou thermo-laquée', 'Pose étanche sans poussière'],
  },
  {
    id: '08',
    title: 'OUVRAGES SUR MESURE',
    shortDesc: 'Conception de solutions métalliques uniques selon les dimensions et besoins du client.',
    fullDesc: 'Créations métalliques hors norme : mobilier d\'architecte, devantures de magasins luxe, habillages de cheminée, claustras décoratifs et œuvres métalliques sur-mesure.',
    image: '/imagi/557712097_1111852334344218_4945281494256388505_n.jpg',
    tags: ['Sur-Mesure Pur', 'Mobilier & Façade', 'Chaudronnerie D\'Art'],
    features: ['Étude 3D & prototype préalable', 'Combinaison laiton, cuivre, acier Corten', 'Finitions brossées, brutes ou dorées', 'Pièces uniques numérotées'],
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
              <span>02 / EXPERTISE TECHNIQUE</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              NOTRE SAVOIR-FAIRE
            </h2>
          </div>
          <p className="text-base text-[#9CA3AF] font-outfit max-w-md">
            Des ouvrages métalliques conçus, façonnés et posés avec rigueur pour les projets les plus ambitieux.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="interactive group relative bg-[#0B0D0F] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-2 hover:border-[#A71D2A] hover:shadow-2xl hover:shadow-[#A71D2A]/30 cursor-pointer"
            >
              <div className="relative h-48 w-full overflow-hidden bg-[#1A1D20]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/40 to-transparent" />

                <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-[#0B0D0F]/85 backdrop-blur-md border border-white/15 text-[#C82333] font-space font-bold text-xs tracking-wider">
                  {service.id}
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-[#A71D2A] group-hover:rotate-45 transition-all duration-300 shadow-md">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-syne font-bold text-lg sm:text-xl text-white group-hover:text-[#C82333] transition-colors flex items-center justify-between">
                    <span>{service.title}</span>
                  </h3>

                  <div className="h-[2px] w-0 group-hover:w-full bg-[#C82333] transition-all duration-500 my-2" />

                  <p className="text-xs sm:text-sm text-[#9CA3AF] font-outfit line-clamp-3 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.tags.slice(0, 2).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-[#1A1D20] text-[10px] font-space text-[#9CA3AF] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-space font-semibold text-[#C82333] group-hover:text-white transition-colors">
                  <span>En savoir plus</span>
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
