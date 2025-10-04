import React, { useRef, useContext, useState, useEffect } from 'react';
import { getTemples } from '../services/api';
import { Temple } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';
import TempleCard from './TempleCard';

const TempleCardSkeleton: React.FC = () => (
    <div className="w-80 flex-shrink-0 snap-center bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
        <div className="w-full h-48 bg-gray-200"></div>
        <div className="p-4">
            <div className="h-6 w-3/4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 w-full bg-gray-200 rounded-full mt-4"></div>
        </div>
    </div>
);


const FeaturedTemples: React.FC<{onSelectTemple: (temple: Temple) => void}> = ({ onSelectTemple }) => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { t } = useContext(LanguageContext);
    const [temples, setTemples] = useState<Temple[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedTemples = async () => {
            try {
                setIsLoading(true);
                const response = await getTemples();
                setTemples(response.data.data.slice(0, 6)); // Show first 6 as featured
            } catch (error) {
                console.error("Failed to fetch temples:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFeaturedTemples();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -340 : 340;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-maroon">{t('featuredTemples.title')}</h2>
                     <div className="flex items-center space-x-2">
                        <button onClick={() => scroll('left')} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-maroon transition-colors" aria-label="Scroll left">
                            <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => scroll('right')} className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-maroon transition-colors" aria-label="Scroll right">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
                {isLoading ? (
                     <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {[...Array(4)].map((_, i) => <TempleCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {temples.map(temple => (
                            <div key={temple.id} className="flex-shrink-0 w-80 snap-center">
                               <TempleCard temple={temple} onSelect={onSelectTemple} />
                            </div>
                        ))}
                    </div>
                )}
                 <div className="text-center mt-8">
                    <a href="#" className="text-saffron font-semibold hover:underline">{t('featuredTemples.seeAll')} &rarr;</a>
                </div>
            </div>
        </section>
    );
};

export default FeaturedTemples;