import React, { Suspense } from 'react';
import Cards from './Cards';

// Loading fallback component for the hero section
const HeroLoadingFallback = () => (
    <div className="w-full h-screen bg-[#FAF3ED] flex items-center justify-center">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#D4C5B5] border-t-[#A65D46] rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#A65D46] font-medium">Loading gallery experience...</p>
        </div>
    </div>
);

// Placeholder components for sections not yet implemented
const SectionPlaceholder = ({ title, bg = "bg-white" }: { title: string, bg?: string }) => (
  <section className={`py-24 px-6 ${bg} text-center`}>
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-normal text-[#3E2723] mb-6">{title}</h2>
      <div className="h-48 border-2 border-dashed border-[#D4C5B5] rounded-xl flex items-center justify-center bg-white/50">
        <p className="text-[#A65D46]">Content for {title} section</p>
      </div>
    </div>
  </section>
);

const InstaGallery = () => <SectionPlaceholder title="Instagram Gallery" />;
const AboutSection = () => <SectionPlaceholder title="About Us" bg="bg-[#FAF3ED]" />;
const ProjectsSection = () => <SectionPlaceholder title="Our Projects" />;
const BeforeAfter = () => <SectionPlaceholder title="Before & After" bg="bg-[#FAF3ED]" />;
const Process = () => <SectionPlaceholder title="Our Process" />;
const Testimonials = () => <SectionPlaceholder title="Testimonials" bg="bg-[#FAF3ED]" />;
const FAQ = () => <SectionPlaceholder title="FAQ" />;
const Contact = () => <SectionPlaceholder title="Contact Us" bg="bg-[#FAF3ED]" />;

const Footer = () => (
  <footer className="bg-[#3E2723] text-[#FAF3ED] py-12 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-xl font-bold mb-4">DreamSpace</h3>
        <p className="text-sm opacity-80">Designing warm and cozy spaces that feel like home.</p>
      </div>
      <div>
        <h4 className="font-bold mb-4">Links</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li>Home</li>
          <li>Projects</li>
          <li>About</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Social</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li>Instagram</li>
          <li>Pinterest</li>
          <li>Houzz</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4">Contact</h4>
        <p className="text-sm opacity-80">hello@dreamspace.com</p>
      </div>
    </div>
    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm opacity-60">
      &copy; 2024 DreamSpace. All rights reserved.
    </div>
  </footer>
);

export default function App() {
    return (
        <div className="font-sans text-[#3E2723]">
            {/* Full-screen Hero Section with 3D DomeGallery */}
            <section className="relative h-screen">
                <Suspense fallback={<HeroLoadingFallback />}>
                    <Cards />
                </Suspense>
            </section>

            {/* Rest of the page content */}
            <div className="relative z-10 bg-white shadow-2xl">
                <InstaGallery />
                <AboutSection />
                <ProjectsSection />
                <BeforeAfter />
                <Process />
                <Testimonials />
                <FAQ />
                <Contact />
                <Footer />
            </div>
        </div>
    );
}