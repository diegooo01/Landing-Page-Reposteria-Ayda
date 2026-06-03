import { TranslationSchema, DessertItem, ServiceItem } from './types';

export const translations: Record<'en' | 'es', TranslationSchema> = {
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT US',
      services: 'SERVICES',
      gallery: 'GALLERY',
      contact: 'CONTACT',
    },
    hero: {
      title: 'Ayda',
      subtitle: 'Pedacito de Cielo',
      cta: 'EXPLORE DELICACIES',
      scrollDown: 'SCROLL DOWN TO EXPLORE',
    },
    about: {
      title: 'Our Story',
      heading: 'A Legacy of Peruvian Sweetness',
      paragraph1: 'At "Ayda - Pedacito de Cielo", we bring the authentic soul of Peruvian patisserie directly to your table. Founded on centuries-old family recipes and a passion for craftsmanship, our journey started with a simple promise: to handcraft exquisite Peruvian desserts using only the finest ingredients, creating moments of pure heaven in every bite.',
      paragraph2: 'We specialize in Chocotejas, iconic chocolate bonbons from Ica made with rich, pure Peruvian cacao, golden manjarblanco (dulce de leche), and crisp local pecans. Every single postre we make — from the delicate, melt-in-your-mouth Alfajores to the velvety Suspiro a la Limeña — is a tribute to Peru’s deep, sweet heritage and vibrant culinary arts.',
      signature: 'Artisanal & Made with Love',
      heritage: '100% Peruvian Heritage',
      peruvianCacao: 'Premium Single-Origin Cacao',
      sweetTradition: 'Traditional Family Recipes',
    },
    services: {
      title: 'Artisanal Services',
      subtitle: 'Elevating every celebration with a touch of Lima’s golden era',
      items: {
        catering: {
          title: 'Special Catering',
          desc: 'Exquisite dessert tables customized for weddings, private banquets, corporate milestones, and family gatherings.',
        },
        gifts: {
          title: 'Custom Chocolate Boxes',
          desc: 'Elegant, premium gift boxes packed with hand-painted Chocotejas and Alfajores, perfect for clients or loved ones.',
        },
        workshops: {
          title: 'Chocoteja Workshops',
          desc: 'Interactive, private group classes uncovering the ancient art of tempering Peruvian cacao and molding Chocotejas.',
        },
        delivery: {
          title: 'Local Sweet Delivery',
          desc: 'Prompt and careful hand-delivery of fresh artisanal treats right to your home, office, or event space.',
        },
      },
    },
    gallery: {
      title: 'Our Sweet Masterpieces',
      subtitle: 'Taste the authentic texture and warmth of Peru’s legendary confections',
      viewDetails: 'SEE RECIPE DETAILS',
      close: 'Close',
      addToCart: 'Order Custom Box',
      added: 'Order Request Added!',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Let us sweeten your next occasion or answer your custom requests',
      name: 'Full Name',
      email: 'Email Address',
      message: 'Your Message (or catering inquiry)',
      send: 'Send Sweet Message',
      sending: 'Sending...',
      success: 'Thank you! Your sweet inquiry has been sent successfully. We will contact you soon.',
      phone: 'Phone & WhatsApp',
      hours: 'Opening Hours',
      hoursValue: 'Tue - Sun: 11:00 AM - 8:00 PM (Closed Mon)',
      address: 'Our Kitchen Studio',
      addressValue: 'Miraflores Culinary Quarter, Lima, Peru / Online Order Hub',
    }
  },
  es: {
    nav: {
      home: 'INICIO',
      about: 'NOSOTROS',
      services: 'SERVICIOS',
      gallery: 'GALERÍA',
      contact: 'CONTACTO',
    },
    hero: {
      title: 'Ayda',
      subtitle: 'Pedacito de Cielo',
      cta: 'EXPLORAR DELICIAS',
      scrollDown: 'DESLIZA PARA CONOCER MÁS',
    },
    about: {
      title: 'Nuestra Historia',
      heading: 'Un Legado de Dulzura Peruana',
      paragraph1: 'En "Ayda - Pedacito de Cielo", llevamos la auténtica alma de la repostería peruana directo a tu mesa. Fundados en recetas familiares centenarias y una pasión inquebrantable por el oficio, nuestro viaje comenzó con una promesa simple: elaborar postres peruanos exquisitos de forma totalmente artesanal, utilizando solo ingredientes premium.',
      paragraph2: 'Especializándonos en las tradicionales Chocotejas de Ica, hechas con cacao puro y selecto de origen peruano, manjarblanco dorado y pecanas crujientes. Cada postre que creamos — desde los delicados alfajores que se deshacen en la boca hasta el aterciopelado Suspiro a la Limeña — rinde homenaje a nuestro profundo patrimonio dulce.',
      signature: 'Hecho a Mano con Amor',
      heritage: 'Herencia 100% Peruana',
      peruvianCacao: 'Cacao Premium de Origen',
      sweetTradition: 'Recetas Familiares Tradicionales',
    },
    services: {
      title: 'Servicios Artesanales',
      subtitle: 'Elevando cada celebración con un toque especial de la dulzura limeña',
      items: {
        catering: {
          title: 'Catering Exclusivo',
          desc: 'Mesas de postres diseñadas a medida para bodas, banquetes privados, hitos corporativos y reuniones íntimas.',
        },
        gifts: {
          title: 'Cajas de Regalo Premium',
          desc: 'Elegantes estuches personalizados llenos de Chocotejas artesanales y Alfajores finos, el obsequio gourmet perfecto.',
        },
        workshops: {
          title: 'Talleres de Chocotejas',
          desc: 'Clases interactivas y privadas para dominar el templado del cacao peruano y el moldeado de chocotejas tradicionales.',
        },
        delivery: {
          title: 'Delivery Dulce Local',
          desc: 'Entregas cuidadosas y rápidas directamente a tu domicilio, oficina o lugar del evento para asegurar frescura total.',
        },
      },
    },
    gallery: {
      title: 'Nuestras Obras Maestras',
      subtitle: 'Siente la textura y calidez auténtica de los dulces tradicionales del Perú',
      viewDetails: 'VER DETALLES',
      close: 'Cerrar',
      addToCart: 'Pedir Caja de Regalo',
      added: '¡Solicitud Agregada!',
    },
    contact: {
      title: 'Contacto',
      subtitle: 'Permítenos endulzar tu próxima ocasión especial o absolver tus consultas',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      message: 'Tu Mensaje o Pedido Especial',
      send: 'Enviar Mensaje Dulce',
      sending: 'Enviando...',
      success: '¡Muchos éxitos! Tu consulta ha sido enviada con éxito. Nos pondremos en contacto muy pronto.',
      phone: 'Teléfono y WhatsApp',
      hours: 'Horario de Atención',
      hoursValue: 'Mar - Dom: 11:00 AM - 8:00 PM (Lunes Cerrado)',
      address: 'Nuestro Taller de Postres',
      addressValue: 'Barrio gastronómico de Miraflores, Lima, Perú / Pedidos Online',
    }
  }
};

