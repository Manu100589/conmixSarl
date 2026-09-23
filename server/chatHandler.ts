/**
 * Gestionnaire sécurisé côté serveur pour le Chatbot CONMIX SARL
 * Supporte l'API Google Gemini et l'API Groq sans exposer les clés au navigateur.
 */

const CONMIX_SYSTEM_PROMPT = `Tu es l'assistant IA officiel de CONMIX SARL, entreprise d'élite en menuiserie métallique, construction d'usines et génie civil basée au Cameroun.
Ton rôle est de répondre de façon chaleureuse, précise, professionnelle et concise aux clients, maîtres d'ouvrage et visiteurs du site.

INFORMATIONS ESSENTIELLES SUR CONMIX SARL :
1. LOCALISATION & ATELIER :
- Siège et atelier de fabrication : Babenga, Région du Littoral, Cameroun (axe stratégique du Littoral pour desservir Douala et tout le Cameroun).
- Déplacements et pose sur tout le territoire national et en Afrique Centrale.

2. CONTACTS OFFICIELS :
- Téléphone : +237 6 79 28 52 76
- WhatsApp : +237 6 79 28 52 76 (réponse instantanée)
- Email : contact@conmix-sarl.cm
- Horaires : Lundi-Vendredi 07h30-18h00, Samedi 08h00-14h00

3. LES 5 SERVICES :
1) Étude de projet : Modélisation 3D BIM, plans d'exécution CAO, calculs de structure selon les normes Eurocodes.
2) Construction métallique : Usines, hangars, charpentes acier S355, passerelles piétonnes, ossatures lourdes.
3) Menuiserie métallique sur mesure : Portes blindées, verrières d'atelier, escaliers d'art (suspendus, hélicoïdaux), garde-corps NF P01-012, portails motorisés laser.
4) Génie civil : Fondations spéciales, dallages industriels haute résistance, ancrages et superstructures.
5) Formation professionnelle : Soudure haute précision TIG/MIG certifiante, chaudronnerie, lecture de plans, sécurité chantier.

4. PRIX & TARIFS (FOURCHETTES INDICATIVES EN FCFA) :
- Portes métalliques sécurisées : 150 000 à 450 000 FCFA selon options et blindage
- Verrières d'atelier style industriel : 80 000 à 160 000 FCFA / m² avec vitrage feuilleté
- Escaliers métalliques d'art : 600 000 à 2 500 000 FCFA selon complexité
- Garde-corps de sécurité : 35 000 à 90 000 FCFA / mètre linéaire
- Charpentes et Usines : sur métré précis et étude de charge Eurocodes
- DEVIS 100% GRATUIT sous 24h à 48h.

5. PROJETS DE RÉFÉRENCE :
- Usine Alimentaire pour Pisciculture (lignes de bardage 2, fermes ligne 3, liernes et PVC).
- Usine de Pâte à Papier (fabrication/pose corbeaux, réglage structure, mezzanine).
- Usine SOCORPA (bretelles ligne K, réglage structure, modification mezzanine).

CONSIGNES DE RÉPONSE :
- Réponds toujours en français professionnel et courtois.
- Reste concis (1 à 3 paragraphes maximum), utilise des puces pour la lisibilité.
- Encourage l'utilisateur à demander un devis gratuit ou à échanger sur WhatsApp (+237 6 79 28 52 76).
- Si l'utilisateur pose une question hors sujet, recentre poliment sur les métiers du métal et de la construction de CONMIX SARL.`;

export interface ChatHistoryItem {
  sender: 'user' | 'bot';
  text: string;
}

export interface ChatRequestPayload {
  message: string;
  history?: ChatHistoryItem[];
}

export interface ChatResponsePayload {
  text: string;
  provider: 'gemini' | 'groq' | 'local_knowledge';
  success: boolean;
  notice?: string;
}

import fs from 'node:fs';
import path from 'node:path';

function getApiKey(keyName: string): string | undefined {
  if (process.env[keyName]) return process.env[keyName];
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      const match = content.match(new RegExp(`^${keyName}\\s*=\\s*(.*)$`, 'm'));
      if (match && match[1]) {
        return match[1].trim().replace(/^["']|["']$/g, '');
      }
    }
  } catch {
    // ignore
  }
  return undefined;
}

/**
 * Traitement de la requête de chat avec Gemini, Groq ou fallback local
 */
