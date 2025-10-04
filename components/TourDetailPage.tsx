
import React, { useContext } from 'react';
import { TourPackage } from '../types';
import { ArrowLeft, MapPin, Clock, Check, X as XIcon, CalendarDays, Utensils, Bed, Car, IndianRupee } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';

interface TourDetailPageProps {
    tour: TourPackage;
    onBack: () => void;
}

const DetailItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start gap-3">
        <div className="text-saffron mt-1">{icon}</div>
        <div>
            <p className="font-semibold text-gray-800">{label}</p>
            <p className="text-gray-600">{value}</p>
        </div>
    </div>
);

const KeyHighlight: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <div className="flex items-start gap-4">
        <div className="text-saffron bg-orange-100 p-3 rounded-full">
            {/* FIX: Add a more specific type to the element being cloned to resolve the TypeScript error.
                This informs TypeScript that the 'icon' element can accept a 'size' prop. */}
            {React.cloneElement(icon as React.ReactElement<{ size?: string | number }>, { size: 24 })}
        </div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className="font-bold text-gray-800 text-lg">{value}</p>
        </div>
    </div>
);

const ListItem: React.FC<{ text: string; included: boolean }> = ({ text, included }) => (
    <li className="flex items-start gap-3">
        {included ? <Check size={20} className="text-green-500 mt-1 flex-shrink-0" /> : <XIcon size={20} className="text-red-500 mt-1 flex-shrink-0" />}
        <span className="text-gray-700">{text}</span>
    </li>
);

const TourDetailPage: React.FC<TourDetailPageProps> = ({ tour, onBack }) => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="bg-orange-50/50">
            {/* Hero Section */}
            <div className="relative h-64 md:h-96 bg-cover bg-center" style={{ backgroundImage: `url('${tour.imageUrl}')` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button onClick={onBack} className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white font-semibold py-2 px-4 rounded-full hover:bg-white/30 transition-colors">
                    <ArrowLeft size={20} />
                    Back to Tours
                </button>
                <div className="absolute bottom-0 left-0 p-4 md:p-8 z-10 container mx-auto">
                    <h1 className="text-3xl md:text-5xl font-bold text-white shadow-text">{t(tour.nameKey)}</h1>
                    <div className="flex items-center mt-3 gap-6 text-white/90">
                        <p className="flex items-center">
                            <MapPin size={18} className="mr-2" />
                            {t(tour.locationKey)}
                        </p>
                         <p className="flex items-center">
                            <Clock size={18} className="mr-2" />
                            {t(tour.durationKey)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 mt-8 pb-16">
                <div className="lg:grid lg:grid-cols-3 lg:gap-12">
                    {/* Left Column (Main Content) */}
                    <main className="lg:col-span-2">
                        {/* Tour Highlights Section */}
                        <section className="mb-8">
                            <h2 className="text-2xl md:text-3xl font-bold text-maroon mb-6">Tour Highlights</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8 bg-white p-6 rounded-xl shadow-lg border border-orange-100">
                                <KeyHighlight icon={<MapPin />} label="Destinations Covered" value={t(tour.locationKey)} />
                                <KeyHighlight icon={<Clock />} label="Tour Duration" value={t(tour.durationKey)} />
                                <KeyHighlight icon={<IndianRupee />} label="Package Starts From" value={`₹${tour.price.toLocaleString('en-IN')}`} />
                                {tour.bestTimeToVisitKey && (
                                    <KeyHighlight icon={<CalendarDays />} label="Best Time To Visit" value={t(tour.bestTimeToVisitKey)} />
                                )}
                            </div>
                        </section>
                        
                        {/* About Section */}
                        <section className="py-8 border-t border-orange-200">
                            <h2 className="text-2xl md:text-3xl font-bold text-maroon mb-4">About the Tour</h2>
                            <p className="text-gray-700 leading-relaxed text-lg">{t(tour.descriptionKey)}</p>
                        </section>

                        {/* Itinerary Section */}
                        {(tour.itinerary || []).length > 0 && (
                             <section className="py-8 border-t border-orange-200">
                                <h2 className="text-2xl md:text-3xl font-bold text-maroon mb-8">Day-wise Itinerary</h2>
                                <div className="space-y-10 border-l-2 border-saffron/50 pl-8 ml-4">
                                    {(tour.itinerary || []).map((day) => (
                                        <div key={day.day} className="relative">
                                            <div className="absolute left-[-2rem] top-0 -translate-x-1/2 bg-saffron/90 backdrop-blur-sm text-white px-3 py-1 rounded-full flex items-center justify-center gap-1.5 ring-4 ring-orange-50/50 text-sm font-semibold">
                                                <MapPin size={14} />
                                                <span>Day {day.day}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-maroon ml-4">{t(day.titleKey)}</h3>
                                            <p className="text-gray-600 mt-1 ml-4">{t(day.descriptionKey)}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                        
                        {/* Inclusions & Exclusions */}
                        <section className="py-8 border-t border-orange-200">
                             <h2 className="text-2xl md:text-3xl font-bold text-maroon mb-6">Inclusions & Exclusions</h2>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-xl font-semibold text-green-700 mb-4">What's Included</h3>
                                    <ul className="space-y-3">
                                        {(tour.inclusions || []).map(item => <ListItem key={item} text={t(item)} included={true} />)}
                                    </ul>
                                </div>
                                 <div>
                                    <h3 className="text-xl font-semibold text-red-700 mb-4">What's Not Included</h3>
                                    <ul className="space-y-3">
                                        {(tour.exclusions || []).map(item => <ListItem key={item} text={t(item)} included={false} />)}
                                    </ul>
                                </div>
                             </div>
                        </section>

                    </main>

                    {/* Right Column (Sticky Sidebar) */}
                    <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100">
                                <p className="text-gray-500">Starting from</p>
                                <p className="text-4xl font-bold text-maroon mb-4">₹{tour.price.toLocaleString('en-IN')}</p>
                                
                                <button className="w-full bg-saffron text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-500 transition-colors text-lg">
                                    Enquire Now
                                </button>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-lg border border-orange-100 space-y-4">
                                <h3 className="text-lg font-bold text-maroon mb-2">Tour Details</h3>
                                {tour.bestTimeToVisitKey && <DetailItem icon={<CalendarDays size={20} />} label="Best Time to Visit" value={t(tour.bestTimeToVisitKey)} />}
                                <DetailItem icon={<Bed size={20} />} label="Accommodation" value={t(tour.accommodationKey)} />
                                <DetailItem icon={<Car size={20} />} label="Transport" value={t(tour.transportKey)} />
                                <DetailItem icon={<Utensils size={20} />} label="Meals" value={t(tour.mealsKey)} />
                            </div>
                        </div>
                    </aside>
                </div>
                 {/* Cancellation Policy */}
                <section className="py-8 mt-8 border-t border-orange-200">
                    <h2 className="text-2xl md:text-3xl font-bold text-maroon mb-4">Cancellation Policy</h2>
                    <p className="text-gray-600">{t(tour.cancellationPolicyKey)}</p>
                </section>
            </div>
        </div>
    );
};

export default TourDetailPage;
