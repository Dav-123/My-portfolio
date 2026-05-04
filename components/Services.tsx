"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import PaystackConsultation from "@/components/PaystackConsultation";
import { Globe, Smartphone, Server, Bot, Shield, Palette } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    desc: "Full-stack Next.js or React apps -- from landing pages to complex SaaS platforms. SEO-optimized, fast, accessible.",
    price: "Let's talk",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform React Native apps for Android and iOS. Offline-first, performant, ready for the Nigerian market.",
    price: "Let's talk",
  },
  {
    icon: Bot,
    title: "AI-Powered Products",
    desc: "Integrate AI/ML into your product -- chatbots, recommendation engines, document intelligence, and more.",
    price: "Let's talk",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    desc: "Scalable Node.js/FastAPI backends, REST/GraphQL APIs, database design, and cloud deployment.",
    price: "Let's talk",
  },
  {
    icon: Shield,
    title: "Social Impact Tech",
    desc: "Specialized in building technology for African social challenges -- safety, education, health, connectivity.",
    price: "Let's talk",
  },
  {
    icon: Palette,
    title: "Technical Consulting",
    desc: "Architecture reviews, tech stack decisions, code audits, and developer mentorship.",
    price: "From ₦50k/hr",
  },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 px-4" ref={ref}>
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
            What I Offer
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Services
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Professional development services built around your goals, budget, and timeline.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl bg-card p-7 border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 group cursor-pointer shadow-sm card-lift"
                onClick={scrollToContact}
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                  {service.desc}
                </p>
                <span className="text-primary font-bold text-sm">{service.price}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-12">
            <p className="text-primary font-semibold text-sm tracking-widest uppercase mb-4">
              Book a Session
            </p>
            <h3 className="font-display text-3xl font-bold text-foreground mb-4">
              Consultation Packages
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto mb-10">
              Not ready for a full project? Book a focused consultation session and get expert guidance on your idea, architecture, or product.
            </p>
          </div>
          <PaystackConsultation />
        </motion.div>
      </div>
    </section>
  );
}
