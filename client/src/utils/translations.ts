// Translation system for the PDF Converter application

export interface Translations {
  // Header
  header: {
    appName: string;
    home: string;
    allTools: string;
    language: string;
  };
  
  // Home page
  home: {
    title: string;
    subtitle: string;
    exploreTools: string;
    freeText: string;
    stats: {
      filesConverted: string;
      uptime: string;
      available: string;
    };
    sectionTitle: string;
    sectionSubtitle: string;
    tryNow: string;
    whyChooseTitle: string;
    whyChooseSubtitle: string;
    features: {
      superFast: {
        title: string;
        description: string;
      };
      secure: {
        title: string;
        description: string;
      };
      worksEverywhere: {
        title: string;
        description: string;
      };
      highQuality: {
        title: string;
        description: string;
      };
      completelyFree: {
        title: string;
        description: string;
      };
      multipleFiles: {
        title: string;
        description: string;
      };
    };
    cta: {
      title: string;
      subtitle: string;
      startNow: string;
      trustedText: string;
    };
  };
  
  // Tool Pages
  toolPages: {
    wordToPdf: {
      title: string;
      subtitle: string;
      uploadArea: {
        title: string;
        description: string;
        supportedFormats: string;
        fileSelected: string;
      };
      button: {
        convert: string;
        converting: string;
      };
      features: {
        highQuality: {
          title: string;
          description: string;
        };
        easyUpload: {
          title: string;
          description: string;
        };
        fast: {
          title: string;
          description: string;
        };
      };
      errors: {
        conversionFailed: string;
        networkError: string;
      };
      success: {
        message: string;
      };
    };
    pdfToExcel: {
      title: string;
      subtitle: string;
      uploadArea: {
        title: string;
        description: string;
        supportedFormats: string;
        fileSelected: string;
      };
      button: {
        convert: string;
        converting: string;
      };
      features: {
        dataExtraction: {
          title: string;
          description: string;
        };
        preserveFormatting: {
          title: string;
          description: string;
        };
        fast: {
          title: string;
          description: string;
        };
      };
      errors: {
        conversionFailed: string;
        networkError: string;
      };
      success: {
        message: string;
      };
    };
    pdfToWord: {
      title: string;
      subtitle: string;
      uploadArea: {
        title: string;
        description: string;
        supportedFormats: string;
        fileSelected: string;
      };
      button: {
        convert: string;
        converting: string;
      };
      features: {
        textExtraction: {
          title: string;
          description: string;
        };
        easyUpload: {
          title: string;
          description: string;
        };
        preserveFormatting: {
          title: string;
          description: string;
        };
      };
      errors: {
        conversionFailed: string;
        networkError: string;
      };
      success: {
        message: string;
      };
    };
    pdfToPowerPoint: {
      title: string;
      subtitle: string;
      uploadArea: {
        title: string;
        description: string;
        supportedFormats: string;
        fileSelected: string;
      };
      button: {
        convert: string;
        converting: string;
      };
      features: {
        slideExtraction: {
          title: string;
          description: string;
        };
        preserveLayout: {
          title: string;
          description: string;
        };
        fast: {
          title: string;
          description: string;
        };
      };
      errors: {
        conversionFailed: string;
        networkError: string;
      };      success: {
        message: string;
      };
    };
    imageToPdf: {
      title: string;
      subtitle: string;
      uploadArea: {
        title: string;
        description: string;
        supportedFormats: string;
        fileSelected: string;
      };
      button: {
        convert: string;
        converting: string;
      };
      features: {
        multipleImages: {
          title: string;
          description: string;
        };
        highQuality: {
          title: string;
          description: string;
        };
        fastConversion: {
          title: string;
          description: string;
        };
      };
      errors: {
        conversionFailed: string;
        networkError: string;
        invalidFileType: string;
      };
      success: {
        message: string;
      };
    };
    pdfToImage: {
      title: string;
      subtitle: string;
      uploadArea: {
        title: string;
        description: string;
        supportedFormats: string;
        fileSelected: string;
      };
      button: {
        convert: string;
        converting: string;
      };
      features: {
        pageExtraction: {
          title: string;
          description: string;
        };
        multipleFormats: {
          title: string;
          description: string;
        };
        highResolution: {
          title: string;
          description: string;
        };
      };
      errors: {
        conversionFailed: string;
        networkError: string;
      };
      success: {
        message: string;
      };
    };
    excelToPdf: {
      title: string;
      subtitle: string;
      uploadArea: {
        title: string;
        description: string;
        supportedFormats: string;
        fileSelected: string;
      };
      button: {
        convert: string;
        converting: string;
      };
      features: {
        preserveFormatting: {
          title: string;
          description: string;
        };
        multipleSheets: {
          title: string;
          description: string;
        };
        professionalOutput: {
          title: string;
          description: string;
        };
      };
      errors: {
        conversionFailed: string;
        networkError: string;
      };
      success: {
        message: string;
      };
    };
  };
  
  // Tools
  tools: {
    wordToPdf: {
      name: string;
      description: string;
    };
    pdfEditor: {
      name: string;
      description: string;
    };
    pdfToExcel: {
      name: string;
      description: string;
    };
    pdfToPowerPoint: {
      name: string;
      description: string;
    };
    pdfToWord: {
      name: string;
      description: string;
    };
    imageToPdf: {
      name: string;
      description: string;
    };
    pdfToImage: {
      name: string;
      description: string;
    };
    excelToPdf: {
      name: string;
      description: string;
    };
  };
  
