import { motion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../translations';
import { Leaf, Award, Heart } from 'lucide-react';

interface AboutSectionProps {
  language: Language;
}

export default function AboutSection({ language }: AboutSectionProps) {
  const t = translations[language].about;

  return (
    <section id="about" className="py-28 bg-[#F6ECEB] border-t border-[#DECFCD] relative overflow-hidden animate-fade-in">
      {/* Abstract warm rose decorative glow */}
      <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-rose/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-rose/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Asymmetric Collage representation of heritage */}
          <div className="lg:col-span-6">
            <div className="relative w-full sm:h-[540px] h-auto max-w-xl mx-auto lg:mx-0 overflow-visible flex flex-col gap-6 sm:block mb-8 sm:mb-0">
              
              {/* Frame Accent Background decoration */}
              <div className="hidden sm:block absolute top-4 left-4 w-11/12 h-[90%] border-2 border-dashed border-rose/15 rounded-none -z-10 pointer-events-none" />

              {/* Image 1: Main Feature Image (Central-left, majestic backdrop with Ken Burns effect) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="relative sm:absolute top-0 left-0 w-full sm:w-[67%] h-56 xs:h-64 sm:h-[78%] shadow-xl border-4 border-white overflow-hidden rotate-0 sm:-rotate-2 z-10 hover:z-30 hover:rotate-0 hover:scale-[1.03] transition-all duration-500 bg-[#FAF4F2]"
              >
                <div className="w-full h-full overflow-hidden relative">
                  <img 
                    src="https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523981/image-tohero_fem0sn.png" 
                    alt="Artisanal Peruvian sweets curated backdrop" 
                    className="w-full h-full object-cover select-none scale-100 hover:scale-110 transition-transform duration-[4000ms] ease-out"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Image 2: Supporting Image (Alfajores, overlapping bottom-right with custom rotation) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 30, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.95, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative sm:absolute bottom-4 right-0 w-full sm:w-[55%] h-56 xs:h-64 sm:h-[60%] shadow-xl sm:shadow-2xl border-4 border-white overflow-hidden rotate-0 sm:rotate-3 z-20 hover:z-30 hover:rotate-0 hover:scale-[1.03] transition-all duration-500 bg-[#FAF4F2]"
              >
                <div className="w-full h-full overflow-hidden relative">
                  <img 
                    src="https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-alfajores_rf9r3e.jpg" 
                    alt="Traditional delicate baked alfajores" 
                    className="w-full h-full object-cover select-none hover:scale-105 transition-transform duration-[2000ms]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

              {/* Image 3: Supporting Image (Suspiro, overlapping top-right, hidden on ultra-small screens) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 20, y: -20 }}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.95, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-6 right-4 w-[42%] h-[42%] shadow-lg border-4 border-white overflow-hidden -rotate-1 hover:z-30 hover:rotate-0 hover:scale-[1.03] transition-all duration-500 bg-[#FAF4F2] hidden sm:block"
              >
                <div className="w-full h-full overflow-hidden relative">
                  <img 
                    src="https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-suspiro_oaznkq.jpg" 
                    alt="Authentic Suspiro a la Limeña cup" 
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>

            </div>
          </div>

          {/* Right Column: Narrative Texts with beautiful vertical rhythm */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6 sm:space-y-8 text-left">
            
            {/* Header section with perfect narrative tag */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose/10 border border-rose/25 text-[10px] text-rose font-mono uppercase tracking-widest font-bold">
                <Heart className="w-3.5 h-3.5 fill-rose/10 text-rose" />
                {t.title}
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-950 leading-[1.1]">
                {t.heading}
              </h2>

              {/* Romantic script-like Divider Ornament */}
              <div className="flex items-center gap-3 pt-1.5 pointer-events-none">
                <div className="h-[1px] w-12 bg-rose/30" />
                <span className="text-[9px] font-mono tracking-[0.25em] text-[#554643] uppercase font-bold">
                  {language === 'en' ? 'EST. 2018' : 'DESDE 2018'}
                </span>
                <div className="h-[1px] w-12 bg-rose/30" />
              </div>
            </motion.div>

            {/* Narrative descriptions */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="space-y-6 text-stone-900 text-base leading-relaxed font-normal"
            >
              <p className="first-letter:text-4xl first-letter:font-serif first-letter:font-bold first-letter:float-left first-letter:mr-2.5 first-letter:text-rose first-letter:leading-none">
                {t.paragraph1}
              </p>

              {/* Elevated Pull-Quote Box */}
              <blockquote className="relative my-6 p-6 sm:p-7 bg-[#FAF4F2] border-l-4 border-rose shadow-[0_8px_32px_rgba(210,93,126,0.04)] rounded-none overflow-hidden">
                <span className="absolute -top-1 left-2 text-7xl font-serif text-rose/15 pointer-events-none">“</span>
                <p className="relative z-10 italic text-stone-950 font-serif text-sm sm:text-[15px] leading-relaxed sm:leading-loose">
                  {t.paragraph2}
                </p>
                <div className="mt-4 flex items-center justify-end gap-2 text-right shrink-0">
                  <div className="h-[1.5px] w-5 bg-rose/40" />
                  <span className="text-[10px] font-mono tracking-widest text-rose uppercase font-bold">
                    {t.signature}
                  </span>
                </div>
              </blockquote>
            </motion.div>

          </div>

        </div>

        {/* Cohesive Horizontal Stat Strip at bottom bridging both sides */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-16 sm:mt-24 bg-[#FAF4F2]/50 border border-[#DECFCD] backdrop-blur-sm p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-[#DECFCD]/70 shadow-[0_12px_44px_rgba(222,207,205,0.22)] rounded-none relative overflow-hidden"
        >
          {/* Bottom highlight outline accent */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-rose" />

          {/* Stat 1: 100% Artisanal */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 px-2 md:px-6 py-4 md:py-2 first:pt-0 last:pb-0 md:first:pt-2 md:last:pb-2 text-center sm:text-left">
            <div className="w-12 h-12 bg-rose/10 border border-rose/25 rounded-none flex items-center justify-center text-rose shrink-0 shadow-sm">
              <Heart className="w-5 h-5 fill-rose/5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                <span className="font-serif text-3xl font-bold text-rose leading-none">100%</span>
                <span className="text-[10px] font-mono tracking-widest text-[#554643] uppercase font-bold leading-none">
                  {language === 'en' ? 'Artisanal' : 'Artesanal'}
                </span>
              </div>
              <p className="text-xs text-stone-800 font-medium leading-normal">
                {t.signature}
              </p>
            </div>
          </div>

          {/* Stat 2: 70% Pure Chocolate */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 px-2 md:px-6 py-6 md:py-2 text-center sm:text-left">
            <div className="w-12 h-12 bg-rose/10 border border-rose/25 rounded-none flex items-center justify-center text-rose shrink-0 shadow-sm">
              <Leaf className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                <span className="font-serif text-3xl font-bold text-rose leading-none">70%</span>
                <span className="text-[10px] font-mono tracking-widest text-[#554643] uppercase font-bold leading-none">
                  {language === 'en' ? 'Pure Cacao' : 'Cacao Puro'}
                </span>
              </div>
              <p className="text-xs text-stone-800 font-medium leading-normal">
                {t.peruvianCacao}
              </p>
            </div>
          </div>

          {/* Stat 3: Recipes of Legacy */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-4 px-2 md:px-6 py-4 md:py-2 last:pb-0 text-center sm:text-left">
            <div className="w-12 h-12 bg-rose/10 border border-rose/25 rounded-none flex items-center justify-center text-rose shrink-0 shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline justify-center sm:justify-start gap-1.5">
                <span className="font-serif text-2xl font-bold text-stone-900 leading-none">Recipes</span>
                <span className="text-[10px] font-mono tracking-widest text-[#554643] uppercase font-bold leading-none">
                  {language === 'en' ? 'Heritage' : 'Herencia'}
                </span>
              </div>
              <p className="text-xs text-stone-800 font-medium leading-normal">
                {t.sweetTradition}
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
