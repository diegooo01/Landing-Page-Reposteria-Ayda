export type Language = 'en' | 'es';

export interface DessertItem {
  id: string;
  name: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  price: string;
  image: string;
  rating: number;
}

export interface ServiceItem {
  id: string;
  title: {
    en: string;
    es: string;
  };
  description: {
    en: string;
    es: string;
  };
  iconName: string;
}

export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    services: string;
    gallery: string;
    contact: string;
  };
  hero: {
    title: string;
    subtitle: string;
    cta: string;
    scrollDown: string;
  };
  about: {
    title: string;
    heading: string;
    paragraph1: string;
    paragraph2: string;
    signature: string;
    heritage: string;
    peruvianCacao: string;
    sweetTradition: string;
  };
  services: {
    title: string;
    subtitle: string;
    items: {
      catering: {
        title: string;
        desc: string;
      };
      gifts: {
        title: string;
        desc: string;
      };
      workshops: {
        title: string;
        desc: string;
      };
      delivery: {
        title: string;
        desc: string;
      };
    };
  };
  gallery: {
    title: string;
    subtitle: string;
    viewDetails: string;
    close: string;
    addToCart: string;
    added: string;
  };
  contact: {
    title: string;
    subtitle: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    success: string;
    phone: string;
    hours: string;
    hoursValue: string;
    address: string;
    addressValue: string;
  };
}
