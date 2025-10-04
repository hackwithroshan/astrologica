import React, { useContext, useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Temple } from '../types';
import { getTemples } from '../services/api';
import TempleCard from './TempleCard';
import { LanguageContext } from '../contexts/LanguageContext';

interface TempleListPageProps {
    mode: 'all' | 'epuja';
    onSelectTemple: (temple: Temple) => void;
    onBack: () => void;
}

const TempleCardSkeleton: React.FC = () => (
    <div className="w-full h-full bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
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


const TempleListPage: React.FC<TempleListPageProps> = ({ mode, onSelectTemple, onBack }) => {
    const { t } = useContext(LanguageContext);
    const [temples, setTemples] = useState<Temple[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const title = mode === 'epuja' ? t('templeListPage.titleEPuja') : t('templeListPage.titleAll');

    useEffect(() => {
        const fetchAllTemples = async () => {
            try {
                setIsLoading(true);
                const response = await getTemples();
                const allTemples = response.data.data;
                const filteredTemples = mode === 'epuja'
                    ? allTemples.filter(temple => temple.pujas.some(p => p.isEPuja))
                    : allTemples;
                setTemples(filteredTemples);
            } catch (error) {
                console.error("Failed to fetch temples:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAllTemples();
    }, [mode]);

    return (
        <div className="bg-orange-50/50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-saffron font-semibold hover:underline mb-6"
                >
                    <ArrowLeft size={20} />
                    {t('templeListPage.back')}
                </button>
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-maroon">{title}</h1>
                    <p className="text-lg text-gray-600 mt-2">{t('templeListPage.subtitle')}</p>
                </div>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, i) => <TempleCardSkeleton key={i} />)}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {temples.map(temple => (
                            <TempleCard key={temple.id} temple={temple} onSelect={onSelectTemple} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TempleListPage;