export async function handleChatRequest({ message, history = [] }: ChatRequestPayload): Promise<ChatResponsePayload> {
  const geminiApiKey = getApiKey('GEMINI_API_KEY') || getApiKey('VITE_GEMINI_API_KEY');
  const groqApiKey = getApiKey('GROQ_API_KEY') || getApiKey('VITE_GROQ_API_KEY');

  // 1. Essai avec l'API Google Gemini
  if (geminiApiKey && geminiApiKey.trim() !== '') {
    try {
      const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

      // Formatage de l'historique pour Gemini
      if (Array.isArray(history)) {
        history.forEach((h) => {
          if (h.sender === 'user') {
            contents.push({ role: 'user', parts: [{ text: h.text }] });
          } else if (h.sender === 'bot') {
            contents.push({ role: 'model', parts: [{ text: h.text }] });
          }
        });
      }

      // Ajout du message courant
      contents.push({ role: 'user', parts: [{ text: message }] });

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiApiKey.trim()}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: {
              parts: [{ text: CONMIX_SYSTEM_PROMPT }],
            },
            contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
            },
          }),
        }
      );

      if (res.ok) {
        const data = (await res.json()) as any;
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (reply) {
          return {
            text: reply,
            provider: 'gemini',
            success: true,
          };
        }
      } else {
        const errorText = await res.text();
        console.warn('[Chatbot Server] Erreur Gemini API:', errorText);
      }
    } catch (err) {
      console.warn('[Chatbot Server] Exception appel Gemini:', err);
    }
  }

  // 2. Essai avec l'API Groq (si configurée)
  if (groqApiKey && groqApiKey.trim() !== '') {
    try {
      const messages: Array<{ role: string; content: string }> = [
        { role: 'system', content: CONMIX_SYSTEM_PROMPT },
      ];

      if (Array.isArray(history)) {
        history.forEach((h) => {
          messages.push({
            role: h.sender === 'user' ? 'user' : 'assistant',
            content: h.text,
          });
        });
      }

      messages.push({ role: 'user', content: message });

      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${groqApiKey.trim()}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages,
          temperature: 0.7,
          max_tokens: 800,
        }),
      });

      if (res.ok) {
        const data = (await res.json()) as any;
        const reply = data?.choices?.[0]?.message?.content;
        if (reply) {
          return {
            text: reply,
            provider: 'groq',
            success: true,
          };
        }
      } else {
        const errorText = await res.text();
        console.warn('[Chatbot Server] Erreur Groq API:', errorText);
      }
    } catch (err) {
      console.warn('[Chatbot Server] Exception appel Groq:', err);
    }
  }

  // 3. Fallback intelligent haute précision basé sur la base de connaissances CONMIX SARL
  const localReply = generateLocalKnowledgeReply(message);
  return {
    text: localReply,
    provider: 'local_knowledge',
    success: true,
    notice: !geminiApiKey && !groqApiKey
      ? "Mode local actif. Configurez GEMINI_API_KEY ou GROQ_API_KEY dans votre fichier .env pour activer l'IA en temps réel."
      : undefined,
  };
}

/**
 * Générateur local de secours si aucune clé n'est encore configurée
 */
function generateLocalKnowledgeReply(query: string): string {
  const q = (query || '').toLowerCase().trim();

  if (q.includes('service') || q.includes('prestation') || q.includes('que faites') || q.includes('activite')) {
    return "🛠️ **Les 5 Services Officiels de CONMIX SARL** :\n\n" +
      "1. 📐 **Étude de projet** : Modélisation 3D BIM, calculs de structure Eurocodes.\n" +
      "2. 🏗️ **Construction métallique** : Usines complètes, charpentes acier S355, hangars, passerelles.\n" +
      "3. 🚪 **Menuiserie métallique sur mesure** : Portes blindées, verrières d'atelier, escaliers d'art, garde-corps NF, portails motorisés laser.\n" +
      "4. 🧱 **Génie civil** : Fondations spéciales, dallages industriels haute charge, massifs d'ancrage.\n" +
      "5. 🎓 **Formation professionnelle** : Soudure TIG/MIG certifiante, chaudronnerie, lecture de plans.";
  }

  if (q.includes('prix') || q.includes('tarif') || q.includes('cout') || q.includes('coût') || q.includes('combien') || q.includes('budget') || q.includes('devis')) {
    return "💰 **Grille des Tarifs Indicatifs CONMIX SARL** :\n\n" +
      "• 🚪 **Portes blindées / métalliques** : 150 000 à 450 000 FCFA\n" +
      "• 🪟 **Verrières d'atelier** : 80 000 à 160 000 FCFA / m²\n" +
      "• 🪜 **Escaliers métalliques d'art** : 600 000 à 2 500 000 FCFA\n" +
      "• 🚧 **Garde-corps sécurité NF** : 35 000 à 90 000 FCFA / mètre linéaire\n" +
      "• 🏗️ **Charpentes industrielles & Usines** : étude et chiffrage au m² / à la tonne\n\n" +
      "⚡ **Votre devis personnalisé est 100% GRATUIT sous 24h à 48h !**";
  }

  if (q.includes('où') || q.includes('ou') || q.includes('localisation') || q.includes('adresse') || q.includes('babenga') || q.includes('littoral')) {
    return "📍 **Localisation de CONMIX SARL** :\n\n" +
      "🏢 Siège & Atelier : **Babenga, Région du Littoral, Cameroun**.\n" +
      "Positionné sur le couloir économique du Littoral pour desservir Douala et tout le Cameroun.\n\n" +
      "📞 Contact : **+237 6 79 28 52 76** | WhatsApp disponible 24/7.";
  }

  if (q.includes('formation') || q.includes('soudure')) {
    return "🎓 **Formations Professionnelles CONMIX SARL** :\n\n" +
      "Nous formons aux métiers de la métallerie en atelier à Babenga :\n" +
      "• Soudure haute précision TIG & MIG (acier, inox, aluminium)\n" +
      "• Chaudronnerie et assemblage de charpentes\n" +
      "• Lecture de plans CAO / BIM et règles de sécurité sur chantier.";
  }

  if (q.includes('projet') || q.includes('usine') || q.includes('socorpa')) {
    return "🏭 **Nos Réalisations d'Usines Récentes** :\n\n" +
      "1. 🐟 **Usine Alimentaire pour Pisciculture** (bardage ligne 2, fermes ligne 3, PVC)\n" +
      "2. 📜 **Usine de Pâte à Papier** (corbeaux, réglage structurel, mezzanine)\n" +
      "3. 🏬 **Usine SOCORPA** (bretelles ligne K, réglage et mezzanine).";
  }

  return "Bonjour ! Je suis l'assistant IA de **CONMIX SARL** à Babenga (Littoral, Cameroun).\n\n" +
    "Je peux vous renseigner en direct sur :\n" +
    "• 🛠️ **Nos 5 services** (Ingénierie, Métallerie, Usines, Génie Civil, Formations)\n" +
    "• 💰 **Nos tarifs indicatifs et devis gratuit sous 24-48h**\n" +
    "• 📍 **Notre localisation à Babenga**\n\n" +
    "Comment puis-je vous aider ?";
}
