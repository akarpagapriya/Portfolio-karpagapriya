import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
// import Freelance from "@/components/sections/Freelance";
import Certifications from "@/components/sections/Certifications";
import Education from "@/components/sections/Education";
import Contact from "@/components/sections/Contact";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Karpagapriya A",
    jobTitle: "UI Engineer & Freelance Web Designer",
    description:
      "UI Engineer and freelance web designer based in Madurai, Tamil Nadu. Specialising in logo design, brand identity, website development and React web applications. Serving clients in Madurai, Tamil Nadu, India and internationally.",
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
      "Logo Design",
      "Brand Identity",
      "Website Design",
      "Website Development",
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "UI Engineering",
      "Frontend Development",
      "Design Systems",
      "Web App Development",
      "Freelance Web Designer Madurai",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Freelance Design & Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Logo & Brand Identity Design",
            description: "Professional logo design and brand identity systems starting at ₹4,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Website Development",
            description: "Responsive website development with Next.js starting at ₹12,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Web App Development",
            description: "React and Next.js web application development starting at ₹25,000",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "UI/UX Design",
            description: "Figma UI/UX design and prototyping starting at ₹6,000",
          },
        },
      ],
    },
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
        {/* <Freelance /> */}
        <Certifications />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
