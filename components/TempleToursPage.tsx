import React, { useContext, useState, useEffect } from 'react';
import { ArrowLeft, Clock, Search, Ticket, Sparkles, Gift, Users, Bus, Star, ChevronDown, CheckCircle, HeartHandshake, ShieldCheck, MessageCircle, MousePointerClick, CreditCard, BellRing, ChevronRight } from 'lucide-react';
import { TourPackage } from '../types';
import { getTourPackages } from '../services/api';
import { LanguageContext } from '../contexts/LanguageContext';


interface TourPackageCardProps {
    tour: TourPackage;
    onSelect: (tour: TourPackage) => void;
}

const TourPackageCard: React.FC<TourPackageCardProps> = ({ tour, onSelect }) => {
    const { t } = useContext(LanguageContext);

    return (
        <div 
            onClick={() => onSelect(tour)}
            className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
            <div className="relative">
                <img src={tour.imageUrl} alt={t(tour.nameKey)} className="w-full h-56 object-cover" />
                <div className="absolute top-2 right-2 bg-saffron text-white text-sm font-bold px-3 py-1 rounded-full">{t(tour.durationKey)}</div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-maroon mb-2">{t(tour.nameKey)}</h3>
                
                <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p><span className="font-semibold text-gray-800">Deity:</span> {t(tour.deityKey)}</p>
                    <p><span className="font-semibold text-gray-800">Includes:</span> {tour.inclusions && tour.inclusions.length > 0 ? `${t(tour.inclusions[0])}...` : 'N/A'}</p>
                </div>
                
                <div className="mt-auto border-t pt-4">
                    <p className="text-gray-500 text-sm">Starting from</p>
                    <p className="text-2xl font-bold text-maroon">₹{tour.price.toLocaleString('en-IN')}</p>
                </div>
                
                <button 
                    onClick={(e) => { e.stopPropagation(); onSelect(tour); }}
                    className="mt-4 w-full bg-saffron text-white font-bold py-3 px-4 rounded-full hover:bg-orange-500 transition-colors"
                >
                    See Details & Book
                </button>
            </div>
        </div>
    );
};

const TourPackageCardSkeleton: React.FC = () => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col animate-pulse">
        <div className="w-full h-56 bg-gray-200"></div>
        <div className="p-6 flex flex-col flex-grow">
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-6"></div>
            <div className="mt-auto border-t pt-4">
                <div className="h-4 w-1/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 w-1/2 bg-gray-200 rounded"></div>
            </div>
            <div className="h-12 w-full bg-gray-200 rounded-full mt-4"></div>
        </div>
    </div>
);

const FaqItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border-b border-orange-200">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center text-left py-4" aria-expanded={isOpen}>
                <h4 className="text-lg font-semibold text-maroon">{question}</h4>
                <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="pb-4 text-gray-700 animate-fade-in-up" style={{ animationDuration: '0.3s' }}>
                    <p>{answer}</p>
                </div>
            )}
        </div>
    );
};


interface TempleToursPageProps {
    onBack: () => void;
    onSelectTour: (tour: TourPackage) => void;
}