export const dessertMenu: DessertItem[] = [
  {
    id: 'chocotejas',
    name: {
      en: 'Artisanal Chocotejas',
      es: 'Chocotejas Artesanales'
    },
    description: {
      en: 'A legendary Ica chocolate bonbon. Crisp toasted pecan nut nestled in silky smooth manjarblanco caramel, wrapped in a hand-painted shell of 70% pure Peruvian dark chocolate.',
      es: 'El legendario bombón iqueño. Pecana tostada entera con cremoso manjarblanco de olla, envuelto en una fina cobertura de chocolate oscuro peruano de cacao al 70%.'
    },
    price: '$18.00 / box of 6',
    image: 'https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-chocotejas_fs17eh.jpg',
    rating: 5
  },
  {
    id: 'alfajores',
    name: {
      en: 'Traditional Alfajores',
      es: 'Alfajores Tradicionales'
    },
    description: {
      en: 'Ultra-tender melt-in-your-mouth cornstarch shortbread sandwich cookies, filled to the brim with homemade manjarblanco and dusted generously with sweet snow sugar.',
      es: 'Riquísimos y delicados alfajores de maicena que se deshacen en el paladar, rellenos generosamente con manjarblanco casero y espolvoreados con azúcar impalpable.'
    },
    price: '$15.00 / pack of 12',
    image: 'https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-alfajores_rf9r3e.jpg',
    rating: 4.9
  },
  {
    id: 'suspiro',
    name: {
      en: 'Suspiro a la Limeña',
      es: 'Suspiro a la Limeña'
    },
    description: {
      en: 'The classic "Sigh of a Lima Lady". A slow-cooked base of evaporated and condensed milk caramel, crowned with cloud-like Swiss meringue flavored with vintage Port wine and ground cinnamon.',
      es: 'El clásico dulce limeño. Una delicada jalea de manjarblanco de yemas de huevo cocido calmadamente, coronado con un suspiro de merengue rústico al aroma de Oporto y canela.'
    },
    price: '$6.50 / cup',
    image: 'https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-suspiro_oaznkq.jpg',
    rating: 5
  },
  {
    id: 'crema_volteada',
    name: {
      en: 'Crema Volteada',
      es: 'Crema Volteada'
    },
    description: {
      en: 'Peru’s beloved silky baked custard flan. Made with condensed milk for an intensely smooth, dense texture, drenched in a river of warm, glistening amber caramel syrup.',
      es: 'Nuestra versión del clásico flan peruano. Elaborado con leche condensada para una textura sumamente tersa y cremosa, bañado con un delicioso almíbar de caramelo ámbar.'
    },
    price: '$5.50 / slice',
    image: 'https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-flan_excwvd.jpg',
    rating: 4.8
  },
  {
    id: 'mazamorra_arroz',
    name: {
      en: 'El "Clásico" Combination',
      es: 'El Combinado "Clásico"'
    },
    description: {
      en: 'The perfect Lima duet: dynamic half purple corn pudding cook-off with local fruits and sweet pineapple (Mazamorra Morada) paired with rich, velvety Peruvian rice pudding.',
      es: 'La imperdible dupleta limeña: mitad mazamorra morada a base de maíz morado con frutos secos, piña y clavo, y mitad arroz con leche criollo cremoso y perfumado.'
    },
    price: '$6.00 / bowl',
    image: 'https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-combinado_ntio8g.jpg',
    rating: 4.9
  },
  {
    id: 'guargueros',
    name: {
      en: 'Guargueros del Sur',
      es: 'Guargueros del Sur'
    },
    description: {
      en: 'Crisp, golden southern Peruvian pastry funnels made from egg yolk dough, fried to perfection, stuffed with luscious manjarblanco and lightly dusted with white sugar.',
      es: 'Fritos crujientes tradicionales del sur peruano, hechos de masa de yemas fina doblada en cartucho, rellenos de majestuoso manjarblanco de olla y azúcar impalpable.'
    },
    price: '$14.00 / plate of 8',
    image: 'https://res.cloudinary.com/dlgeuawdt/image/upload/v1780523320/image-dessert_vwkhzr.jpg',
    rating: 4.7
  }
];

