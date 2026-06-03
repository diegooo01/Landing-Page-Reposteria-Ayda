import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, DessertItem } from '../types';
import { dessertMenu, translations } from '../translations';
import { Star, X, Check, ShoppingBag, Info } from 'lucide-react';

interface GallerySectionProps {
  language: Language;
  onSelectDessert?: (dessertName: string) => void;
  onModalToggle?: (isOpen: boolean) => void;
}

export interface RecipeDetail {
  ingredients: {
    en: string[];
    es: string[];
  };
  history: {
    en: string;
    es: string;
  };
  pairing: {
    en: string;
    es: string;
  };
}

export const recipesDetailedInfo: Record<string, RecipeDetail> = {
  chocotejas: {
    ingredients: {
      en: ['Pure Peruvian Dark Chocolate (70% Cacao)', 'Handmade Caramel Manjarblanco', 'Toasted Pecans harvested in Ica, Peru', 'Touch of Sea Salt'],
      es: ['Chocolate oscuro peruano (70% Cacao)', 'Manjarblanco artesanal hecho en olla', 'Pecana entera seleccionada de Ica', 'Pizca de sal marina']
    },
    history: {
      en: 'Chocotejas originated in the desert region of Ica, Peru, as a regional wrapper sweet. The name stems from standard roof tiles ("tejas"), as the chocolate shapes resembled standard clay tiles.',
      es: 'La Chocoteja nació en la soleada región de Ica, Perú, inspirada en las tejas de arcilla. La envoltura blanca tradicional rinde honores a la antigua arquitectura campestre.'
    },
    pairing: {
      en: 'Excellent when paired with a glass of aromatic Quebranta Pisco or sweet late-harvest red wine.',
      es: 'Crea un maridaje excelente con un Pisco Aromático de uva Quebranta o un vino tinto dulce de cosecha tardía.'
    }
  },
  alfajores: {
    ingredients: {
      en: ['Fine Cornstarch and Flour Blend', 'Slow-cooked Condensed Milk Manjarblanco', 'Real Cream Butter', 'Pure Vanilla Pod Extract', 'Powdered Snow Sugar'],
      es: ['Almidón de maíz selecto y harina de trigo', 'Manjarblanco de olla tradicional', 'Mantequilla pura de crema', 'Esencia fina de vainilla', 'Azúcar finísima impalpable']
    },
    history: {
      en: 'Brought to Peru during colonial times from Andalusian heritage, Peruvian artisans perfected the recipe by substituting local starches to achieve an ultra-tender crumb that absolutely melts away.',
      es: 'Traído al Perú desde Andalucía en tiempos coloniales, los artesanos locales sustituyeron harinas de trigo por fécula de maíz fina, logrando una textura frágil única que se deshace.'
    },
    pairing: {
      en: 'Superb with hot herbal infusions, chamomile tea, or a delicate light-roast Peruvian coffee.',
      es: 'Superlativo acompañado con infusiones de manzanilla silvestre, té de jazmín o un café peruano de tueste medio.'
    }
  },
  suspiro: {
    ingredients: {
      en: ['Evaporated and Sweet Condensed Milk', 'Cage-free Egg Yolks', 'Peruvian Port Wine', 'Cinnamon Bark and Ground Cinnamon dusting'],
      es: ['Leche evaporada y condensada premium', 'Yemas de huevo fresco de corral', 'Vino Oporto peruano', 'Ramas de canela entera y canela fina molida']
    },
    history: {
      en: 'Created in 19th-century Lima by Amparo Ayarza, wife of the renowned poet José Gálvez. Upon tasting its light, velvety smoothness, he declared it sweet and sighs-inducing, "like the sigh of a Lima lady" (Suspiro a la Limeña).',
      es: 'Creado en la Lima del siglo XIX por Amparo Ayarza de Gálvez. Su esposo, el poeta José Gálvez, al probar su textura sedosa, exclamó que el postre era suave y dulce "como el suspiro de una limeña".'
    },
    pairing: {
      en: 'Outstanding with a cold glass of clean water or a highly acidic dry Torontel wine to balance the sweetness.',
      es: 'Extraordinario con un vaso de agua helada pura o un vino blanco seco de uva Torontel para equilibrar la dulzura.'
    }
  },
  crema_volteada: {
    ingredients: {
      en: ['Pure Sweetened Leche Condensada', 'Whole Fresh Eggs', 'Granulated Cane Sugar syrup caramel', 'Lemony fresh zest'],
      es: ['Leche condensada entera', 'Huevos frescos seleccionados', 'Azúcar rubia de caña premium', 'Ralladura sutil de limón sutil']
    },
    history: {
      en: 'A cornerstone of coastal criollo bakeries, this dense and highly satisfying milk flan evolved from traditional European flan, using local sugar cane syrups to yield its legendary amber color and sheen.',
      es: 'Un pilar de la repostería criolla limeña, este denso manjar evolucionó del flan tradicional español, adoptando almíbar de caramelo denso con caña azúcar local.'
    },
    pairing: {
      en: 'Pairs beautifully with cold cold-brew espresso or dry sparkling white wines.',
      es: 'Armoniza a la perfección con un café espresso helado o un vino espumante brut blanco.'
    }
  },
  mazamorra_arroz: {
    ingredients: {
      en: ['Andean Purple Corn Extract (Maíz Morado)', 'Sweet Potato Starch', 'Dried plums, raisins, apricots', 'Short-grain Rice cooked in milk', 'Cloves and Sweet Spices'],
      es: ['Extracto concentrado de maíz morado andino', 'Harina fina de camote', 'Frutas secas (guindones y damascos)', 'Arroz de grano corto selecto cociéndose en leche', 'Clavo de olor y canela de olor']
    },
    history: {
      en: 'This unique combination matches two historic recipes. Mazamorra Morada traces back to pre-Hispanic purple corn chicha, while Arroz con Leche came from Moorish traditions, combined forever in Lima stadiums and parks as "El Clásico".',
      es: 'La dupleta histórica de Lima. El arroz con leche de herencia árabe y la mazamorra de raíz prehispánica de maíz morado se unieron para siempre en plazas, llamadas "El Clásico" o "Sol y Sombra".'
    },
    pairing: {
      en: 'Perfect with traditional cold purple Chicha Morada or dry pisco-tonic.',
      es: 'Perfecto si se degusta junto a un vaso de chicha morada helada o un pisco-tonic seco.'
    }
  },
  guargueros: {
    ingredients: {
      en: ['Fine Egg Yolk Fried Pasta', 'Artisanal Dulce de Leche Manjarblanco filling', 'Pisco Quebranta drops inside dough', 'Powdered sugar dusting'],
      es: ['Delicada masa frita de yemas de huevo', 'Relleno de manjar blanco de olla casera', 'Gotas de pisco Quebranta aromático en la masa', 'Azúcar impalpable nevada']
    },
    history: {
      en: 'Traditional in southern Peru (Tacna, Moquegua, Arequipa). These funnel pastries use delicate egg yolk dough infused with Pisco to bubble up and fry incredibly crisp.',
      es: 'Originarios del sur peruano (regiones de Tacna y Moquegua). Estos cartuchos crujientes de yema llevan gotas de Pisco para formar burbujas doradas al freír.'
    },
    pairing: {
      en: 'Matches gracefully with sweet mistela or a glass of dry Moscatel pisco.',
      es: 'Combina de manera ideal con una mistela de uva italia o un pisco seco variedad Moscatel.'
    }
  }
};

