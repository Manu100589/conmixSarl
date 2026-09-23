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
  DollarSign,
  Cpu
} from 'lucide-react';

interface ChatbotProps {
  onOpenQuoteModal: () => void;
}

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  time: string;
  provider?: 'gemini' | 'groq' | 'local_knowledge';
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
    text: "Bonjour et bienvenue chez **CONMIX SARL** ! 🛠️🇨🇲\n\nJe suis votre assistant IA connecté en direct. Je réponds à toutes vos questions sur **nos services**, **nos tarifs & estimations de prix**, **notre localisation à Babenga**, et **vos projets industriels**.\n\nComment puis-je vous renseigner aujourd'hui ?",
    time: 'À l\'instant',
    provider: 'local_knowledge',
    actionButtons: [
      { label: '🛠️ Nos 5 Services', actionType: 'link', target: '#services' },
      { label: '💰 Tarifs & Devis', actionType: 'quote' },
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

  // Auto-scroll vers le dernier message
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

  /**
   * Analyse intelligente pour attacher des boutons d'actions pertinents
   */
  const deduceActionButtons = (text: string, query: string): Message['actionButtons'] => {
    const t = (text + ' ' + query).toLowerCase();
    const buttons: Message['actionButtons'] = [];

    if (t.includes('devis') || t.includes('prix') || t.includes('tarif') || t.includes('combien') || t.includes('cout')) {
      buttons.push({ label: '📋 Remplir mon devis gratuit', actionType: 'quote' });
      buttons.push({ label: '💬 WhatsApp chiffrage (+237 6 79 28 52 76)', actionType: 'whatsapp', target: 'https://wa.me/237679285276' });
    } else if (t.includes('babenga') || t.includes('ou') || t.includes('où') || t.includes('localisation') || t.includes('adresse') || t.includes('carte')) {
      buttons.push({ label: '🗺️ Voir sur Google Maps', actionType: 'link', target: '#contact' });
      buttons.push({ label: '📞 Appeler l\'atelier', actionType: 'call', target: '+237679285276' });
    } else if (t.includes('service') || t.includes('prestation') || t.includes('charpente') || t.includes('menuiserie')) {
      buttons.push({ label: '🛠️ Découvrir les services', actionType: 'link', target: '#services' });
      buttons.push({ label: '📋 Demander une étude', actionType: 'quote' });
    } else if (t.includes('projet') || t.includes('usine') || t.includes('socorpa')) {
      buttons.push({ label: '🏭 Voir les Projets Réalisés', actionType: 'link', target: '#projets-realises' });
    } else {
      buttons.push({ label: '📋 Demander un devis', actionType: 'quote' });
      buttons.push({ label: '💬 WhatsApp Direct', actionType: 'whatsapp', target: 'https://wa.me/237679285276' });
    }

    return buttons.slice(0, 2);
  };

  /**
   * Envoi du message au serveur sécurisé /api/chat
   */
  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      time: getCurrentTime(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Préparation de l'historique conversationnel pour l'IA
      const historyPayload = messages.slice(-6).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      // Appel à la route serveur sécurisée (Gemini / Groq / Node)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyPayload,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const replyText = data.text || "Je suis à votre disposition. Pouvez-vous préciser votre demande ?";
        const actionButtons = deduceActionButtons(replyText, text);

        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: replyText,
          time: getCurrentTime(),
          provider: data.provider || 'gemini',
          actionButtons,
        };

        setMessages((prev) => [...prev, botMessage]);
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.warn('[Chatbot Client] Erreur route serveur, utilisation du fallback immédiat:', err);

      // Réponse de secours locale immédiate en cas de coupure réseau
      const fallbackReply = generateClientFallback(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: fallbackReply,
        time: getCurrentTime(),
        provider: 'local_knowledge',
        actionButtons: deduceActionButtons(fallbackReply, text),
      };

      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  /**
   * Fallback de secours côté client
   */
  const generateClientFallback = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('service') || q.includes('activite') || q.includes('que faites')) {
      return "🛠️ **Les 5 Services de CONMIX SARL** :\n\n" +
        "1. 📐 **Étude de projet** : Modélisation 3D BIM & calculs Eurocodes.\n" +
        "2. 🏗️ **Construction métallique** : Usines, hangars, charpentes S355, passerelles.\n" +
        "3. 🚪 **Menuiserie métallique sur mesure** : Portes blindées, verrières, escaliers d'art, garde-corps NF.\n" +
        "4. 🧱 **Génie civil** : Fondations spéciales, dallages industriels haute résistance.\n" +
        "5. 🎓 **Formation professionnelle** : Soudure TIG/MIG certifiante, chaudronnerie.";
    }

    if (q.includes('prix') || q.includes('tarif') || q.includes('devis') || q.includes('combien')) {
      return "💰 **Prix & Modalités Tarifaires** :\n\n" +
        "• 🚪 Portes métalliques : 150 000 à 450 000 FCFA\n" +
        "• 🪟 Verrières d'atelier : 80 000 à 160 000 FCFA / m²\n" +
        "• 🪜 Escaliers d'art : 600 000 à 2 500 000 FCFA\n" +
        "• 🚧 Garde-corps NF : 35 000 à 90 000 FCFA / mètre linéaire\n" +
        "• 🏗️ Charpentes & Usines : devis sur métré précis.\n\n" +
        "⚡ **Votre devis personnalisé est 100% GRATUIT sous 24h à 48h !**";
    }

    if (q.includes('ou') || q.includes('où') || q.includes('localisation') || q.includes('adresse') || q.includes('babenga')) {
      return "📍 **Localisation CONMIX SARL** :\n\n" +
        "🏢 Siège et atelier : **Babenga, Région du Littoral, Cameroun**.\n" +
        "Idéalement situé sur l'axe industriel du Littoral pour desservir Douala et tout le Cameroun.\n\n" +
        "📞 Tél / WhatsApp : **+237 6 79 28 52 76**";
    }

    return "Merci pour votre message ! CONMIX SARL conçoit, fabrique et installe vos ouvrages métalliques sur mesure au Cameroun.\n\n" +
      "Contactez-nous directement au **+237 6 79 28 52 76** ou demandez votre devis gratuit en ligne.";
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
      {/* Bouton Flottant Déclencheur */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center">
        {!isOpen && (
          <div className="hidden sm:flex items-center space-x-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#1A1D20]/95 border border-[#A71D2A]/40 text-xs font-space text-white shadow-2xl backdrop-blur-md animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Assistant IA : <strong>Posez vos questions</strong></span>
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

      {/* Fenêtre Widget Chatbot */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-32px)] sm:w-[440px] h-[610px] max-h-[85vh] bg-[#0B0D0F] border border-white/15 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 backdrop-blur-xl">
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
                  <h4 className="font-syne font-bold text-sm text-white">Assistant IA CONMIX</h4>
                  <Sparkles className="w-3.5 h-3.5 text-[#C82333]" />
                </div>
                <p className="text-[10px] font-space text-emerald-400 font-medium flex items-center space-x-1">
                  <span>En ligne</span>
                  <span>•</span>
                  <span>Route Sécurisée API</span>
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

          {/* Onglets d'accès direct Services, Prix, Localisation */}
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

          {/* Suggestions rapides secondaires */}
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

          {/* Zone des messages */}
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

                <div className="flex items-center space-x-2 mt-1 px-9 text-[10px] font-space text-[#6B7075]">
                  <span>{msg.time}</span>
                  {msg.provider && (
                    <span className="flex items-center space-x-1 text-[#8E959E]">
                      <Cpu className="w-2.5 h-2.5 text-[#C82333]" />
                      <span>
                        {msg.provider === 'gemini'
                          ? 'Gemini IA'
                          : msg.provider === 'groq'
                          ? 'Groq IA'
                          : 'CONMIX Auto'}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            ))}

            {/* Animation de saisie */}
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

          {/* Barre d'informations rapides */}
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

          {/* Formulaire de saisie */}
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
              placeholder="Posez votre question (ex: prix d'une verrière, devis...)"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1A1D20] border border-white/15 text-white placeholder-white/40 text-xs sm:text-sm font-outfit focus:outline-none focus:border-[#A71D2A] transition-colors"
            />

            <button
              type="submit"
              disabled={!inputText.trim() || isTyping}
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
