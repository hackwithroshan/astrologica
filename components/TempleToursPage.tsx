import React, { useContext } from 'react';
import { ArrowLeft } from 'lucide-react';
import { LanguageContext } from '../contexts/LanguageContext';
import ComingSoonPlaceholder from './ComingSoonPlaceholder';

interface TempleToursPageProps {
    onBack: () => void;
}

const TempleToursPage: React.FC<TempleToursPageProps> = ({ onBack }) => {
    const { t } = useContext(LanguageContext);

    return (
        <div className="bg-orange-50/50 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-saffron font-semibold hover:underline mb-6"
                >
                    <ArrowLeft size={20} />
                    {t('common.backToHome')}
                </button>
                <ComingSoonPlaceholder 
                    title={t('templeToursPage.title')}
                    description={t('templeToursPage.subtitle')}
                    onActionClick={onBack}
                />
            </div>
        </div>
    );
};

export default TempleToursPage;