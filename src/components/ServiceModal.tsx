import React from 'react';
import { X, CheckCircle, ArrowRight, ShieldCheck, Wrench } from 'lucide-react';
import type { ServiceItem } from './Services';

interface ServiceModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onOpenQuoteModal: () => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({ service, onClose, onOpenQuoteModal }) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="relative w-full max-w-3xl bg-[#1A1D20] border border-white/20 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white hover:bg-[#A71D2A] transition-colors border border-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-black">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1D20] via-[#1A1D20]/40 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="px-3 py-1 rounded-md bg-[#A71D2A] text-white font-space font-extrabold text-xs tracking-widest uppercase shadow-md">
                {service.id} — EXPERTISE CONMIX
              </span>
              <h3 className="font-syne font-extrabold text-2xl sm:text-4xl text-white mt-2">
                {service.title}
              </h3>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10 space-y-8">
          <div>
            <h4 className="text-xs font-space text-[#C82333] uppercase tracking-widest font-semibold mb-2">
              Présentation & Cahier des Charges
            </h4>
            <p className="text-base sm:text-lg font-outfit text-white/90 leading-relaxed">
              {service.fullDesc}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-space text-[#C82333] uppercase tracking-widest font-semibold">
              Points Forts & Normes d'Atelier
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {service.features.map((feat, i) => (
                <div key={i} className="flex items-center space-x-3 p-3.5 rounded-xl bg-[#0B0D0F] border border-white/10 text-xs font-space text-white">
                  <CheckCircle className="w-4 h-4 text-[#C82333] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0B0D0F] border border-[#A71D2A]/30 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-space text-[#C82333]">
              <Wrench className="w-4 h-4" />
              <span className="font-bold">Finitions & Personnalisations Disponibles :</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag, idx) => (
                <span key={idx} className="px-3 py-1 rounded-full bg-[#1A1D20] text-xs font-space text-white/90 border border-white/10">
                  {tag}
                </span>
              ))}
              <span className="px-3 py-1 rounded-full bg-[#1A1D20] text-xs font-space text-[#9CA3AF] border border-white/10">
                Thermo-laquage RAL 200+ Couleurs
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs font-space text-[#9CA3AF]">
              <ShieldCheck className="w-4 h-4 text-[#C82333]" />
              <span>Garantie Décennale & Certification CE</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal();
              }}
              className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#A71D2A] to-[#8B0000] text-white font-space font-bold uppercase text-xs rounded-xl tracking-wider flex items-center justify-center space-x-2 shadow-lg shadow-[#A71D2A]/40 hover:scale-105 transition-all"
            >
              <span>Demander un devis pour cet ouvrage</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
