import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karpagapriya A",
    jobTitle: "UI Engineer",
    description:
      "UI Engineer specialising in React, Next.js, TypeScript and Figma-to-production workflows. Based in Madurai, Tamil Nadu.",
    url: "https://portfolio-karpagapriya.vercel.app",
    email: "karpagapriya.ak@gmail.com",
    telephone: "+91-9080437163",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Madurai",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    sameAs: [
      "https://linkedin.com/in/karpagapriya",
      "https://github.com/akarpagapriya",
      "https://behance.net/karpagapriya",
    ],
    knowsAbout: [
      "React.js", "Next.js", "TypeScript", "Tailwind CSS",
      "Figma", "UI Engineering", "Frontend Development",
      "Design Systems", "GSAP", "Dashboard Development",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}