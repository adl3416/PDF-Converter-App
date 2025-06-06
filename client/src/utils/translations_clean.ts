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
    };
    cta: {
      title: string;
      subtitle: string;
      startNow: string;
      trustedText: string;
    };
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
      };
      errors: {
        conversionFailed: string;
        networkError: string;
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
}

export const translations: Record<string, Translations> = {
  tr: {
    header: {
      appName: "PDF Dönüştürücü",
      home: "Ana Sayfa",
      allTools: "Tüm Araçlar",
      language: "Dil",
    },
    home: {
      title: "İş Akışınızı Geliştirin",
      subtitle: "Dosyalarınızı hızla PDF formatına dönüştürün",
      exploreTools: "Araçları Keşfedin",
      freeText: "Ücretsiz",
      stats: {
        filesConverted: "Dönüştürülen Dosya",
        uptime: "Çalışma Süresi",
        available: "7/24 Kullanılabilir",
      },
      sectionTitle: "Güçlü PDF Araçları",
      sectionSubtitle: "İhtiyacınız olan her şey tek yerde",
      tryNow: "Şimdi Deneyin",
      whyChooseTitle: "Neden Platformumuzu Seçmelisiniz?",
      whyChooseSubtitle: "Hızlı, güvenli ve kullanımı kolay PDF dönüştürme araçları",
      features: {
        superFast: {
          title: "Süper Hızlı",
          description: "Dosyalarınızı saniyeler içinde dönüştürün"
        },
        highQuality: {
          title: "Yüksek Kalite",
          description: "Orijinal formatınızı koruyun"
        },
        easyToUse: {
          title: "Kullanımı Kolay",
          description: "Sürükle-bırak ile kolay kullanım"
        },
        secure: {
          title: "Güvenli",
          description: "Dosyalarınız güvende ve özel"
        }
      },
      cta: {
        title: "PDF Dönüştürme İşlemine Başlayın",
        subtitle: "Ücretsiz, hızlı ve güvenli dosya dönüştürme",
        startNow: "Şimdi Başlayın",
        trustedText: "Milyonlarca kullanıcı tarafından güvenilir"
      }
    },
    toolPages: {
      wordToPdf: {
        title: "Word'den PDF'e Dönüştürücü",
        subtitle: "Word belgelerinizi yüksek kaliteli PDF dosyalarına dönüştürün",
        uploadArea: {
          title: "Word dosyanızı buraya sürükleyin",
          description: "veya bilgisayarınızdan seçin",
          supportedFormats: "Desteklenen formatlar: DOC, DOCX",
          fileSelected: "Dosya seçildi:"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Orijinal formatınızı ve düzeninizi korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme işlemi başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToWord: {
        title: "PDF'den Word'e Dönüştürücü",
        subtitle: "PDF dosyalarınızı düzenlenebilir Word belgelerine dönüştürün",
        uploadArea: {
          title: "PDF dosyanızı buraya sürükleyin",
          description: "veya bilgisayarınızdan seçin",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi:"
        },
        button: {
          convert: "Word'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Metin ve formatı tam olarak korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme işlemi başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToExcel: {
        title: "PDF'den Excel'e Dönüştürücü",
        subtitle: "PDF tablolarınızı düzenlenebilir Excel dosyalarına dönüştürün",
        uploadArea: {
          title: "PDF dosyanızı buraya sürükleyin",
          description: "veya bilgisayarınızdan seçin",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi:"
        },
        button: {
          convert: "Excel'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Tablo yapısını ve verileri korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme işlemi başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToPowerPoint: {
        title: "PDF'den PowerPoint'e Dönüştürücü",
        subtitle: "PDF dosyalarınızı düzenlenebilir PowerPoint sunumlarına dönüştürün",
        uploadArea: {
          title: "PDF dosyanızı buraya sürükleyin",
          description: "veya bilgisayarınızdan seçin",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi:"
        },
        button: {
          convert: "PowerPoint'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Sayfa düzenini ve içeriği korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme işlemi başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      imageToPdf: {
        title: "Resim'den PDF'e Dönüştürücü",
        subtitle: "Resimlerinizi tek bir PDF dosyasında birleştirin",
        uploadArea: {
          title: "Resim dosyalarınızı buraya sürükleyin",
          description: "veya bilgisayarınızdan seçin (Çoklu seçim desteklenir)",
          supportedFormats: "Desteklenen formatlar: JPG, PNG, GIF, BMP",
          fileSelected: "Dosya seçildi:"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Resim kalitesini korur"
          },
          easyUpload: {
            title: "Çoklu Yükleme",
            description: "Birden fazla resmi aynı anda yükleyin"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme işlemi başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      pdfToImage: {
        title: "PDF'den Resim'e Dönüştürücü",
        subtitle: "PDF sayfalarınızı yüksek kaliteli resimlere dönüştürün",
        uploadArea: {
          title: "PDF dosyanızı buraya sürükleyin",
          description: "veya bilgisayarınızdan seçin",
          supportedFormats: "Desteklenen format: PDF",
          fileSelected: "Dosya seçildi:"
        },
        button: {
          convert: "Resim'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Sayfa kalitesini korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme işlemi başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      },
      excelToPdf: {
        title: "Excel'den PDF'e Dönüştürücü",
        subtitle: "Excel dosyalarınızı profesyonel PDF belgelerine dönüştürün",
        uploadArea: {
          title: "Excel dosyanızı buraya sürükleyin",
          description: "veya bilgisayarınızdan seçin",
          supportedFormats: "Desteklenen formatlar: XLS, XLSX",
          fileSelected: "Dosya seçildi:"
        },
        button: {
          convert: "PDF'e Dönüştür",
          converting: "Dönüştürülüyor..."
        },
        features: {
          highQuality: {
            title: "Yüksek Kalite",
            description: "Tablo yapısını ve formatı korur"
          },
          easyUpload: {
            title: "Kolay Yükleme",
            description: "Sürükle-bırak ile hızlı dosya yükleme"
          },
          fast: {
            title: "Hızlı İşlem",
            description: "Saniyeler içinde dönüştürme"
          }
        },
        errors: {
          conversionFailed: "Dönüştürme işlemi başarısız oldu",
          networkError: "Ağ hatası oluştu"
        },
        success: {
          message: "Dosya başarıyla dönüştürüldü!"
        }
      }
    },
    simplePdfEditor: {
      title: "Basit PDF Editörü",
      subtitle: "PDF dosyalarınızı düzenleyin, birleştirin ve yönetin",
      uploadArea: {
        title: "PDF dosyanızı buraya sürükleyin",
        description: "veya bilgisayarınızdan seçin",
        supportedFormats: "Desteklenen format: PDF",
        fileSelected: "Dosya seçildi:"
      },
      features: {
        merge: {
          title: "Birleştir",
          description: "Birden fazla PDF'i birleştirin"
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
          description: "İstenmeyen sayfaları silin"
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
    }
  },
  
  en: {
    header: {
      appName: "PDF Converter",
      home: "Home",
      allTools: "All Tools",
      language: "Language",
    },
    home: {
      title: "Enhance Your Workflow",
      subtitle: "Convert your files to PDF format quickly",
      exploreTools: "Explore Tools",
      freeText: "Free",
      stats: {
        filesConverted: "Files Converted",
        uptime: "Uptime",
        available: "Available 24/7",
      },
      sectionTitle: "Powerful PDF Tools",
      sectionSubtitle: "Everything you need in one place",
      tryNow: "Try Now",
      whyChooseTitle: "Why Choose Our Platform?",
      whyChooseSubtitle: "Fast, secure, and easy-to-use PDF conversion tools",
      features: {
        superFast: {
          title: "Super Fast",
          description: "Convert your files in seconds"
        },
        highQuality: {
          title: "High Quality",
          description: "Preserve your original formatting"
        },
        easyToUse: {
          title: "Easy to Use",
          description: "Simple drag-and-drop interface"
        },
        secure: {
          title: "Secure",
          description: "Your files are safe and private"
        }
      },
      cta: {
        title: "Start Converting PDFs",
        subtitle: "Free, fast, and secure file conversion",
        startNow: "Start Now",
        trustedText: "Trusted by millions of users"
      }
    },
    toolPages: {
      wordToPdf: {
        title: "Word to PDF Converter",
        subtitle: "Convert your Word documents to high-quality PDF files",
        uploadArea: {
          title: "Drag your Word file here",
          description: "or choose from your computer",
          supportedFormats: "Supported formats: DOC, DOCX",
          fileSelected: "File selected:"
        },
        button: {
          convert: "Convert to PDF",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves your original formatting and layout"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag-and-drop"
          },
          fast: {
            title: "Fast Processing",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File successfully converted!"
        }
      },
      pdfToWord: {
        title: "PDF to Word Converter",
        subtitle: "Convert your PDF files to editable Word documents",
        uploadArea: {
          title: "Drag your PDF file here",
          description: "or choose from your computer",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected:"
        },
        button: {
          convert: "Convert to Word",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves text and formatting perfectly"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag-and-drop"
          },
          fast: {
            title: "Fast Processing",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File successfully converted!"
        }
      },
      pdfToExcel: {
        title: "PDF to Excel Converter",
        subtitle: "Convert your PDF tables to editable Excel files",
        uploadArea: {
          title: "Drag your PDF file here",
          description: "or choose from your computer",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected:"
        },
        button: {
          convert: "Convert to Excel",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves table structure and data"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag-and-drop"
          },
          fast: {
            title: "Fast Processing",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File successfully converted!"
        }
      },
      pdfToPowerPoint: {
        title: "PDF to PowerPoint Converter",
        subtitle: "Convert your PDF files to editable PowerPoint presentations",
        uploadArea: {
          title: "Drag your PDF file here",
          description: "or choose from your computer",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected:"
        },
        button: {
          convert: "Convert to PowerPoint",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves page layout and content"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag-and-drop"
          },
          fast: {
            title: "Fast Processing",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File successfully converted!"
        }
      },
      imageToPdf: {
        title: "Image to PDF Converter",
        subtitle: "Combine your images into a single PDF document",
        uploadArea: {
          title: "Drag your image files here",
          description: "or choose from your computer (Multiple selection supported)",
          supportedFormats: "Supported formats: JPG, PNG, GIF, BMP",
          fileSelected: "File selected:"
        },
        button: {
          convert: "Convert to PDF",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves image quality"
          },
          easyUpload: {
            title: "Multiple Upload",
            description: "Upload multiple images at once"
          },
          fast: {
            title: "Fast Processing",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File successfully converted!"
        }
      },
      pdfToImage: {
        title: "PDF to Image Converter",
        subtitle: "Convert your PDF pages to high-quality images",
        uploadArea: {
          title: "Drag your PDF file here",
          description: "or choose from your computer",
          supportedFormats: "Supported format: PDF",
          fileSelected: "File selected:"
        },
        button: {
          convert: "Convert to Images",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves page quality"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag-and-drop"
          },
          fast: {
            title: "Fast Processing",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File successfully converted!"
        }
      },
      excelToPdf: {
        title: "Excel to PDF Converter",
        subtitle: "Convert your Excel files to professional PDF documents",
        uploadArea: {
          title: "Drag your Excel file here",
          description: "or choose from your computer",
          supportedFormats: "Supported formats: XLS, XLSX",
          fileSelected: "File selected:"
        },
        button: {
          convert: "Convert to PDF",
          converting: "Converting..."
        },
        features: {
          highQuality: {
            title: "High Quality",
            description: "Preserves table structure and formatting"
          },
          easyUpload: {
            title: "Easy Upload",
            description: "Quick file upload with drag-and-drop"
          },
          fast: {
            title: "Fast Processing",
            description: "Convert in seconds"
          }
        },
        errors: {
          conversionFailed: "Conversion failed",
          networkError: "Network error occurred"
        },
        success: {
          message: "File successfully converted!"
        }
      }
    },
    simplePdfEditor: {
      title: "Simple PDF Editor",
      subtitle: "Edit, merge, and manage your PDF files",
      uploadArea: {
        title: "Drag your PDF file here",
        description: "or choose from your computer",
        supportedFormats: "Supported format: PDF",
        fileSelected: "File selected:"
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
          description: "Remove unwanted pages"
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
    }
  },
  
  de: {
    header: {
      appName: "PDF Konverter",
      home: "Startseite",
      allTools: "Alle Tools",
      language: "Sprache",
    },
    home: {
      title: "Verbessern Sie Ihren Workflow",
      subtitle: "Konvertieren Sie Ihre Dateien schnell in das PDF-Format",
      exploreTools: "Tools erkunden",
      freeText: "Kostenlos",
      stats: {
        filesConverted: "Dateien konvertiert",
        uptime: "Betriebszeit",
        available: "24/7 verfügbar",
      },
      sectionTitle: "Leistungsstarke PDF-Tools",
      sectionSubtitle: "Alles was Sie brauchen an einem Ort",
      tryNow: "Jetzt versuchen",
      whyChooseTitle: "Warum unsere Plattform wählen?",
      whyChooseSubtitle: "Schnelle, sichere und einfach zu bedienende PDF-Konvertierungstools",
      features: {
        superFast: {
          title: "Super schnell",
          description: "Konvertieren Sie Ihre Dateien in Sekunden"
        },
        highQuality: {
          title: "Hohe Qualität",
          description: "Bewahren Sie Ihre ursprüngliche Formatierung"
        },
        easyToUse: {
          title: "Einfach zu verwenden",
          description: "Einfache Drag-and-Drop-Oberfläche"
        },
        secure: {
          title: "Sicher",
          description: "Ihre Dateien sind sicher und privat"
        }
      },
      cta: {
        title: "Starten Sie die PDF-Konvertierung",
        subtitle: "Kostenlose, schnelle und sichere Dateikonvertierung",
        startNow: "Jetzt starten",
        trustedText: "Vertraut von Millionen von Nutzern"
      }
    },
    toolPages: {
      wordToPdf: {
        title: "Word zu PDF Konverter",
        subtitle: "Konvertieren Sie Ihre Word-Dokumente in hochwertige PDF-Dateien",
        uploadArea: {
          title: "Ziehen Sie Ihre Word-Datei hierher",
          description: "oder wählen Sie von Ihrem Computer",
          supportedFormats: "Unterstützte Formate: DOC, DOCX",
          fileSelected: "Datei ausgewählt:"
        },
        button: {
          convert: "Zu PDF konvertieren",
          converting: "Konvertiere..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt Ihre ursprüngliche Formatierung und Layout"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Schneller Datei-Upload mit Drag-and-Drop"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToWord: {
        title: "PDF zu Word Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Dateien in bearbeitbare Word-Dokumente",
        uploadArea: {
          title: "Ziehen Sie Ihre PDF-Datei hierher",
          description: "oder wählen Sie von Ihrem Computer",
          supportedFormats: "Unterstütztes Format: PDF",
          fileSelected: "Datei ausgewählt:"
        },
        button: {
          convert: "Zu Word konvertieren",
          converting: "Konvertiere..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt Text und Formatierung perfekt"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Schneller Datei-Upload mit Drag-and-Drop"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToExcel: {
        title: "PDF zu Excel Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Tabellen in bearbeitbare Excel-Dateien",
        uploadArea: {
          title: "Ziehen Sie Ihre PDF-Datei hierher",
          description: "oder wählen Sie von Ihrem Computer",
          supportedFormats: "Unterstütztes Format: PDF",
          fileSelected: "Datei ausgewählt:"
        },
        button: {
          convert: "Zu Excel konvertieren",
          converting: "Konvertiere..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt Tabellenstruktur und Daten"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Schneller Datei-Upload mit Drag-and-Drop"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToPowerPoint: {
        title: "PDF zu PowerPoint Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Dateien in bearbeitbare PowerPoint-Präsentationen",
        uploadArea: {
          title: "Ziehen Sie Ihre PDF-Datei hierher",
          description: "oder wählen Sie von Ihrem Computer",
          supportedFormats: "Unterstütztes Format: PDF",
          fileSelected: "Datei ausgewählt:"
        },
        button: {
          convert: "Zu PowerPoint konvertieren",
          converting: "Konvertiere..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt Seitenlayout und Inhalt"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Schneller Datei-Upload mit Drag-and-Drop"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      imageToPdf: {
        title: "Bild zu PDF Konverter",
        subtitle: "Kombinieren Sie Ihre Bilder in ein einziges PDF-Dokument",
        uploadArea: {
          title: "Ziehen Sie Ihre Bilddateien hierher",
          description: "oder wählen Sie von Ihrem Computer (Mehrfachauswahl unterstützt)",
          supportedFormats: "Unterstützte Formate: JPG, PNG, GIF, BMP",
          fileSelected: "Datei ausgewählt:"
        },
        button: {
          convert: "Zu PDF konvertieren",
          converting: "Konvertiere..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt Bildqualität"
          },
          easyUpload: {
            title: "Mehrfach-Upload",
            description: "Laden Sie mehrere Bilder gleichzeitig hoch"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      pdfToImage: {
        title: "PDF zu Bild Konverter",
        subtitle: "Konvertieren Sie Ihre PDF-Seiten in hochwertige Bilder",
        uploadArea: {
          title: "Ziehen Sie Ihre PDF-Datei hierher",
          description: "oder wählen Sie von Ihrem Computer",
          supportedFormats: "Unterstütztes Format: PDF",
          fileSelected: "Datei ausgewählt:"
        },
        button: {
          convert: "Zu Bildern konvertieren",
          converting: "Konvertiere..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt Seitenqualität"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Schneller Datei-Upload mit Drag-and-Drop"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      },
      excelToPdf: {
        title: "Excel zu PDF Konverter",
        subtitle: "Konvertieren Sie Ihre Excel-Dateien in professionelle PDF-Dokumente",
        uploadArea: {
          title: "Ziehen Sie Ihre Excel-Datei hierher",
          description: "oder wählen Sie von Ihrem Computer",
          supportedFormats: "Unterstützte Formate: XLS, XLSX",
          fileSelected: "Datei ausgewählt:"
        },
        button: {
          convert: "Zu PDF konvertieren",
          converting: "Konvertiere..."
        },
        features: {
          highQuality: {
            title: "Hohe Qualität",
            description: "Bewahrt Tabellenstruktur und Formatierung"
          },
          easyUpload: {
            title: "Einfacher Upload",
            description: "Schneller Datei-Upload mit Drag-and-Drop"
          },
          fast: {
            title: "Schnelle Verarbeitung",
            description: "Konvertierung in Sekunden"
          }
        },
        errors: {
          conversionFailed: "Konvertierung fehlgeschlagen",
          networkError: "Netzwerkfehler aufgetreten"
        },
        success: {
          message: "Datei erfolgreich konvertiert!"
        }
      }
    },
    simplePdfEditor: {
      title: "Einfacher PDF-Editor",
      subtitle: "Bearbeiten, zusammenführen und verwalten Sie Ihre PDF-Dateien",
      uploadArea: {
        title: "Ziehen Sie Ihre PDF-Datei hierher",
        description: "oder wählen Sie von Ihrem Computer",
        supportedFormats: "Unterstütztes Format: PDF",
        fileSelected: "Datei ausgewählt:"
      },
      features: {
        merge: {
          title: "Zusammenführen",
          description: "Mehrere PDFs kombinieren"
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
          description: "Unerwünschte Seiten entfernen"
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
    }
  }
};

// Export function to get translation for a specific language
export const getTranslation = (language: string): Translations => {
  return translations[language as keyof typeof translations] || translations.en;
};

// Export default
export default translations;