export const servicesList: ServiceItem[] = [
  {
    id: 'catering',
    title: {
      en: 'Special Catering',
      es: 'Catering Exclusivo'
    },
    description: {
      en: 'Elegant tabletop arrangements with bespoke traditional Peruvian dessert choices for weddings, corporate event displays, and high-tea socials.',
      es: 'Armado elegante de mesas de postres criollos a medida para bodas, eventos empresariales corporativos y celebraciones familiares.'
    },
    iconName: 'Cake'
  },
  {
    id: 'gifts',
    title: {
      en: 'Sweet Gifts & Corporate Boxes',
      es: 'Regalos & Cajas Corporativas'
    },
    description: {
      en: 'Tailored premium wooden and cardboard boxes housing our handcrafted Chocotejas and Alfajores, adorned with satin ribbons and personalized notes.',
      es: 'Estuches de madera y cartón premium con acabados finos que albergan chocotejas y alfajores, adornados para regalos corporativos o de seres queridos.'
    },
    iconName: 'Gift'
  },
  {
    id: 'workshops',
    title: {
      en: 'The Chocoteja Ritual Classes',
      es: 'Taller del Ritual de la Chocoteja'
    },
    description: {
      en: 'A private physical or online chocolate workshop. Learn the secrets of cooking manjar blanco on a slow burner, tempering real Peruvian cacao, and molding perfect Chocotejas.',
      es: 'Aprende los secretos del manjar de olla, el templado de chocolate de cacao selecto peruano y el armado tradicional de las chocotejas en clases interactivas.'
    },
    iconName: 'Sparkles'
  },
  {
    id: 'delivery',
    title: {
      en: 'Careful Home Delivery',
      es: 'Despacho Dulce a Domicilio'
    },
    description: {
      en: 'Specially climate-regulated shipping container packages to maintain our delicate chocolates and smooth fillings in perfect luxurious condition right to your doorstep.',
      es: 'Envíos regulados y minuciosos para proteger el chocolate, los merengues y los rellenos, garantizando una entrega fresca y en perfecta condición.'
    },
    iconName: 'Truck'
  }
];
