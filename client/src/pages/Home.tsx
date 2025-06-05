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
    Users
} from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-32">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            Boost Your 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Workflow</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                            Discover powerful PDF tools, useful utilities, and time-saving converters. 
                            Everything you need to work with documents in one place.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                            <Link 
                                to="/word-to-pdf"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                            >
                                Explore Tools
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <div className="flex items-center gap-2 text-gray-600">
                                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                                <span className="font-medium">Free • No Registration Required</span>
                            </div>
                        </div>
                        
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">50K+</div>
                                <div className="text-gray-600">Files Converted</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">99.9%</div>
                                <div className="text-gray-600">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-gray-900">24/7</div>
                                <div className="text-gray-600">Available</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Most Popular PDF Tools */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Most Popular PDF Tools</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Professional-grade tools to handle all your PDF conversion and editing needs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        <Link 
                            to="/word-to-pdf"
                            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Word to PDF</h3>
                            <p className="text-gray-600 text-sm mb-4">Easily convert Word documents to PDF format</p>
                            <div className="flex items-center text-blue-600 text-sm font-medium">
                                Try now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <Link 
                            to="/pdf-editor"
                            className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-green-300 transition-all duration-300"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                                <Edit3 className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">PDF Editor</h3>
                            <p className="text-gray-600 text-sm mb-4">Edit and modify your PDF documents easily</p>
                            <div className="flex items-center text-green-600 text-sm font-medium">
                                Try now <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>

                        <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-purple-300 transition-all duration-300">
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                                <Image className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Image to PDF</h3>
                            <p className="text-gray-600 text-sm mb-4">Convert images to PDF format instantly</p>
                            <div className="flex items-center text-purple-600 text-sm font-medium">
                                Coming soon <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>

                        <div className="group bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-orange-300 transition-all duration-300">
                            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                                <RefreshCw className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Merge PDF</h3>
                            <p className="text-gray-600 text-sm mb-4">Combine multiple PDF files into one</p>
                            <div className="flex items-center text-orange-600 text-sm font-medium">
                                Coming soon <ArrowRight className="w-4 h-4 ml-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            We provide the best tools with enterprise-grade security and performance
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Zap className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">⚡ Super Fast</h3>
                            <p className="text-gray-600">
                                Convert your documents in seconds. No waiting, no delays - just instant results with our optimized processing engine.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Shield className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">🔒 100% Secure</h3>
                            <p className="text-gray-600">
                                Your files are processed safely and deleted immediately after conversion. Complete privacy guaranteed with SSL encryption.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Smartphone className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">📱 Works Everywhere</h3>
                            <p className="text-gray-600">
                                Use on any device - desktop, tablet, or mobile. No downloads or installations required. Just open and start converting.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <Target className="w-8 h-8 text-yellow-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">🎯 High Quality</h3>
                            <p className="text-gray-600">
                                Preserve your document quality with smart compression. Your PDFs will look exactly as you want them to be.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <DollarSign className="w-8 h-8 text-emerald-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">💰 Completely Free</h3>
                            <p className="text-gray-600">
                                No hidden fees, no subscriptions, no limits. Convert as many documents as you want, forever free with no restrictions.
                            </p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <RefreshCw className="w-8 h-8 text-indigo-600" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-3">🔄 Multiple Files</h3>
                            <p className="text-gray-600">
                                Upload multiple files at once and convert them all into a single PDF or separate files. Batch processing made easy.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of users who trust our platform for their document conversion needs
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link 
                            to="/word-to-pdf"
                            className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                        >
                            Start Converting Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="flex items-center gap-2 text-blue-100">
                            <Users className="w-5 h-5" />
                            <span>Trusted by 10,000+ users worldwide</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;