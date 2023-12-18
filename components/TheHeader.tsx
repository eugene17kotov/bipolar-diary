import { Navigation } from './Navigation';
import { useLocale, useTranslations } from 'next-intl';

const TheHeader = () => {
  const locale = useLocale();
  const t = useTranslations('Navigation');

  const navItems = [
    { label: t('about'), href: `/${locale}` },
    { label: t('main'), href: `/${locale}/main` },
    { label: t('statistic'), href: `/${locale}/statistic` },
  ];

  return (
    <header>
      <Navigation navLinks={navItems} />
    </header>
  );
};

export { TheHeader };
