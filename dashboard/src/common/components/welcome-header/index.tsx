import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface WelcomeHeaderProps {
    username: string;
}

export const WelcomeHeader: FC<WelcomeHeaderProps> = ({ username }) => {
    const { t } = useTranslation();

    return (
        <div className="mb-6">
            <h1 className="text-3xl font-bold">
                {t('welcome.greeting', { username })}
            </h1>
            <p className="text-muted-foreground mt-1">
                {t('welcome.subtitle')}
            </p>
        </div>
    );
};
