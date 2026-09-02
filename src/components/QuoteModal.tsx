import React, { useState } from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Send } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState('Escaliers Métalliques');
  const [selectedMaterial, setSelectedMaterial] = useState('Acier Thermo-Laqué');
  const [timeline, setTimeline] = useState('Dans le mois');
  const [contactInfo, setContactInfo] = useState({
    nom: '',
    email: '',
    telephone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const projectTypes = [
    'Portes Métalliques',
    'Fenêtres & Baies',
    'Escaliers Métalliques',
    'Garde-corps',
    'Portails & Clôtures',
    'Structures Métalliques',
    'Verrières',
    'Ouvrage Sur-Mesure',
  ];

  const materials = [
    'Acier Thermo-Laqué',
    'Acier Galvanisé à Chaud',
    'Inox 316 L / Brossé',
    'Acier Corten Patiné',
    'Aluminium Extrudé',
  ];

  const timelines = [
    'Urgent (< 2 semaines)',
    'Dans le mois',
    'D\'ici 1 à 3 mois',
    'Projet en phase d\'étude',
  ];

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-2xl bg-[#1A1D20] border border-white/20 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2.5 rounded-full bg-[#0B0D0F] text-white hover:bg-[#A71D2A] transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-12 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-[#A71D2A]/20 border-2 border-[#A71D2A] text-[#C82333] flex items-center justify-center mx-auto shadow-2xl shadow-[#A71D2A]/50">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="font-syne font-extrabold text-3xl text-white">
              DEMANDE DE DEVIS ENREGISTRÉE !
            </h3>
            <p className="text-sm font-outfit text-[#9CA3AF] max-w-md mx-auto">
              Votre dossier d'étude pour <strong className="text-[#C82333]">{selectedType}</strong> en <strong className="text-white">{selectedMaterial}</strong> a été transmis directement à notre bureau d'ingénierie métallurgique CONMIX SARL.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setStep(1);
                onClose();
              }}
              className="px-8 py-3.5 bg-[#A71D2A] text-white font-space font-bold uppercase text-xs rounded-xl tracking-wider hover:bg-[#8B0000] transition-colors"
            >
              Fermer la fenêtre
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="text-[10px] font-space tracking-widest text-[#C82333] uppercase font-bold">
                  ÉTAPE {step} SUR 3
                </span>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white">
                  Demande de Devis Express
                </h3>
              </div>
              <div className="flex items-center space-x-1.5">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      step === s ? 'w-8 bg-[#C82333]' : 'w-2 bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-6">
                <h4 className="text-sm font-space uppercase text-white font-semibold">
                  1. Quel type d'ouvrage métallique souhaitez-vous réaliser ?
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {projectTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`p-3.5 rounded-xl text-left font-space text-xs font-semibold border transition-all ${
                        selectedType === type
                          ? 'bg-[#A71D2A] text-white border-[#A71D2A] shadow-lg'
                          : 'bg-[#0B0D0F] text-white/80 border-white/10 hover:border-white/30'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-3 bg-[#A71D2A] text-white font-space font-bold uppercase text-xs rounded-xl tracking-wider flex items-center space-x-2 hover:bg-[#8B0000] transition-colors"
                  >
                    <span>Suivant : Matériaux & Délais</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-space uppercase text-white font-semibold">
                    2. Matériau & Finition souhaitée
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((m) => (
                      <button
                        key={m}
                        onClick={() => setSelectedMaterial(m)}
                        className={`px-3.5 py-2 rounded-lg font-space text-xs border transition-all ${
                          selectedMaterial === m
                            ? 'bg-[#A71D2A] text-white border-[#A71D2A]'
                            : 'bg-[#0B0D0F] text-white/70 border-white/10 hover:border-white/30'
                        }`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="text-sm font-space uppercase text-white font-semibold">
                    Délais prévus pour l'installation
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {timelines.map((t) => (
                      <button
                        key={t}
                        onClick={() => setTimeline(t)}
                        className={`p-3 rounded-lg font-space text-xs text-left border transition-all ${
                          timeline === t
                            ? 'bg-[#A71D2A]/20 text-[#C82333] border-[#A71D2A] font-bold'
                            : 'bg-[#0B0D0F] text-white/70 border-white/10'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-4 py-2.5 text-xs font-space text-[#9CA3AF] hover:text-white"
                  >
                    ← Retour
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-3 bg-[#A71D2A] text-white font-space font-bold uppercase text-xs rounded-xl tracking-wider flex items-center space-x-2 hover:bg-[#8B0000] transition-colors"
                  >
                    <span>Suivant : Vos Coordonnées</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <form onSubmit={handleFinish} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-space uppercase text-white">Nom Complet *</label>
                  <input
                    type="text"
                    required
                    placeholder="Votre nom"
                    value={contactInfo.nom}
                    onChange={(e) => setContactInfo({ ...contactInfo, nom: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0D0F] border border-white/15 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-[#A71D2A]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-space uppercase text-white">E-mail *</label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.fr"
                      value={contactInfo.email}
                      onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0D0F] border border-white/15 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-[#A71D2A]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-space uppercase text-white">Téléphone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+33 6 00 00 00 00"
                      value={contactInfo.telephone}
                      onChange={(e) => setContactInfo({ ...contactInfo, telephone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#0B0D0F] border border-white/15 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-[#A71D2A]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-space uppercase text-white">Précisions supplémentaires</label>
                  <textarea
                    rows={2}
                    placeholder="Cotes approximatives, ville du chantier, remarques..."
                    value={contactInfo.message}
                    onChange={(e) => setContactInfo({ ...contactInfo, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#0B0D0F] border border-white/15 text-white placeholder-white/30 font-outfit text-sm focus:outline-none focus:border-[#A71D2A]"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2.5 text-xs font-space text-[#9CA3AF] hover:text-white"
                  >
                    ← Retour
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 bg-gradient-to-r from-[#A71D2A] to-[#8B0000] text-white font-space font-bold uppercase text-xs rounded-xl tracking-wider flex items-center space-x-2 shadow-lg shadow-[#A71D2A]/40 hover:scale-105 transition-all"
                  >
                    <span>SOUMETTRE MON DEVIS</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-4 border-t border-white/10 flex items-center space-x-2 text-[11px] font-space text-[#9CA3AF]">
              <ShieldCheck className="w-4 h-4 text-[#C82333]" />
              <span>Étude gratuite sans engagement • Protection des données personnelles</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
