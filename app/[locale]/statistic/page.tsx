'use client';
import { useTranslations } from 'next-intl';

export default function Statistic() {
  const t = useTranslations('Statistic');

  return (
    <div>
      <h1>{t('page')}</h1>
    </div>
  );
}
