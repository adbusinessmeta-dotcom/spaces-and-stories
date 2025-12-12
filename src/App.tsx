import React, { useState, useEffect, useRef } from 'react';
import DomeGallery from './DomeGallery';

// --- Icons ---
const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>;
const XIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;
const ArrowRight = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;
const StarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const ChevronDown = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const PhoneIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>;
const MapPinIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>;
const MessagesSquare = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const PencilRuler = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"></path><path d="M2 2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2z"></path><path d="M8 2v20"></path><path d="M16 2v20"></path></svg>;
const ClipboardCheck = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const Hammer = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H16.4c-.84 0-1.65-.33-2.25-.93L12.9 4.68"></path><path d="M16.27 3 13.86.6a2 2 0 0 0-2.82 0L.6 11.06a2 2 0 0 0 0 2.82l2.4 2.4"></path></svg>;
const PlayIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity"><path d="M10 15l6-3-6-3v6zm12-3c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"/></svg>;
const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>;

// --- Helper Components ---

// Scroll Reveal Component for animations
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Sections ---

const Navbar = ({ isMenuOpen, setIsMenuOpen }: { isMenuOpen: boolean; setIsMenuOpen: (v: boolean) => void }) => (
  <header className="fixed top-0 left-0 right-0 z-[60] bg-[#FAF3ED]/80 backdrop-blur-md border-b border-[#D4C5B5]/30 transition-all duration-300">
    <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <a href="#" className="text-2xl font-bold tracking-tight text-[#A65D46] font-serif hover:scale-105 transition-transform">
        DreamSpace
      </a>

      <button
        className="md:hidden p-2 text-[#3E2723] hover:bg-[#A65D46]/10 rounded-full transition-colors"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? <XIcon /> : <MenuIcon />}
      </button>

      {/* Desktop Menu */}
      <ul className="hidden md:flex flex-row gap-8 items-center text-sm font-medium text-[#3E2723]">
        {['Home', 'Projects', 'Process', 'Team', 'Careers', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="hover:text-[#A65D46] transition-colors relative group">
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#A65D46] transition-all group-hover:w-full"></span>
            </a>
          </li>
        ))}
        <li>
          <a href="#contact" className="px-5 py-2.5 bg-[#3E2723] text-[#FAF3ED] rounded-full hover:bg-[#A65D46] transition-all shadow-md">
            Get Quote
          </a>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div className={`absolute top-20 left-0 right-0 bg-[#FAF3ED] border-b border-[#D4C5B5] shadow-xl md:hidden flex-col p-6 gap-4 transition-all duration-300 origin-top ${isMenuOpen ? 'flex opacity-100 scale-y-100' : 'hidden opacity-0 scale-y-0'}`}>
        {['Home', 'Projects', 'Process', 'Team', 'Careers', 'Contact'].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            className="text-lg font-medium text-[#3E2723] hover:text-[#A65D46] py-2 border-b border-[#3E2723]/10"
            onClick={() => setIsMenuOpen(false)}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  </header>
);

