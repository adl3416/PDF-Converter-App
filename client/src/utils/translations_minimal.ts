// Minimal translations for testing

export interface Translations {
  header: {
    appName: string;
    home: string;
    allTools: string;
    language: string;
  };
  home: {
    title: string;
    subtitle: string;
  };
}

const translations = {
  tr: {
    header: {
      appName: "PDF Dönüştürücü",
      home: "Ana Sayfa",
      allTools: "Tüm Araçlar",
      language: "Dil"
    },
    home: {
      title: "PDF Dönüştürme Araçları",
      subtitle: "Dosyalarınızı kolayca dönüştürün"
    }
  },
  en: {
    header: {
      appName: "PDF Converter",
      home: "Home",
      allTools: "All Tools",
      language: "Language"
    },
    home: {
      title: "PDF Conversion Tools",
      subtitle: "Convert your files easily"
    }
  },
  de: {
    header: {
      appName: "PDF Konverter",
      home: "Startseite",
      allTools: "Alle Tools",
      language: "Sprache"
    },
    home: {
      title: "PDF Konvertierungstools",
      subtitle: "Konvertieren Sie Ihre Dateien einfach"
    }
  }
};

export const getTranslation = (languageCode: string): Translations => {
  switch (languageCode) {
    case 'tr':
      return translations.tr;
    case 'en':
      return translations.en;
    case 'de':
      return translations.de;
    default:
      return translations.tr;
  }
};
