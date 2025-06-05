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
    },
    home: {
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
      },
      excelToPdf: {
        name: "Excel'den PDF'e",
        description: "Excel dosyalarını PDF formatına dönüştürün",
      },
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
    },
    home: {
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
