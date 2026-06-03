import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language } from '../types';
import { translations } from '../translations';
import { Phone, Clock, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  language: Language;
  prefilledMessage?: string;
}

export default function ContactSection({ language, prefilledMessage = '' }: ContactSectionProps) {
  const t = translations[language].contact;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: prefilledMessage || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Safely sync prefilled message when it changes
  useEffect(() => {
    if (prefilledMessage) {
      setFormData((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [prefilledMessage]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate premium delivery
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-28 bg-[#EEE5DA] border-t border-[#DCD1BF]/60 relative overflow-hidden">
      {/* Decorative subtle rose light leak */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-rose/[0.015] rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-left">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Column 1: Info and coordinates */}
          <div className="lg:col-span-5 space-y-10 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-rose/10 border border-rose/25 text-[10px] text-rose font-mono tracking-widest uppercase font-bold">
                {language === 'en' ? 'RESERVATIONS & ORDERS' : 'PEDIDOS & RESERVAS'}
              </div>
              
              <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-955 leading-tight">
                {t.title}
              </h2>
              
              <p className="text-stone-850 text-base md:text-lg font-normal leading-relaxed">
                {t.subtitle}
              </p>
            </div>

            {/* Direct contact items coordinates list */}
            <div className="space-y-6 py-8 border-y border-[#DCD1BF]">
              {/* Phone item */}
              <div className="flex items-start gap-4 group">
                <div className="bg-[#FCFAF8] border border-[#DFD6C8] p-3 rounded-none text-rose group-hover:border-rose/30 transition-all duration-300">
                  <Phone className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-stone-800 text-xs uppercase tracking-wider mb-1">{t.phone}</h4>
                  <a href="tel:+51988754321" className="text-stone-950 font-mono text-base font-semibold hover:text-rose transition-colors duration-200">
                    +51 988-754-321
                  </a>
                  <span className="block text-xs text-stone-700 font-normal mt-0.5">{language === 'en' ? 'Available for WhatsApp & Catering booking' : 'Disponible para WhatsApp y eventos'}</span>
                </div>
              </div>

              {/* Opening Hours item */}
              <div className="flex items-start gap-4">
                <div className="bg-[#FCFAF8] border border-[#DFD6C8] p-3 rounded-none text-rose">
                  <Clock className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-stone-800 text-xs uppercase tracking-wider mb-1">{t.hours}</h4>
                  <p className="text-stone-900 text-sm leading-relaxed font-normal">{t.hoursValue}</p>
                </div>
              </div>

              {/* Kitchen Address/Studio item */}
              <div className="flex items-start gap-4">
                <div className="bg-[#FCFAF8] border border-[#DFD6C8] p-3 rounded-none text-rose">
                  <MapPin className="w-5 h-5 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-stone-800 text-xs uppercase tracking-wider mb-1">{t.address}</h4>
                  <p className="text-stone-900 text-sm leading-relaxed font-normal">{t.addressValue}</p>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <a 
              href="https://wa.me/51988754321" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-2.5 px-6 py-4 border border-emerald-500/30 bg-emerald-50/70 hover:bg-emerald-50 text-emerald-800 font-mono text-xs uppercase tracking-widest duration-300 rounded-none cursor-pointer font-bold shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              {language === 'en' ? 'Direct WhatsApp Chat' : 'Chat por WhatsApp Directo'}
            </a>

            {/* Social Coordinates */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-stone-705 uppercase tracking-widest font-mono font-bold">Follow:</span>
              <a href="#" className="text-stone-800 hover:text-rose text-[10px] uppercase tracking-wider font-mono border border-[#DFD6C8] px-3 py-1.5 bg-[#FCFAF8] transition-all duration-200 shadow-sm font-semibold">
                Instagram
              </a>
              <a href="#" className="text-stone-800 hover:text-rose text-[10px] uppercase tracking-wider font-mono border border-[#DFD6C8] px-3 py-1.5 bg-[#FCFAF8] transition-all duration-200 shadow-sm font-semibold">
                Facebook
              </a>
            </div>
          </div>

          {/* Column 2: Form element cards */}
          <div className="lg:col-span-7">
            <div className="bg-[#FCFAF8] border border-[#DECFCD] rounded-none p-8 sm:p-10 shadow-md relative overflow-hidden text-left">
              {/* Premium top accent rose line */}
              <div className="absolute inset-x-0 top-0 h-[3px] bg-rose" />
              
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    className="py-16 text-center space-y-6 flex flex-col items-center justify-center"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 rounded-none bg-rose/10 flex items-center justify-center text-rose border border-rose/20">
                      <CheckCircle2 className="w-10 h-10 stroke-[1.5]" />
                    </div>
                    
                    <div className="space-y-2 max-w-sm mx-auto">
                      <h3 className="font-serif text-2xl font-semibold text-stone-950">
                        {language === 'en' ? 'Inquiry Received' : 'Consulta Recibida'}
                      </h3>
                      <p className="text-stone-850 text-sm leading-relaxed font-normal">
                        {t.success}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSuccess(false)}
                      className="mt-4 px-6 py-3 rounded-none border border-stone-300 hover:border-rose/55 text-xs font-bold text-stone-800 hover:text-rose tracking-widest uppercase transition-colors duration-200 cursor-pointer"
                    >
                      {language === 'en' ? 'Send another inquiry' : 'Enviar otra consulta'}
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest font-mono font-bold text-stone-750">{t.name}</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-white border border-stone-300/85 focus:border-rose px-4 py-3 text-stone-950 placeholder-stone-500 text-sm font-normal transition-all duration-200 outline-none rounded-none shadow-sm"
                        placeholder="e.g. Sebastián de la Fuente"
                      />
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest font-mono font-bold text-stone-755">{t.email}</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-white border border-stone-300/85 focus:border-rose px-4 py-3 text-stone-950 placeholder-stone-500 text-sm font-normal transition-all duration-200 outline-none rounded-none shadow-sm"
                        placeholder="e.g. sebastian@correo.com"
                      />
                    </div>

                    {/* Message / Inquiry text area */}
                    <div className="space-y-2">
                      <label className="block text-[10px] uppercase tracking-widest font-mono font-bold text-stone-755">{t.message}</label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full bg-white border border-stone-300/85 focus:border-rose px-4 py-3 text-stone-950 placeholder-stone-500 text-sm font-normal transition-all duration-200 outline-none rounded-none resize-none shadow-sm"
                        placeholder={language === 'en' ? "Tell us about your event, quantity needs, or request specialized Chocotejas..." : "Cuéntanos sobre tu evento, la cantidad que necesitas o solicita chocotejas preparadas a tu gusto..."}
                      />
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-rose disabled:opacity-50 text-white font-bold tracking-widest text-xs uppercase py-4 rounded-none cursor-pointer hover:bg-stone-950 hover:text-white transition-all duration-350 flex items-center justify-center gap-2 shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>{t.sending}</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>{t.send}</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