const TempleToursPage: React.FC<TempleToursPageProps> = ({ onBack, onSelectTour }) => {
    const { t } = useContext(LanguageContext);
    const [tours, setTours] = useState<TourPackage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchTours = async () => {
            try {
                setIsLoading(true);
                const response = await getTourPackages();
                setTours(response.data.data);
            } catch (error) {
                console.error("Failed to fetch tour packages", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchTours();
    }, []);
    
    const filteredTours = tours.filter(tour => 
        t(tour.nameKey).toLowerCase().includes(searchTerm.toLowerCase()) ||
        t(tour.locationKey).toLowerCase().includes(searchTerm.toLowerCase())
    );

    const faqs = [
        { q: 'data.tours.faq.q1', a: 'data.tours.faq.a1' },
        { q: 'data.tours.faq.q2', a: 'data.tours.faq.a2' },
        { q: 'data.tours.faq.q3', a: 'data.tours.faq.a3' },
    ];

    return (
        <div className="bg-orange-50/50 min-h-screen">
             <button
                onClick={() => window.open('https://wa.me/your-number', '_blank')}
                className="fixed bottom-6 right-6 z-40 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110"
                aria-label="Chat on WhatsApp"
            >
                <MessageCircle size={28} />
            </button>
            {/* Hero Section */}
            <section className="relative bg-cover bg-center py-20 md:py-28" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1588416936227-437f2d410780?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')` }}>
                <div className="absolute inset-0 bg-maroon bg-opacity-60"></div>
                <div className="relative container mx-auto px-4 z-10 text-center">
                    <button onClick={onBack} className="absolute top-0 left-0 -mt-12 flex items-center gap-2 text-white font-semibold py-2 px-4 rounded-full hover:bg-white/10 transition-colors">
                        <ArrowLeft size={20} />
                        {t('common.backToHome')}
                    </button>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">{t('templeToursPage.title')}</h1>
                    <p className="text-lg md:text-xl text-white/90 mb-8">{t('templeToursPage.subtitle')}</p>
                    <div className="max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search Temple Name or City..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-4 pl-12 rounded-full text-lg text-gray-800 shadow-inner focus:outline-none focus:ring-4 focus:ring-saffron/50"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Main Content */}
            <div className="container mx-auto px-4 py-12">
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(3)].map((_, i) => <TourPackageCardSkeleton key={i} />)}
                    </div>
                ) :
                 filteredTours.length > 0 ?
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTours.map(tour => (
                            <TourPackageCard key={tour.id} tour={tour} onSelect={onSelectTour} />
                        ))}
                    </div>
                 : <p className="text-center text-gray-500 py-10">No tour packages match your search.</p>
                }
            </div>

            {/* Trust Badges */}
            <section className="py-12 bg-white"><TrustBadges /></section>
            
             {/* How it Works */}
            <HowItWorks />

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                 <div className="container mx-auto px-4 max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-maroon">Frequently Asked Questions</h2>
                    </div>
                    <div className="space-y-2">
                        {faqs.map(faq => <FaqItem key={faq.q} question={t(faq.q)} answer={t(faq.a)} />)}
                    </div>
                 </div>
            </section>
        </div>
    );
};

const TrustBadges: React.FC = () => (
    <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-orange-200">
            <div className="flex flex-col items-center text-center p-4"><HeartHandshake size={40} className="text-maroon mb-2" /> <span className="font-semibold text-gray-700">Trusted by 1,00,000+ Devotees</span></div>
            <div className="flex flex-col items-center text-center p-4"><ShieldCheck size={40} className="text-maroon mb-2" /> <span className="font-semibold text-gray-700">100% Secure Payments</span></div>
            <div className="flex flex-col items-center text-center p-4"><CheckCircle size={40} className="text-maroon mb-2" /> <span className="font-semibold text-gray-700">Verified Temples & Priests</span></div>
        </div>
    </div>
);

const Step: React.FC<{ icon: React.ReactNode; title: string; description: string; }> = ({ icon, title, description }) => (
    <div className="relative flex flex-col items-center text-center px-4">
        <div className="relative bg-saffron text-white rounded-full p-6 mb-4 z-10">{icon}</div>
        <h3 className="text-xl font-bold text-maroon mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const HowItWorks: React.FC = () => {
    const { t } = useContext(LanguageContext);
    return (
        <section className="py-16 bg-orange-50/50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-maroon">{t('howItWorks.title')}</h2>
                    <p className="text-lg text-gray-600 mt-2">{t('howItWorks.subtitle')}</p>
                </div>
                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8">
                     <div className="absolute top-10 left-0 w-full h-0.5 bg-orange-200 hidden md:block" style={{zIndex: 0}}></div>
                    <Step icon={<MousePointerClick size={40} />} title={t('howItWorks.step1.title')} description={t('howItWorks.step1.description')} />
                    <Step icon={<CreditCard size={40} />} title={t('howItWorks.step2.title')} description={t('howItWorks.step2.description')} />
                    <Step icon={<BellRing size={40} />} title={t('howItWorks.step3.title')} description={t('howItWorks.step3.description')} />
                </div>
            </div>
        </section>
    );
};


export default TempleToursPage;