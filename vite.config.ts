import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

function geminiChatServerPlugin(): Plugin {
  return {
    name: 'gemini-chat-server',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsed = JSON.parse(body || '{}');
            const userMessage: string = parsed.message || '';
            const history: Array<{ role: string; content: string }> = parsed.history || [];

            const apiKey = process.env.GEMINI_API_KEY;

            // System prompt defining Ramses' persona and expertise
            const systemInstruction = `You are "Ramses", the senior local AI Travel Concierge for "Love Egypt", Sharm El Sheikh's premier luxury excursion and diving agency.
You are warm, highly knowledgeable, polite, and enthusiastic about the Red Sea, Sinai Mountains, Bedouin culture, and local marine life.

Available Excursions Catalog:
1. id: "ras-mohammed-white-island" - "Ras Mohammed National Park & White Island Luxury Yacht" ($55 USD, 8 hrs, Yolanda reef, White island lagoon, seafood buffet)
2. id: "straits-of-tiran-diving" - "Straits of Tiran Scuba & Snorkel Safari: Jackson & Gordon Reefs" ($65 USD, 7.5 hrs, sunken Loullia wreck, 35m visibility)
3. id: "super-desert-vip-safari" - "Super Sinai VIP Desert Safari: Quads, Buggies, Camel & Bedouin Feast" ($40 USD, 6 hrs, sunset quads, Echo Valley, stargazing, Tanoura show)
4. id: "mount-sinai-sunrise-trek" - "Mount Sinai Sunrise Pilgrimage & St. Catherine Monastery" ($50 USD, overnight 14 hrs, Moses Peak, burning bush, UNESCO monastery)
5. id: "dahab-blue-hole-safari" - "Dahab Blue Hole & Canyon Jeep Expedition with Camel Ride" ($45 USD, 10 hrs, submarine sinkhole, colored canyon, Dahab town)
6. id: "private-sunset-speedboat" - "Private VIP Speedboat Charter & Wild Dolphin Bay Quest" ($160 USD, 3 hrs, secluded coves, wild dolphins, champagne)
7. id: "semi-submarine-coral-safari" - "Royal Sea Scope Semi-Submarine & Underwater Coral Observatory" ($25 USD, 2.5 hrs, air-conditioned underwater deck, perfect for kids and non-swimmers)
8. id: "ras-um-sid-night-dive" - "Ras Um Sid Guided Night Scuba & Bioluminescence Dive" ($70 USD, 3.5 hrs, nocturnal marine life, bioluminescence, Spanish dancers)

Key Local Sinai Knowledge:
- Hotel pickup areas: We provide free round-trip transfers from all Sharm resorts (Naama Bay, Nabq Bay, Hadaba, Shark's Bay, Ras Um Sid).
- Weather & Water: Water temperature averages 24-26°C in winter/spring, 28-30°C in summer. 5mm wetsuit provided.
- Currency: USD, EUR, and Egyptian Pounds (EGP) accepted.
- Cancelation: 100% free cancelation up to 24 hours prior to excursion departure.

Instructions:
- Keep answers concise, inspiring, practical, and under 3-4 paragraphs.
- When recommending an excursion from our catalog, you MUST include a marker at the end of your response in the format: [RECOMMENDED_TOUR: tour-id] so the UI can render an interactive booking card. Only recommend 1 most relevant tour per message.
- If the user asks about packing for Mount Sinai, remind them about warm layers (temperatures near freezing at dawn) and sturdy footwear.`;

            if (apiKey) {
              try {
                const ai = new GoogleGenAI({
                  apiKey,
                  httpOptions: {
                    headers: {
                      'User-Agent': 'aistudio-build',
                    },
                  },
                });

                // Format history for Gemini contents
                const contents: any[] = [];
                for (const h of history.slice(-6)) {
                  contents.push({
                    role: h.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: h.content }],
                  });
                }
                contents.push({
                  role: 'user',
                  parts: [{ text: userMessage }],
                });

                // Timeout race to prevent long hangs on upstream spikes
                const timeoutPromise = new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('AI generation timeout')), 6000)
                );

                const response: any = await Promise.race([
                  ai.models.generateContent({
                    model: 'gemini-3.8-flash',
                    contents,
                    config: {
                      systemInstruction,
                    },
                  }),
                  timeoutPromise,
                ]);

                const replyText = response.text || 'Welcome to Sharm El Sheikh! How may I assist your Red Sea adventure today?';
                
                // Extract recommended tour ID if present
                let recommendedTourId: string | undefined;
                const match = replyText.match(/\[RECOMMENDED_TOUR:\s*([a-z0-9-]+)\]/i);
                let cleanedText = replyText;
                if (match) {
                  recommendedTourId = match[1].trim();
                  cleanedText = replyText.replace(/\[RECOMMENDED_TOUR:\s*([a-z0-9-]+)\]/i, '').trim();
                }

                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ text: cleanedText, recommendedTourId }));
                return;
              } catch (geminiError: any) {
                console.warn('Gemini API call warning (falling back to local Sinai knowledge engine):', geminiError.message);
                // Fall through to rich local Sinai engine below!
              }
            }

            // Local fallback logic if apiKey is not set
            const lower = userMessage.toLowerCase();
            let fallbackText = '';
            let fallbackTourId: string | undefined;

            if (lower.includes('scuba') || lower.includes('dive') || lower.includes('reef') || lower.includes('snorkel')) {
              fallbackText = `For snorkeling and diving, nothing compares to the pristine coral gardens of Ras Mohammed National Park and White Island. Yolanda and Shark Reef offer vertical coral drop-offs with over 1,000 fish species, and disembarking on White Island feels like stepping onto a Maldives sandbank in the Red Sea! We include private chef seafood lunch and certified PADI dive masters.`;
              fallbackTourId = 'ras-mohammed-white-island';
            } else if (lower.includes('safari') || lower.includes('quad') || lower.includes('desert') || lower.includes('kid') || lower.includes('family')) {
              fallbackText = `Our Super Sinai VIP Desert Safari is the #1 choice for families and adventure seekers! You will drive automatic ATVs across golden dunes into Echo Valley, take a gentle sunset camel ride, and enjoy an authentic candlelit Bedouin feast with Tanoura whirling dervishes and high-powered telescope stargazing.`;
              fallbackTourId = 'super-desert-vip-safari';
            } else if (lower.includes('sinai') || lower.includes('moses') || lower.includes('pack') || lower.includes('catherine')) {
              fallbackText = `Mount Sinai is a life-changing pilgrimage! For the sunrise ascent, you must pack: warm layers (thermal jacket, fleece, beanie, gloves—it drops to 2-8°C at 2,285m), sturdy walking shoes or hiking boots, your original passport for Sinai checkpoints, and a headlamp. You will watch dawn break over the holy granite peaks and tour UNESCO St. Catherine Monastery.`;
              fallbackTourId = 'mount-sinai-sunrise-trek';
            } else if (lower.includes('cancel') || lower.includes('policy') || lower.includes('refund')) {
              fallbackText = `At Love Egypt, we offer a 100% Risk-Free Weather & Flexibility Guarantee. You can cancel or reschedule any excursion free of charge up to 24 hours prior to departure. If sea conditions cause coast guard port closures, you receive an immediate full refund or complimentary reschedule to your preferred date.`;
            } else if (lower.includes('hotel') || lower.includes('pickup') || lower.includes('area') || lower.includes('zone')) {
              fallbackText = `We provide complimentary door-to-door hotel transfers across all Sharm El Sheikh areas, including Naama Bay, Nabq Bay, Hadaba & Ras Um Sid, Shark's Bay, and Tower Bay. Our air-conditioned Mercedes fleet picks you up right at your resort lobby and returns you comfortably after the excursion.`;
              fallbackTourId = 'ras-mohammed-white-island';
            } else if (lower.includes('boat') || lower.includes('private') || lower.includes('speed') || lower.includes('dolphin')) {
              fallbackText = `If you desire seclusion and luxury, our Private VIP Speedboat Charter takes you straight to Dolphin Bay near Tiran Island. You can swim with wild spinner dolphins, explore secret lagoons, and celebrate with chilled champagne and fresh fruit away from tour groups.`;
              fallbackTourId = 'private-sunset-speedboat';
            } else {
              fallbackText = `Ahlan wa Sahlan! I am Ramses, your local Sharm El Sheikh travel concierge. Whether you dream of diving Ras Mohammed’s coral walls, racing quad bikes through Sinai’s crimson canyons, or taking a peaceful semi-submarine with children, I am here to design your perfect holiday. What kind of experience are you looking for?`;
              fallbackTourId = 'ras-mohammed-white-island';
            }

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ text: fallbackText, recommendedTourId: fallbackTourId }));
          } catch (err: any) {
            console.error('Chat error:', err);
            res.statusCode = 500;
            res.end(JSON.stringify({ error: err.message || 'Internal server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiChatServerPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