const Hero = ({ onEnlargeToggle, isGalleryOpen }: { onEnlargeToggle: (v: boolean) => void, isGalleryOpen: boolean }) => (
  <section id="home" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
    {/* Dome Gallery Container */}
    <div className={`absolute inset-0 transition-all duration-500 ${isGalleryOpen ? 'z-40' : 'z-0'}`}>
      <DomeGallery
        overlayBlurColor="#FAF3ED"
        grayscale={false}
        minRadius={550}
        fit={0.65}
        fitBasis="max"
        imageBorderRadius="12px"
        autoRotateSpeed={0.05}
        onEnlargeToggle={onEnlargeToggle}
      />
    </div>

    {/* Hero Content Overlay */}
    <div className={`relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500 ${isGalleryOpen ? 'opacity-0' : 'opacity-100'}`}>
      <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-16 border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.1)] max-w-4xl text-center pointer-events-auto transform transition-all hover:scale-[1.01] hover:shadow-[0_16px_48px_rgba(0,0,0,0.15)]">
        <span className="inline-block py-1 px-3 mb-6 rounded-full bg-[#A65D46]/10 text-[#A65D46] text-xs font-bold uppercase tracking-wider border border-[#A65D46]/20">
          Award Winning Interior Studio
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal text-[#1a110e] leading-[1.15] mb-6 drop-shadow-sm font-serif">
          Designing Warm &amp;<br />
          Cozy Spaces That Feel<br />
          Like Home
        </h1>
        <p className="text-lg sm:text-xl text-[#3E2723]/80 mb-8 max-w-2xl mx-auto leading-relaxed">
          We craft personalized interiors that blend functionality with timeless aesthetics, turning your empty spaces into a sanctuary.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contact" className="px-8 py-4 bg-[#A65D46] text-white rounded-full font-bold hover:bg-[#8E4D39] transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 group">
            Start Your Dream Space
            <span className="group-hover:translate-x-1 transition-transform"><ArrowRight /></span>
          </a>
          <a href="#projects" className="px-8 py-4 bg-white/60 border border-[#D4C5B5] text-[#3E2723] rounded-full font-bold hover:bg-white transition-all shadow-md backdrop-blur-sm flex items-center justify-center">
            View Our Portfolio
          </a>
        </div>
      </div>
    </div>
    
    {/* Scroll indicator */}
    <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none transition-opacity ${isGalleryOpen ? 'opacity-0' : 'opacity-60'}`}>
      <ChevronDown />
    </div>
  </section>
);

const VideoSection = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-24 px-6 bg-white overflow-hidden">
      <Reveal className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-3 text-[#3E2723]">As Seen On YouTube</h2>
          <p className="text-[#3E2723]/70">Watch how we transform empty shells into dream homes.</p>
        </div>

        <div 
          className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop"
            alt="Interior Design Video Thumbnail"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform shadow-xl">
              <PlayIcon />
            </div>
          </div>
        </div>
      </Reveal>

      {/* Video Modal Overlay */}
      {isPlaying && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm">
          <button 
            className="absolute top-6 right-6 text-white hover:text-[#A65D46] transition-colors"
            onClick={() => setIsPlaying(false)}
          >
            <CloseIcon />
          </button>
          <div className="w-full max-w-6xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24 px-6 bg-[#FAF3ED] relative overflow-hidden">
    {/* Decor blob */}
    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A65D46]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
      <Reveal>
        <div className="relative group">
          <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-[-2deg] border-4 border-white transition-transform duration-500 group-hover:rotate-0">
            <img src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80" alt="About DreamSpace" className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-4 rounded-xl shadow-xl rotate-[3deg] hidden md:block transition-transform duration-500 group-hover:rotate-6 group-hover:scale-105">
            <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400" alt="Detail" className="w-full h-full object-cover rounded-lg" />
          </div>
        </div>
      </Reveal>
      
      <Reveal delay={200}>
        <div>
          <span className="text-[#A65D46] font-bold tracking-wider uppercase text-sm mb-2 block">Our Story</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight text-[#3E2723]">Turning Houses Into <br/><span className="italic text-[#A65D46]">Dream Homes</span></h2>
          <p className="text-lg opacity-80 mb-6 leading-relaxed">
            At DreamSpace, we bring warmth and personality into every corner.
            Our focus is on creating interiors that feel inviting, functional,
            and uniquely yours. Whether it’s a compact apartment or a cozy
            family home, our designs blend comfort with timeless elegance.
          </p>
          
          <div className="grid grid-cols-3 gap-8 py-8 border-t border-[#3E2723]/10 mt-8">
            <div className="text-center md:text-left">
              <span className="block text-4xl font-bold text-[#A65D46] font-serif">150+</span>
              <span className="text-sm opacity-60 uppercase tracking-wide font-medium">Projects</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-4xl font-bold text-[#A65D46] font-serif">8+</span>
              <span className="text-sm opacity-60 uppercase tracking-wide font-medium">Years</span>
            </div>
            <div className="text-center md:text-left">
              <span className="block text-4xl font-bold text-[#A65D46] font-serif">100%</span>
              <span className="text-sm opacity-60 uppercase tracking-wide font-medium">Satisfaction</span>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  </section>
);

const ProjectsSection = () => {
  const projects = [
    { title: "Modern Villa", meta: "Manipal • 3 BHK", img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80" },
    { title: "Urban Café", meta: "Commercial", img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" },
    { title: "Coastal Home", meta: "Malpe • 2 BHK", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80" },
    { title: "Zen Studio", meta: "Bangalore • 1 BHK", img: "https://images.unsplash.com/photo-1502005229766-528352a2e780?w=800&q=80" },
    { title: "Heritage Stay", meta: "Mysore • 4 BHK", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80" },
    { title: "Sky Loft", meta: "Mumbai • Penthouse", img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-16">
          <span className="text-[#A65D46] font-bold tracking-wider uppercase text-sm mb-2 block">Portfolio</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#3E2723]">Featured Projects</h2>
          <p className="opacity-70 max-w-2xl mx-auto text-lg">Discover our cozy, timeless interiors crafted for modern living.</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md bg-gray-100 relative">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-medium text-sm">
                    View Project
                  </div>
                </div>
                <h3 className="text-xl font-bold group-hover:text-[#A65D46] transition-colors">{project.title}</h3>
                <p className="text-sm opacity-60 mt-1 uppercase tracking-wide text-[#A65D46]">{project.meta}</p>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal className="text-center mt-12">
          <button className="px-10 py-3 border border-[#3E2723] rounded-full hover:bg-[#3E2723] hover:text-white transition-all hover:px-12 duration-300 font-medium">
            View All Projects
          </button>
        </Reveal>
      </div>
    </section>
  );
};

const ProcessSection = () => (
  <section id="process" className="py-24 px-6 bg-[#FAF3ED]">
    <div className="max-w-7xl mx-auto">
      <Reveal className="text-center mb-16">
        <span className="text-[#A65D46] font-bold tracking-wider uppercase text-sm mb-2 block">Workflow</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#3E2723]">Our Process</h2>
        <p className="opacity-70 text-lg">A seamless journey from concept to completion</p>
      </Reveal>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { icon: <MessagesSquare />, title: "Consultation", desc: "We listen to your ideas, needs, and vision." },
          { icon: <PencilRuler />, title: "Design", desc: "Our team creates detailed plans and 3D renderings." },
          { icon: <ClipboardCheck />, title: "Approval", desc: "Review and refine until the design is perfect." },
          { icon: <Hammer />, title: "Execution", desc: "We bring your vision to life with expert craftsmanship." }
        ].map((item, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="bg-white text-center p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 border border-[#3E2723]/5 group h-full">
              <div className="w-16 h-16 bg-[#FAF3ED] text-[#A65D46] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A65D46] group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#3E2723]">{item.title}</h3>
              <p className="text-sm opacity-70 leading-relaxed">{item.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const TeamSection = () => (
  <section id="team" className="py-24 px-6 bg-white">
    <div className="max-w-7xl mx-auto">
      <Reveal className="text-center mb-16">
        <span className="text-[#A65D46] font-bold tracking-wider uppercase text-sm mb-2 block">Our People</span>
        <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#3E2723]">Meet The Team</h2>
        <p className="opacity-70 max-w-2xl mx-auto text-lg">The creative minds behind your dream spaces.</p>
      </Reveal>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
        {[
          { name: "Jithesh", role: "Principal Architect", img: "https://randomuser.me/api/portraits/men/32.jpg" },
          { name: "Thanisha", role: "Interior Designer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
          { name: "Niranjan", role: "Project Manager", img: "https://randomuser.me/api/portraits/men/86.jpg" },
          { name: "Spoorti", role: "3D Visualizer", img: "https://randomuser.me/api/portraits/women/65.jpg" }
        ].map((member, i) => (
          <Reveal key={i} delay={i * 100}>
            <div className="text-center group cursor-default">
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-[#FAF3ED] shadow-lg relative">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-[#3E2723]">{member.name}</h3>
              <p className="text-sm font-medium text-[#A65D46] mt-1">{member.role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const Testimonials = () => (
  <section className="py-24 overflow-hidden bg-[#FAF3ED]">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-serif mb-4 text-[#3E2723]">What Our Clients Say</h2>
    </div>
    
    <style>{`
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(calc(-350px * 4 - 2rem * 4)); }
      }
      .testimonial-marquee {
        animation: scroll 40s linear infinite;
      }
      .testimonial-marquee:hover {
        animation-play-state: paused;
      }
    `}</style>

    <div className="flex w-full overflow-hidden mask-gradient-x">
       <div className="flex gap-8 testimonial-marquee px-4">
         {[...Array(8)].map((_, i) => (
           <div key={i} className="w-[350px] bg-white p-8 rounded-2xl flex-shrink-0 shadow-sm border border-[#3E2723]/5 hover:shadow-md transition-shadow">
             <div className="flex gap-1 text-[#eab308] mb-4">
               {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
             </div>
             <p className="italic mb-6 text-lg text-[#3E2723]/80 leading-relaxed">
               "{i % 2 === 0 ? "The team at DreamSpace completely transformed our living area. It feels bigger, brighter, and so much more welcoming." : "Professional, timely, and incredibly creative. They understood our vision perfectly."}"
             </p>
             <div className="flex items-center gap-4 border-t border-[#3E2723]/5 pt-4">
               <div className="w-10 h-10 bg-[#A65D46]/10 rounded-full flex items-center justify-center text-[#A65D46] font-bold">
                 {String.fromCharCode(65 + i)}
               </div>
               <div>
                 <h4 className="font-bold text-[#3E2723]">Client Name {i + 1}</h4>
                 <span className="text-xs opacity-60">Homeowner</span>
               </div>
             </div>
           </div>
         ))}
       </div>
    </div>
  </section>
);

const Careers = () => (
  <section id="careers" className="py-24 px-6 bg-[#3E2723] text-[#FAF3ED] relative overflow-hidden">
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #A65D46 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    
    <Reveal className="max-w-4xl mx-auto text-center relative z-10">
       <span className="inline-block py-1 px-3 rounded-full bg-[#A65D46] text-white text-xs font-bold mb-6 uppercase tracking-wider">We Are Hiring</span>
       <h2 className="text-4xl md:text-5xl font-serif mb-6">Join Our Creative Team</h2>
       <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto leading-relaxed">
         We are always looking for talented architects, interior designers, and 3D visualizers to join our growing family in Manipal. If you are passionate about design, we want to hear from you.
       </p>
       <div className="flex flex-col sm:flex-row gap-4 justify-center">
         <button className="px-8 py-3 bg-[#FAF3ED] text-[#3E2723] font-bold rounded-lg hover:bg-white transition-colors shadow-lg">
           View Openings
         </button>
         <button className="px-8 py-3 border border-[#FAF3ED]/30 text-[#FAF3ED] font-bold rounded-lg hover:bg-[#FAF3ED]/10 transition-colors">
           Contact HR
         </button>
       </div>
    </Reveal>
  </section>
);

const FAQ = () => {
  const [active, setActive] = useState<number | null>(null);
  const items = [
    { q: "How long does a typical project take?", a: "It depends on the size and scope. A single room setup usually takes 4-6 weeks, while complete home interiors may take 2-4 months." },
    { q: "What is your pricing structure?", a: "We offer both fixed-fee packages for standard designs and custom quotes for bespoke projects. We work with you to stay within your budget." },
    { q: "Do you provide 3D visualizations?", a: "Yes, 3D rendering is a core part of our process. You will see exactly how your space will look before we hammer a single nail." },
    { q: "Do you handle the contractors?", a: "Absolutely. We offer turnkey solutions where we manage all carpenters, painters, and electricians so you don't have to." }
  ];

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-serif mb-4 text-[#3E2723]">Frequently Asked Questions</h2>
        </Reveal>
        
        <div className="space-y-4">
          {items.map((item, i) => (
            <Reveal key={i} delay={i * 50}>
              <div className="bg-[#FAF3ED] rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md border border-[#3E2723]/5">
                <button 
                  onClick={() => setActive(active === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-[#3E2723]"
                >
                  {item.q}
                  <div className={`transition-transform duration-300 text-[#A65D46] ${active === i ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                  </div>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${active === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm text-[#3E2723]/70 leading-relaxed border-t border-[#3E2723]/10 pt-4">{item.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="py-24 px-6 bg-[#FAF3ED]">
    <div className="max-w-7xl mx-auto">
       <Reveal>
         <div className="bg-white rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl border border-[#3E2723]/5 overflow-hidden relative">
           {/* Decor */}
           <div className="absolute top-0 left-0 w-32 h-32 bg-[#A65D46]/10 rounded-br-[4rem]"></div>
           <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#3E2723]/5 rounded-tl-[4rem]"></div>

           <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#3E2723] relative z-10">Let's Design Your Dream Space</h2>
           <p className="opacity-70 max-w-2xl mx-auto mb-12 text-lg relative z-10">Ready to start? We're just a call or visit away.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 relative z-10">
             <a href="tel:+918762684336" className="bg-[#FAF3ED] p-8 rounded-2xl hover:shadow-lg transition-all group border border-transparent hover:border-[#A65D46]/20">
               <div className="w-14 h-14 bg-[#3E2723] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A65D46] group-hover:scale-110 transition-all">
                 <PhoneIcon />
               </div>
               <h4 className="font-bold mb-2 text-xl">Call Us</h4>
               <p className="opacity-80">+91 8762684336</p>
             </a>
             <a href="mailto:hello@dreamspace.com" className="bg-[#FAF3ED] p-8 rounded-2xl hover:shadow-lg transition-all group border border-transparent hover:border-[#A65D46]/20">
               <div className="w-14 h-14 bg-[#3E2723] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A65D46] group-hover:scale-110 transition-all">
                 <MailIcon />
               </div>
               <h4 className="font-bold mb-2 text-xl">Email Us</h4>
               <p className="opacity-80">hello@dreamspace.com</p>
             </a>
             <div className="bg-[#FAF3ED] p-8 rounded-2xl hover:shadow-lg transition-all group border border-transparent hover:border-[#A65D46]/20 cursor-default">
               <div className="w-14 h-14 bg-[#3E2723] text-white rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-[#A65D46] group-hover:scale-110 transition-all">
                 <MapPinIcon />
               </div>
               <h4 className="font-bold mb-2 text-xl">Visit Us</h4>
               <p className="opacity-80">Manipal, Karnataka 576104</p>
             </div>
           </div>
           
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <button className="px-12 py-4 bg-[#A65D46] text-white font-bold rounded-full hover:bg-[#8E4D39] transition-all shadow-lg text-lg transform hover:-translate-y-1">
                Schedule a Consultation
              </button>
           </div>
         </div>
       </Reveal>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-[#1a110e] text-[#FAF3ED] pt-20 pb-10 px-6 border-t border-white/5">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
      <div className="col-span-1 md:col-span-1">
        <h3 className="text-2xl font-bold mb-6 text-[#A65D46] font-serif">DreamSpace</h3>
        <p className="text-sm opacity-60 leading-relaxed mb-6">
          Creating exceptional interiors that inspire and delight since 2015. We turn spaces into stories.
        </p>
        <div className="flex gap-4 opacity-60">
          {['FB', 'IG', 'LI', 'TW'].map((social) => (
            <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#A65D46] hover:text-white transition-colors text-xs font-bold">
              {social}
            </a>
          ))}
        </div>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 text-lg">Quick Links</h4>
        <ul className="space-y-4 text-sm opacity-70">
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">Home</a></li>
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">Projects</a></li>
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">About Us</a></li>
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">Contact</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 text-lg">Services</h4>
        <ul className="space-y-4 text-sm opacity-70">
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">Residential Design</a></li>
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">Commercial Space</a></li>
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">Modular Kitchens</a></li>
          <li><a href="#" className="hover:text-[#A65D46] transition-colors">Renovations</a></li>
        </ul>
      </div>
      
      <div>
        <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
        <p className="text-sm opacity-60 mb-4">Subscribe for design tips and trends.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm w-full focus:outline-none focus:border-[#A65D46] transition-colors placeholder-white/30" />
          <button className="bg-[#A65D46] px-5 py-3 rounded-lg font-bold text-sm hover:bg-[#8E4D39] transition-colors">Join</button>
        </div>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs opacity-40">
      <p>&copy; 2025 DreamSpace Interior Design. All rights reserved.</p>
      <div className="flex gap-6">
        <a href="#" className="hover:text-white">Privacy Policy</a>
        <a href="#" className="hover:text-white">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Main App ---

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Prevent scroll when gallery is enlarged
  useEffect(() => {
    if (isGalleryOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isGalleryOpen]);

  return (
    <div className="font-sans text-[#3E2723] bg-[#FAF3ED] overflow-x-hidden selection:bg-[#A65D46] selection:text-white">
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <Hero onEnlargeToggle={setIsGalleryOpen} isGalleryOpen={isGalleryOpen} />
      <div className="relative z-20 bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.05)] rounded-t-[3rem] mt-[-3rem]">
        <VideoSection />
        <AboutSection />
        <ProjectsSection />
        <ProcessSection />
        <Testimonials />
        <TeamSection />
        <Careers />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
