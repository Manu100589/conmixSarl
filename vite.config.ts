import { defineConfig, loadEnv, type Plugin, type ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'node:http';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { handleChatRequest } from './server/chatHandler.ts';

/**
 * Plugin serveur sécurisé pour la route /api/chat dans Vite
 */
function secureChatbotServerPlugin(): Plugin {
  return {
    name: 'secure-chatbot-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/chat', (req: IncomingMessage, res: ServerResponse) => {
        // En-têtes CORS
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

        if (req.method === 'OPTIONS') {
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer | string) => {
            body += chunk;
          });

          req.on('end', async () => {
            try {
              const data = body ? JSON.parse(body) : {};
              const response = await handleChatRequest(data);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(response));
            } catch (err: unknown) {
              console.error('[API Chat Server Error]:', err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(
                JSON.stringify({
                  error: err instanceof Error ? err.message : 'Erreur interne du serveur',
                })
              );
            }
          });
          return;
        }

        res.statusCode = 405;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Méthode non autorisée. Utilisez POST.' }));
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  // Charger les variables .env dans process.env pour le serveur
  const env = loadEnv(mode, process.cwd(), '');
  process.env.GEMINI_API_KEY = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY;
  process.env.GROQ_API_KEY = env.GROQ_API_KEY || process.env.GROQ_API_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      secureChatbotServerPlugin(),
    ],
  };
});
