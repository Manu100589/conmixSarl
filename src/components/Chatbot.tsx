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
  RotateCcw
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
  'Quels sont vos services ?',
  'Comment obtenir un devis ?',
  'Où êtes-vous situés ?',
  'Quels sont vos délais ?',
  'Proposez-vous des formations ?',
  'Vos réalisations d\'usines ?',
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: "Bonjour et bienvenue chez **CONMIX SARL** ! 🛠️\n\nJe suis votre assistant virtuel spécialisé en **menuiserie métallique, construction d'usines et génie civil** au Cameroun.\n\nComment puis-je vous aider aujourd'hui ?",
    time: 'À l\'instant',
    actionButtons: [
      { label: '📋 Demander un devis', actionType: 'quote' },
      { label: '💬 WhatsApp Direct', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
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

    // 1. Salutations / Greetings
    if (
      q.includes('bonjour') ||
      q.includes('salut') ||
      q.includes('bonsoir') ||
      q.includes('hello') ||
      q.includes('coucou') ||
      q === 'hi'
    ) {
      return {
        text: "Bonjour ! C'est un plaisir de vous accueillir. Souhaitez-vous des détails sur nos ouvrages métalliques, nos chantiers d'usines ou faire une demande de devis ?",
        actionButtons: [
          { label: '🛠️ Voir nos services', actionType: 'link', target: '#services' },
          { label: '📋 Demander un devis', actionType: 'quote' },
        ],
      };
    }

    // 2. Services / Prestations
    if (
      q.includes('service') ||
      q.includes('prestation') ||
      q.includes('que faites') ||
      q.includes('activite') ||
      q.includes('activités') ||
      q.includes('menuiserie') ||
      q.includes('charpente') ||
      q.includes('savoir-faire')
    ) {
      return {
        text: "**CONMIX SARL** propose 5 services majeurs d'expertise :\n\n" +
          "1. **📐 Étude de projet** : Relevés 3D BIM, modélisation CAO, calculs Eurocodes.\n" +
          "2. **🏗️ Construction métallique** : Usines, charpentes industrielles, passerelles, ossatures acier.\n" +
          "3. **🚪 Menuiserie métallique** : Portes blindées, verrières d'atelier, escaliers d'art, garde-corps, portails.\n" +
          "4. **🧱 Génie civil** : Fondations spéciales, dallages industriels, gros œuvre béton/acier.\n" +
          "5. **🎓 Formation professionnelle** : Métallerie, soudure TIG/MIG et sécurité sur chantier.",
        actionButtons: [
          { label: '🔎 Explorer les services', actionType: 'link', target: '#services' },
          { label: '📋 Chiffrer un projet', actionType: 'quote' },
        ],
      };
    }

    // 3. Devis / Tarifs / Prix / Estimation
    if (
      q.includes('devis') ||
      q.includes('prix') ||
      q.includes('tarif') ||
      q.includes('cout') ||
      q.includes('coût') ||
      q.includes('combien') ||
      q.includes('budget') ||
      q.includes('facture') ||
      q.includes('estimation')
    ) {
      return {
        text: "Nos devis sont **100% gratuits, détaillés et personnalisés** selon vos métrés et spécifications techniques !\n\n" +
          "⏱️ **Délai d'étude** : Réponse sous **24h à 48h** par nos ingénieurs calculateurs.\n\n" +
          "Vous pouvez soumettre votre projet directement via notre formulaire ou discuter en direct sur WhatsApp avec notre bureau d'études.",
        actionButtons: [
          { label: '📝 Remplir le devis en ligne', actionType: 'quote' },
          { label: '💬 WhatsApp (+237 6 79 28 52 76)', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        ],
      };
    }

    // 4. Localisation / Où êtes-vous / Adresse
    if (
      q.includes('où') ||
      q.includes('ou') ||
      q.includes('adresse') ||
      q.includes('lieu') ||
      q.includes('localisation') ||
      q.includes('situe') ||
      q.includes('situé') ||
      q.includes('babenga') ||
      q.includes('littoral') ||
      q.includes('douala') ||
      q.includes('cameroun') ||
      q.includes('ville')
    ) {
      return {
        text: "📍 Notre siège social et atelier principal sont situés à :\n\n" +
          "**Babenga, Région du Littoral, Cameroun**.\n\n" +
          "Nous intervenons sur l'ensemble du territoire camerounais et dans la sous-région pour les chantiers industriels et projets de standing. Une carte Google Maps interactive est disponible dans notre section Contact !",
        actionButtons: [
          { label: '🗺️ Voir sur Google Maps', actionType: 'link', target: '#contact' },
          { label: '📞 Appeler l\'atelier', actionType: 'call', target: '+237679285276' },
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
        text: "Voici les canaux officiels pour contacter directement **CONMIX SARL** :\n\n" +
          "• 📞 **Ligne directe** : **+237 6 79 28 52 76**\n" +
          "• 💬 **WhatsApp** : **+237 6 79 28 52 76** (Échange instantané)\n" +
          "• ✉️ **E-mail technique** : **contact@conmix-sarl.cm**\n" +
          "• 📍 **Atelier** : Babenga, Région du Littoral, Cameroun",
        actionButtons: [
          { label: '💬 Ouvrir WhatsApp', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
          { label: '📞 Appeler maintenant', actionType: 'call', target: '+237679285276' },
        ],
      };
    }

    // 6. Formations
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
        text: "🎓 **CONMIX SARL** dispense des formations professionnelles certifiantes aux métiers de la métallerie :\n\n" +
          "• **Soudure haute précision TIG / MIG** (acier, inox, aluminium)\n" +
          "• **Chaudronnerie et assemblage de structures**\n" +
          "• **Lecture de plans d'ingénierie et métrologie**\n" +
          "• **Règles de sécurité et prévention sur chantier**\n\n" +
          "Nos sessions combinent cours pratiques en atelier et cas réels.",
        actionButtons: [
          { label: '📋 S\'inscrire / Se renseigner', actionType: 'quote' },
          { label: '💬 WhatsApp Formation', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        ],
      };
    }

    // 7. Projets réalisés / Chantiers / Usines
    if (
      q.includes('projet') ||
      q.includes('realisation') ||
      q.includes('réalisation') ||
      q.includes('chantier') ||
      q.includes('usine') ||
      q.includes('socorpa') ||
      q.includes('pisciculture') ||
      q.includes('papier') ||
      q.includes('reference') ||
      q.includes('référence')
    ) {
      return {
        text: "🏭 Parmi nos réalisations industrielles majeures récentes :\n\n" +
          "1. **Usine Alimentaire pour Pisciculture** : Pose de bardage ligne 2, fermes ligne 3, liernes et PVC.\n" +
          "2. **Usine de Pâte à Papier** : Fabrication et pose de corbeaux, réglage structurel et mezzanine.\n" +
          "3. **Usine SOCORPA** : Pose des bretelles ligne K, réglage et modification de mezzanine.\n\n" +
          "Vous pouvez visualiser les galeries photos complètes dans la section Projets !",
        actionButtons: [
          { label: '🏭 Voir les Projets Réalisés', actionType: 'link', target: '#projets-realises' },
        ],
      };
    }

    // 8. Génie civil / Bâtiment
    if (
      q.includes('genie civil') ||
      q.includes('génie civil') ||
      q.includes('beton') ||
      q.includes('béton') ||
      q.includes('fondation') ||
      q.includes('dallage') ||
      q.includes('gros oeuvre') ||
      q.includes('gros œuvre')
    ) {
      return {
        text: "🧱 Notre pôle **Génie Civil** assure la réalisation des infrastructures indispensables à vos constructions métalliques :\n\n" +
          "• Fondations superficielles et profondes\n" +
          "• Dallages industriels renforcés haute résistance\n" +
          "• Massifs d'ancrage métalliques de précision\n" +
          "• Superstructures et maçonnerie technique.",
        actionButtons: [
          { label: '📋 Demander une étude génie civil', actionType: 'quote' },
        ],
      };
    }

    // 9. Délais / Planning
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
        text: "⏱️ **Délais & Réactivité CONMIX SARL** :\n\n" +
          "• **Chiffrage & Devis** : 24 à 48 heures\n" +
          "• **Étude 3D & Plans** : 3 à 7 jours ouvrés\n" +
          "• **Fabrication en atelier** : selon envergure du projet\n" +
          "• **Pose sur site** : planifiée selon vos impératifs de chantier.\n\n" +
          "Pour les demandes urgentes, contactez-nous directement par téléphone au **+237 6 79 28 52 76**.",
        actionButtons: [
          { label: '📞 Appeler directement', actionType: 'call', target: '+237679285276' },
          { label: '💬 Contacter sur WhatsApp', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        ],
      };
    }

    // 10. Garanties / Qualité / Normes
    if (
      q.includes('garantie') ||
      q.includes('norme') ||
      q.includes('qualite') ||
      q.includes('qualité') ||
      q.includes('assurance') ||
      q.includes('decennale') ||
      q.includes('décennale') ||
      q.includes('securite') ||
      q.includes('sécurité')
    ) {
      return {
        text: "🛡️ **Nos Engagements & Certifications** :\n\n" +
          "• **Garantie Décennale** sur tous nos ouvrages installés.\n" +
          "• Conception conforme aux **Eurocodes 3 (Acier)** et **Eurocodes 2 (Béton)**.\n" +
          "• Respect scrupuleux des normes de sécurité garde-corps **NF P01-012**.\n" +
          "• Traçabilité complète des aciers nobles et contrôles de soudure certifiés.",
        actionButtons: [
          { label: '📋 Lancer un projet sécurisé', actionType: 'quote' },
        ],
      };
    }

    // Fallback response with helpful menu
    return {
      text: "Je comprends votre demande ! Pour vous apporter une réponse sur-mesure :\n\n" +
        "• Vous pouvez nous contacter directement au **+237 6 79 28 52 76**\n" +
        "• Échanger instantanément par **WhatsApp** avec notre chef de projet\n" +
        "• Ou soumettre votre besoin via notre formulaire de devis détaillé.",
      actionButtons: [
        { label: '📋 Remplir une demande de devis', actionType: 'quote' },
        { label: '💬 Échanger sur WhatsApp', actionType: 'whatsapp', target: 'https://wa.me/237679285276' },
        { label: '📞 Téléphoner (+237 6 79 28 52 76)', actionType: 'call', target: '+237679285276' },
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
    }, 700);
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
            <span>Besoin d'aide ? <strong>Discutez avec CONMIX</strong></span>
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
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[420px] h-[580px] max-h-[82vh] bg-[#0B0D0F] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
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
                  En ligne • Réponse automatique 24/7
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

          {/* Quick suggestions pills */}
          <div className="px-3 py-2 bg-[#141618] border-b border-white/5 overflow-x-auto scrollbar-none flex items-center space-x-2">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-[#1A1D20] hover:bg-[#A71D2A]/20 hover:border-[#A71D2A]/50 border border-white/10 text-[11px] font-space text-white/80 hover:text-white transition-all shrink-0"
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
                <div className="flex items-start space-x-2 max-w-[88%]">
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
              placeholder="Posez votre question (devis, usines, délais...)"
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
