import React, { useContext } from 'react';
import { TourPackage } from '../types';
import { ArrowLeft, Clock, Info, IndianRupee } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

interface TourDetailPageProps {
    tour: TourPackage;
    onBack: () => void;
}

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, onBack }) => {
    const { t } = useContext(LanguageContext);

    if (!tour) {
        return <div className="min-h-screen bg-orange-50/50 flex items-center justify-center">Tour not found.</div>;
    }

    return (
        <div className="bg-orange-50/50">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 bg-cover bg-center" style={{ backgroundImage: `url('${tour.imageUrl}')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button onClick={onBack} className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-full hover:bg-white/30 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Tours
                </button>
                <div className="absolute bottom-0 left-0 p-4 md:p-8 z-10 container mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-white shadow-text">{t(tour.nameKey)}</h1>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 mt-8 pb-16">
                <div className="max-w-4xl mx-auto">
                    {/* Key Info Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                        <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-orange-100 rounded-full text-saffron">
                                <Clock size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Duration</p>
                                <p className="font-bold text-lg text-maroon">{t(tour.durationKey)}</p>
                            </div>
                        </div>
                         <div className="bg-white p-4 rounded-lg shadow-sm flex items-center gap-4">
                            <div className="p-3 bg-green-100 rounded-full text-green-600">
                                <IndianRupee size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Starting Price</p>
                                <p className="font-bold text-lg text-maroon">₹{tour.price.toLocaleString('en-IN')}</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* About Section */}
                    <section className="bg-white p-6 rounded-lg shadow-sm">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-saffron"><Info size={24} /></div>
                            <h2 className="text-2xl font-bold text-maroon">About This Tour</h2>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-base">{t(tour.descriptionKey)}</p>
                    </section>
                    
                    {/* Booking/Enquiry CTA */}
                    <div className="mt-8 text-center">
                         <button className="bg-saffron text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-orange-500 transition-all duration-300 transform hover:scale-105">
                            {t('common.enquireNow')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TourDetailPage;
