import express from "express";
import path from "path";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Google GenAI securely on the server
let aiClient: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Secure MCR: Google GenAI Client successfully initialized.");
  } catch (error) {
    console.error("Secure MCR: Failed to initialize Google GenAI Client:", error);
  }
} else {
  console.log("Secure MCR: Running in demo mode (GEMINI_API_KEY is not configured or placeholder). Using expert rule-based local backup responses.");
}

// System instructions to give the bot deep domain knowledge about Secure MCR
const SYSTEM_INSTRUCTION = `You are the friendly, professional AI Security Expert assistant for Secure MCR, a premier UK-based CCTV sales and installation specialist.
Domain: https://securemcr.org
Phone: +44 7514 856229
Email: securemcr@gmail.com
Main Office: Manchester, serving the whole of the UK (focused heavily on Greater Manchester and surrounding areas).

Key Information to use in responses:
- Secure MCR provides professional, high-quality, and reliable CCTV system sales, supply, and professional installation.
- We service Homes, Shops, Offices, Warehouses, Restaurants, Schools, and other Commercial properties.
- Our installers are fully insured, highly experienced, and provide exceptional customer service.
- We install HD & 4K security systems, IP cameras, smart wireless CCTV systems, remote mobile app viewing setups (so clients can view cameras from anywhere), PTZ (Pan-Tilt-Zoom) speed domes, smart WiFi cameras, and full NVR/DVR storage systems.
- Highlight our key benefits: Fully Insured, Professional Installation, Competitive Prices, Free No-Obligation Quotations, HD & 4K Quality, Mobile App Integration (view on your phone), Fast Response, 100% Customer Satisfaction.
- Pricing guide (estimate placeholders):
  * 2 Camera Kit (HD/IP, NVR, mobile app, installed): starts at £499
  * 4 Camera Kit: starts at £799
  * 8 Camera Kit: starts at £1499
  * PTZ and Smart WiFi Cameras: custom quotation based on requirements.
- We also do CCTV Upgrades (upgrading older analog cameras to 4K IP digital cameras), wireless smart security networks, and routine maintenance/repairs.
- Frequently Asked Questions answers:
  * Cost: Varies based on camera count and specs, but starting packages are competitive. We provide free site surveys and quotations.
  * Residential: Yes, we install many residential home systems.
  * Remote viewing: Yes! We configure the mobile app on your iPhone, iPad, or Android device so you can view from anywhere in the world with zero monthly fees.
  * Installation time: Typically 1 day for standard residential/small commercial setups (2-4 cameras), larger systems take 2+ days.
  * Maintenance: Yes, we provide annual health checks, servicing, and emergency repair call-outs.

Communication Style:
- Professional, reassuring, secure, and helpful.
- Direct users to call us at +44 7514 856229 or email securemcr@gmail.com for an official free quote.
- Keep responses relatively brief, structured, and easy to read. Use bullet points where appropriate. No markdown headers like '#'; instead use simple bold text like '**Heading:**'.
- Answer general security questions but always relate them back to how Secure MCR can assist them with a professional installation in the UK.`;

