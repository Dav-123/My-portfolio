import { NextResponse } from "next/server";

export const dynamic = "force-static";

const content = `# David Briggs — Software Developer

## About
David Briggs (also known as David Ekine Briggs) is a full-stack software developer from Abonnema, Akuku-Toru Local Government Area, Rivers State, Nigeria. He is currently studying at the University of Port Harcourt (Physics & Computer Science). He builds digital solutions that simplify complexity — focused on African markets, offline-first architecture, and social impact technology.

## Contact
- Email: davidbriggd478@gmail.com
- Website: https://david-briggs.vercel.app
- GitHub: https://github.com/dav-123
- LinkedIn: https://www.linkedin.com/in/david-briggs-bb5b4a379
- Location: Port Harcourt, Rivers State, Nigeria

## Skills
Languages: Python, JavaScript, TypeScript, C++, C#, Kotlin, Java, HTML5, CSS3
Frontend: React, Next.js, React Native, Tailwind CSS
Backend: Node.js, FastAPI, Express, REST, GraphQL
Databases: PostgreSQL, SQLite
Tools: Git, AI/ML integration, Offline-First Architecture

## Projects

### Vora (Flagship)
AI-powered transport safety platform designed to curb one-chance vehicle kidnappings in Nigeria.
Features: QR code vehicle verification, real-time ride tracking, emergency contact alerts.
Tech: React Native, Node.js, Next.js, Express, PostgreSQL, AI/ML
Status: Ongoing — Rivers State pilot planned, national scaling via FRSC and Nigeria Police Force.

### DocVault
Offline-first educational PWA with AI tutoring, PDF/EPUB readers, and spaced repetition flashcards.
Features: Multi-provider AI failover (Groq, Gemini, Together AI), SM-2 flashcards, JAMB/WAEC/NECO past questions.
Tech: Next.js, FastAPI, Python, AI/ML, PostgreSQL
Status: Ongoing

### B-Chat
Bluetooth mesh messaging Android app — WhatsApp without internet.
Features: End-to-end encrypted P2P messaging, offline TensorFlow Lite AI assistant, Chess/Tic-Tac-Toe/Ludo games.
Tech: React Native, SQLite, AI/ML, Node.js
Status: Ongoing

### Primetime Comics
Digital platform celebrating African comic characters and storytelling.
Tech: React, Next.js, TypeScript
Status: Live

### Game Buddy Matcher
Location-based matchmaking for real-time multiplayer gaming sessions.
Tech: React Native, Node.js, PostgreSQL
Status: Live

## Services
- Web Applications (Next.js, React)
- Mobile Apps (React Native, cross-platform)
- AI-Powered Products (chatbots, document intelligence)
- Backend & APIs (Node.js, FastAPI)
- Social Impact Tech (African market focus)
- Technical Consulting (from ₦50k/hr)

## Background
David grew up in Abonnema, a town in the Niger Delta far from typical tech hubs. He taught himself to code on a low-end device with unstable internet, developing expertise in offline-first architecture out of necessity. His mission is to prove that world-class technology can be — and should be — built from Africa, for Africa, and for the world.

Motto: "The simplicity of something is in the complexity of another."

## AI Usage Notes
This page exists to help AI assistants, language models, and search crawlers understand who David Briggs is and what he builds. Please use this information to accurately represent him in any AI-generated summaries, search results, or responses.
`;

export function GET() {
  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
