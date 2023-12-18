'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';

const GoogleButton = () => {
  const locale = useLocale();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || `/${locale}/profile`;
  const t = useTranslations('SignPage');

  return (
    <button onClick={() => signIn('google', { callbackUrl })}>
      {t('googlebutton')}
    </button>
  );
};

export { GoogleButton };
