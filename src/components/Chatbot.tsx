import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  PhoneCall,
  MapPin,
  ExternalLink,
  RotateCcw,
  Wrench,
  DollarSign
} from 'lucide-react';

interface ChatbotProps {
  onOpenQuoteModal: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  actionButtons?: {
    label: string;
    actionType: 'quote' | 'whatsapp' | 'call' | 'link';
    target?: string;
  }[];
}

const QUICK_PROMPTS = [
  '🛠️ Les 5 Services',
  '💰 Tarifs & Prix',
  '📍 Localisation exacte',
  '📋 Devis gratuit (24h)',
  '💬 WhatsApp Direct',
  '🏭 Projets d\'usines',
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: "Bonjour et bienvenue chez **CONMIX SARL** ! 🛠️🇨🇲\n\nJe réponds instantanément à vos questions sur **nos services**, **nos tarifs & prix indicatifs**, et **notre localisation** à Babenga (Littoral).\n\nQue souhaitez-vous savoir ?",
    time: 'À l\'instant',
    actionButtons: [
      { label: '🛠️ Nos 5 Services', actionType: 'link', target: '#services' },
      { label: '💰 Tarifs & Prix', actionType: 'quote' },
      { label: '📍 Localisation', actionType: 'link', target: '#contact' },
    ],
  },
];