export default function GallerySection({ language, onSelectDessert, onModalToggle }: GallerySectionProps) {
  const gt = translations[language].gallery;
  const [selectedDessert, setSelectedDessert] = useState<DessertItem | null>(null);
  const [orderedItems, setOrderedItems] = useState<Record<string, boolean>>({});

  // Prevent background scrolling and hide navbar/scroll-to-top when modal is active
  useEffect(() => {
    if (selectedDessert) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      onModalToggle?.(true);
      return () => {
        document.body.style.overflow = originalStyle;
        onModalToggle?.(false);
      };
    }
  }, [selectedDessert, onModalToggle]);

  const handleOrder = (id: string, name: string) => {
    setOrderedItems((prev) => ({ ...prev, [id]: true }));
    if (onSelectDessert) {
      onSelectDessert(name);
    }
    setTimeout(() => {
      setOrderedItems((prev) => ({ ...prev, [id]: false }));
    }, 3000);
  };

  const getRecipeInfo = (id: string): RecipeDetail => {
    return recipesDetailedInfo[id] || {
      ingredients: { en: [], es: [] },
      history: { en: '', es: '' },
      pairing: { en: '', es: '' }
    };
  };

  return (
    <section id="gallery" className="py-28 bg-[#FAF4EC] border-t border-[#DCD1BF]/60 relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-rose/10 border border-rose/25 text-[10px] text-rose font-mono tracking-widest uppercase font-bold">
            {language === 'en' ? 'OUR SPECIALTIES' : 'NUESTRAS ESPECIALIDADES'}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light tracking-tight text-stone-950">
            {gt.title}
          </h2>
          <p className="text-stone-850 text-base md:text-lg font-normal leading-relaxed">
            {gt.subtitle}
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
          {dessertMenu.map((dessert) => (
            <motion.div
              key={dessert.id}
              className="bg-[#FCFAF8] rounded-none overflow-hidden border border-[#DFD6C8] group flex flex-col justify-between shadow-sm hover:shadow-md"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
                {/* Dessert Image */}
                <img
                  src={dessert.image}
                  alt={dessert.name[language]}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Transparent overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-stone-900/10 to-transparent" />

                {/* Rating badge */}
                <div className="absolute top-4 right-4 bg-white/95 px-3 py-1 rounded-none border border-stone-200 flex items-center gap-1.5 shadow-sm">
                  <Star className="w-3.5 h-3.5 fill-rose stroke-rose" />
                  <span className="text-xs font-mono font-bold text-rose">{dessert.rating.toFixed(1)}</span>
                </div>
              </div>

              {/* Card Body Info */}
              <div className="p-6 space-y-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-serif text-xl font-semibold text-stone-950 group-hover:text-rose transition-colors duration-300">
                      {dessert.name[language]}
                    </h3>
                    <span className="text-rose font-mono font-semibold text-xs whitespace-nowrap bg-rose/10 px-2.5 py-0.5 rounded-none border border-rose/25">
                      {dessert.price}
                    </span>
                  </div>

                  <p className="text-stone-850 text-sm leading-relaxed line-clamp-3 font-normal mb-4 text-left">
                    {dessert.description[language]}
                  </p>
                </div>

                <div className="space-y-3 pt-4 border-t border-[#DFD6C8]">
                  {/* Action 1: See recipe details trigger */}
                  <button
                    onClick={() => setSelectedDessert(dessert)}
                    className="w-full py-3 px-4 text-xs font-bold text-stone-800 hover:text-rose bg-white/80 border border-stone-300 hover:border-rose/55 rounded-none transition-all duration-200 flex items-center justify-center gap-2 tracking-widest uppercase cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-rose" />
                    {gt.viewDetails}
                  </button>

                  {/* Action 2: Order Box / Call Custom Action */}
                  <button
                    onClick={() => handleOrder(dessert.id, dessert.name[language])}
                    className={`w-full py-3 px-4 text-xs font-bold rounded-none tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      orderedItems[dessert.id]
                        ? 'bg-emerald-600 text-white border border-emerald-500'
                        : 'bg-rose text-white hover:bg-stone-950 hover:text-white hover:shadow-md'
                    }`}
                  >
                    {orderedItems[dessert.id] ? (
                      <>
                        <Check className="w-4 h-4 animate-bounce" />
                        {gt.added}
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4" />
                        {gt.addToCart}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Recipe Details Overlay */}
        <AnimatePresence>
          {selectedDessert && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-900/80 backdrop-blur-md p-3 xs:p-4 sm:p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {/* Box container */}
              <motion.div
                className="bg-[#FAF4EC] w-[90vw] max-w-[600px] h-fit max-h-[90dvh] rounded-none border border-[#DCD1BF] overflow-hidden shadow-2xl relative flex flex-col z-10"
                initial={{ scale: 0.95, opacity: 0, y: 15 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 15 }}
                transition={{ duration: 0.25, delay: 0.08, ease: 'easeOut' }}
              >
                {/* Visual Top Header Image (pinned & non-growing to prevent eating up space) */}
                <div className="relative h-[18vh] xs:h-[22vh] sm:h-44 md:h-52 max-h-[220px] bg-[#EEE5DA] shrink-0">
                  <img
                    src={selectedDessert.image}
                    alt={selectedDessert.name[language]}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FAF4EC] via-[#FAF4EC]/10 to-transparent" />
                  
                  {/* Close floating button (always visible & anchored) */}
                  <button
                    onClick={() => setSelectedDessert(null)}
                    className="absolute top-2.5 right-2.5 sm:top-4 sm:right-4 bg-[#FAF4EC] hover:bg-rose hover:text-white border border-stone-300 p-1.5 sm:p-2 rounded-none text-stone-805 transition-colors duration-200 cursor-pointer shadow-sm z-10"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Content Core Body (ONLY this part scrolls) */}
                <div className="p-3.5 xs:p-5 sm:p-6 md:p-8 space-y-3.5 xs:space-y-4 sm:space-y-6 overflow-y-auto overscroll-contain text-left flex-1 min-h-0">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl xs:text-2xl sm:text-3xl font-semibold text-stone-950 leading-tight">
                      {selectedDessert.name[language]}
                    </h3>
                    <p className="font-mono text-xs text-rose font-semibold tracking-wider">
                      {selectedDessert.price}
                    </p>
                  </div>

                  {/* Description Box */}
                  <div className="space-y-2">
                    <h4 className="font-serif text-xs xs:text-sm sm:text-base font-medium text-rose border-b border-stone-300/60 pb-1">
                      {language === 'en' ? 'Historical Story' : 'Relato Histórico'}
                    </h4>
                    <p className="text-stone-900 text-xs sm:text-sm leading-relaxed font-normal">
                      {getRecipeInfo(selectedDessert.id).history[language]}
                    </p>
                  </div>

                  {/* Ingredients Check List Grid */}
                  <div className="space-y-2">
                    <h4 className="font-serif text-xs xs:text-sm sm:text-base font-medium text-rose border-b border-stone-300/60 pb-1">
                      {language === 'en' ? 'Core Master Ingredients' : 'Ingredientes Clave de Receta'}
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-stone-850 text-xs sm:text-sm font-normal">
                      {getRecipeInfo(selectedDessert.id).ingredients[language].map((ing, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-rose shrink-0" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Sommelier / Sweet Pairing recommendation */}
                  <div className="bg-[#FCFAF8] p-2.5 xs:p-3 sm:p-4 border border-[#DCD1BF]/60 space-y-0.5 xs:space-y-1">
                    <h5 className="font-serif font-bold text-[8px] xs:text-[9px] sm:text-[10px] text-rose tracking-widest uppercase">
                      {language === 'en' ? 'DESSERT SOMMELIER RECOMMENDATION' : 'RECOMENDACIÓN DEL REPOSTERO'}
                    </h5>
                    <p className="text-[10px] xs:text-[11px] sm:text-xs text-stone-850 font-normal italic leading-snug">
                      {getRecipeInfo(selectedDessert.id).pairing[language]}
                    </p>
                  </div>
                </div>

                {/* Footer Modal button bar (pinned & always fully reachable) */}
                <div className="bg-[#FCFAF8] p-3 xs:p-4 sm:p-6 border-t border-[#DCD1BF]/60 flex justify-end gap-2.5 xs:gap-3 sm:gap-4 shrink-0">
                  <button
                    onClick={() => setSelectedDessert(null)}
                    className="py-1.5 px-3 xs:py-2 xs:px-4 sm:py-2.5 sm:px-6 rounded-none border border-stone-300 hover:border-rose/55 hover:text-rose font-bold text-[10px] xs:text-[11px] sm:text-xs text-stone-850 transition-colors duration-200 cursor-pointer uppercase tracking-widest font-mono select-none"
                  >
                    {gt.close}
                  </button>
                  <button
                    onClick={() => {
                      handleOrder(selectedDessert.id, selectedDessert.name[language]);
                      setSelectedDessert(null);
                    }}
                    className="bg-rose hover:bg-stone-950 text-white font-bold text-[10px] xs:text-[11px] sm:text-xs px-3 py-1.5 xs:px-4 xs:py-2 sm:px-6 sm:py-2.5 rounded-none transition-all duration-200 cursor-pointer uppercase tracking-widest select-none"
                  >
                    {gt.addToCart}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