  // PDF Editor
  pdfEditor: {
    title: string;
    subtitle: string;
    sidebar: {
      tools: string;
      fileInfo: string;
      size: string;
      selectMove: string;
      addText: string;
      addRectangle: string;
      addCircle: string;
      createSignature: string;
      savedSignatures: string;
      annotations: string;
    };
    signatureTypes: {
      drawn: string;
      text: string;
      signature: string;
    };
    buttons: {
      placeToPdf: string;
      select: string;
      delete: string;
      exportEditedPdf: string;
      downloadOriginalPdf: string;
      uploadNewFile: string;
    };
    upload: {
      title: string;
      description: string;
      selectFile: string;
    };
    viewer: {
      title: string;
      successMessage: string;
      toolInstructions: {
        placeSignature: string;
        addText: string;
        addRectangle: string;
        addCircle: string;
        textToolActive: string;
        rectangleToolActive: string;
        circleToolActive: string;
        clickToAdd: string;
      };
    };
    signatureModal: {
      title: string;
      drawTab: string;
      typeTab: string;
      drawInstruction: string;
      clear: string;
      typeLabel: string;
      typePlaceholder: string;
      fontLabel: string;
      preview: string;
      cancel: string;
      addSignature: string;
    };
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    success: string;
    cancel: string;
    save: string;
    delete: string;
    edit: string;
    download: string;
    upload: string;
  };
}

