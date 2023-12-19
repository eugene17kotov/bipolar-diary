import { AppBar } from '@mui/material';
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
      <AppBar position="static" sx={{ minHeight: 100 }}>
        <Navigation navLinks={navItems} />
      </AppBar>
    </header>
  );
};

export { TheHeader };
