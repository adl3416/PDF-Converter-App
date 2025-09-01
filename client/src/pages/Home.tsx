import React from 'react';
import { Link } from 'react-router-dom';
import { 
    FileText, 
    Download, 
    Edit3, 
    Image, 
    ArrowRight, 
    Zap, 
    Shield, 
    Smartphone, 
    Target, 
    DollarSign, 
    RefreshCw,
    CheckCircle,
    Star,
    Users,
    FileSpreadsheet,
    File,
    Presentation
} from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
    const { translations } = useLanguage();

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 pt-20 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"></div>
                <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
                <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-[1400px]">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 font-extrabold drop-shadow-sm">{translations.home.title}</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            {translations.home.subtitle}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link 
                                to="/word-to-pdf"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                            >
                                {translations.home.exploreTools}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                <span className="font-medium">{translations.home.freeText}</span>
                            </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">50K+</div>
                                <div className="text-gray-600">{translations.home.stats.filesConverted}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                                <div className="text-gray-600">{translations.home.stats.uptime}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">24/7</div>
                                <div className="text-gray-600">{translations.home.stats.available}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Most Popular PDF Tools */}
            <section className="py-20">
                <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{translations.home.sectionTitle}</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {translations.home.sectionSubtitle}
                        </p>
                    </div>

                    {/* First Row - Main Tools */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Link 
                            to="/word-to-pdf"
                            className="group bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-3xl p-8 hover:shadow-2xl hover:border-blue-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300 shadow-lg">
                                <FileText className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-blue-900 mb-3 group-hover:text-blue-800">{translations.tools.wordToPdf.name}</h3>
                            <p className="text-blue-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.wordToPdf.description}</p>
                            <div className="flex items-center text-blue-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link 
                            to="/pdf-editor"
                            className="group bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-3xl p-8 hover:shadow-2xl hover:border-green-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-green-700 group-hover:to-green-800 transition-all duration-300 shadow-lg">
                                <Edit3 className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-green-900 mb-3 group-hover:text-green-800">{translations.tools.pdfEditor.name}</h3>
                            <p className="text-green-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.pdfEditor.description}</p>
                            <div className="flex items-center text-green-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link 
                            to="/pdf-to-excel"
                            className="group bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-3xl p-8 hover:shadow-2xl hover:border-orange-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-orange-700 group-hover:to-orange-800 transition-all duration-300 shadow-lg">
                                <FileSpreadsheet className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-orange-900 mb-3 group-hover:text-orange-800">{translations.tools.pdfToExcel.name}</h3>
                            <p className="text-orange-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.pdfToExcel.description}</p>
                            <div className="flex items-center text-orange-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link 
                            to="/pdf-to-powerpoint"
                            className="group bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-3xl p-8 hover:shadow-2xl hover:border-red-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-red-700 group-hover:to-red-800 transition-all duration-300 shadow-lg">
                                <Presentation className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-red-900 mb-3 group-hover:text-red-800">{translations.tools.pdfToPowerPoint.name}</h3>
                            <p className="text-red-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.pdfToPowerPoint.description}</p>
                            <div className="flex items-center text-red-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>

                    {/* Second Row - Additional Tools */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link 
                            to="/pdf-to-word"
                            className="group bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-3xl p-8 hover:shadow-2xl hover:border-purple-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-700 group-hover:to-purple-800 transition-all duration-300 shadow-lg">
                                <File className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 mb-3 group-hover:text-purple-800">{translations.tools.pdfToWord.name}</h3>
                            <p className="text-purple-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.pdfToWord.description}</p>
                            <div className="flex items-center text-purple-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                        <Link 
                            to="/image-to-pdf"
                            className="group bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-3xl p-8 hover:shadow-2xl hover:border-pink-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-pink-700 group-hover:to-pink-800 transition-all duration-300 shadow-lg">
                                <Image className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-pink-900 mb-3 group-hover:text-pink-800">{translations.tools.imageToPdf.name}</h3>
                            <p className="text-pink-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.imageToPdf.description}</p>
                            <div className="flex items-center text-pink-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link 
                            to="/pdf-to-image"
                            className="group bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200 rounded-3xl p-8 hover:shadow-2xl hover:border-indigo-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-indigo-700 group-hover:to-indigo-800 transition-all duration-300 shadow-lg">
                                <Download className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-indigo-900 mb-3 group-hover:text-indigo-800">{translations.tools.pdfToImage.name}</h3>
                            <p className="text-indigo-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.pdfToImage.description}</p>
                            <div className="flex items-center text-indigo-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link 
                            to="/excel-to-pdf"
                            className="group bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-3xl p-8 hover:shadow-2xl hover:border-teal-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-teal-700 group-hover:to-teal-800 transition-all duration-300 shadow-lg">
                                <FileSpreadsheet className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-teal-900 mb-3 group-hover:text-teal-800">{translations.tools.excelToPdf.name}</h3>
                            <p className="text-teal-700 text-sm font-medium mb-4 leading-relaxed">{translations.tools.excelToPdf.description}</p>
                            <div className="flex items-center text-teal-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>

                    {/* Add Split PDF Tool Card */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <Link 
                            to="/split-pdf"
                            className="group bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-3xl p-8 hover:shadow-2xl hover:border-pink-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-pink-600 to-pink-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-pink-700 group-hover:to-pink-800 transition-all duration-300 shadow-lg">
                                <File className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-pink-900 mb-3 group-hover:text-pink-800">Split PDF</h3>
                            <p className="text-pink-700 text-sm font-medium mb-4 leading-relaxed">PDF dosyanızdan istediğiniz sayfaları kolayca ayırın. Kalite kaybı olmadan!</p>
                            <div className="flex items-center text-pink-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                        <Link 
                            to="/merge-pdf"
                            className="group bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-3xl p-8 hover:shadow-2xl hover:border-purple-400 hover:scale-105 transition-all duration-300"
                        >
                            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-700 group-hover:to-purple-800 transition-all duration-300 shadow-lg">
                                <File className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-purple-900 mb-3 group-hover:text-purple-800">Merge PDF</h3>
                            <p className="text-purple-700 text-sm font-medium mb-4 leading-relaxed">Birden fazla PDF dosyasını tek bir dosyada birleştirin. Sürükleyin, seçin ve birleştirin!</p>
                            <div className="flex items-center text-purple-600 text-sm font-bold">
                                {translations.home.tryNow} <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">{translations.home.whyChooseTitle}</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {translations.home.whyChooseSubtitle}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{translations.home.features.superFast.title}</h3>
                            <p className="text-gray-600">
                                {translations.home.features.superFast.description}
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{translations.home.features.secure.title}</h3>
                            <p className="text-gray-600">
                                {translations.home.features.secure.description}
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Smartphone className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{translations.home.features.worksEverywhere.title}</h3>
                            <p className="text-gray-600">
                                {translations.home.features.worksEverywhere.description}
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{translations.home.features.highQuality.title}</h3>
                            <p className="text-gray-600">
                                {translations.home.features.highQuality.description}
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <DollarSign className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{translations.home.features.completelyFree.title}</h3>
                            <p className="text-gray-600">
                                {translations.home.features.completelyFree.description}
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <RefreshCw className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{translations.home.features.multipleFiles.title}</h3>
                            <p className="text-gray-600">
                                {translations.home.features.multipleFiles.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="container mx-auto px-4 md:px-8 text-center max-w-[1400px]">
                    <h2 className="text-4xl font-bold text-white mb-6">{translations.home.cta.title}</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        {translations.home.cta.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            to="/word-to-pdf"
                            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                        >
                            {translations.home.cta.startNow}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2 text-blue-100">
                            <Users className="w-5 h-5" />
                            <span>{translations.home.cta.trustedText}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;