import { useTranslations } from 'next-intl';

export default function Main() {
  const t = useTranslations('Index');

  return (
    <div>
      <h1>{t('title')}</h1>
    </div>
  );
}
