# David Briggs Portfolio

Full-stack portfolio website for David Ekine Briggs, a software developer from Abonnema, Rivers State, Nigeria.

## Tech Stack

- **Framework**: Next.js 16 (App Router, React 19, TypeScript, Turbopack)
- **Styling**: Tailwind CSS v4, custom brand theme (orange #f97316)
- **Animations**: Framer Motion
- **Database**: Supabase (reviews, bookings)
- **Payments**: Paystack (inline JS SDK, server-side verification)
- **Email**: EmailJS (contact form, booking confirmations)
- **Blog**: MDX with gray-matter + next-mdx-remote
- **Fonts**: Playfair Display (display), DM Sans (body)

## Project Structure

```
app/
  page.tsx              # Home page (all sections)
  layout.tsx            # Root layout (ThemeProvider, Toaster, JSON-LD, SEO metadata)
  globals.css           # Tailwind v4 + custom theme + animations
  not-found.tsx         # 404 page
  robots.ts             # robots.txt
  sitemap.ts            # sitemap.xml (includes blog posts)
  blog/
    page.tsx            # Blog listing (server component)
    BlogListClient.tsx  # Blog listing (client, tag filtering)
    [slug]/
      page.tsx          # Blog post (server, async params)
      BlogPostClient.tsx # Blog post (client, MDX rendering)
  api/
    contact/route.ts    # Contact form (rate limited, EmailJS)
    reviews/route.ts    # Reviews CRUD (Supabase, rate limited)
    payment/verify/route.ts # Paystack verification (Supabase, EmailJS)

components/
  Hero.tsx              # Hero section with CTA
  About.tsx             # Origin story + trait cards
  Skills.tsx            # Languages & frameworks grid (react-icons)
  Certifications.tsx    # Certifications with verification links
  Projects.tsx          # Project gallery with filtering
  Services.tsx          # Service cards + consultation packages
  BlogPreview.tsx       # Latest blog posts (server component)
  BlogPreviewClient.tsx # Blog preview (client component)
  BlogCard.tsx          # Blog post card
  Reviews.tsx           # Testimonials + submission form
  Sponsorship.tsx       # VeriRide sponsorship section
  PaystackConsultation.tsx # Consultation booking + Paystack payment
  Contact.tsx           # Contact form (react-hook-form + zod)
  Navbar.tsx            # Sticky nav with theme toggle
  Onboarding.tsx        # First-visit welcome carousel
  Footer.tsx            # Footer with links + social icons
  AnimatedFavicon.tsx   # Dynamic SVG favicon (theme-aware)

content/blog/
  building-veriride-nigeria.mdx  # VeriRide blog post
  offline-first-apps-africa.mdx # Offline-first architecture post

lib/
  mdx.ts                # MDX utilities (getAllPosts, getPost)
  supabase.ts           # Supabase client

types/
  index.ts              # Project, Skill, Certificate, Review, ContactFormData
```

## About David Briggs

David Briggs is a full-stack software developer from Abonnema, Akuku-Toru LGA, Rivers State, Nigeria. He is currently studying at the University of Port Harcourt. He grew up in the Niger Delta and learned to build technology that works in spite of broken infrastructure.

His philosophy: "The simplicity of something is in the complexity of another."

He builds full-stack applications, mobile apps, AI-powered platforms, and social impact tools. His mission is to prove that world-class technology can be and should be built from Africa, for Africa, and for the world.

### Key Traits
- 12+ programming languages (Python, C++, C#, JavaScript, TypeScript, Kotlin, Java, HTML5, CSS3, SQL, etc.)
- Problem-first thinker: every project starts with a real problem
- African by Design: builds for Nigeria's infrastructure realities (offline-first, lightweight, accessible)
- Community-Driven: transport safety apps, Bluetooth mesh networks, tech for the people

### Key Projects
- **VeriRide Nigeria**: Passenger safety platform to verify commercial vehicles via QR codes. React Native passenger app, Next.js driver/government portals. Offline-first architecture.
- **SafeRide Nigeria**: Transport safety initiative
- **B-Chat**: Bluetooth mesh messaging app (no internet required)
- **DocVault**: Document management platform
- **Game-Buddy-Matcher**: Gaming companion finder
- **Primetime Comics**: Comics platform

### Certifications
- AI/ML from Sololearn
- Python from Programming Hero

### Services
- Web Development
- Mobile App Development
- AI/ML Integration
- Backend Architecture
- Social Impact Tech
- Consulting (Quick Call, Standard Session, Extended Workshop)

## Blog Posts

### Why I Am Building VeriRide Nigeria (2026-04-28)
A real incident in Port Harcourt showed that technology could save lives. One-chance vehicles rob and kidnap passengers. VeriRide gives every commercial vehicle a verifiable digital identity. Passengers scan a QR code before boarding to verify the vehicle and driver. Built with React Native (passenger app), Next.js (driver/government portals), offline-first architecture, compressed QR payloads, and aggressive caching for 2G connections. Currently in talks with Rivers State government for a pilot program.

### Why Every African App Should Be Offline-First (2024-10-20)
Most developers assume stable internet. In Nigeria, average mobile speed is 15-20 Mbps on a good day; rural areas get 2G. Offline-first means core functionality works without connection, data syncs when connectivity returns, and users never see a blank screen from poor signal. Tools: IndexedDB + service workers for web, expo-sqlite for React Native, queue-based sync. B-Chat case study: Bluetooth mesh messaging eliminates internet dependency entirely.

## Environment Variables

- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anon key
- `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` - Paystack public key (client-side)
- `PAYSTACK_SECRET_KEY` - Paystack secret key (server-side)
- `EMAILJS_SERVICE_ID` - EmailJS service ID
- `EMAILJS_TEMPLATE_ID` - EmailJS template ID
- `EMAILJS_PRIVATE_KEY` - EmailJS private key (server-side)
- `DAVID_EMAIL` - David's email for notifications

## Build Notes

- No `--legacy-peer-deps` needed (react-paystack removed, Paystack inline JS used directly)
- Tailwind CSS v4 with `@tailwindcss/postcss` plugin
- Blog posts use `fs` module (server-only) -- BlogPreview is split into server/client components
- Next.js 16 requires `await params` in dynamic route pages (async Request APIs)
- Next.js 16 uses Turbopack by default for dev and build
- `next lint` removed in Next.js 16 -- use `eslint .` directly
- `@/` alias maps to project root (configured in tsconfig.json)