// Pre-canned fallback responses when API Key is missing or service is offline
const getFallbackResponse = (userMessage: string): string => {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes("cost") || msg.includes("price") || msg.includes("how much") || msg.includes("quote")) {
    return `**Secure MCR Assistant:**
We offer highly competitive pricing for professional CCTV systems supplied and fully installed with a mobile app viewing setup:
• **2 Camera HD Kit:** Starts at £499 (fully installed, no monthly fees)
• **4 Camera HD Kit:** Starts at £799 (ideal for typical homes and small shops)
• **8 Camera UHD Kit:** Starts at £1,499 (best for warehouses, offices, and larger estates)

Every installation includes a high-definition DVR/NVR recorder, hard drive storage, cabling, setup on your mobile phone for remote viewing, and a full demonstration.

Would you like to book a free site survey? Call our team directly on **+44 7514 856229** or email **securemcr@gmail.com** to get your exact free quotation!`;
  }
  
  if (msg.includes("phone") || msg.includes("contact") || msg.includes("call") || msg.includes("email") || msg.includes("number")) {
    return `**Secure MCR Assistant:**
You can get in touch with our team directly via:
• **Phone:** [+44 7514 856229](tel:+447514856229)
• **Email:** [securemcr@gmail.com](mailto:securemcr@gmail.com)
• **Website:** [securemcr.org](https://securemcr.org)

Our customer service desk is open Monday to Saturday, 8:00 AM – 6:00 PM. We offer fast responses and free, no-obligation quotation surveys across Manchester and the UK!`;
  }

  if (msg.includes("view") || msg.includes("remote") || msg.includes("phone app") || msg.includes("app") || msg.includes("mobile")) {
    return `**Secure MCR Assistant:**
Yes! All our HD and 4K CCTV systems include full mobile remote viewing capabilities.
We will set up and configure the official security app on your smartphone (iOS & Android) and tablet during installation. This allows you to:
• View live streams of all cameras from anywhere in the world.
• Play back historical recordings securely.
• Receive instant motion detection alerts directly on your phone.
• Share access with family members or team managers safely.

Best of all, there are **no monthly subscription fees** for this app viewing! It is completely included with your installation.`;
  }

  if (msg.includes("upgrade") || msg.includes("old") || msg.includes("replace")) {
    return `**Secure MCR Assistant:**
At Secure MCR, we specialize in seamless CCTV upgrades. If you have an older analog system, we can often utilize your existing cabling to upgrade you to crystal-clear 5MP or 4K digital systems, saving you time and cost.
Upgrades provide massive benefits:
• Crystal-clear night vision
• Smart human/vehicle classification
• Mobile app alert notifications
• Ultra-high-resolution playback for police/insurance purposes

Contact us on **+44 7514 856229** to arrange an upgrade consultation!`;
  }

  if (msg.includes("wireless") || msg.includes("wifi")) {
    return `**Secure MCR Assistant:**
Yes, we supply and install professional wireless and smart WiFi CCTV camera networks. These are excellent for properties where running cables is challenging or for customers who prefer a highly aesthetic, low-profile setup.
Our smart wireless solutions provide instant push notifications, rechargeable long-life battery or solar panel options, and full remote management, all integrated seamlessly into a single app.`;
  }

  return `**Secure MCR Assistant:**
Hello! Thank you for contacting Secure MCR, your trusted professional CCTV sales and installation specialist in the UK.

We can assist you with:
• **HD & 4K CCTV Installations** (for Homes, Shops, Offices, Warehouses, Schools, and Restaurants)
• **Wireless CCTV & Smart Security Systems**
• **Remote Mobile App Viewing Configuration** (Watch your property live from anywhere)
• **Older System Upgrades & Repairs**
• **Routine Maintenance & Repairs**

Our experienced engineers are fully insured and offer free, no-obligation quotes.
How can I help you today? You can also call us directly at **+44 7514 856229** or email **securemcr@gmail.com**!`;
};

// API Route for Chat
app.post("/api/chat", async (req, res) => {
  const { message, history } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // If AI Client is not initialized, use rule-based graceful fallback response
  if (!aiClient) {
    const fallbackResponse = getFallbackResponse(message);
    // Mimic API delay for realistic interactive feel
    return setTimeout(() => {
      res.json({ reply: fallbackResponse });
    }, 600);
  }

  try {
    // Format conversation history for GenAI SDK
    // Roles in GenAI are strictly "user" and "model"
    const contents: any[] = [];
    
    if (history && Array.isArray(history)) {
      history.forEach((turn: any) => {
        contents.push({
          role: turn.role === "user" ? "user" : "model",
          parts: [{ text: turn.text || "" }]
        });
      });
    }

    // Append current message
    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    // Call the Gemini API securely using gemini-3.5-flash as specified in the guidelines
    const response = await aiClient.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    const replyText = response.text || "I am here to assist you with all your CCTV sales and installation queries. Please let me know how I can help.";
    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Secure MCR: Gemini API error:", error);
    // Fall back to rule-based response rather than failing, ensuring 100% uptime
    const fallbackResponse = getFallbackResponse(message);
    res.json({ reply: fallbackResponse, error: "Using local secure backup assistant due to server latency." });
  }
});

// Configure Vite or Static files depending on mode
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    
    app.use(vite.middlewares);
    console.log("Secure MCR Dev Server: Vite middleware attached.");
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Secure MCR Production Server: Serving compiled static assets.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Secure MCR Server is listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
