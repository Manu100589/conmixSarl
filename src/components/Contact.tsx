import React, { useState } from 'react';
import { Send, PhoneCall, Mail, MapPin, MessageSquare, Paperclip, CheckCircle, Sparkles } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    nom: '',
    entreprise: '',
    telephone: '',
    email: '',
    typeProjet: 'Escaliers Métalliques',
    budget: '15 000€ - 50 000€',
    message: '',
    fileAttached: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1200);
  };

  const projectTypes = [
    'Étude de Projet',
    'Construction Métallique',
    'Menuiserie Métallique',
    'Génie Civil',
    'Formation',
  ];

  const budgetOptions = [
    '< 5 000 €',
    '5 000 € - 15 000 €',
    '15 000 € - 50 000 €',
    '> 50 000 €',
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#1A1D20] text-white border-b border-white/10 overflow-hidden">
      <div className="absolute inset-0 bg-metal-grid opacity-10 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#A71D2A]/10 blur-[180px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center space-x-2 text-xs font-space text-[#C82333] uppercase tracking-widest mb-3 font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>06 / CONTACT & DEVIS</span>
            </div>
            <h2 className="font-syne font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              PARLONS DE VOTRE PROJET.
            </h2>
          </div>
          <p className="text-base text-[#9CA3AF] font-outfit max-w-md">
            Remplissez notre formulaire détaillé ci-dessous pour recevoir une étude personnalisée et un chiffrage précis sous 24-48h.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#0B0D0F] border border-white/10 space-y-8">
              <h3 className="font-syne font-bold text-2xl text-white">
                Coordonnées Atelier
              </h3>

              <div className="space-y-6">
                <a
                  href="tel:+33189204050"
                  className="group flex items-start space-x-4 p-4 rounded-xl bg-[#1A1D20]/60 border border-white/5 hover:border-[#A71D2A]/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-[#A71D2A]/10 text-[#C82333] group-hover:bg-[#A71D2A] group-hover:text-white transition-colors">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-space text-[#9CA3AF] uppercase tracking-wider block">Téléphone Ligne Directe</span>
                    <span className="font-space font-bold text-base text-white group-hover:text-[#C82333] transition-colors">
                      +33 1 89 20 40 50
                    </span>
                  </div>
                </a>

                <a
                  href="https://wa.me/33189204050"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start space-x-4 p-4 rounded-xl bg-[#1A1D20]/60 border border-white/5 hover:border-[#25D366]/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-space text-[#9CA3AF] uppercase tracking-wider block">Échange Instantané WhatsApp</span>
                    <span className="font-space font-bold text-base text-white group-hover:text-[#25D366] transition-colors">
                      Discuter sur WhatsApp →
                    </span>
                  </div>
                </a>

                <a
                  href="mailto:contact@conmix-metallerie.fr"
                  className="group flex items-start space-x-4 p-4 rounded-xl bg-[#1A1D20]/60 border border-white/5 hover:border-[#A71D2A]/50 transition-colors"
                >
                  <div className="p-3 rounded-lg bg-[#A71D2A]/10 text-[#C82333] group-hover:bg-[#A71D2A] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-space text-[#9CA3AF] uppercase tracking-wider block">E-mail Équipe Technique</span>
                    <span className="font-space font-bold text-base text-white group-hover:text-[#C82333] transition-colors">
                      contact@conmix-metallerie.fr
                    </span>
                  </div>
                </a>

                <div className="flex items-start space-x-4 p-4 rounded-xl bg-[#1A1D20]/60 border border-white/5">
                  <div className="p-3 rounded-lg bg-[#A71D2A]/10 text-[#C82333]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-space text-[#9CA3AF] uppercase tracking-wider block">Atelier de Fabrication & Siège</span>
                    <span className="font-space text-sm text-white font-medium block">
                      Z.I. Métallurgie Sud — Bâtiment B4
                    </span>
                    <span className="text-xs text-[#9CA3AF]">75011 Paris / Lyon / Douala</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#A71D2A]/10 border border-[#A71D2A]/30 text-xs font-space text-white space-y-1">
                <span className="text-[#C82333] font-bold">⏰ Horaires d'ouverture de l'atelier :</span>
                <p className="text-[#9CA3AF]">Lundi – Vendredi : 07h30 – 19h00</p>
                <p className="text-[#9CA3AF]">Samedi sur rendez-vous</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#0B0D0F] border border-white/10 shadow-2xl relative">
              {submitted ? (
                <div className="py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-20 h-20 rounded-full bg-[#A71D2A]/20 border-2 border-[#A71D2A] text-[#C82333] flex items-center justify-center mx-auto shadow-2xl shadow-[#A71D2A]/50">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <h3 className="font-syne font-bold text-3xl text-white">
                    DEMANDE TRANSMISE AVEC SUCCÈS !
                  </h3>
                  <p className="text-sm font-outfit text-[#9CA3AF] max-w-md mx-auto leading-relaxed">
                    Merci <strong className="text-white">{formData.nom}</strong>. Nos ingénieurs métalleux ont bien reçu votre dossier pour le projet <strong className="text-[#C82333]">{formData.typeProjet}</strong>. Nous vous recontacterons sous 24 à 48 heures.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-[#1A1D20] border border-white/20 text-white font-space font-semibold text-xs uppercase tracking-wider hover:bg-[#A71D2A] transition-colors"
                  >
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-space font-semibold uppercase text-white/90">
                        Nom Complet *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jean Dupont"
                        value={formData.nom}
                        onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#1A1D20] border border-white/15 text-white placeholder-white/30 font-outfit focus:outline-none focus:border-[#A71D2A] focus:ring-1 focus:ring-[#A71D2A] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-space font-semibold uppercase text-white/90">
                        Entreprise / Organisme
                      </label>
                      <input
                        type="text"
                        placeholder="Cabinet d'Architectes XYZ (Optionnel)"
                        value={formData.entreprise}
                        onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#1A1D20] border border-white/15 text-white placeholder-white/30 font-outfit focus:outline-none focus:border-[#A71D2A] focus:ring-1 focus:ring-[#A71D2A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-space font-semibold uppercase text-white/90">
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+33 6 12 34 56 78"
                        value={formData.telephone}
                        onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#1A1D20] border border-white/15 text-white placeholder-white/30 font-outfit focus:outline-none focus:border-[#A71D2A] focus:ring-1 focus:ring-[#A71D2A] transition-colors"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-space font-semibold uppercase text-white/90">
                        Adresse E-mail *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="jean.dupont@exemple.fr"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl bg-[#1A1D20] border border-white/15 text-white placeholder-white/30 font-outfit focus:outline-none focus:border-[#A71D2A] focus:ring-1 focus:ring-[#A71D2A] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-space font-semibold uppercase text-white/90">
                      Type de projet *
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {projectTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, typeProjet: type })}
                          className={`p-2.5 rounded-lg text-xs font-space font-medium text-left border transition-all ${
                            formData.typeProjet === type
                              ? 'bg-[#A71D2A] text-white border-[#A71D2A] shadow-md'
                              : 'bg-[#1A1D20] text-white/70 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-space font-semibold uppercase text-white/90">
                      Budget estimatif
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {budgetOptions.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setFormData({ ...formData, budget: b })}
                          className={`p-2.5 rounded-lg text-xs font-space text-center border transition-all ${
                            formData.budget === b
                              ? 'bg-[#A71D2A]/20 text-[#C82333] border-[#A71D2A] font-bold'
                              : 'bg-[#1A1D20] text-white/70 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-space font-semibold uppercase text-white/90">
                      Message & Description du projet *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Précisez les dimensions estimées, le lieu du chantier, vos contraintes d'installation..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-[#1A1D20] border border-white/15 text-white placeholder-white/30 font-outfit focus:outline-none focus:border-[#A71D2A] focus:ring-1 focus:ring-[#A71D2A] transition-colors"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-xl bg-[#1A1D20] border border-dashed border-white/20">
                    <div className="flex items-center space-x-3 text-xs font-space text-[#9CA3AF]">
                      <Paperclip className="w-4 h-4 text-[#C82333]" />
                      <span>{formData.fileAttached ? 'Plan_Architecte_Conmix.pdf joint' : 'Joindre un plan, croquis ou cahier des charges (PDF, DWG, PNG)'}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, fileAttached: !formData.fileAttached })}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-space font-semibold text-white transition-colors"
                    >
                      {formData.fileAttached ? 'Retirer' : 'Parcourir'}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#A71D2A] via-[#C82333] to-[#8B0000] text-white font-space font-bold uppercase tracking-widest text-sm shadow-xl shadow-[#A71D2A]/30 hover:shadow-[#A71D2A]/60 transition-all duration-300 transform hover:scale-[1.01] active:scale-95 flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>TRANSMISSION EN COURS...</span>
                    ) : (
                      <>
                        <span>ENVOYER MA DEMANDE</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
