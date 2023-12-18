'use client';
import { GoogleButton } from '@/components/GoogleButton';
import { SignInForm } from '@/components/SignInForm';
import { useTranslations } from 'next-intl';
// import { getTranslator } from 'next-intl/server';

export default function Signin() {
  // const locale: Promise<string> = await getTranslator(locale);
  const t = useTranslations('SignPage');

  return (
    <div className="stack">
      <h1>{t('signin')}</h1>
      <GoogleButton />
      <div>{t('or')}</div>
      <SignInForm />
    </div>
  );
}
