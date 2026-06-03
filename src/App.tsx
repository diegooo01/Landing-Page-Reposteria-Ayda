import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { translations } from './translations';
import { Language } from './types';
import Logo from './components/Logo';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import DessertSommelier from './components/DessertSommelier';
import { Menu, X, ArrowUp, Sparkles } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [prefilledContactMessage, setPrefilledContactMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle transparent to dense header transition on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background scroll when mobile menu is active
  useEffect(() => {
    if (showMobileMenu) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [showMobileMenu]);

  // Auto-close the menu when crossing into desktop width (md = 768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMobileMenu(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const t = translations[language];

  // Callback when a user orders a custom box from Gallery section, scroll to contact and prefill
  const handleSelectDessert = (dessertName: string) => {
    const msg = language === 'en' 
      ? `Hello! I would love to place a custom order inquiry for: "${dessertName}". Please contact me with options and pricing.`
      : `¡Hola! Me encantaría solicitar una cotización para un pedido personalizado de: "${dessertName}". Por favor contáctenme con opciones y precios.`;
    
    setPrefilledContactMessage(msg);
    
    // Smooth scroll to contact input and focus
    const contactSec = document.getElementById('contact');
    if (contactSec) {
      contactSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.services, href: '#services' },
    { label: t.nav.gallery, href: '#gallery' },
    { label: t.nav.contact, href: '#contact' },
  ];

  return (
    <div className="min-h-screen bg-[#FAF4EC] text-stone-950 font-sans selection:bg-rose-150 selection:text-rose-950" id="ayda-app-root">
      
      {/* 1. LANGUAGE SELECTOR & COMPACT FLOAT NAV (Sticky / Fixed Glass Bar) */}
      <AnimatePresence>
        {scrolled && !isModalOpen && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="site-navbar fixed top-0 inset-x-0 z-40 bg-[#FAF4EC]/95 backdrop-blur-md border-b border-stone-300/40 px-6 py-4"
          >
            {/* Header Content */}
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
              <a href="#home" className="flex items-center gap-3 group">
                <Logo size={42} animated={false} />
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-stone-950 tracking-wider text-sm leading-tight group-hover:text-rose transition-colors">
                    Ayda
                  </span>
                  <span className="text-[9px] text-rose uppercase tracking-widest font-mono font-bold leading-tight">
                    Pedacito De Cielo
                  </span>
                </div>
              </a>

              {/* Desktop Sticky Navigation list */}
              <nav className="hidden md:flex items-center gap-8">
                {navItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-xs uppercase font-semibold tracking-widest text-stone-800 hover:text-stone-950 transition-colors duration-200 relative group py-1"
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-rose group-hover:w-full transition-all duration-300" />
                  </a>
                ))}
              </nav>

              {/* Languages switch + Mobile menu triggers */}
              <div className="flex items-center gap-4">
                {/* Language Switch Pills */}
                <div className="flex items-center bg-white/60 border border-stone-300/70 rounded-full p-0.5" id="language-toggle">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full cursor-pointer transition-all duration-200 ${
                      language === 'en'
                        ? 'bg-rose text-white shadow-sm font-semibold'
                        : 'text-stone-700 hover:text-rose'
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLanguage('es')}
                    className={`px-3 py-1 text-[10px] font-bold rounded-full cursor-pointer transition-all duration-205 ${
                      language === 'es'
                        ? 'bg-rose text-white shadow-sm font-semibold'
                        : 'text-stone-700 hover:text-rose'
                    }`}
                  >
                    ES
                  </button>
                </div>

                {/* Mobile Menu trigger */}
                <button
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="md:hidden p-2 rounded-lg bg-white/70 border border-stone-300/80 text-stone-800 hover:text-rose transition-colors"
                >
                  <Menu className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* 2. MAIN HERO SECTION (Exactly Layout like reference image & Elegant design) */}
      <section id="home" className="relative min-h-screen bg-[#FAF4EC] flex flex-col justify-between items-center text-center overflow-hidden z-20">
        
        {/* Background video overlaying on warm cream background plane */}
        <div className="absolute inset-0 w-full h-full bg-[#FAF4EC] flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
          <video
            src="https://res.cloudinary.com/dbbjrkk1i/video/upload/v1780357095/Generar_video_animación_cuchara___202606011819_sz2o6d.mp4"
            autoPlay
            loop
            muted
            playsInline
            controls={false}
            className="w-full h-full object-cover opacity-65 saturate-[1.1] contrast-[1.05]"
            style={{ pointerEvents: 'none' }}
          />
          {/* Elegant warm blush-pink and cream matte overlays with 30-40% opacity to maintain contrast while showing detail */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FAF4EC]/35 via-transparent to-[#FAF4EC]/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4EC]/40 via-[#FCE7EC]/25 to-[#FAF4EC]/35" />
        </div>

        {/* Global Floating Language Trigger directly visible in translucent hero on load */}
        {!scrolled && (
          <div className="absolute top-6 right-6 z-30">
            <div className="flex items-center bg-[#FAF4EC]/90 backdrop-blur-md border border-stone-300/80 rounded-full p-0.5 shadow-sm">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-full cursor-pointer transition-all duration-200 ${
                  language === 'en'
                    ? 'bg-rose text-white font-semibold'
                    : 'text-stone-800 hover:text-rose'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('es')}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-full cursor-pointer transition-all duration-200 ${
                  language === 'es'
                    ? 'bg-rose text-white font-semibold'
                    : 'text-stone-800 hover:text-rose'
                }`}
              >
                ES
              </button>
            </div>
          </div>
        )}

        {/* Top Header Block: Centered elegant logo and classic linear nav menu exactly like reference layout */}
        <div className="relative z-10 w-full pt-12 md:pt-16 pb-4 px-6 space-y-6">
          
          {/* Main Ornate Logo Icon */}
          <Logo size={190} className="mx-auto drop-shadow-[0_20px_50px_rgba(210,93,126,0.15)]" />

          {/* Centered Navigation Bar directly below the Brand Logo */}
          <div className="max-w-2xl mx-auto border-t border-b border-stone-300 py-3.5 mt-4">
            <nav className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-[11px] md:text-xs font-mono font-bold tracking-[0.2em] text-stone-700 uppercase">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="hover:text-rose transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Central Overlay / Large Sophisticated Heading Layout */}
        <div className="relative z-10 max-w-2xl mx-auto px-6 space-y-4 my-auto py-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center gap-2 text-rose"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span className="text-[11px] font-mono tracking-[0.4em] uppercase font-semibold">
              {language === 'en' ? 'Ancestral Peruvian Confectionery' : 'Repostería Tradicional Peruana'}
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="font-serif text-5xl md:text-8xl leading-[0.95] font-light tracking-tight text-stone-955 drop-shadow-sm"
          >
            {language === 'en' ? (
              <>The Art of <br/><span className="italic text-rose font-serif">Peruvian</span> Sweets</>
            ) : (
              <>El Arte de los <br/><span className="italic text-rose font-serif">Dulces</span> Peruanos</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="text-stone-850 max-w-lg mx-auto text-base md:text-lg font-light leading-relaxed pt-2"
          >
            {language === 'en'
              ? "Experience the refined heritage of Peruvian desserts. From the velvety richness of Suspiro a la Limeña to the golden crunch of traditional colonial Chocotejas."
              : "Experimenta la herencia refinada de los postres peruanos. Desde la sutil riqueza del Suspiro a la Limeña hasta el crocante tradicional de nuestras finas Chocotejas."}
          </motion.p>
        </div>

        {/* Bottom Call to Action and subtle down scroll anchor */}
        <div className="relative z-10 w-full pb-16 pt-4 px-6 space-y-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 max-w-xs md:max-w-md mx-auto"
          >
            {/* Primary Pink Button */}
            <a
              href="#gallery"
              className="bg-rose text-white font-semibold uppercase text-xs tracking-widest px-10 py-4 hover:bg-stone-950 transition-colors duration-500 cursor-pointer shadow-md"
            >
              {language === 'en' ? 'Explore Menu' : 'Explorar Menú'}
            </a>
            {/* Secondary Gray Outline Button */}
            <a
              href="#contact"
              className="border border-stone-300 text-stone-800 uppercase text-xs tracking-widest px-10 py-4 hover:border-rose hover:text-rose hover:bg-white/45 transition-all duration-300 cursor-pointer animate-none"
            >
              {language === 'en' ? 'Book an Experience' : 'Reservar Experiencia'}
            </a>
          </motion.div>

          <p className="text-[9px] font-mono tracking-[0.25em] text-stone-400 uppercase animate-bounce pt-2">
            {t.hero.scrollDown}
          </p>
        </div>
      </section>

      {/* 3. MOBILE MENU SLIDE OVER OVERLAY */}
      <AnimatePresence>
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="md:hidden fixed inset-0 z-50 bg-[#FAF4EC]/98 backdrop-blur-xl flex flex-col p-6 sm:p-8"
          >
            {/* Header: Logo, titles, and minimalist close button */}
            <div className="flex items-center justify-between border-b border-stone-200/50 pb-5 shrink-0">
              <a 
                href="#home" 
                onClick={() => setShowMobileMenu(false)}
                className="flex items-center gap-3 group"
              >
                <Logo size={42} animated={false} />
                <div className="flex flex-col text-left">
                  <span className="font-serif font-bold text-stone-950 tracking-wider text-sm leading-tight">
                    Ayda
                  </span>
                  <span className="text-[9px] text-rose uppercase tracking-widest font-mono font-bold leading-tight">
                    Pedacito De Cielo
                  </span>
                </div>
              </a>
              <button
                onClick={() => setShowMobileMenu(false)}
                className="p-2 rounded-full bg-white border border-stone-300 text-stone-800 hover:text-rose hover:border-rose/30 transition-colors cursor-pointer shadow-sm"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation links centered vertically & elegant */}
            <div className="flex-1 flex flex-col justify-center my-auto py-10">
              <nav className="flex flex-col gap-5 sm:gap-6 text-center max-w-sm mx-auto w-full">
                {navItems.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    onClick={() => setShowMobileMenu(false)}
                    className="group relative py-2.5 flex items-center justify-center gap-3 text-stone-900 hover:text-rose transition-colors duration-200 select-none"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {/* Index mono indicator */}
                    <span className="font-mono text-[9px] text-rose/60 tracking-wider group-hover:text-rose transition-colors">
                      0{idx + 1}.
                    </span>
                    
                    {/* Main label */}
                    <span className="font-serif text-xl sm:text-2xl font-light tracking-wide">
                      {item.label}
                    </span>

                    {/* Inner elegant line growing underlay */}
                    <span className="absolute bottom-1.5 left-1/2 w-0 h-[1.5px] bg-rose group-hover:w-16 -translate-x-1/2 transition-all duration-300" />
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Premium Language switch at bottom with divider */}
            <div className="border-t border-stone-200/50 pt-6 pb-4 flex flex-col items-center gap-3 shrink-0">
              {/* Pill-style language switcher consistent with desktop */}
              <div className="flex items-center bg-white border border-[#DECFCD] rounded-full p-0.5 shadow-sm">
                <button
                  onClick={() => {
                    setLanguage('en');
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-1.5 text-[10px] sm:text-xs font-bold rounded-full cursor-pointer transition-all duration-200 ${
                    language === 'en'
                      ? 'bg-rose text-white shadow-sm font-semibold'
                      : 'text-stone-800 hover:text-rose'
                  }`}
                >
                  ENGLISH
                </button>
                <button
                  onClick={() => {
                    setLanguage('es');
                    setShowMobileMenu(false);
                  }}
                  className={`px-4 py-1.5 text-[10px] sm:text-xs font-bold rounded-full cursor-pointer transition-all duration-200 ${
                    language === 'es'
                      ? 'bg-rose text-white shadow-sm font-semibold'
                      : 'text-stone-800 hover:text-rose'
                  }`}
                >
                  ESPAÑOL
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. OTHER SECTIONS (Story, Offerings, Masterpieces, Coordinates) */}
      <AboutSection language={language} />
      
      <ServicesSection language={language} />
      
      <GallerySection language={language} onSelectDessert={handleSelectDessert} onModalToggle={setIsModalOpen} />
      
      <ContactSection language={language} prefilledMessage={prefilledContactMessage} />

      {/* 5. GOURMET FOOTER */}
      <footer className="py-12 bg-[#E1D4C3] border-t border-[#D1C3B1]/40 text-center text-stone-800 text-xs font-normal">
        <div className="max-w-7xl mx-auto px-6 space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Logo size={45} animated={false} />
            <div className="text-left">
              <h4 className="font-serif font-bold text-sm text-stone-900">Ayda</h4>
              <p className="text-[10px] text-stone-704 font-mono uppercase tracking-widest leading-none">Pedacito de Cielo</p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-stone-800 mt-2 font-mono text-[10px] tracking-wider uppercase">
            <a href="#home" className="hover:text-rose font-semibold">{t.nav.home}</a>
            <span>·</span>
            <a href="#about" className="hover:text-rose font-semibold">{t.nav.about}</a>
            <span>·</span>
            <a href="#services" className="hover:text-rose font-semibold">{t.nav.services}</a>
            <span>·</span>
            <a href="#gallery" className="hover:text-rose font-semibold">{t.nav.gallery}</a>
            <span>·</span>
            <a href="#contact" className="hover:text-rose font-semibold">{t.nav.contact}</a>
          </div>

          <p className="pt-4 border-t border-[#D1C3B1]/50 text-[10px] text-stone-706 font-mono tracking-widest uppercase font-semibold">
            &copy; {new Date().getFullYear()} AYDA PEDACITO DE CIELO. ALL RIGHTS RESERVED. TRADITIONAL PERUVIAN CONFECTIONERY.
          </p>
        </div>
      </footer>

      {/* 6. FLOATING GO-TO-TOP BUTTON */}
      <AnimatePresence>
        {scrolled && !isModalOpen && (
          <motion.a
            href="#home"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="scroll-to-top fixed bottom-6 right-6 z-40 bg-[#FAF4EC] border border-stone-300/80 hover:border-rose/40 p-3 rounded-full text-stone-800 hover:text-stone-950 shadow-xl transition-all duration-200 cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 text-rose" />
          </motion.a>
        )}
      </AnimatePresence>

      {/* 7. AI DESSERT SOMMELIER */}
      <DessertSommelier
        language={language}
        onModalToggle={setIsModalOpen}
        onSelectDessert={handleSelectDessert}
      />

    </div>
  );
}
