import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Sponsorship from "@/components/Sponsorship";
import Contact from "@/components/Contact";
import BlogPreview from "@/components/BlogPreview";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface-light dark:bg-surface-dark overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full bg-brand-500/10 blur-[120px]" />
        <div className="absolute top-1/2 -left-40 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-brand-400/8 blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-brand-600/10 blur-[80px]" />
      </div>

      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div className="section-divider" />

      <div id="about">
        <About />
      </div>

      <div className="section-divider" />

      <div id="skills">
        <Skills />
      </div>

      <div className="section-divider" />

      <div id="certifications">
        <Certifications />
      </div>

      <div className="section-divider" />

      <div id="projects">
        <Projects />
      </div>

      <div className="section-divider" />

      <div id="services">
        <Services />
      </div>

      <div className="section-divider" />

      <div id="blog">
        <BlogPreview />
      </div>

      <div className="section-divider" />

      <div id="reviews">
        <Reviews />
      </div>

      <div className="section-divider" />

      <div id="sponsorship">
        <Sponsorship />
      </div>

      <div className="section-divider" />

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </main>
  );
}
