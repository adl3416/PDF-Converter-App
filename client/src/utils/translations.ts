// Translation system for the PDF Converter application

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
      highQuality: {
        title: string;
        description: string;
      };
      easyToUse: {
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
  
  common: {
    error: string;
  };
  
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
        textExtraction: {
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
        dataExtraction: {
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
        slideExtraction: {
          title: string;
          description: string;
        };
        preserveLayout: {
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
        multipleImages: {
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
  
  simplePdfEditor: {
    title: string;
    subtitle: string;
    uploadArea: {
      title: string;
      description: string;
      supportedFormats: string;
      fileSelected: string;
    };
    features: {
      merge: {
        title: string;
        description: string;
      };
      split: {
        title: string;
        description: string;
      };
      rotate: {
        title: string;
        description: string;
      };
      delete: {
        title: string;
        description: string;
      };
    };
    buttons: {
      selectFile: string;
      merge: string;
      split: string;
      rotate: string;
      delete: string;
      download: string;
      cancel: string;
      save: string;
      edit: string;
      upload: string;
    };
  };
  
  pdfEditor: {
    title: string;
    subtitle: string;
    upload: {
      title: string;
      description: string;
      selectFile: string;
    };
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
      exportEditedPdf: string;
      downloadOriginalPdf: string;
      uploadNewFile: string;
    };
    viewer: {
      successMessage: string;
      toolInstructions: {
        addText: string;
        addRectangle: string;
        addCircle: string;
        placeSignature: string;
        clickToAdd: string;
        textToolActive: string;
        rectangleToolActive: string;
        circleToolActive: string;
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
}

export const translations: Record<string, Translations> = {
  tr: {
    header: {
      appName: "PDF Dönüştürücü",
      home: "Ana Sayfa",
      allTools: "Tüm Araçlar",
      language: "Dil"
    },
    
    home: {
      title: "PDF Dönüştürücü - Ücretsiz Online Araçlar",
      subtitle: "PDF'leri kolayca dönüştürün, düzenleyin ve yönetin. Word, Excel, PowerPoint ve daha fazlası için hızlı ve güvenli çözümler.",
      exploreTools: "Araçları Keşfet",
      freeText: "Tamamen Ücretsiz",
      stats: {
        filesConverted: "Dönüştürülen Dosya",
        uptime: "Çalışma Süresi",
        available: "Kullanılabilir"
      },
      sectionTitle: "PDF Araçları",
      sectionSubtitle: "İhtiyacınız olan tüm PDF araçları bir arada",
      tryNow: "Şimdi Dene",
      whyChooseTitle: "Neden Platformumuzu Seçmelisiniz?",
      whyChooseSubtitle: "PDF işlemleriniz için en iyi deneyimi sunuyoruz",
      features: {
        superFast: {
          title: "Süper Hızlı",
          description: "Gelişmiş algoritmalara dayalı ultra hızlı dönüştürme"
        },
        highQuality: {
          title: "Yüksek Kalite",
          description: "Orijinal format ve kaliteyi koruyarak dönüştürme"
        },
        easyToUse: {
          title: "Kullanımı Kolay",
          description: "Sezgisel arayüz ile anında dönüştürme"
        },
        secure: {
          title: "Güvenli",
          description: "Dosyalarınız güvenli bir şekilde işlenir ve saklanmaz"
        },
        worksEverywhere: {
          title: "Her Yerde Çalışır",
          description: "Herhangi bir cihaz ve tarayıcıda kullanılabilir"
        },
        completelyFree: {
          title: "Tamamen Ücretsiz",
          description: "Tüm araçlar ücretsiz, gizli ücret yok"
        },
        multipleFiles: {
          title: "Çoklu Dosya",
          description: "Aynı anda birden fazla dosyayı dönüştürme"
        }
      },
      cta: {
        title: "PDF Dönüştürme İşlemlerinize Başlayın",
        subtitle: "Profesyonel kalitede sonuçlar için araçlarımızı kullanın",
        startNow: "Hemen Başla",
        trustedText: "Milyonlarca kullanıcı tarafından güveniliyor"
      }
    },
    
    tools: {
      wordToPdf: {
        name: "Word'den PDF'e",
        description: "Word belgelerini PDF'e dönüştürün"
      },
      pdfEditor: {
        name: "PDF Düzenleyici",
        description: "PDF dosyalarını düzenleyin ve imzalayın"
      },
      pdfToExcel: {
        name: "PDF'den Excel'e",
        description: "PDF dosyalarını Excel'e dönüştürün"
      },
      pdfToPowerPoint: {
        name: "PDF'den PowerPoint'e",
        description: "PDF dosyalarını PowerPoint'e dönüştürün"
      },
      pdfToWord: {
        name: "PDF'den Word'e",
        description: "PDF dosyalarını Word'e dönüştürün"
      },
      imageToPdf: {
        name: "Resim'den PDF'e",
        description: "Resimleri PDF'e dönüştürün"
      },
      pdfToImage: {
        name: "PDF'den Resim'e",
        description: "PDF dosyalarını resimlere dönüştürün"
      },
      excelToPdf: {
        name: "Excel'den PDF'e",
        description: "Excel dosyalarını PDF'e dönüştürün"
      }
    },
    
    common: {
      error: "Bir hata oluştu"
    },
    
    toolPages: {
      wordToPdf: {
        title: "Word'den PDF'e Dönüştürücü",
        subtitle: "Word belgelerinizi yüksek kaliteli PDF'lere dönüştürün",
        uploadArea: {
          title: "Word Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen formatlar: DOC, DOCX",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü"
        }
      },
      pdfToWord: {
        title: "PDF'den Word'e Dönüştürücü",
        subtitle: "PDF dosyalarınızı düzenlenebilir Word belgelerine dönüştürün",
        uploadArea: {
          title: "PDF Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "Word'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          textExtraction: {
            title: "Metin Çıkarma",
            description: "Metinleri tam olarak çıkarır"
          },
          preserveFormatting: {
            title: "Format Koruma",
            description: "Orijinal formatı ve düzeni korur"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü"
        }
      },
      pdfToExcel: {
        title: "PDF'den Excel'e Dönüştürücü",
        subtitle: "PDF tablolarını Excel elektronik tablolarına dönüştürün",
        uploadArea: {
          title: "PDF Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "Excel'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          dataExtraction: {
            title: "Veri Çıkarma",
            description: "Tabloları tam olarak çıkarır"
          },
          preserveFormatting: {
            title: "Format Koruma",
            description: "Hücre formatını ve düzenini korur"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü"
        }
      },
      pdfToPowerPoint: {
        title: "PDF'den PowerPoint'e Dönüştürücü",
        subtitle: "PDF'leri düzenlenebilir PowerPoint sunumlarına dönüştürün",
        uploadArea: {
          title: "PDF Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "PowerPoint'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          slideExtraction: {
            title: "Slayt Çıkarma",
            description: "Her sayfayı ayrı slayta dönüştürür"
          },
          preserveLayout: {
            title: "Düzen Koruma",
            description: "Orijinal sayfa düzenini korur"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü"
        }
      },
      imageToPdf: {
        title: "Resim'den PDF'e Dönüştürücü",
        subtitle: "Birden fazla resmi tek bir PDF dosyasına dönüştürün",
        uploadArea: {
          title: "Resim Dosyalarını Seçin",
          description: "Dosyalarınızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen formatlar: JPG, PNG, JPEG, BMP, GIF",
          fileSelected: "dosya seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal resim kalitesini korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Çoklu dosya seçimi ve sürükle-bırak"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          multipleImages: {
            title: "Çoklu Resim",
            description: "Birden fazla resmi tek PDF'de birleştir"
          },
          fastConversion: {
            title: "Hızlı İşlem",
            description: "Toplu resim işleme desteği"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu",
          invalidFileType: "Geçersiz dosya türü"
        },
        success: {
          message: "Resimler başarıyla PDF'e dönüştürüldü"
        }
      },
      pdfToImage: {
        title: "PDF'den Resim'e Dönüştürücü",
        subtitle: "PDF sayfalarını yüksek kaliteli resimlere dönüştürün",
        uploadArea: {
          title: "PDF Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "Resimlere Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Maksimum çözünürlükte çıktı"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          pageExtraction: {
            title: "Sayfa Çıkarma",
            description: "Her sayfayı ayrı resim olarak çıkarır"
          },
          multipleFormats: {
            title: "Çoklu Format",
            description: "JPG, PNG ve diğer formatlarda çıktı"
          },
          highResolution: {
            title: "Yüksek Çözünürlük",
            description: "Net ve keskin resim kalitesi"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "PDF başarıyla resimlere dönüştürüldü"
        }
      },
      excelToPdf: {
        title: "Excel'den PDF'e Dönüştürücü",
        subtitle: "Excel elektronik tablolarını PDF belgelerine dönüştürün",
        uploadArea: {
          title: "Excel Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen formatlar: XLS, XLSX",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          preserveFormatting: {
            title: "Format Koruma",
            description: "Hücre formatını ve düzenini korur"
          },
          multipleSheets: {
            title: "Çoklu Sayfa",
            description: "Tüm çalışma sayfalarını dahil eder"
          },
          professionalOutput: {
            title: "Profesyonel Çıktı",
            description: "İş kalitesinde PDF belgeleri"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Excel dosyası başarıyla PDF'e dönüştürüldü"
        }
      }
    },
    
    simplePdfEditor: {
      title: "Basit PDF Düzenleyici",
      subtitle: "PDF dosyalarınızı kolayca düzenleyin",
      uploadArea: {
        title: "PDF Dosyası Seçin",
        description: "Dosyanızı buraya sürükleyip bırakın",
        supportedFormats: "Desteklenen format: PDF",
        fileSelected: "Dosya seçildi"
      },
      features: {
        merge: {
          title: "Birleştir",
          description: "Birden fazla PDF'i birleştir"
        },
        split: {
          title: "Böl",
          description: "PDF'i sayfalara böl"
        },
        rotate: {
          title: "Döndür",
          description: "Sayfaları döndür"
        },
        delete: {
          title: "Sil",
          description: "Sayfaları sil"
        }
      },
      buttons: {
        selectFile: "Dosya Seç",
        merge: "Birleştir",
        split: "Böl",
        rotate: "Döndür",
        delete: "Sil",
        download: "İndir",
        cancel: "İptal",
        save: "Kaydet",
        edit: "Düzenle",
        upload: "Yükle"
      }
    },
    
    pdfEditor: {
      title: "PDF Düzenleyici",
      subtitle: "PDF'leri düzenleyin, metin ekleyin ve imzalayın",
      upload: {
        title: "PDF Yükle",
        description: "Düzenlemek için bir PDF dosyası seçin",
        selectFile: "Dosya Seç"
      },
      sidebar: {
        tools: "Araçlar",
        fileInfo: "Dosya Bilgisi",
        size: "Boyut",
        selectMove: "Seç & Taşı",
        addText: "Metin Ekle",
        addRectangle: "Dikdörtgen Ekle",
        addCircle: "Daire Ekle",
        createSignature: "İmza Oluştur",
        savedSignatures: "Kayıtlı İmzalar",
        annotations: "Açıklamalar"
      },
      signatureTypes: {
        drawn: "Çizilen",
        text: "Metin",
        signature: "İmza"
      },
      buttons: {
        placeToPdf: "PDF'e Yerleştir",
        select: "Seç",
        exportEditedPdf: "Düzenlenmiş PDF'i Dışa Aktar",
        downloadOriginalPdf: "Orijinal PDF'i İndir",
        uploadNewFile: "Yeni Dosya Yükle"
      },
      viewer: {
        successMessage: "PDF başarıyla yüklendi! Düzenlemeye başlayabilirsiniz.",
        toolInstructions: {
          addText: "Metin eklemek için PDF üzerine tıklayın",
          addRectangle: "Dikdörtgen eklemek için PDF üzerine tıklayın",
          addCircle: "Daire eklemek için PDF üzerine tıklayın",
          placeSignature: "İmzayı yerleştirmek için PDF üzerine tıklayın",
          clickToAdd: "Eklemek için tıklayın",
          textToolActive: "Metin aracı aktif - tıklayarak metin ekleyin",
          rectangleToolActive: "Dikdörtgen aracı aktif - tıklayarak şekil ekleyin",
          circleToolActive: "Daire aracı aktif - tıklayarak şekil ekleyin"
        }
      },
      signatureModal: {
        title: "İmza Oluştur",
        drawTab: "Çiz",
        typeTab: "Yaz",
        drawInstruction: "Aşağıdaki alana imzanızı çizin",
        clear: "Temizle",
        typeLabel: "İmza Metni:",
        typePlaceholder: "İmzanızı yazın",
        fontLabel: "Font:",
        preview: "Önizleme:",
        cancel: "İptal",
        addSignature: "İmza Ekle"
      }
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
      title: "PDF Converter - Free Online Tools",
      subtitle: "Easily convert, edit, and manage your PDFs. Fast and secure solutions for Word, Excel, PowerPoint, and more.",
      exploreTools: "Explore Tools",
      freeText: "Completely Free",
      stats: {
        filesConverted: "Files Converted",
        uptime: "Uptime",
        available: "Available"
      },
      sectionTitle: "PDF Tools",
      sectionSubtitle: "All the PDF tools you need in one place",
      tryNow: "Try Now",
      whyChooseTitle: "Why Choose Our Platform?",
      whyChooseSubtitle: "We provide the best experience for your PDF operations",
      features: {
        superFast: {
          title: "Super Fast",
          description: "Ultra-fast conversion based on advanced algorithms"
        },
        highQuality: {
          title: "High Quality",
          description: "Convert while preserving original format and quality"
        },
        easyToUse: {
          title: "Easy to Use",
          description: "Instant conversion with intuitive interface"
        },
        secure: {
          title: "Secure",
          description: "Your files are processed securely and not stored"
        },
        worksEverywhere: {
          title: "Works Everywhere",
          description: "Available on any device and browser"
        },
        completelyFree: {
          title: "Completely Free",
          description: "All tools are free, no hidden charges"
        },
        multipleFiles: {
          title: "Multiple Files",
          description: "Convert multiple files at once"
        }
      },
      cta: {
        title: "Start Your PDF Conversion Tasks",
        subtitle: "Use our tools for professional quality results",
        startNow: "Start Now",
        trustedText: "Trusted by millions of users"
      }
    },
    
    tools: {
      wordToPdf: {
        name: "Word to PDF",
        description: "Convert Word documents to PDF"
      },
      pdfEditor: {
        name: "PDF Editor",
        description: "Edit and sign PDF files"
      },
      pdfToExcel: {
        name: "PDF to Excel",
        description: "Convert PDF files to Excel"
      },
      pdfToPowerPoint: {
        name: "PDF to PowerPoint",
        description: "Convert PDF files to PowerPoint"
      },
      pdfToWord: {
        name: "PDF to Word",
        description: "Convert PDF files to Word"
      },
      imageToPdf: {
        name: "Image to PDF",
        description: "Convert images to PDF"
      },
      pdfToImage: {
        name: "PDF to Image",
        description: "Convert PDF files to images"
      },
      excelToPdf: {
        name: "Excel to PDF",
        description: "Convert Excel files to PDF"
      }
    },
    
    common: {
      error: "An error occurred"
    },
    
    toolPages: {
      wordToPdf: {
        title: "Word to PDF Converter",
        subtitle: "Convert your Word documents to high-quality PDFs",
        uploadArea: {
          title: "Select Word File",
          description: "Drag and drop your file here or click to select",
          supportedFormats: "Supported formats: DOC, DOCX",
          fileSelected: "File selected"
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
            description: "Quick file upload with drag and drop"
          },
          fast: {
            title: "Fast Conversion",
            description: "Ready results in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File converted successfully"
        }
      },
      pdfToWord: {
        title: "PDF to Word Converter",
        subtitle: "Convert your PDF files to editable Word documents",
        uploadArea: {
          title: "Select PDF File",
          description: "Drag and drop your file here or click to select",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected"
        },
        button: {
          convert: "Convert to Word",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves original formatting and layout"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag and drop"
          },
          fast: {
            title: "Fast Conversion",
            description: "Ready results in seconds"
          },
          textExtraction: {
            title: "Text Extraction",
            description: "Accurately extracts text content"
          },
          preserveFormatting: {
            title: "Preserve Formatting",
            description: "Maintains original format and layout"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File converted successfully"
        }
      },
      pdfToExcel: {
        title: "PDF to Excel Converter",
        subtitle: "Convert PDF tables to Excel spreadsheets",
        uploadArea: {
          title: "Select PDF File",
          description: "Drag and drop your file here or click to select",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected"
        },
        button: {
          convert: "Convert to Excel",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves original formatting and layout"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag and drop"
          },
          fast: {
            title: "Fast Conversion",
            description: "Ready results in seconds"
          },
          dataExtraction: {
            title: "Data Extraction",
            description: "Accurately extracts table data"
          },
          preserveFormatting: {
            title: "Preserve Formatting",
            description: "Maintains cell formatting and layout"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File converted successfully"
        }
      },
      pdfToPowerPoint: {
        title: "PDF to PowerPoint Converter",
        subtitle: "Convert PDFs to editable PowerPoint presentations",
        uploadArea: {
          title: "Select PDF File",
          description: "Drag and drop your file here or click to select",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected"
        },
        button: {
          convert: "Convert to PowerPoint",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves original formatting and layout"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag and drop"
          },
          fast: {
            title: "Fast Conversion",
            description: "Ready results in seconds"
          },
          slideExtraction: {
            title: "Slide Extraction",
            description: "Converts each page to a separate slide"
          },
          preserveLayout: {
            title: "Preserve Layout",
            description: "Maintains original page layout"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File converted successfully"
        }
      },
      imageToPdf: {
        title: "Image to PDF Converter",
        subtitle: "Convert multiple images into a single PDF file",
        uploadArea: {
          title: "Select Image Files",
          description: "Drag and drop your files here or click to select",
          supportedFormats: "Supported formats: JPG, PNG, JPEG, BMP, GIF",
          fileSelected: "files selected"
        },
        button: {
          convert: "Convert to PDF",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves original image quality"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Multiple file selection and drag-drop"
          },
          fast: {
            title: "Fast Conversion",
            description: "Ready results in seconds"
          },
          multipleImages: {
            title: "Multiple Images",
            description: "Combine multiple images into one PDF"
          },
          fastConversion: {
            title: "Fast Processing",
            description: "Batch image processing support"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred",
          invalidFileType: "Invalid file type"
        },
        success: {
          message: "Images converted to PDF successfully"
        }
      },
      pdfToImage: {
        title: "PDF to Image Converter",
        subtitle: "Convert PDF pages to high-quality images",
        uploadArea: {
          title: "Select PDF File",
          description: "Drag and drop your file here or click to select",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected"
        },
        button: {
          convert: "Convert to Images",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Maximum resolution output"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag and drop"
          },
          fast: {
            title: "Fast Conversion",
            description: "Ready results in seconds"
          },
          pageExtraction: {
            title: "Page Extraction",
            description: "Extracts each page as a separate image"
          },
          multipleFormats: {
            title: "Multiple Formats",
            description: "Output in JPG, PNG and other formats"
          },
          highResolution: {
            title: "High Resolution",
            description: "Sharp and clear image quality"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "PDF converted to images successfully"
        }
      },
      excelToPdf: {
        title: "Excel to PDF Converter",
        subtitle: "Convert Excel spreadsheets to PDF documents",
        uploadArea: {
          title: "Select Excel File",
          description: "Drag and drop your file here or click to select",
          supportedFormats: "Supported formats: XLS, XLSX",
          fileSelected: "File selected"
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
            description: "Quick file upload with drag and drop"
          },
          fast: {
            title: "Fast Conversion",
            description: "Ready results in seconds"
          },
          preserveFormatting: {
            title: "Preserve Formatting",
            description: "Maintains cell formatting and layout"
          },
          multipleSheets: {
            title: "Multiple Sheets",
            description: "Includes all worksheets"
          },
          professionalOutput: {
            title: "Professional Output",
            description: "Business-quality PDF documents"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "Excel file converted to PDF successfully"
        }
      }
    },
    
    simplePdfEditor: {
      title: "Simple PDF Editor",
      subtitle: "Edit your PDF files easily",
      uploadArea: {
        title: "Select PDF File",
        description: "Drag and drop your file here",
        supportedFormats: "Supported format: PDF",
        fileSelected: "File selected"
      },
      features: {
        merge: {
          title: "Merge",
          description: "Combine multiple PDFs"
        },
        split: {
          title: "Split",
          description: "Split PDF into pages"
        },
        rotate: {
          title: "Rotate",
          description: "Rotate pages"
        },
        delete: {
          title: "Delete",
          description: "Delete pages"
        }
      },
      buttons: {
        selectFile: "Select File",
        merge: "Merge",
        split: "Split",
        rotate: "Rotate",
        delete: "Delete",
        download: "Download",
        cancel: "Cancel",
        save: "Save",
        edit: "Edit",
        upload: "Upload"
      }
    },
    
    pdfEditor: {
      title: "PDF Editor",
      subtitle: "Edit PDFs, add text and signatures",
      upload: {
        title: "Upload PDF",
        description: "Select a PDF file to edit",
        selectFile: "Select File"
      },
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
        annotations: "Annotations"
      },
      signatureTypes: {
        drawn: "Drawn",
        text: "Text",
        signature: "Signature"
      },
      buttons: {
        placeToPdf: "Place to PDF",
        select: "Select",
        exportEditedPdf: "Export Edited PDF",
        downloadOriginalPdf: "Download Original PDF",
        uploadNewFile: "Upload New File"
      },
      viewer: {
        successMessage: "PDF loaded successfully! You can start editing.",
        toolInstructions: {
          addText: "Click on the PDF to add text",
          addRectangle: "Click on the PDF to add rectangle",
          addCircle: "Click on the PDF to add circle",
          placeSignature: "Click on the PDF to place signature",
          clickToAdd: "Click to add",
          textToolActive: "Text tool active - click to add text",
          rectangleToolActive: "Rectangle tool active - click to add shape",
          circleToolActive: "Circle tool active - click to add shape"
        }
      },
      signatureModal: {
        title: "Create Signature",
        drawTab: "Draw",
        typeTab: "Type",
        drawInstruction: "Draw your signature in the area below",
        clear: "Clear",
        typeLabel: "Signature Text:",
        typePlaceholder: "Type your signature",
        fontLabel: "Font:",
        preview: "Preview:",
        cancel: "Cancel",
        addSignature: "Add Signature"
      }
    }
  },
  
  de: {
    header: {
      appName: "PDF-Konverter",
      home: "Startseite",
      allTools: "Alle Tools",
      language: "Sprache"
    },
    
    home: {
      title: "PDF-Konverter - Kostenlose Online-Tools",
      subtitle: "Konvertieren, bearbeiten und verwalten Sie Ihre PDFs ganz einfach. Schnelle und sichere Lösungen für Word, Excel, PowerPoint und mehr.",
      exploreTools: "Tools erkunden",
      freeText: "Völlig kostenlos",
      stats: {
        filesConverted: "Dateien konvertiert",
        uptime: "Betriebszeit",
        available: "Verfügbar"
      },
      sectionTitle: "PDF-Tools",
      sectionSubtitle: "Alle PDF-Tools, die Sie brauchen, an einem Ort",
      tryNow: "Jetzt testen",
      whyChooseTitle: "Warum unsere Plattform wählen?",
      whyChooseSubtitle: "Wir bieten die beste Erfahrung für Ihre PDF-Operationen",
      features: {
        superFast: {
          title: "Super schnell",
          description: "Ultraschnelle Konvertierung basierend auf fortschrittlichen Algoritmen"
        },
        highQuality: {
          title: "Hohe Qualität",
          description: "Konvertierung unter Beibehaltung des ursprünglichen Formats und der Qualität"
        },
        easyToUse: {
          title: "Einfach zu verwenden",
          description: "Sofortige Konvertierung mit intuitiver Benutzeroberfläche"
        },
        secure: {
          title: "Sicher",
          description: "Ihre Dateien werden sicher verarbeitet und nicht gespeichert"
        },
        worksEverywhere: {
          title: "Funktioniert überall",
          description: "Verfügbar auf jedem Gerät und Browser"
        },
        completelyFree: {
          title: "Völlig kostenlos",
          description: "Alle Tools sind kostenlos, keine versteckten Gebühren"
        },
        multipleFiles: {
          title: "Mehrere Dateien",
          description: "Mehrere Dateien gleichzeitig konvertieren"
        }
      },
      cta: {
        title: "Starten Sie Ihre PDF-Konvertierungsaufgaben",
        subtitle: "Verwenden Sie unsere Tools für professionelle Qualitätsergebnisse",
        startNow: "Jetzt starten",
        trustedText: "Vertraut von Millionen von Benutzern"
      }
    },
    
    tools: {
      wordToPdf: {
        name: "Word zu PDF",
        description: "Word-Dokumente in PDF konvertieren"
      },
      pdfEditor: {
        name: "PDF-Editor",
        description: "PDF-Dateien bearbeiten und signieren"
      },
      pdfToExcel: {
        name: "PDF zu Excel",
        description: "PDF-Dateien in Excel konvertieren"
      },
      pdfToPowerPoint: {
        name: "PDF zu PowerPoint",
        description: "PDF-Dateien in PowerPoint konvertieren"
      },
      pdfToWord: {
        name: "PDF zu Word",
        description: "PDF-Dateien in Word konvertieren"
      },
      imageToPdf: {
        name: "Bild zu PDF",
        description: "Bilder in PDF konvertieren"
      },
      pdfToImage: {
        name: "PDF zu Bild",
        description: "PDF-Dateien in Bilder konvertieren"
      },
      excelToPdf: {
        name: "Excel zu PDF",
        description: "Excel-Dateien in PDF konvertieren"
      }
    },
    
    common: {
      error: "Ein Fehler ist aufgetreten"
    },
    
    toolPages: {
      wordToPdf: {
        title: "Word zu PDF Konverter",
        subtitle: "Konvertieren Sie Ihre Word-Dokumente zu hochwertigen PDFs",
        uploadArea: {
          title: "Word-Datei auswählen",
          description: "Ziehen Sie Ihre Datei hierher oder klicken Sie zum Auswählen",
          supportedFormats: "Unterstützte Formate: DOC, DOCX",
          fileSelected: "Datei ausgewählt"
        },
        button: {
          convert: "In PDF konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Behält ursprüngliche Formatierung und Layout bei"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Schneller Datei-Upload mit Drag & Drop"
          },
          fast: {
            title: "Schnelle Konvertierung",
            description: "Fertige Ergebnisse in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert"
        }
      },
      pdfToWord: {
        title: "PDF zu Word Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Dateien zu bearbeitbaren Word-Dokumenten",
        uploadArea: {
          title: "PDF-Datei auswählen",
          description: "Ziehen Sie Ihre Datei burada bırakın veya seçmek için tıklayın",
          supportedFormats: "Unterstütztes Format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "In Word konvertieren",
          converting: "Konvertierung..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Behält ursprüngliche Formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          textExtraction: {
            title: "Metin Çıkarma",
            description: "Metinleri tam olarak çıkarır"
          },
          preserveFormatting: {
            title: "Format Koruma",
            description: "Orijinal formatı ve düzeni korur"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü"
        }
      },
      pdfToExcel: {
        title: "PDF'den Excel'e Dönüştürücü",
        subtitle: "PDF tablolarını Excel elektronik tablolarına dönüştürün",
        uploadArea: {
          title: "PDF Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "Excel'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          dataExtraction: {
            title: "Veri Çıkarma",
            description: "Tabloları tam olarak çıkarır"
          },
          preserveFormatting: {
            title: "Format Koruma",
            description: "Hücre formatını ve düzenini korur"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü"
        }
      },
      pdfToPowerPoint: {
        title: "PDF'den PowerPoint'e Dönüştürücü",
        subtitle: "PDF'leri düzenlenebilir PowerPoint sunumlarına dönüştürün",
        uploadArea: {
          title: "PDF Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "PowerPoint'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          slideExtraction: {
            title: "Slayt Çıkarma",
            description: "Her sayfayı ayrı slayta dönüştürür"
          },
          preserveLayout: {
            title: "Düzen Koruma",
            description: "Orijinal sayfa düzenini korur"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü"
        }
      },
      imageToPdf: {
        title: "Resim'den PDF'e Dönüştürücü",
        subtitle: "Birden fazla resmi tek bir PDF dosyasına dönüştürün",
        uploadArea: {
          title: "Resim Dosyalarını Seçin",
          description: "Dosyalarınızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen formatlar: JPG, PNG, JPEG, BMP, GIF",
          fileSelected: "dosya seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal resim kalitesini korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Çoklu dosya seçimi ve sürükle-bırak"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          multipleImages: {
            title: "Çoklu Resim",
            description: "Birden fazla resmi tek PDF'de birleştir"
          },
          fastConversion: {
            title: "Hızlı İşlem",
            description: "Toplu resim işleme desteği"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu",
          invalidFileType: "Geçersiz dosya türü"
        },
        success: {
          message: "Resimler başarıyla PDF'e dönüştürüldü"
        }
      },
      pdfToImage: {
        title: "PDF'den Resim'e Dönüştürücü",
        subtitle: "PDF sayfalarını yüksek kaliteli resimlere dönüştürün",
        uploadArea: {
          title: "PDF Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "Resimlere Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Maksimum çözünürlükte çıktı"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          pageExtraction: {
            title: "Sayfa Çıkarma",
            description: "Her sayfayı ayrı resim olarak çıkarır"
          },
          multipleFormats: {
            title: "Çoklu Format",
            description: "JPG, PNG ve diğer formatlarda çıktı"
          },
          highResolution: {
            title: "Yüksek Çözünürlük",
            description: "Net ve keskin resim kalitesi"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "PDF başarıyla resimlere dönüştürüldü"
        }
      },
      excelToPdf: {
        title: "Excel'den PDF'e Dönüştürücü",
        subtitle: "Excel elektronik tablolarını PDF belgelerine dönüştürün",
        uploadArea: {
          title: "Excel Dosyası Seçin",
          description: "Dosyanızı buraya sürükleyip bırakın veya seçmek için tıklayın",
          supportedFormats: "Desteklenen formatlar: XLS, XLSX",
          fileSelected: "Dosya seçildi"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatı ve düzeni korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı Dönüştürme",
            description: "Saniyeler içinde hazır sonuçlar"
          },
          preserveFormatting: {
            title: "Format Koruma",
            description: "Hücre formatını ve düzenini korur"
          },
          multipleSheets: {
            title: "Çoklu Sayfa",
            description: "Tüm çalışma sayfalarını dahil eder"
          },
          professionalOutput: {
            title: "Profesyonel Çıktı",
            description: "İş kalitesinde PDF belgeleri"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Excel dosyası başarıyla PDF'e dönüştürüldü"
        }
      }
    },
    
    simplePdfEditor: {
      title: "Einfacher PDF-Editor",
      subtitle: "Bearbeiten Sie Ihre PDF-Dateien einfach",
      uploadArea: {
        title: "PDF-Datei auswählen",
        description: "Ziehen Sie Ihre Datei burada bırakın",
        supportedFormats: "Unterstütztes Format: PDF",
        fileSelected: "Datei seçildi"
      },
      features: {
        merge: {
          title: "Zusammenführen",
          description: "Mehrere PDFs zusammenführen"
        },
        split: {
          title: "Teilen",
          description: "PDF in Seiten aufteilen"
        },
        rotate: {
          title: "Drehen",
          description: "Seiten drehen"
        },
        delete: {
          title: "Löschen",
          description: "Seiten löschen"
        }
      },
      buttons: {
        selectFile: "Datei auswählen",
        merge: "Zusammenführen",
        split: "Teilen",
        rotate: "Drehen",
        delete: "Löschen",
        download: "Herunterladen",
        cancel: "Abbrechen",
        save: "Speichern",
        edit: "Bearbeiten",
        upload: "Hochladen"
      }
    },
    
    pdfEditor: {
      title: "PDF-Editor",
      subtitle: "PDFs bearbeiten, Text hinzufügen und signieren",
      upload: {
        title: "PDF hochladen",
        description: "Wählen Sie eine PDF-Datei zum Bearbeiten aus",
        selectFile: "Datei auswählen"
      },
      sidebar: {
        tools: "Werkzeuge",
        fileInfo: "Dateiinformationen",
        size: "Größe",
        selectMove: "Auswählen und Bewegen",
        addText: "Text hinzufügen",
        addRectangle: "Rechteck hinzufügen",
        addCircle: "Kreis hinzufügen",
        createSignature: "Signatur erstellen",
        savedSignatures: "Gespeicherte Signaturen",
        annotations: "Anmerkungen"
      },
      signatureTypes: {
        drawn: "Gezeichnet",
        text: "Text",
        signature: "Signatur"
      },
      buttons: {
        placeToPdf: "In PDF platzieren",
        select: "Auswählen",
        exportEditedPdf: "Bearbeitetes PDF exportieren",
        downloadOriginalPdf: "Original-PDF herunterladen",
        uploadNewFile: "Neue Datei hochladen"
      },
      viewer: {
        successMessage: "PDF erfolgreich geladen! Sie können mit der Bearbeitung beginnen.",
        toolInstructions: {
          addText: "Klicken Sie auf das PDF, um Text hinzuzufügen",
          addRectangle: "Klicken Sie auf das PDF, um ein Rechteck hinzuzufügen",
          addCircle: "Klicken Sie auf das PDF, um einen Kreis hinzuzufügen",
          placeSignature: "Klicken Sie auf das PDF, um die Signatur zu platzieren",
          clickToAdd: "Klicken Sie zum Hinzufügen",
          textToolActive: "Textwerkzeug aktiv - klicken Sie, um Text hinzuzufügen",
          rectangleToolActive: "Rechteckwerkzeug aktiv - klicken Sie, um Form hinzuzufügen",
          circleToolActive: "Kreiswerkzeug aktiv - klicken Sie, um Form hinzuzufügen"
        }
      },
      signatureModal: {
        title: "Signatur erstellen",
        drawTab: "Zeichnen",
        typeTab: "Tippen",
        drawInstruction: "Zeichnen Sie Ihre Signatur in den Bereich unten",
        clear: "Löschen",
        typeLabel: "Signaturtext:",
        typePlaceholder: "Geben Sie Ihre Signatur ein",
        fontLabel: "Schriftart:",
        preview: "Vorschau:",
        cancel: "Abbrechen",
        addSignature: "Signatur hinzufügen"
      }
    }
  }
};

// Export function to get translations by language code
export const getTranslation = (languageCode: string): Translations => {
  switch (languageCode) {
    case 'tr':
      return translations.tr;
    case 'en':
      return translations.en;
    case 'de':
      return translations.de;
    default:
      return translations.tr; // Default to Turkish
  }
};
