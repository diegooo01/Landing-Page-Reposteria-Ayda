import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, DessertItem } from '../types';
import { dessertMenu } from '../translations';
import { recipesDetailedInfo } from './GallerySection';
import { getRecommendation, CatalogItem, Recommendation } from '../utils/ai';
import { Sparkles, X, Send, Bot, ChefHat, ShoppingBag, Terminal } from 'lucide-react';

interface DessertSommelierProps {
  language: Language;
  onModalToggle: (isOpen: boolean) => void;
  onSelectDessert: (name: string) => void;
}

interface ChatMessage {
  sender: 'user' | 'sommelier';
  text: string;
  recommendations?: (DessertItem & { reason: string })[];
}

export default function DessertSommelier({ language, onModalToggle, onSelectDessert }: DessertSommelierProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const isEs = language === 'es';

  // Translate labels
  const uiTexts = {
    btnLabel: isEs ? 'Pregúntale al Repostero' : 'Ask the Sommelier',
    welcomeTitle: isEs ? 'El Sommelier de Postres' : 'The Dessert Sommelier',
    welcomeSubtitle: isEs 
      ? 'Dime tu antojo, ocasión especial, presupuesto o maridaje y te recomendaré la dulzura perfecta.' 
      : 'Tell me your mood, craving, special occasion, or pairings, and I will recommend the perfect Peruvian dessert.',
    placeholder: isEs ? 'Ej. Algo de chocolate que no sea muy empalagoso...' : 'E.g. Something with chocolate, not too sweet...',
    sendBtn: isEs ? 'Enviar' : 'Send',
    quickStartTitle: isEs ? 'Sugerencias de Búsqueda' : 'Quick Suggestions',
    loadingText: isEs ? 'Armonizando ingredientes limeños...' : 'Pairing Lima flavors...',
    orderingSuccess: isEs ? '¡Excelente elección! Redirigiendo al formulario...' : 'Excellent choice! Opening order inquiry...',
    errorMsg: isEs 
      ? 'Disculpa, nuestros fogones están abrumados de dulzura. Por favor intenta de nuevo.' 
      : 'Apologies, our kitchen is experiencing high custom demand. Please try again.',
    orderNow: isEs ? 'Ordenar Postre' : 'Order This Sweet',
    viewDetails: isEs ? 'Ver Detalles' : 'View Details',
    closeBtn: isEs ? 'Cerrar' : 'Close',
  };

  const quickChips = isEs ? [
    'Algo no muy dulce',
    'Un regalo elegante para compartir',
    'Para acompañar con café cargado',
    'Un postre limeño cremoso de cuchara',
  ] : [
    'Something not too sweet',
    'An elegant gift box to share',
    'To pair with strong coffee',
    'A spoonable creamy Lima custard',
  ];

  // Map our existing dessert data into rich inputs for the AI model
  const buildAICatalog = (): CatalogItem[] => {
    return dessertMenu.map(item => {
      const detail = recipesDetailedInfo[item.id] || {
        ingredients: { en: [], es: [] },
        history: { en: '', es: '' },
        pairing: { en: '', es: '' }
      };
      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
        ingredients: language === 'en' ? detail.ingredients.en : detail.ingredients.es,
        history: language === 'en' ? detail.history.en : detail.history.es,
        pairing: language === 'en' ? detail.pairing.en : detail.pairing.es
      };
    });
  };

  // Ensure scroll lock and hide navigation when modal opens
  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      onModalToggle(true);

      // Add a greeting message if chat starts empty
      if (messages.length === 0) {
        setMessages([
          {
            sender: 'sommelier',
            text: isEs 
              ? '¡Hola! Soy tu repostero y sommelier personal de Ayda. Cuéntame, ¿qué antojo, momento o paladar deseas complacer hoy?' 
              : 'Greetings! I am your personal Ayda Dessert Sommelier. Tell me, what mood, occasion, or custom flavors are we satisfying today?'
          }
        ]);
      }

      return () => {
        document.body.style.overflow = originalStyle;
        onModalToggle(false);
      };
    }
  }, [isOpen, onModalToggle, isEs]);

  // Scroll to chat bottom whenever messages update
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleOpenSommelier = () => {
    setIsOpen(true);
  };

  const handleCloseSommelier = () => {
    setIsOpen(false);
  };

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg = textToSend.trim();
    setInputValue('');
    
    // Append user message
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const catalog = buildAICatalog();
      const aiResponse: Recommendation[] = await getRecommendation(userMsg, language, catalog);

      // Map recommendations back to actual DessertItem structures
      const matchedItems: (DessertItem & { reason: string })[] = [];
      
      aiResponse.forEach(rec => {
        const item = dessertMenu.find(d => d.id === rec.id);
        if (item) {
          matchedItems.push({
            ...item,
            reason: rec.reason
          });
        }
      });

      let responseText = '';
      if (matchedItems.length > 0) {
        responseText = isEs 
          ? `He seleccionado estas exclusivas creaciones tradicionales que se adaptan perfectamente a tu pedido:` 
          : `I have curated these exquisite traditional dessert creations matching your description beautifully:`;
      } else {
        responseText = isEs 
          ? `No he podido ubicar un postre que calce exactamente con esos términos de maridaje, pero te sugiero deleitarte con nuestro clásico favorito:` 
          : `I couldn't find a perfect exact match for those specific pairing terms, but I highly suggest experiencing our best-loved classic:`;
        
        // Add a default fallback recipe match
        const fallback = dessertMenu.find(d => d.id === 'chocotejas');
        if (fallback) {
          matchedItems.push({
            ...fallback,
            reason: isEs 
              ? 'Nuestras famosas chocotejas de cacao al 70%, pecana entera y manjarblanco de olla artesanal.' 
              : 'Our signature handcrafted chocotejas featuring 70% pure Peruvian cacao, toasted whole pecan, and gold slow-cooked milk caramel.'
          });
        }
      }

      setMessages(prev => [...prev, {
        sender: 'sommelier',
        text: responseText,
        recommendations: matchedItems
      }]);

    } catch (err) {
      console.error('Failed to query Sommelier recommendation:', err);
      setMessages(prev => [...prev, {
        sender: 'sommelier',
        text: uiTexts.errorMsg
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRecommendedDessert = (itemName: string) => {
    // Select dessert, prefill contact and scroll
    onSelectDessert(itemName);
    setIsOpen(false);
  };

  return (
    <>
      {/* Elegantly styled Floating Prompt Button in Bottom Left */}
      <motion.button
        id="ask-sommelier-trigger"
        onClick={handleOpenSommelier}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 bg-rose text-white rounded-full px-6 py-4 flex items-center gap-2.5 shadow-[0_10px_30px_rgba(210,93,126,0.3)] hover:bg-stone-950 transition-colors duration-300 font-serif tracking-wide text-xs md:text-sm border border-white/10 cursor-pointer"
      >
        <ChefHat className="w-4 h-4 md:w-5 h-5 animate-pulse text-[#FAF4EC]" />
        <span>{uiTexts.btnLabel}</span>
      </motion.button>

      {/* Sommelier Modal Panel overlay */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-md">
            
            {/* Modal outer glass frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full sm:max-w-2xl h-full sm:h-[82vh] bg-[#FAF4EC] sm:border border-[#DECFCD] sm:shadow-2xl flex flex-col overflow-hidden relative"
            >
              
              {/* Ornate Header decoration line */}
              <div className="h-1.5 w-full bg-gradient-to-r from-rose/30 via-rose to-rose/30" />

              {/* Close and Modal Info Bar */}
              <div className="flex items-center justify-between border-b border-[#E1D4C3] px-6 py-4 bg-white/70">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-rose/10 rounded-full border border-rose/15 text-rose">
                    <ChefHat className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                      {uiTexts.welcomeTitle}
                    </h3>
                    <p className="text-[10px] text-rose font-mono uppercase tracking-widest font-semibold">
                      {isEs ? 'Asesor Repostero AI' : 'AI Confectionery Advisor'}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleCloseSommelier}
                  className="p-2 rounded-full hover:bg-rose/10 text-stone-600 hover:text-rose border border-stone-200 hover:border-rose/20 transition-all duration-300 shadow-sm cursor-pointer"
                  aria-label={uiTexts.closeBtn}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Chat Log Viewport */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 scrollbar-thin scrollbar-thumb-stone-200">
                
                {/* Welcome Vibe Banner */}
                <div className="p-5 bg-white/60 border border-[#FAF4EC]/20 rounded-none shadow-sm space-y-2 text-center max-w-lg mx-auto">
                  <Sparkles className="w-5 h-5 text-rose mx-auto animate-spin-slow" />
                  <h4 className="font-serif italic text-base text-stone-900 font-semibold">
                    {isEs ? '¿Cómo complacer tu paladar hoy?' : 'How may we sweeten your day?'}
                  </h4>
                  <p className="text-xs text-stone-704 leading-relaxed font-light">
                    {uiTexts.welcomeSubtitle}
                  </p>
                </div>

                {/* Messages Stream */}
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className="flex items-start gap-3 max-w-[85%]">
                      {msg.sender === 'sommelier' && (
                        <div className="p-1.5 bg-white border border-[#E1D4C3] text-rose shadow-sm rounded-full shrink-0">
                          <Bot className="w-3.5 h-3.5" />
                        </div>
                      )}
                      
                      <div className="space-y-4">
                        {/* Text bubble bubble */}
                        <div
                          className={`text-sm py-3 px-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] leading-relaxed font-light ${
                            msg.sender === 'user'
                              ? 'bg-rose text-white rounded-none border border-rose/10'
                              : 'bg-white text-stone-850 rounded-none border border-[#E1D4C3]'
                          }`}
                        >
                          <p>{msg.text}</p>
                        </div>

                        {/* If recommendations present, render inline mini-cards */}
                        {msg.recommendations && msg.recommendations.length > 0 && (
                          <div className="grid grid-cols-1 gap-4 pt-1">
                            {msg.recommendations.map((item) => (
                              <motion.div
                                key={item.id}
                                whileHover={{ y: -2 }}
                                className="bg-white border border-[#E1D4C3] flex flex-col md:flex-row overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                              >
                                {/* Thumbnail thumb */}
                                <div className="w-full md:w-[35%] h-32 md:h-full relative overflow-hidden shrink-0 bg-[#FAF4EC]">
                                  <img
                                    src={item.image}
                                    alt={isEs ? item.name.es : item.name.en}
                                    className="w-full h-full object-cover"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="absolute top-2 left-2 bg-rose text-white font-mono text-[9px] px-1.5 py-0.5 tracking-wider uppercase font-semibold">
                                    {item.price.split(' ')[0]}
                                  </div>
                                </div>

                                {/* Content description details */}
                                <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                                  <div className="space-y-1">
                                    <div className="flex items-center justify-between">
                                      <h5 className="font-serif text-sm font-bold text-stone-900 leading-tight">
                                        {isEs ? item.name.es : item.name.en}
                                      </h5>
                                      <span className="text-[10px] text-stone-500 font-mono tracking-wider font-semibold">
                                        ★ {item.rating}
                                      </span>
                                    </div>
                                    <p className="text-xs text-stone-704 font-light italic leading-relaxed">
                                      {isEs ? item.description.es : item.description.en}
                                    </p>
                                  </div>

                                  {/* AI Reason of Match custom label with premium background */}
                                  <div className="p-2.5 bg-[#FAF4EC]/70 border-l-2 border-rose/40 text-stone-704 italic tracking-wide text-[11.5px] leading-relaxed">
                                    <span className="font-bold text-rose uppercase tracking-widest text-[9px] font-mono block not-italic leading-none mb-1">
                                      {isEs ? 'Recomendación Sommelier' : 'Sommelier Pairing Match'}
                                    </span>
                                    "{item.reason}"
                                  </div>

                                  {/* Direct Contact Order CTA */}
                                  <button
                                    onClick={() => handleSelectRecommendedDessert(isEs ? item.name.es : item.name.en)}
                                    className="w-full py-2 bg-rose/10 hover:bg-rose border border-rose/30 hover:border-rose text-rose hover:text-white transition-all duration-300 font-serif font-bold text-xs uppercase tracking-widest cursor-pointer mt-1"
                                  >
                                    {uiTexts.orderNow}
                                  </button>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Animated Typing Loading Dots indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start items-center gap-3"
                  >
                    <div className="p-1.5 bg-white border border-[#E1D4C3] text-rose shadow-sm rounded-full shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-white border border-[#E1D4C3] py-3.5 px-4 rounded-none shadow-sm flex items-center gap-3">
                      <span className="text-xs text-stone-600 font-mono tracking-wider font-semibold">
                        {uiTexts.loadingText}
                      </span>
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-rose rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-rose rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-rose rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={chatEndRef} />
              </div>

              {/* Prompt Suggestions/Chips Section */}
              <div className="px-6 py-2 border-t border-[#E1D4C3]/40 bg-white/40">
                <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest block mb-2 font-bold select-none text-center sm:text-left">
                  {uiTexts.quickStartTitle}
                </span>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start pb-1">
                  {quickChips.map((chip, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendMessage(chip)}
                      disabled={loading}
                      className="text-[11px] px-3 py-1.5 bg-white border border-[#DECFCD] hover:border-rose/40 hover:bg-rose/5 text-stone-850 hover:text-rose cursor-pointer transition-all duration-300 rounded-none disabled:opacity-50 shadow-sm"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Interactive text block */}
              <div className="p-4 border-t border-[#E1D4C3] bg-white sticky bottom-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={uiTexts.placeholder}
                    disabled={loading}
                    className="flex-1 bg-stone-100/70 border border-stone-200 focus:border-rose focus:bg-white text-stone-900 border-solid py-3 px-4 outline-none text-sm placeholder:stone-500 transition-all rounded-none"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || loading}
                    className="bg-rose hover:bg-stone-950 disabled:bg-stone-300 text-white font-serif uppercase text-xs tracking-widest font-bold px-6 shrink-0 transition-colors duration-300 flex items-center gap-1.5 select-none disabled:cursor-not-allowed cursor-pointer"
                  >
                    <span>{uiTexts.sendBtn}</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
