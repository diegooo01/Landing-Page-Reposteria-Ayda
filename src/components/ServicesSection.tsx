import { motion } from 'motion/react';
import { Language } from '../types';
import { servicesList, translations } from '../translations';
import { Cake, Gift, Sparkles, Truck, LucideIcon } from 'lucide-react';

interface ServicesSectionProps {
  language: Language;
}

const iconMap: Record<string, LucideIcon> = {
  Cake: Cake,
  Gift: Gift,
  Sparkles: Sparkles,
  Truck: Truck
};

export default function ServicesSection({ language }: ServicesSectionProps) {
  const t = translations[language].services;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section id="services" className="py-28 bg-[#EEE5DA] border-t border-[#DCD1BF]/60 relative overflow-hidden">
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-950">
            {t.title}
          </h2>
          <p className="text-stone-850 text-base md:text-lg font-normal leading-relaxed">
            {t.subtitle}
          </p>
          <div className="w-16 h-[1.5px] bg-rose mx-auto mt-6" />
        </div>

        {/* Services Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {servicesList.map((service) => {
            const IconComponent = iconMap[service.iconName] || Sparkles;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="bg-[#FCFAF8] hover:bg-white border border-[#DFD6C8] hover:border-rose/50 rounded-none p-8 transition-all duration-355 relative group flex flex-col justify-between shadow-sm hover:shadow-md"
              >
                {/* Decorative glow corner on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose/0 to-rose/[0.01] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="space-y-6">
                  {/* Icon Wrapper */}
                  <div className="w-12 h-12 rounded-none bg-white border border-[#DFD6C8] group-hover:border-rose/50 flex items-center justify-center text-stone-800 group-hover:text-rose transition-colors duration-300">
                    <IconComponent className="w-5 h-5 stroke-[1.5]" />
                  </div>

                  <h3 className="font-serif text-xl font-medium text-stone-950 tracking-wide">
                    {service.title[language]}
                  </h3>

                  <p className="text-stone-850 text-sm leading-relaxed font-normal">
                    {service.description[language]}
                  </p>
                </div>

                {/* Bottom line flourish */}
                <div className="w-full h-[1px] bg-[#DFD6C8] group-hover:bg-rose transition-all duration-355 mt-8" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
