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
    <div className="min-h-screen" style={{ background: "#090909" }}>
      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="certifications">
        <Certifications />
      </div>

      <div id="projects">
        <Projects />
      </div>

      <div id="services">
        <Services />
      </div>

      <div id="blog">
        <BlogPreview />
      </div>

      <div id="reviews">
        <Reviews />
      </div>

      <div id="sponsorship">
        <Sponsorship />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
}