export const translations: Record<string, Translations> = {
  tr: {
    header: {
      appName: "PDF Dönüştürücü",
      home: "Ana Sayfa",
      allTools: "Tüm Araçlar",
      language: "Dil",
    },    home: {
      title: "İş Akışınızı Geliştirin",
      subtitle: "Güçlü PDF araçları, kullanışlı yardımcı programlar ve zaman kazandıran dönüştürücüler keşfedin. Belgelerle çalışmak için ihtiyacınız olan her şey tek yerde.",
      exploreTools: "Araçları Keşfet",
      freeText: "Ücretsiz • Kayıt Gerekmez",
      stats: {
        filesConverted: "Dosya Dönüştürüldü",
        uptime: "Çalışma Süresi",
        available: "Erişilebilir",
      },
      sectionTitle: "En Popüler PDF Araçları",
      sectionSubtitle: "Tüm PDF dönüştürme ve düzenleme ihtiyaçlarınızı karşılayan profesyonel araçlar",
      tryNow: "Şimdi Dene",
      whyChooseTitle: "Neden Platformumuzu Seçmelisiniz?",
      whyChooseSubtitle: "Kurumsal düzeyde güvenlik ve performansla en iyi araçları sağlıyoruz",
      features: {
        superFast: {
          title: "⚡ Süper Hızlı",
          description: "Belgelerinizi saniyeler içinde dönüştürün. Bekleme yok, gecikme yok - optimize edilmiş işleme motorumuzla anında sonuçlar alın."
        },
        secure: {
          title: "🔒 %100 Güvenli",
          description: "Dosyalarınız güvenli bir şekilde işlenir ve dönüştürme sonrasında hemen silinir. SSL şifreleme ile tam gizlilik garantisi."
        },
        worksEverywhere: {
          title: "📱 Her Yerde Çalışır",
          description: "Herhangi bir cihazda kullanın - masaüstü, tablet veya mobil. İndirme veya kurulum gerekmez. Sadece açın ve dönüştürmeye başlayın."
        },
        highQuality: {
          title: "🎯 Yüksek Kalite",
          description: "Akıllı sıkıştırma ile belge kalitenizi koruyun. PDF'leriniz tam olarak istediğiniz gibi görünecek."
        },
        completelyFree: {
          title: "💰 Tamamen Ücretsiz",
          description: "Gizli ücret yok, abonelik yok, sınır yok. İstediğiniz kadar belgeyi kısıtlama olmadan sonsuza kadar ücretsiz dönüştürün."
        },
        multipleFiles: {
          title: "🔄 Çoklu Dosya",
          description: "Birden fazla dosyayı tek seferde yükleyin ve hepsini tek bir PDF'e veya ayrı dosyalara dönüştürün. Toplu işleme artık kolay."
        }
      },
      cta: {
        title: "Başlamaya Hazır mısınız?",
        subtitle: "Belge dönüştürme ihtiyaçları için platformumuza güvenen binlerce kullanıcıya katılın",
        startNow: "Şimdi Dönüştürmeye Başla",
        trustedText: "Dünya çapında 10.000+ kullanıcı tarafından güveniliyor"
      }
    },
    tools: {
      wordToPdf: {
        name: "Word'den PDF'e",
        description: "Word belgelerini PDF formatına dönüştürün",
      },
      pdfEditor: {
        name: "PDF Düzenleyici",
        description: "PDF belgelerini düzenleyin ve değiştirin",
      },
      pdfToExcel: {
        name: "PDF'den Excel'e",
        description: "PDF'leri Excel tablolarına dönüştürün",
      },
      pdfToPowerPoint: {
        name: "PDF'den PowerPoint'e",
        description: "PDF'leri PowerPoint sunumlarına dönüştürün",
      },
      pdfToWord: {
        name: "PDF'den Word'e",
        description: "PDF dosyalarını Word belgelerine dönüştürün",
      },
      imageToPdf: {
        name: "Resim'den PDF'e",
        description: "Resimleri PDF belgelerine dönüştürün",
      },
      pdfToImage: {
        name: "PDF'den Resim'e",
        description: "PDF dosyalarından resimleri çıkarın",
      },      excelToPdf: {
        name: "Excel'den PDF'e",
        description: "Excel dosyalarını PDF formatına dönüştürün",
      },
    },
    toolPages: {
      wordToPdf: {
        title: "Word'den PDF'e Dönüştürücü",
        subtitle: "Word belgelerinizi hızlı ve kolay bir şekilde PDF formatına dönüştürün. Formatı ve kaliteyi koruyarak profesyonel dönüştürücümüzle çalışın.",
        uploadArea: {
          title: "Word dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "Yalnızca Word dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal biçimlendirme ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Dosyaları sürükle & bırak veya tıklayarak yükle"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToExcel: {
        title: "PDF'den Excel'e Dönüştürücü",
        subtitle: "PDF belgelerinizi hızlı ve kolay bir şekilde Excel formatına dönüştürün. PDF'lerden veri ve tabloları düzenlenebilir elektronik tablolara çıkarın.",
        uploadArea: {
          title: "PDF dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "Yalnızca PDF dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "Excel'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          dataExtraction: {
            title: "Veri Çıkarma",
            description: "PDF dosyalarından verileri ve tabloları çıkarın"
          },
          preserveFormatting: {
            title: "Biçim Korunur",
            description: "Orijinal tablo yapısını ve biçimlendirmesini korur"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToWord: {
        title: "PDF'den Word'e Dönüştürücü",
        subtitle: "PDF belgelerinizi hızlı ve kolay bir şekilde Word formatına dönüştürün. PDF dosyalarından metni ve içeriği çıkarın.",
        uploadArea: {
          title: "PDF dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "Yalnızca PDF dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "Word'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          textExtraction: {
            title: "Metin Çıkarma",
            description: "PDF dosyalarından metin ve içeriği çıkarın"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "PDF dosyalarını sürükle & bırak veya tıklayarak yükle"
          },
          preserveFormatting: {
            title: "Biçim Korunur",
            description: "Orijinal düzen ve biçimlendirmeyi korur"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToPowerPoint: {
        title: "PDF'den PowerPoint'e Dönüştürücü",
        subtitle: "PDF belgelerinizi hızlı ve kolay bir şekilde PowerPoint formatına dönüştürün. PDF'leri düzenlenebilir sunumlara dönüştürün.",
        uploadArea: {
          title: "PDF dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "Yalnızca PDF dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "PowerPoint'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          slideExtraction: {
            title: "Slayt Çıkarma",
            description: "PDF sayfalarını düzenlenebilir slaytlara dönüştürün"
          },
          preserveLayout: {
            title: "Düzen Korunur",
            description: "Orijinal sayfa düzenini ve tasarımını korur"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      imageToPdf: {
        title: "Resim'den PDF'e Dönüştürücü",
        subtitle: "Resim dosyalarınızı hızlı ve kolay bir şekilde PDF'e dönüştürün. Birden fazla resmi tek PDF'de birleştirin.",
        uploadArea: {
          title: "Resim dosyalarınızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "JPG, PNG, GIF, BMP dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          multipleImages: {
            title: "Çoklu Resim",
            description: "Birden fazla resmi tek PDF'de birleştirin"
          },
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal resim kalitesini korur"
          },
          fastConversion: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde dönüştürme işlemi"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu.",
          invalidFileType: "Lütfen geçerli bir resim dosyası yükleyin"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToImage: {
        title: "PDF'den Resim'e Dönüştürücü", 
        subtitle: "PDF sayfalarınızı yüksek kaliteli resim dosyalarına dönüştürün. Her sayfa ayrı bir resim olarak kaydedilir.",
        uploadArea: {
          title: "PDF dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "Yalnızca PDF dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "Resim'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          pageExtraction: {
            title: "Sayfa Çıkarma",
            description: "Her PDF sayfasını ayrı resim dosyası olarak kaydedin"
          },
          multipleFormats: {
            title: "Çoklu Format",
            description: "JPG, PNG formatlarında dışa aktarım"
          },
          highResolution: {
            title: "Yüksek Çözünürlük",
            description: "Keskin ve net resim kalitesi"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      excelToPdf: {
        title: "Excel'den PDF'e Dönüştürücü",
        subtitle: "Excel dosyalarınızı profesyonel PDF belgelerine dönüştürün. Tüm biçimlendirme ve düzen korunur.",
        uploadArea: {
          title: "Excel dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın", 
          supportedFormats: "XLS, XLSX dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          preserveFormatting: {
            title: "Biçimlendirme Korunur",
            description: "Orijinal Excel biçimlendirmesi ve düzeni korunur"
          },
          multipleSheets: {
            title: "Çoklu Sayfa",
            description: "Tüm Excel sayfalarını tek PDF'e dönüştürün"
          },
          professionalOutput: {
            title: "Profesyonel Çıktı",
            description: "Yazdırma için optimize edilmiş PDF formatı"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      imageToPdf: {
        title: "Resim'den PDF'e Dönüştürücü",
        subtitle: "Resim dosyalarınızı hızlı ve kolay bir şekilde PDF'e dönüştürün. Birden fazla resmi tek PDF'de birleştirin.",
        uploadArea: {
          title: "Resim dosyalarınızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "JPG, PNG, GIF, BMP dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          multipleImages: {
            title: "Çoklu Resim",
            description: "Birden fazla resmi tek PDF'de birleştirin"
          },
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal resim kalitesini korur"
          },
          fastConversion: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde dönüştürme işlemi"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu.",
          invalidFileType: "Lütfen geçerli bir resim dosyası yükleyin"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToImage: {
        title: "PDF'den Resim'e Dönüştürücü", 
        subtitle: "PDF sayfalarınızı yüksek kaliteli resim dosyalarına dönüştürün. Her sayfa ayrı bir resim olarak kaydedilir.",
        uploadArea: {
          title: "PDF dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın",
          supportedFormats: "Yalnızca PDF dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "Resim'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          pageExtraction: {
            title: "Sayfa Çıkarma",
            description: "Her PDF sayfasını ayrı resim dosyası olarak kaydedin"
          },
          multipleFormats: {
            title: "Çoklu Format",
            description: "JPG, PNG formatlarında dışa aktarım"
          },
          highResolution: {
            title: "Yüksek Çözünürlük",
            description: "Keskin ve net resim kalitesi"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      excelToPdf: {
        title: "Excel'den PDF'e Dönüştürücü",
        subtitle: "Excel dosyalarınızı profesyonel PDF belgelerine dönüştürün. Tüm biçimlendirme ve düzen korunur.",
        uploadArea: {
          title: "Excel dosyanızı buraya bırakın",
          description: "veya dosyaları taramak için tıklayın", 
          supportedFormats: "XLS, XLSX dosyalarını destekler",
          fileSelected: "Dosya Seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          preserveFormatting: {
            title: "Biçimlendirme Korunur",
            description: "Orijinal Excel biçimlendirmesi ve düzeni korunur"
          },
          multipleSheets: {
            title: "Çoklu Sayfa",
            description: "Tüm Excel sayfalarını tek PDF'e dönüştürün"
          },
          professionalOutput: {
            title: "Profesyonel Çıktı",
            description: "Yazdırma için optimize edilmiş PDF formatı"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız. Lütfen tekrar deneyin.",
          networkError: "Dönüştürme sırasında bir hata oluştu."
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      }
    },
    pdfEditor: {
      title: "PDF Düzenleyici",
      subtitle: "PDF dosyalarınızı görüntüleyin, düzenleyin ve açıklama ekleyin",
      sidebar: {
        tools: "Araçlar",
        fileInfo: "Dosya Bilgisi",
        size: "Boyut",
        selectMove: "Seç & Taşı",
        addText: "Metin Ekle",
        addRectangle: "Dikdörtgen Ekle",
        addCircle: "Daire Ekle",
        createSignature: "İmza Oluştur",
        savedSignatures: "Kaydedilmiş İmzalar",
        annotations: "Açıklamalar",
      },
      signatureTypes: {
        drawn: "Çizilmiş",
        text: "Metin",
        signature: "İmza",
      },
      buttons: {
        placeToPdf: "PDF'e Yerleştir",
        select: "Seç",
        delete: "Sil",
        exportEditedPdf: "Düzenlenmiş PDF'i Dışa Aktar",
        downloadOriginalPdf: "Orijinal PDF'i İndir",
        uploadNewFile: "Yeni Dosya Yükle",
      },
      upload: {
        title: "Düzenlemek için PDF Yükleyin",
        description: "PDF dosyanızı buraya sürükleyin veya seçmek için tıklayın",
        selectFile: "PDF Dosyası Seç",
      },
      viewer: {
        title: "PDF Görüntüleyici",
        successMessage: "PDF başarıyla yüklendi. Düzenlemek için kenar çubuğundaki araçları kullanın.",
        toolInstructions: {
          placeSignature: "İmzayı yerleştirmek istediğiniz yere tıklayın",
          addText: "Metin eklemek için tıklayın",
          addRectangle: "Dikdörtgen eklemek için tıklayın",
          addCircle: "Daire eklemek için tıklayın",
          textToolActive: "Metin Aracı Aktif",
          rectangleToolActive: "Dikdörtgen Aracı Aktif",
          circleToolActive: "Daire Aracı Aktif",
          clickToAdd: "Eklemek için PDF'e tıklayın",
        },
      },
      signatureModal: {
        title: "İmza Ekle",
        drawTab: "İmza Çiz",
        typeTab: "İmza Yaz",
        drawInstruction: "İmzanızı aşağıdaki kutuya çizin",
        clear: "Temizle",
        typeLabel: "İmzanızı yazın",
        typePlaceholder: "Adınızı girin",
        fontLabel: "Font Stili",
        preview: "Önizleme:",
        cancel: "İptal",
        addSignature: "İmza Ekle",
      },
    },
    common: {
      loading: "Yükleniyor...",
      error: "Hata",
      success: "Başarılı",
      cancel: "İptal",
      save: "Kaydet",
      delete: "Sil",
      edit: "Düzenle",
      download: "İndir",
      upload: "Yükle",
    },
  },
    en: {
    header: {
      appName: "PDF Converter",
      home: "Home",
      allTools: "All Tools",
      language: "Language",
    },
    home: {
      title: "Boost Your Workflow",
      subtitle: "Discover powerful PDF tools, useful utilities, and time-saving converters. Everything you need to work with documents in one place.",
      exploreTools: "Explore Tools",
      freeText: "Free • No Registration Required",
      stats: {
        filesConverted: "Files Converted",
        uptime: "Uptime",
        available: "Available",
      },
      sectionTitle: "Most Popular PDF Tools",
      sectionSubtitle: "Professional-grade tools to handle all your PDF conversion and editing needs",
      tryNow: "Try now",
      whyChooseTitle: "Why Choose Our Platform?",
      whyChooseSubtitle: "We provide the best tools with enterprise-grade security and performance",
      features: {
        superFast: {
          title: "⚡ Super Fast",
          description: "Convert your documents in seconds. No waiting, no delays - instant results with our optimized processing engine."
        },
        secure: {
          title: "🔒 100% Secure",
          description: "Your files are processed securely and deleted immediately after conversion. Complete privacy guaranteed with SSL encryption."
        },
        worksEverywhere: {
          title: "📱 Works Everywhere",
          description: "Use on any device - desktop, tablet, or mobile. No downloads or installations required. Just open and start converting."
        },
        highQuality: {
          title: "🎯 High Quality",
          description: "Preserve your document quality with smart compression. Your PDFs will look exactly as you want them to."
        },
        completelyFree: {
          title: "💰 Completely Free",
          description: "No hidden fees, no subscriptions, no limits. Convert as many documents as you want forever, without restrictions."
        },
        multipleFiles: {
          title: "🔄 Multiple Files",
          description: "Upload multiple files at once and convert them all to a single PDF or separate files. Batch processing made easy."
        }
      },
      cta: {
        title: "Ready to Get Started?",
        subtitle: "Join thousands of users who trust our platform for their document conversion needs",
        startNow: "Start Converting Now",        trustedText: "Trusted by 10,000+ users worldwide"
      }
    },
    toolPages: {
      wordToPdf: {
        title: "Word to PDF Converter",
        subtitle: "Convert your Word documents to PDF format quickly and easily. Work with our professional converter while preserving format and quality.",
        uploadArea: {
          title: "Drop your Word file here",
          description: "or click to browse files",
          supportedFormats: "Only supports Word files",
          fileSelected: "File Selected"
        },
        button: {
          convert: "Convert to PDF",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves original formatting and layout"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Drag & drop files or click to upload"
          },
          fast: {
            title: "Fast Processing",
            description: "Conversion in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed. Please try again.",
          networkError: "An error occurred during conversion."
        },
        success: {
          message: "File converted successfully!"
        }
      },
      pdfToExcel: {
        title: "PDF to Excel Converter",
        subtitle: "Convert your PDF documents to Excel format quickly and easily. Extract data and tables from PDFs to editable spreadsheets.",
        uploadArea: {
          title: "Drop your PDF file here",
          description: "or click to browse files",
          supportedFormats: "Only supports PDF files",
          fileSelected: "File Selected"
        },
        button: {
          convert: "Convert to Excel",
          converting: "Converting..."
        },
        features: {
          dataExtraction: {
            title: "Data Extraction",
            description: "Extract data and tables from PDF files"
          },
          preserveFormatting: {
            title: "Preserve Formatting",
            description: "Maintains original table structure and formatting"
          },
          fast: {
            title: "Fast Processing",
            description: "Conversion in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed. Please try again.",
          networkError: "An error occurred during conversion."
        },
        success: {
          message: "File converted successfully!"
        }
      },
      pdfToWord: {
        title: "PDF to Word Converter",
        subtitle: "Convert your PDF documents to Word format quickly and easily. Extract text and content from PDF files.",
        uploadArea: {
          title: "Drop your PDF file here",
          description: "or click to browse files",
          supportedFormats: "Only supports PDF files",
          fileSelected: "File Selected"
        },
        button: {
          convert: "Convert to Word",
          converting: "Converting..."
        },
        features: {
          textExtraction: {
            title: "Text Extraction",
            description: "Extract text and content from PDF files"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Drag & drop PDF files or click to upload"
          },
          preserveFormatting: {
            title: "Preserve Formatting",
            description: "Maintains original layout and formatting"
          }
        },
        errors: {
          conversionFailed: "Conversion failed. Please try again.",
          networkError: "An error occurred during conversion."
        },
        success: {
          message: "File converted successfully!"
        }
      },
      pdfToPowerPoint: {
        title: "PDF to PowerPoint Converter",
        subtitle: "Convert your PDF documents to PowerPoint format quickly and easily. Transform PDFs into editable presentations.",
        uploadArea: {
          title: "Drop your PDF file here",
          description: "or click to browse files",
          supportedFormats: "Only supports PDF files",
          fileSelected: "File Selected"
        },
        button: {
          convert: "Convert to PowerPoint",
          converting: "Converting..."
        },
        features: {
          slideExtraction: {
            title: "Slide Extraction",
            description: "Convert PDF pages to editable slides"
          },
          preserveLayout: {
            title: "Preserve Layout",
            description: "Maintains original page layout and design"
          },
          fast: {
            title: "Fast Processing",
            description: "Conversion in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed. Please try again.",
          networkError: "An error occurred during conversion."
        },        success: {
          message: "File converted successfully!"
        }
      },
      imageToPdf: {
        title: "Image to PDF Converter",
        subtitle: "Convert your image files to PDF quickly and easily. Combine multiple images into a single PDF document.",
        uploadArea: {
          title: "Drop your image files here",
          description: "or click to browse files",
          supportedFormats: "Supports JPG, PNG, GIF, BMP files",
          fileSelected: "File Selected"
        },
        button: {
          convert: "Convert to PDF",
          converting: "Converting..."
        },
        features: {
          multipleImages: {
            title: "Multiple Images",
            description: "Combine multiple images into one PDF"
          },
          highQuality: {
            title: "High Quality",
            description: "Preserves original image quality"
          },
          fastConversion: {
            title: "Fast Conversion",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed. Please try again.",
          networkError: "An error occurred during conversion.",
          invalidFileType: "Please upload a valid image file"
        },
        success: {
          message: "File converted successfully!"
        }
      },
      pdfToImage: {
        title: "PDF to Image Converter",
        subtitle: "Convert PDF pages to high-quality image files. Each page will be saved as a separate image.",
        uploadArea: {
          title: "Drop your PDF file here",
          description: "or click to browse files",
          supportedFormats: "Supports PDF files only",
          fileSelected: "File Selected"
        },
        button: {
          convert: "Convert to Images",
          converting: "Converting..."
        },
        features: {
          pageExtraction: {
            title: "Page Extraction",
            description: "Save each PDF page as a separate image"
          },
          multipleFormats: {
            title: "Multiple Formats",
            description: "Export as JPG, PNG formats"
          },
          highResolution: {
            title: "High Resolution",
            description: "Sharp and clear image quality"
          }
        },
        errors: {
          conversionFailed: "Conversion failed. Please try again.",
          networkError: "An error occurred during conversion."
        },
        success: {
          message: "File converted successfully!"
        }
      },
      excelToPdf: {
        title: "Excel to PDF Converter",
        subtitle: "Convert Excel files to professional PDF documents. All formatting and layout is preserved.",
        uploadArea: {
          title: "Drop your Excel file here",
          description: "or click to browse files",
          supportedFormats: "Supports XLS, XLSX files",
          fileSelected: "File Selected"
        },
        button: {
          convert: "Convert to PDF",
          converting: "Converting..."
        },
        features: {
          preserveFormatting: {
            title: "Preserve Formatting",
            description: "Original Excel formatting and layout preserved"
          },
          multipleSheets: {
            title: "Multiple Sheets",
            description: "Convert all Excel sheets to one PDF"
          },
          professionalOutput: {
            title: "Professional Output",
            description: "Print-optimized PDF format"
          }
        },
        errors: {
          conversionFailed: "Conversion failed. Please try again.",
          networkError: "An error occurred during conversion."
        },
        success: {
          message: "File converted successfully!"
        }
      }
    },
    tools: {
      wordToPdf: {
        name: "Word to PDF",
        description: "Convert Word documents to PDF format",
      },
      pdfEditor: {
        name: "PDF Editor",
        description: "Edit and modify PDF documents",
      },
      pdfToExcel: {
        name: "PDF to Excel",
        description: "Convert PDF to Excel spreadsheets",
      },
      pdfToPowerPoint: {
        name: "PDF to PowerPoint",
        description: "Convert PDF to PowerPoint presentations",
      },
      pdfToWord: {
        name: "PDF to Word",
        description: "Convert PDF files to Word documents",
      },
      imageToPdf: {
        name: "Image to PDF",
        description: "Convert images to PDF documents",
      },
      pdfToImage: {
        name: "PDF to Image",
        description: "Extract images from PDF files",
      },
      excelToPdf: {
        name: "Excel to PDF",
        description: "Convert Excel files to PDF format",
      },
    },
    pdfEditor: {
      title: "PDF Editor",
      subtitle: "View, edit and annotate your PDF files",
      sidebar: {
        tools: "Tools",
        fileInfo: "File Info",
        size: "Size",
        selectMove: "Select & Move",
        addText: "Add Text",
        addRectangle: "Add Rectangle",
        addCircle: "Add Circle",
        createSignature: "Create Signature",
        savedSignatures: "Saved Signatures",
        annotations: "Annotations",
      },
      signatureTypes: {
        drawn: "Drawn",
        text: "Text",
        signature: "Signature",
      },
      buttons: {
        placeToPdf: "Place to PDF",
        select: "Select",
        delete: "Delete",
        exportEditedPdf: "Export Edited PDF",
        downloadOriginalPdf: "Download Original PDF",
        uploadNewFile: "Upload New File",
      },
      upload: {
        title: "Upload PDF to Edit",
        description: "Drag your PDF file here or click to select",
        selectFile: "Select PDF File",
      },
      viewer: {
        title: "PDF Viewer",
        successMessage: "PDF loaded successfully. Use the tools in the sidebar to edit.",
        toolInstructions: {
          placeSignature: "Click where you want to place the signature",
          addText: "Click to add text",
          addRectangle: "Click to add rectangle",
          addCircle: "Click to add circle",
          textToolActive: "Text Tool Active",
          rectangleToolActive: "Rectangle Tool Active",
          circleToolActive: "Circle Tool Active",
          clickToAdd: "Click on PDF to add",
        },
      },
      signatureModal: {
        title: "Add Signature",
        drawTab: "Draw Signature",
        typeTab: "Type Signature",
        drawInstruction: "Draw your signature in the box below",
        clear: "Clear",
        typeLabel: "Type your signature",
        typePlaceholder: "Enter your name",
        fontLabel: "Font Style",
        preview: "Preview:",
        cancel: "Cancel",
        addSignature: "Add Signature",
      },
    },
    common: {
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      download: "Download",
      upload: "Upload",
    },
  },
  
  de: {
    header: {
      appName: "PDF Konverter",
      home: "Startseite",
      allTools: "Alle Tools",
      language: "Sprache",
    },    home: {
      title: "Verbessern Sie Ihren Workflow",
      subtitle: "Entdecken Sie leistungsstarke PDF-Tools, nützliche Dienstprogramme und zeitsparende Konverter. Alles, was Sie für die Arbeit mit Dokumenten benötigen, an einem Ort.",
      exploreTools: "Tools Erkunden",
      freeText: "Kostenlos • Keine Registrierung Erforderlich",
      stats: {
        filesConverted: "Dateien Konvertiert",
        uptime: "Betriebszeit",
        available: "Verfügbar",
      },
      sectionTitle: "Beliebteste PDF-Tools",
      sectionSubtitle: "Professionelle Tools für alle Ihre PDF-Konvertierungs- und Bearbeitungsanforderungen",
      tryNow: "Jetzt testen",
      whyChooseTitle: "Warum Unsere Plattform Wählen?",
      whyChooseSubtitle: "Wir bieten die besten Tools mit Enterprise-Grade-Sicherheit und -Leistung",
      features: {
        superFast: {
          title: "⚡ Superschnell",
          description: "Konvertieren Sie Ihre Dokumente in Sekunden. Kein Warten, keine Verzögerungen - sofortige Ergebnisse mit unserer optimierten Verarbeitungsengine."
        },
        secure: {
          title: "🔒 100% Sicher",
          description: "Ihre Dateien werden sicher verarbeitet und sofort nach der Konvertierung gelöscht. Vollständige Privatsphäre garantiert mit SSL-Verschlüsselung."
        },
        worksEverywhere: {
          title: "📱 Funktioniert Überall",
          description: "Verwenden Sie es auf jedem Gerät - Desktop, Tablet oder Handy. Keine Downloads oder Installationen erforderlich. Einfach öffnen und mit dem Konvertieren beginnen."
        },
        highQuality: {
          title: "🎯 Hohe Qualität",
          description: "Bewahren Sie Ihre Dokumentqualität mit intelligenter Komprimierung. Ihre PDFs werden genau so aussehen, wie Sie es wünschen."
        },
        completelyFree: {
          title: "💰 Völlig Kostenlos",
          description: "Keine versteckten Gebühren, keine Abonnements, keine Limits. Konvertieren Sie so viele Dokumente wie Sie möchten, für immer und ohne Einschränkungen."
        },
        multipleFiles: {
          title: "🔄 Mehrere Dateien",
          description: "Laden Sie mehrere Dateien gleichzeitig hoch und konvertieren Sie sie alle zu einer einzigen PDF oder separaten Dateien. Stapelverarbeitung leicht gemacht."
        }
      },
      cta: {
        title: "Bereit Loszulegen?",
        subtitle: "Schließen Sie sich Tausenden von Nutzern an, die unserer Plattform für ihre Dokumentkonvertierungsanforderungen vertrauen",
        startNow: "Jetzt Mit Konvertieren Beginnen",
        trustedText: "Von über 10.000 Nutzern weltweit vertraut"
      }
    },
    toolPages: {
      wordToPdf: {
        title: "Word zu PDF Konverter",
        subtitle: "Konvertieren Sie Ihre Word-Dokumente schnell und einfach in das PDF-Format. Arbeiten Sie mit unserem professionellen Konverter unter Beibehaltung von Format und Qualität.",
        uploadArea: {
          title: "Legen Sie Ihre Word-Datei hier ab",
          description: "oder klicken Sie, um Dateien zu durchsuchen",
          supportedFormats: "Unterstützt nur Word-Dateien",
          fileSelected: "Datei Ausgewählt"
        },
        button: {
          convert: "In PDF Konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt ursprüngliche Formatierung und Layout"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Dateien per Drag & Drop oder Klick hochladen"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          networkError: "Ein Fehler ist während der Konvertierung aufgetreten."
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToExcel: {
        title: "PDF zu Excel Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Dokumente schnell und einfach in das Excel-Format. Extrahieren Sie Daten und Tabellen aus PDFs in bearbeitbare Tabellenkalkulationen.",
        uploadArea: {
          title: "Legen Sie Ihre PDF-Datei hier ab",
          description: "oder klicken Sie, um Dateien zu durchsuchen",
          supportedFormats: "Unterstützt nur PDF-Dateien",
          fileSelected: "Datei Ausgewählt"
        },
        button: {
          convert: "In Excel Konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          dataExtraction: {
            title: "Datenextraktion",
            description: "Extrahieren Sie Daten und Tabellen aus PDF-Dateien"
          },
          preserveFormatting: {
            title: "Formatierung Beibehalten",
            description: "Behält ursprüngliche Tabellenstruktur und Formatierung bei"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          networkError: "Ein Fehler ist während der Konvertierung aufgetreten."
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToWord: {
        title: "PDF zu Word Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Dokumente schnell und einfach in das Word-Format. Extrahieren Sie Text und Inhalte aus PDF-Dateien.",
        uploadArea: {
          title: "Legen Sie Ihre PDF-Datei hier ab",
          description: "oder klicken Sie, um Dateien zu durchsuchen",
          supportedFormats: "Unterstützt nur PDF-Dateien",
          fileSelected: "Datei Ausgewählt"
        },
        button: {
          convert: "In Word Konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          textExtraction: {
            title: "Textextraktion",
            description: "Extrahieren Sie Text und Inhalte aus PDF-Dateien"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "PDF-Dateien per Drag & Drop oder Klick hochladen"
          },
          preserveFormatting: {
            title: "Formatierung Beibehalten",
            description: "Behält ursprüngliches Layout und Formatierung bei"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          networkError: "Ein Fehler ist während der Konvertierung aufgetreten."
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToPowerPoint: {
        title: "PDF zu PowerPoint Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Dokumente schnell und einfach in das PowerPoint-Format. Verwandeln Sie PDFs in bearbeitbare Präsentationen.",
        uploadArea: {
          title: "Legen Sie Ihre PDF-Datei hier ab",
          description: "oder klicken Sie, um Dateien zu durchsuchen",
          supportedFormats: "Unterstützt nur PDF-Dateien",
          fileSelected: "Datei Ausgewählt"
        },
        button: {
          convert: "In PowerPoint Konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          slideExtraction: {
            title: "Folienextraktion",
            description: "Konvertieren Sie PDF-Seiten in bearbeitbare Folien"
          },
          preserveLayout: {
            title: "Layout Beibehalten",
            description: "Behält ursprüngliches Seitenlayout und Design bei"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          networkError: "Ein Fehler ist während der Konvertierung aufgetreten."
        },        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      imageToPdf: {
        title: "Bild zu PDF Konverter",
        subtitle: "Konvertieren Sie Ihre Bilddateien schnell und einfach zu PDF. Kombinieren Sie mehrere Bilder in einem PDF-Dokument.",
        uploadArea: {
          title: "Legen Sie Ihre Bilddateien hier ab",
          description: "oder klicken Sie zum Durchsuchen",
          supportedFormats: "Unterstützt JPG, PNG, GIF, BMP Dateien",
          fileSelected: "Datei Ausgewählt"
        },
        button: {
          convert: "Zu PDF konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          multipleImages: {
            title: "Mehrere Bilder",
            description: "Kombinieren Sie mehrere Bilder in einer PDF"
          },
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt die ursprüngliche Bildqualität"
          },
          fastConversion: {
            title: "Schnelle Konvertierung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          networkError: "Ein Fehler ist während der Konvertierung aufgetreten.",
          invalidFileType: "Bitte laden Sie eine gültige Bilddatei hoch"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToImage: {
        title: "PDF zu Bild Konverter",
        subtitle: "Konvertieren Sie PDF-Seiten zu hochwertigen Bilddateien. Jede Seite wird als separates Bild gespeichert.",
        uploadArea: {
          title: "Legen Sie Ihre PDF-Datei hier ab",
          description: "oder klicken Sie zum Durchsuchen",
          supportedFormats: "Unterstützt nur PDF-Dateien",
          fileSelected: "Datei Ausgewählt"
        },
        button: {
          convert: "Zu Bildern konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          pageExtraction: {
            title: "Seitenextraktion",
            description: "Speichern Sie jede PDF-Seite als separates Bild"
          },
          multipleFormats: {
            title: "Mehrere Formate",
            description: "Export als JPG, PNG Formate"
          },
          highResolution: {
            title: "Hohe Auflösung",
            description: "Scharfe und klare Bildqualität"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          networkError: "Ein Fehler ist während der Konvertierung aufgetreten."
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      excelToPdf: {
        title: "Excel zu PDF Konverter",
        subtitle: "Konvertieren Sie Excel-Dateien zu professionellen PDF-Dokumenten. Alle Formatierungen und Layouts bleiben erhalten.",
        uploadArea: {
          title: "Legen Sie Ihre Excel-Datei hier ab",
          description: "oder klicken Sie zum Durchsuchen",
          supportedFormats: "Unterstützt XLS, XLSX Dateien",
          fileSelected: "Datei Ausgewählt"
        },
        button: {
          convert: "Zu PDF konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          preserveFormatting: {
            title: "Formatierung Beibehalten",
            description: "Ursprüngliche Excel-Formatierung und Layout beibehalten"
          },
          multipleSheets: {
            title: "Mehrere Blätter",
            description: "Konvertieren Sie alle Excel-Blätter zu einer PDF"
          },
          professionalOutput: {
            title: "Professionelle Ausgabe",
            description: "Druckoptimiertes PDF-Format"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen. Bitte versuchen Sie es erneut.",
          networkError: "Ein Fehler ist während der Konvertierung aufgetreten."
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      }
    },
    tools: {
      wordToPdf: {
        name: "Word zu PDF",
        description: "Word-Dokumente in PDF-Format konvertieren",
      },
      pdfEditor: {
        name: "PDF Editor",
        description: "PDF-Dokumente bearbeiten und ändern",
      },
      pdfToExcel: {
        name: "PDF zu Excel",
        description: "PDF in Excel-Tabellen konvertieren",
      },
      pdfToPowerPoint: {
        name: "PDF zu PowerPoint",
        description: "PDF in PowerPoint-Präsentationen konvertieren",
      },
      pdfToWord: {
        name: "PDF zu Word",
        description: "PDF-Dateien in Word-Dokumente konvertieren",
      },
      imageToPdf: {
        name: "Bild zu PDF",
        description: "Bilder in PDF-Dokumente konvertieren",
      },
      pdfToImage: {
        name: "PDF zu Bild",
        description: "Bilder aus PDF-Dateien extrahieren",
      },
      excelToPdf: {
        name: "Excel zu PDF",
        description: "Excel-Dateien in PDF-Format konvertieren",
      },
    },
    pdfEditor: {
      title: "PDF Editor",
      subtitle: "Betrachten, bearbeiten und kommentieren Sie Ihre PDF-Dateien",
      sidebar: {
        tools: "Werkzeuge",
        fileInfo: "Datei-Info",
        size: "Größe",
        selectMove: "Auswählen & Bewegen",
        addText: "Text Hinzufügen",
        addRectangle: "Rechteck Hinzufügen",
        addCircle: "Kreis Hinzufügen",
        createSignature: "Unterschrift Erstellen",
        savedSignatures: "Gespeicherte Unterschriften",
        annotations: "Anmerkungen",
      },
      signatureTypes: {
        drawn: "Gezeichnet",
        text: "Text",
        signature: "Unterschrift",
      },
      buttons: {
        placeToPdf: "In PDF Platzieren",
        select: "Auswählen",
        delete: "Löschen",
        exportEditedPdf: "Bearbeitete PDF Exportieren",
        downloadOriginalPdf: "Original PDF Herunterladen",
        uploadNewFile: "Neue Datei Hochladen",
      },
      upload: {
        title: "PDF zum Bearbeiten Hochladen",
        description: "Ziehen Sie Ihre PDF-Datei hierher oder klicken Sie zum Auswählen",
        selectFile: "PDF-Datei Auswählen",
      },
      viewer: {
        title: "PDF Betrachter",
        successMessage: "PDF erfolgreich geladen. Verwenden Sie die Tools in der Seitenleiste zum Bearbeiten.",
        toolInstructions: {
          placeSignature: "Klicken Sie, wo Sie die Unterschrift platzieren möchten",
          addText: "Klicken Sie, um Text hinzuzufügen",
          addRectangle: "Klicken Sie, um ein Rechteck hinzuzufügen",
          addCircle: "Klicken Sie, um einen Kreis hinzuzufügen",
          textToolActive: "Text-Tool Aktiv",
          rectangleToolActive: "Rechteck-Tool Aktiv",
          circleToolActive: "Kreis-Tool Aktiv",
          clickToAdd: "Klicken Sie auf PDF zum Hinzufügen",
        },
      },
      signatureModal: {
        title: "Unterschrift Hinzufügen",
        drawTab: "Unterschrift Zeichnen",
        typeTab: "Unterschrift Tippen",
        drawInstruction: "Zeichnen Sie Ihre Unterschrift in das Feld unten",
        clear: "Löschen",
        typeLabel: "Geben Sie Ihre Unterschrift ein",
        typePlaceholder: "Geben Sie Ihren Namen ein",
        fontLabel: "Schriftart",
        preview: "Vorschau:",
        cancel: "Abbrechen",
        addSignature: "Unterschrift Hinzufügen",
      },
    },
    common: {
      loading: "Laden...",
      error: "Fehler",
      success: "Erfolgreich",
      cancel: "Abbrechen",
      save: "Speichern",
      delete: "Löschen",
      edit: "Bearbeiten",
      download: "Herunterladen",
      upload: "Hochladen",
    },
  },
};

export const getTranslation = (language: string): Translations => {
  return translations[language] || translations.tr; // Default to Turkish
};
