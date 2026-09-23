import { handleChatRequest } from '../server/chatHandler.js';

/**
 * Serverless API Route pour /api/chat (Vercel / Netlify / Node)
 */
export default async function handler(req, res) {
  // Gestion CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Méthode non autorisée. Utilisez POST.' });
  }

  try {
    const { message, history } = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    if (!message) {
      return res.status(400).json({ error: 'Le champ "message" est requis.' });
    }

    const response = await handleChatRequest({ message, history });
    return res.status(200).json(response);
  } catch (error) {
    console.error('Erreur API Chat:', error);
    return res.status(500).json({ error: 'Erreur interne du serveur de chat.' });
  }
}
