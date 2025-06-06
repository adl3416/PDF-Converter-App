import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Home: React.FC = () => {
    const { translations } = useLanguage();

    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {translations.home.title}
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    {translations.home.subtitle}
                </p>
                <div className="bg-blue-100 p-4 rounded-lg">
                    <p className="text-gray-700">
                        Test: Application is working! ✅
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;
