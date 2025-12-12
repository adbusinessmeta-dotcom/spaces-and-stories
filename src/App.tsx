import React, { useState } from 'react';
import DomeGallery from './DomeGallery';

// Simple SVGs to replace external icons for stability and performance
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
);
const XIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const ArrowRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);
const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const MessagesSquare = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const PencilRuler = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"></path><path d="M2 2a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2z"></path><path d="M8 2v20"></path><path d="M16 2v20"></path></svg>
);
const ClipboardCheck = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
);
const Hammer = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 12-8.5 8.5c-.83.83-2.17.83-3 0 0 0 0 0 0 0a2.12 2.12 0 0 1 0-3L12 9"></path><path d="M17.64 15 22 10.64"></path><path d="m20.91 11.7-1.25-1.25c-.6-.6-.93-1.4-.93-2.25V7.86c0-.55-.45-1-1-1H16.4c-.84 0-1.65-.33-2.25-.93L12.9 4.68"></path><path d="M16.27 3 13.86.6a2 2 0 0 0-2.82 0L.6 11.06a2 2 0 0 0 0 2.82l2.4 2.4"></path></svg>
);
const PlayIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor" stroke="none" className="text-white drop-shadow-lg opacity-90 hover:opacity-100 transition-opacity"><path d="M10 15l6-3-6-3v6zm12-3c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2s10 4.48 10 10z"/></svg>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="font-sans text-[#3E2723] bg-[#FAF3ED] overflow-x-hidden">
      
      {/* Styles for marquee animation */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
      `}</style>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF3ED]/90 backdrop-blur-md border-b border-[#D4C5B5]/30">
        <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="text-2xl font-bold tracking-tight text-[#A65D46] font-serif">DreamSpace</a>

          <button 
            className="md:hidden p-2 text-[#3E2723]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <XIcon /> : <MenuIcon />}
          </button>

          <ul className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-20 md:top-0 left-0 right-0 bg-[#FAF3ED] md:bg-transparent p-6 md:p-0 gap-6 md:gap-8 shadow-xl md:shadow-none items-center text-sm font-medium border-b border-[#D4C5B5] md:border-none`}>
            <li><a href="#home" className="hover:text-[#A65D46] transition-colors" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#projects" className="hover:text-[#A65D46] transition-colors" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
            <li><a href="#process" className="hover:text-[#A65D46] transition-colors" onClick={() => setIsMenuOpen(false)}>Process</a></li>
            <li><a href="#team" className="hover:text-[#A65D46] transition-colors" onClick={() => setIsMenuOpen(false)}>Team</a></li>
            <li><a href="#careers" className="hover:text-[#A65D46] transition-colors" onClick={() => setIsMenuOpen(false)}>Careers</a></li>
            <li><a href="#contact" className="hover:text-[#A65D46] transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen w-full overflow-hidden">
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
            onEnlargeToggle={setIsGalleryOpen}
          />
        </div>

        {/* Hero Content Overlay */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none px-4">
          <div className="bg-white/40 backdrop-blur-md rounded-[2rem] p-8 sm:p-14 border border-white/50 shadow-xl max-w-4xl text-center pointer-events-auto transform transition-all duration-500 hover:scale-[1.01]">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-normal text-black leading-[1.2] mb-2 drop-shadow-sm font-serif">
              Designing Warm &amp;<br />
              Cozy Spaces That Feel<br />
              Like Home
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 pointer-events-auto">
            <a href="#contact" className="px-8 py-3.5 bg-[#A65D46] text-white rounded-full font-bold hover:bg-[#8E4D39] transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
              Start Your Dream Space
              <ArrowRight />
            </a>
            <a href="#projects" className="px-8 py-3.5 bg-white/60 border border-[#D4C5B5] text-[#3E2723] rounded-full font-bold hover:bg-white transition-all shadow-md backdrop-blur-sm">
              View Our Work
            </a>
          </div>
        </div>
      </section>

      {/* Video / Featured In Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-serif mb-2">As Seen On YouTube</h2>
             <p className="opacity-70">Watch how we transform empty shells into dream homes.</p>
           </div>
           
           <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
              <img 
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop" 
                alt="Video Thumbnail" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                 <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                   <PlayIcon />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-[#FAF3ED]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl rotate-[-2deg] border-4 border-white">
              <img src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?w=800&q=80" alt="About" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-4 rounded-xl shadow-xl rotate-[3deg] hidden md:block">
               <img src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?w=400" alt="Detail" className="w-full h-full object-cover rounded-lg" />
            </div>
          </div>
          <div>
            <span className="text-[#A65D46] font-bold tracking-wider uppercase text-sm">About Us</span>
            <h2 className="text-4xl font-serif mt-4 mb-6 leading-tight">Turning Houses Into Dream Homes</h2>
            <p className="text-lg opacity-80 mb-6 leading-relaxed">
              At DreamSpace, we bring warmth and personality into every corner.
              Our focus is on creating interiors that feel inviting, functional,
              and uniquely yours. Whether it’s a compact apartment or a cozy
              family home, our designs blend comfort with timeless elegance.
            </p>
            <div className="flex gap-4">
              <div className="text-center">
                 <span className="block text-3xl font-bold text-[#A65D46]">150+</span>
                 <span className="text-sm opacity-60">Projects</span>
              </div>
              <div className="w-px bg-[#3E2723]/20"></div>
              <div className="text-center">
                 <span className="block text-3xl font-bold text-[#A65D46]">8+</span>
                 <span className="text-sm opacity-60">Years</span>
              </div>
              <div className="w-px bg-[#3E2723]/20"></div>
              <div className="text-center">
                 <span className="block text-3xl font-bold text-[#A65D46]">100%</span>
                 <span className="text-sm opacity-60">Happy Clients</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Featured Projects</h2>
            <p className="opacity-70 max-w-2xl mx-auto">Discover our cozy, timeless interiors crafted for modern living.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Modern Villa Interior",
                meta: "Contemporary • 3 BHK • Manipal",
                img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80"
              },
              {
                title: "Café Interior Design",
                meta: "Industrial-Chic • Commercial • Manipal",
                img: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80"
              },
              {
                title: "Coastal Apartment",
                meta: "Coastal Modern • 2 BHK • Malpe, Udupi",
                img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
              },
              {
                title: "Minimalist Studio",
                meta: "Minimalist • 1 BHK • Bangalore",
                img: "https://images.unsplash.com/photo-1502005229766-528352a2e780?w=800&q=80"
              },
              {
                title: "Heritage Home",
                meta: "Traditional • 4 BHK • Mysore",
                img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80"
              },
              {
                title: "Urban Loft",
                meta: "Industrial • Penthouse • Mumbai",
                img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80"
              }
            ].map((project, i) => (
              <div key={i} className="group cursor-pointer">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-4 shadow-md bg-gray-100">
                  <img src={project.img} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-bold group-hover:text-[#A65D46] transition-colors">{project.title}</h3>
                <p className="text-sm opacity-60 mt-1">{project.meta}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-[#3E2723] rounded-full hover:bg-[#3E2723] hover:text-white transition-colors">
              View All Projects
            </button>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section id="team" className="py-24 px-6 bg-[#FAF3ED]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Meet The Team</h2>
            <p className="opacity-70 max-w-2xl mx-auto">The creative minds behind your dream spaces.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { name: "Jithesh", role: "Principal Architect", img: "https://randomuser.me/api/portraits/men/32.jpg" },
               { name: "Thanisha", role: "Interior Designer", img: "https://randomuser.me/api/portraits/women/44.jpg" },
               { name: "Niranjan", role: "Project Manager", img: "https://randomuser.me/api/portraits/men/86.jpg" },
               { name: "Spoorti", role: "3D Visualizer", img: "https://randomuser.me/api/portraits/women/65.jpg" }
             ].map((member, i) => (
               <div key={i} className="text-center group">
                 <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden mx-auto mb-4 border-4 border-white shadow-lg">
                   <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                 </div>
                 <h3 className="text-xl font-bold">{member.name}</h3>
                 <p className="text-sm opacity-60 text-[#A65D46]">{member.role}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#D4C5B5] p-1 flex-shrink-0">
              <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=200&fit=crop" alt="Profile" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="text-center md:text-left flex-1">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold">dreamspace.interiors</h2>
                <button className="px-6 py-1.5 bg-[#A65D46] text-white text-sm font-semibold rounded-lg hover:bg-[#8E4D39] transition-colors">Follow</button>
              </div>
              <div className="flex justify-center md:justify-start gap-8 text-sm mb-4">
                <span><strong>1,254</strong> posts</span>
                <span><strong>45.2k</strong> followers</span>
                <span><strong>210</strong> following</span>
              </div>
              <div className="text-sm leading-relaxed">
                <p>✨ Transforming spaces into dreams</p>
                <p>🏡 Interior Design &amp; Architecture</p>
                <p>📍 Bangalore, India</p>
                <a href="#" className="text-[#A65D46] hover:underline">www.dreamspace.com</a>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {[
              "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1522771753014-40599026330b?w=400&h=400&fit=crop",
              "https://images.unsplash.com/photo-1502005229766-528352a2e780?w=400&h=400&fit=crop"
            ].map((src, i) => (
              <div key={i} className="aspect-square relative group overflow-hidden bg-gray-100 cursor-pointer">
                <img src={src} alt="Gallery" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section id="process" className="py-24 px-6 bg-[#FAF3ED]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Our Process</h2>
            <p className="opacity-70">A seamless journey from concept to completion</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white text-center p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-[#FAF3ED] text-[#A65D46] rounded-full flex items-center justify-center mx-auto mb-6">
                <MessagesSquare />
              </div>
              <h3 className="text-xl font-bold mb-2">Consultation</h3>
              <p className="text-sm opacity-70">We listen to your ideas, needs, and vision for your space</p>
            </div>
            <div className="bg-white text-center p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-[#FAF3ED] text-[#A65D46] rounded-full flex items-center justify-center mx-auto mb-6">
                <PencilRuler />
              </div>
              <h3 className="text-xl font-bold mb-2">Design</h3>
              <p className="text-sm opacity-70">Our team creates detailed plans and 3D renderings</p>
            </div>
            <div className="bg-white text-center p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-[#FAF3ED] text-[#A65D46] rounded-full flex items-center justify-center mx-auto mb-6">
                <ClipboardCheck />
              </div>
              <h3 className="text-xl font-bold mb-2">Approval</h3>
              <p className="text-sm opacity-70">Review and refine until the design is perfect</p>
            </div>
            <div className="bg-white text-center p-8 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
              <div className="w-16 h-16 bg-[#FAF3ED] text-[#A65D46] rounded-full flex items-center justify-center mx-auto mb-6">
                <Hammer />
              </div>
              <h3 className="text-xl font-bold mb-2">Execution</h3>
              <p className="text-sm opacity-70">We bring your vision to life with expert craftsmanship</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials-marquee" className="py-24 overflow-hidden bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif mb-4">What Our Clients Say</h2>
          <p className="opacity-70">Real stories from families who trusted us with their dreams.</p>
        </div>
        
        {/* Simple infinite scroll implementation using duplicate content */}
        <div className="flex gap-6 animate-scroll-left w-[200%]">
           {[...Array(2)].map((_, setIndex) => (
             <React.Fragment key={setIndex}>
               {[
                 { name: "Sarah Jenkins", text: "The platform feels invisible—just fast, reliable pipelines. Absolutely transformed our living experience." },
                 { name: "Michael Chen", text: "Ideally suited for modern stacks. The documentation is pristine and the community is helpful." },
                 { name: "Emma Wilson", text: "Security compliance was a breeze. The built-in shields saved us months of preparation." },
                 { name: "David Okafor", text: "Scaled to 100k daily active users without a single hiccup. The auto-scaling just works." }
               ].map((testimonial, i) => (
                 <div key={`${setIndex}-${i}`} className="min-w-[300px] md:min-w-[400px] bg-[#FAF3ED] p-8 rounded-2xl flex-shrink-0">
                   <div className="flex gap-1 text-yellow-500 mb-4">
                     {[...Array(5)].map((_, j) => <StarIcon key={j} />)}
                   </div>
                   <p className="italic mb-6 text-lg">"{testimonial.text}"</p>
                   <div className="flex items-center gap-4">
                     <img src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${(i + 1) * 10}.jpg`} alt="User" className="w-12 h-12 rounded-full" />
                     <div>
                       <h4 className="font-bold">{testimonial.name}</h4>
                       <span className="text-xs opacity-60">Homeowner</span>
                     </div>
                   </div>
                 </div>
               ))}
             </React.Fragment>
           ))}
        </div>
      </section>
      
      {/* Hiring Section */}
      <section id="careers" className="py-24 px-6 bg-[#3E2723] text-[#FAF3ED]">
        <div className="max-w-4xl mx-auto text-center">
           <span className="inline-block py-1 px-3 rounded-full bg-[#A65D46] text-xs font-bold mb-4 uppercase tracking-wider">We Are Hiring</span>
           <h2 className="text-4xl md:text-5xl font-serif mb-6">Join Our Creative Team</h2>
           <p className="text-lg opacity-80 mb-10 max-w-2xl mx-auto">
             We are always looking for talented architects, interior designers, and 3D visualizers to join our growing family in Manipal.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="px-8 py-3 bg-[#FAF3ED] text-[#3E2723] font-bold rounded-lg hover:bg-white transition-colors">
               View Openings
             </button>
             <button className="px-8 py-3 border border-[#FAF3ED]/30 text-[#FAF3ED] font-bold rounded-lg hover:bg-[#FAF3ED]/10 transition-colors">
               Contact HR
             </button>
           </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-4">Frequently Asked Questions</h2>
            <p className="opacity-70">Here’s everything you might want to know before getting started</p>
          </div>
          
          <div className="space-y-4">
            {[
              { q: "How long does a typical project take?", a: "It depends on the size and scope of your space. A single room setup usually takes 4-6 weeks, while complete home interiors may take 2-4 months. We'll share a clear timeline after our first site visit." },
              { q: "What kind of projects do you take up?", a: "We design cozy homes, apartments, and small commercial spaces. Most of our projects are for nuclear families or couples who want a warm, modern living space." },
              { q: "Can you work within my budget?", a: "Absolutely! We understand that every family has different needs. We’ll plan materials and finishes according to your budget while maintaining quality." },
              { q: "Do you work with local suppliers?", a: "Yes, we collaborate with trusted local vendors and craftsmen to ensure smooth execution and timely delivery." },
              { q: "Can I include my existing furniture?", a: "Definitely! If you already have furniture or décor that holds sentimental value, we’ll happily integrate it into the new design." }
            ].map((item, i) => (
              <div key={i} className="bg-[#FAF3ED] rounded-xl overflow-hidden shadow-sm">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold"
                >
                  {item.q}
                  <div className={`transition-transform duration-300 ${activeFaq === i ? 'rotate-180' : ''}`}>
                    <ChevronDown />
                  </div>
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-sm opacity-70 leading-relaxed">{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-24 px-6 bg-[#FAF3ED]">
        <div className="max-w-7xl mx-auto">
           <div className="bg-white rounded-[2.5rem] p-8 md:p-16 text-center shadow-xl">
             <h2 className="text-3xl md:text-5xl font-serif mb-6 text-[#3E2723]">Let's Design Your Dream Space</h2>
             <p className="opacity-70 max-w-2xl mx-auto mb-12 text-lg">We're just a call or visit away — reach out and let's begin your transformation.</p>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               <a href="tel:+918762684336" className="bg-[#FAF3ED] p-6 rounded-2xl hover:shadow-md transition-shadow group">
                 <div className="w-12 h-12 bg-[#3E2723] text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <PhoneIcon />
                 </div>
                 <h4 className="font-bold mb-2">Call Us</h4>
                 <p className="opacity-80">+91 8762684336</p>
               </a>
               <a href="mailto:hello@dreamspace.com" className="bg-[#FAF3ED] p-6 rounded-2xl hover:shadow-md transition-shadow group">
                 <div className="w-12 h-12 bg-[#3E2723] text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <MailIcon />
                 </div>
                 <h4 className="font-bold mb-2">Email Us</h4>
                 <p className="opacity-80">hello@dreamspace.com</p>
               </a>
               <a href="#" className="bg-[#FAF3ED] p-6 rounded-2xl hover:shadow-md transition-shadow group">
                 <div className="w-12 h-12 bg-[#3E2723] text-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                   <MapPinIcon />
                 </div>
                 <h4 className="font-bold mb-2">Visit Us</h4>
                 <p className="opacity-80">Manipal, Karnataka 576104</p>
               </a>
             </div>
             
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-10 py-4 bg-[#A65D46] text-white font-bold rounded-full hover:bg-[#8E4D39] transition-colors shadow-lg text-lg">
                  Schedule a Consultation
                </button>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1a110e] text-[#FAF3ED] py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-[#A65D46] font-serif">DreamSpace</h3>
            <p className="text-sm opacity-60 leading-relaxed">
              Creating exceptional interiors that inspire and delight since 2015.
            </p>
            <div className="flex gap-4 mt-6 opacity-60">
              <a href="#" className="hover:text-white transition-colors">FB</a>
              <a href="#" className="hover:text-white transition-colors">IG</a>
              <a href="#" className="hover:text-white transition-colors">LI</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm opacity-60">
              <li><a href="#" className="hover:text-white transition-colors">Schedule Consultation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Projects</a></li>
              <li><a href="#" className="hover:text-white transition