export const Chatbot: React.FC<ChatbotProps> = ({ onOpenQuoteModal }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen, messages, isTyping]);

  const getCurrentTime = () => {
    const now = new Date();
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  };

  // Automated smart response logic based on user input
  const generateBotResponse = (query: string): { text: string; actionButtons?: Message['actionButtons'] } => {
    const q = query.toLowerCase().trim();

    // 1. Services / Prestations (Direct and explicit)
    if (
      q.includes('service') ||
      q.includes('prestation') ||
      q.includes('que faites') ||
      q.includes('activite') ||
      q.includes('activités') ||
      q.includes('menuiserie') ||
      q.includes('charpente') ||
      q.includes('savoir-faire') ||
      q.includes('5 services')
    ) {
      return {
        text: "🛠️ **LES 5 SERVICES OFFICIELS DE CONMIX SARL** :\n\n" +
          "1. 📐 **ÉTUDE DE PROJET**\n" +
          "   • Modélisation 3D BIM, plans d'exécution CAO\n" +
          "   • Notes de calculs d'ingénierie selon les normes Eurocodes\n\n" +
          "2. 🏗️ **CONSTRUCTION MÉTALLIQUE**\n" +
          "   • Usines et complexes industriels (ex: agro-alimentaire, papeterie, SOCORPA)\n" +
          "   • Charpentes acier S355, ossatures, hangars, passerelles\n\n" +
          "3. 🚪 **MENUISERIE MÉTALLIQUE SUR MESURE**\n" +
          "   • Portes métalliques renforcées & blindées\n" +
          "   • Verrières d'atelier contemporaines, cloisons vitrées\n" +
          "   • Escaliers d'art (suspendus, hélicoïdaux, limon central)\n" +
          "   • Garde-corps de sécurité NF et portails motorisés laser\n\n" +
          "4. 🧱 **GÉNIE CIVIL**\n" +
          "   • Fondations spéciales, coulage de dallages industriels haute charge\n" +
          "   • Gros œuvre et ancrages métalliques pour structures lourdes\n\n" +
          "5. 🎓 **FORMATION PROFESSIONNELLE**\n" +
          "   • Modules certifiants en soudure haute précision (TIG / MIG)\n" +
          "   • Chaudronnerie, lecture de plans et règles de sécurité chantier.",
        actionButtons: [
          { label: '📋 Demander un devis projet', actionType: 'quote' },
          { label: '💬 Échanger sur WhatsApp', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        ],
      };
    }

    // 2. Tarifs / Prix / Estimation / Coût (Direct, transparent and comprehensive)
    if (
      q.includes('prix') ||
      q.includes('tarif') ||
      q.includes('cout') ||
      q.includes('coût') ||
      q.includes('combien') ||
      q.includes('budget') ||
      q.includes('devis') ||
      q.includes('facture') ||
      q.includes('estimation') ||
      q.includes('payer') ||
      q.includes('argent')
    ) {
      return {
        text: "💰 **GRILLE DES PRIX & MODALITÉS TARIFAIRES CONMIX SARL** :\n\n" +
          "Tous nos ouvrages métalliques sont réalisés **100% sur mesure**. Voici des fourchettes tarifaires indicatives :\n\n" +
          "• 🚪 **Portes métalliques & blindées** : dès **150 000 FCFA à 450 000 FCFA** (selon serrure haute sécurité, blindage ou vitrage feuilleté).\n" +
          "• 🪟 **Verrières d'atelier & cloisons vitrées** : environ **80 000 à 160 000 FCFA / m²** (profils acier fins + vitrage de sécurité 33.2 ou 44.2).\n" +
          "• 🪜 **Escaliers métalliques d'art** : de **600 000 FCFA à 2 500 000 FCFA** selon configuration (droit, quart-tournant, hélicoïdal, marches chêne/verre).\n" +
          "• 🚧 **Garde-corps & balustrades NF** : de **35 000 à 90 000 FCFA / mètre linéaire**.\n" +
          "• 🏗️ **Charpentes industrielles & Usines** : chiffrage précis au m² ou à la tonne selon l'étude de charge.\n" +
          "• 🧱 **Génie Civil & Dallages** : sur métré selon l'épaisseur et l'armature requise.\n" +
          "• 🎓 **Formations professionnelles** : tarifs forfaitaires modulaires très accessibles.\n\n" +
          "⚡ **VOTRE DEVIS EST 100% GRATUIT sous 24h à 48h !**",
        actionButtons: [
          { label: '📋 Remplir mon devis gratuit', actionType: 'quote' },
          { label: '💬 WhatsApp chiffrage rapide', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        ],
      };
    }

    // 3. Localisation / Où êtes-vous / Adresse (Direct and exact)
    if (
      q.includes('où') ||
      q.includes('ou') ||
      q.includes('localisation') ||
      q.includes('adresse') ||
      q.includes('lieu') ||
      q.includes('situe') ||
      q.includes('situé') ||
      q.includes('babenga') ||
      q.includes('littoral') ||
      q.includes('douala') ||
      q.includes('cameroun') ||
      q.includes('ville') ||
      q.includes('trouver') ||
      q.includes('carte') ||
      q.includes('maps')
    ) {
      return {
        text: "📍 **LOCALISATION EXACTE DE CONMIX SARL** :\n\n" +
          "🏢 **Siège & Atelier de Chaudronnerie / Fabrication** :\n" +
          "👉 **Babenga, Région du Littoral, Cameroun**.\n\n" +
          "🗺️ **Situation Géographique & Accès** :\n" +
          "• Positionné au cœur du bassin économique du Littoral, facilitant les transports lourds d'acier et de structures métalliques vers **Douala** et l'ensemble des régions du Cameroun.\n" +
          "• Nous intervenons et livrons partout au Cameroun et en Afrique Centrale.\n\n" +
          "🧭 **Google Maps** : Une carte interactive en direct est consultable dans la section Contact de notre site web.",
        actionButtons: [
          { label: '🗺️ Voir sur Google Maps', actionType: 'link', target: '#contact' },
          { label: '📞 Appeler l\'atelier (+237 6 79 28 52 76)', actionType: 'call', target: '+237679285276' },
          { label: '💬 WhatsApp localisation', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        ],
      };
    }

    // 4. Salutations / Greetings
    if (
      q.includes('bonjour') ||
      q.includes('salut') ||
      q.includes('bonsoir') ||
      q.includes('hello') ||
      q.includes('coucou') ||
      q === 'hi'
    ) {
      return {
        text: "Bonjour ! C'est un grand plaisir de vous accueillir chez **CONMIX SARL**.\n\nJe suis à votre disposition pour vous renseigner instantanément sur :\n1. **Nos 5 Services** (Ingénierie, Métallerie, Usines, Génie Civil, Formations)\n2. **Nos Tarifs & Devis gratuits sous 24h**\n3. **Notre Localisation à Babenga (Littoral)**.\n\nQue désirez-vous savoir ?",
        actionButtons: [
          { label: '🛠️ Les 5 Services', actionType: 'link', target: '#services' },
          { label: '💰 Les Tarifs & Devis', actionType: 'quote' },
          { label: '📍 Notre Localisation', actionType: 'link', target: '#contact' },
        ],
      };
    }

    // 5. Contact / Téléphone / WhatsApp / Email
    if (
      q.includes('contact') ||
      q.includes('telephone') ||
      q.includes('téléphone') ||
      q.includes('numéro') ||
      q.includes('numero') ||
      q.includes('appeler') ||
      q.includes('joindre') ||
      q.includes('whatsapp') ||
      q.includes('email') ||
      q.includes('mail')
    ) {
      return {
        text: "📞 **COORDONNÉES OFFICIELLES CONMIX SARL** :\n\n" +
          "• 📱 **Téléphone direct** : **+237 6 79 28 52 76**\n" +
          "• 💬 **WhatsApp Direct** : **+237 6 79 28 52 76** (Réponse immédiate)\n" +
          "• ✉️ **E-mail Technique** : **contact@conmix-sarl.cm**\n" +
          "• 📍 **Adresse** : Babenga, Région du Littoral, Cameroun\n" +
          "• ⏰ **Horaires atelier** : Lundi – Vendredi (07h30 – 18h00), Samedi (08h00 – 14h00).",
        actionButtons: [
          { label: '💬 Discuter sur WhatsApp', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
          { label: '📞 Téléphoner directement', actionType: 'call', target: '+237679285276' },
        ],
      };
    }

    // 6. Formations professionnelles
    if (
      q.includes('formation') ||
      q.includes('apprendre') ||
      q.includes('cours') ||
      q.includes('soudure') ||
      q.includes('souder') ||
      q.includes('stage') ||
      q.includes('certificat') ||
      q.includes('chaudronnerie')
    ) {
      return {
        text: "🎓 **FORMATIONS PROFESSIONNELLES CONMIX SARL** :\n\n" +
          "Nos programmes certifiants s'adressent aux particuliers et professionnels désirant acquérir un savoir-faire d'excellence :\n\n" +
          "• **Soudure TIG & MIG** haute précision sur acier, inox et aluminium\n" +
          "• **Chaudronnerie industrielle** et façonnage des métaux\n" +
          "• **Lecture de plans techniques CAO / BIM** et métrologie\n" +
          "• **Sécurité et conformité sur chantier**\n\n" +
          "Les sessions se déroulent dans notre atelier à Babenga (Littoral).",
        actionButtons: [
          { label: '📋 Inscription & Renseignements', actionType: 'quote' },
          { label: '💬 WhatsApp Formations', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        ],
      };
    }

    // 7. Projets d'usines / Chantiers réalisés
    if (
      q.includes('projet') ||
      q.includes('realisation') ||
      q.includes('réalisation') ||
      q.includes('chantier') ||
      q.includes('usine') ||
      q.includes('socorpa') ||
      q.includes('pisciculture') ||
      q.includes('papier')
    ) {
      return {
        text: "🏭 **NOS PROJETS MAJEURS RÉALISÉS** :\n\n" +
          "1. 🐟 **Usine Alimentaire pour Pisciculture** : Lisses de bardage (ligne 2), fermes (ligne 3), liernes et bretelles.\n" +
          "2. 📜 **Usine de Fabrication de Pâte à Papier** : Corbeaux, réglage de la structure, modification de mezzanine.\n" +
          "3. 🏬 **Usine SOCORPA** : Pose des bretelles ligne K, réglage de structure et mezzanine.\n\n" +
          "Toutes les photos réelles de ces 3 usines sont consultables sur notre page !",
        actionButtons: [
          { label: '🏭 Voir les Projets Réalisés', actionType: 'link', target: '#projets-realises' },
        ],
      };
    }

    // 8. Délais / Planning
    if (
      q.includes('delai') ||
      q.includes('délai') ||
      q.includes('temps') ||
      q.includes('duree') ||
      q.includes('durée') ||
      q.includes('quand') ||
      q.includes('planning') ||
      q.includes('urgent')
    ) {
      return {
        text: "⏱️ **NOS DÉLAIS DE RÉALISATION** :\n\n" +
          "• **Devis & Évaluation** : 24h à 48h ouvrées\n" +
          "• **Étude 3D & Plans d'exécution** : 3 à 7 jours\n" +
          "• **Fabrication en atelier** : planifiée selon le cahier des charges\n" +
          "• **Pose et réception** : respect strict des délais convenus.",
        actionButtons: [
          { label: '📋 Lancer un projet', actionType: 'quote' },
          { label: '📞 Ligne d\'urgence : +237 6 79 28 52 76', actionType: 'call', target: '+237679285276' },
        ],
      };
    }

    // Fallback response with the 3 main subjects
    return {
      text: "Je suis là pour vous aider ! Voici les 3 informations les plus demandées sur **CONMIX SARL** :\n\n" +
        "1. 🛠️ **Nos 5 Services** : Étude de projet, Construction métallique, Menuiserie d'art, Génie civil, Formations.\n" +
        "2. 💰 **Nos Prix** : 100% sur mesure, devis gratuit sous 24h-48h.\n" +
        "3. 📍 **Notre Localisation** : Babenga, Région du Littoral, Cameroun.\n\n" +
        "Sélectionnez un bouton ci-dessous ou posez-moi votre question directement !",
      actionButtons: [
        { label: '🛠️ Les Services', actionType: 'link', target: '#services' },
        { label: '💰 Les Prix & Devis', actionType: 'quote' },
        { label: '📍 Localisation (Babenga)', actionType: 'link', target: '#contact' },
        { label: '💬 WhatsApp Direct', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
      ],
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate natural response latency
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: botResponse.text,
        time: getCurrentTime(),
        actionButtons: botResponse.actionButtons,
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionButton = (btn: NonNullable<Message['actionButtons']>[0]) => {
    if (btn.actionType === 'quote') {
      onOpenQuoteModal();
    } else if (btn.actionType === 'whatsapp' && btn.target) {
      window.open(btn.target, '_blank');
    } else if (btn.actionType === 'call' && btn.target) {
      window.location.href = `tel:${btn.target}`;
    } else if (btn.actionType === 'link' && btn.target) {
      const element = document.querySelector(btn.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setInputText('');
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Chat Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        {!isOpen && (
          <div className="hidden sm:flex items-center space-x-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#1A1D20]/95 border border-[#A71D2A]/40 text-xs font-space text-white shadow-2xl backdrop-blur-md animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Services, Prix, Localisation : <strong>Discutez ici</strong></span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Ouvrir le chatbot CONMIX SARL"
          className="relative group p-4 rounded-full bg-gradient-to-tr from-[#A71D2A] via-[#C82333] to-[#8B0000] text-white shadow-2xl shadow-[#A71D2A]/60 hover:shadow-[#A71D2A] transition-all duration-300 transform hover:scale-108 active:scale-95 focus:outline-none"
        >
          {isOpen ? (
            <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
          ) : (
            <>
              <MessageSquare className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-white text-[#A71D2A] font-space font-bold text-[10px] flex items-center justify-center border-2 border-[#A71D2A] shadow-md animate-pulse">
                  {unreadCount}
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Expandable Chat Drawer Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[440px] h-[600px] max-h-[84vh] bg-[#0B0D0F] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
          {/* Header */}
          <div className="p-4 bg-[#1A1D20] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center overflow-hidden p-1">
                  <img
                    src="/images/logo-dark.png"
                    alt="CONMIX SARL Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#1A1D20]" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h4 className="font-syne font-bold text-sm text-white">Assistant CONMIX</h4>
                  <Sparkles className="w-3.5 h-3.5 text-[#C82333]" />
                </div>
                <p className="text-[10px] font-space text-emerald-400 font-medium">
                  En ligne • Services, Prix & Localisation 24/7
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-[#9CA3AF]">
              <button
                onClick={resetChat}
                title="Réinitialiser la conversation"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Fermer"
                className="p-1.5 rounded-lg hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Primary Quick Access Tabs (Services, Prix, Localisation) */}
          <div className="p-2.5 bg-[#121416] border-b border-white/10 grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleSend('Quels sont vos 5 services ?')}
              className="py-1.5 px-2 rounded-lg bg-[#1A1D20] hover:bg-[#A71D2A] border border-white/10 text-[11px] font-space font-semibold text-white/90 hover:text-white flex items-center justify-center space-x-1 transition-all"
            >
              <Wrench className="w-3.5 h-3.5 text-[#C82333]" />
              <span>Services</span>
            </button>
            <button
              onClick={() => handleSend('Quels sont vos prix et tarifs ?')}
              className="py-1.5 px-2 rounded-lg bg-[#1A1D20] hover:bg-[#A71D2A] border border-white/10 text-[11px] font-space font-semibold text-white/90 hover:text-white flex items-center justify-center space-x-1 transition-all"
            >
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prix & Devis</span>
            </button>
            <button
              onClick={() => handleSend('Où êtes-vous situés ? Localisation')}
              className="py-1.5 px-2 rounded-lg bg-[#1A1D20] hover:bg-[#A71D2A] border border-white/10 text-[11px] font-space font-semibold text-white/90 hover:text-white flex items-center justify-center space-x-1 transition-all"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Localisation</span>
            </button>
          </div>

          {/* Secondary Quick suggestions pills */}
          <div className="px-3 py-1.5 bg-[#141618] border-b border-white/5 overflow-x-auto scrollbar-none flex items-center space-x-2">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#1A1D20] hover:bg-[#A71D2A]/20 hover:border-[#A71D2A]/50 border border-white/10 text-[10px] font-space text-white/80 hover:text-white transition-all shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-[#0B0D0F] to-[#141618]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-start space-x-2 max-w-[90%]">
                  {msg.sender === 'bot' && (
                    <div className="w-7 h-7 rounded-lg bg-[#A71D2A]/20 border border-[#A71D2A]/40 flex items-center justify-center shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-[#C82333]" />
                    </div>
                  )}

                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm font-outfit leading-relaxed shadow-md ${
                      msg.sender === 'user'
                        ? 'bg-[#A71D2A] text-white rounded-br-none'
                        : 'bg-[#1A1D20] text-[#F4F4F0] border border-white/10 rounded-tl-none whitespace-pre-line'
                    }`}
                  >
                    {msg.text}

                    {/* Action buttons inside bot messages */}
                    {msg.actionButtons && msg.actionButtons.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-white/15 flex flex-wrap gap-2">
                        {msg.actionButtons.map((btn, bIdx) => (
                          <button
                            key={bIdx}
                            onClick={() => handleActionButton(btn)}
                            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/40 hover:bg-[#A71D2A] border border-white/15 text-[11px] font-space font-medium text-white transition-all shadow-sm"
                          >
                            <span>{btn.label}</span>
                            <ExternalLink className="w-3 h-3 text-[#C82333]" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center shrink-0 mt-1">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <span className="text-[10px] font-space text-[#6B7075] mt-1 px-9">
                  {msg.time}
                </span>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="w-7 h-7 rounded-lg bg-[#A71D2A]/20 border border-[#A71D2A]/40 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-[#C82333]" />
                </div>
                <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-[#1A1D20] border border-white/10 flex items-center space-x-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#C82333] animate-pulse" />
                  <span className="w-2 h-2 rounded-full bg-[#C82333] animate-pulse [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#C82333] animate-pulse [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions Footer Bar */}
          <div className="px-3 py-2 bg-[#1A1D20]/90 border-t border-white/5 flex items-center justify-between text-[11px] font-space text-[#9CA3AF]">
            <a
              href="tel:+237679285276"
              className="flex items-center space-x-1 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-[#C82333]" />
              <span>+237 6 79 28 52 76</span>
            </a>
            <span className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-[#C82333]" />
              <span>Babenga, Littoral</span>
            </span>
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#141618] border-t border-white/10 flex items-center space-x-2"
          >
            <input
              ref={inputRef}
              type="text"
              placeholder="Posez votre question (services, prix, Babenga...)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1A1D20] border border-white/15 text-white placeholder-white/40 text-xs sm:text-sm font-outfit focus:outline-none focus:border-[#A71D2A] transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-[#A71D2A] to-[#C82333] text-white disabled:opacity-40 hover:from-[#C82333] hover:to-[#A71D2A] transition-all shrink-0 shadow-md shadow-[#A71D2A]/30"
              aria-label="Envoyer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
