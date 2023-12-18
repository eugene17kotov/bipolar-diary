'use client';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import uk from 'date-fns/locale/uk';
import ru from 'date-fns/locale/ru';
import enUS from 'date-fns/locale/en-US';

export const calendarLocales = { eng: enUS, ua: uk, ru: ru };

type LocaleKey = keyof typeof calendarLocales;

type NavLink = {
  label: string;
  href: string;
};

type Props = {
  navLinks: NavLink[];
};

const Navigation = ({ navLinks }: Props) => {
  const locale = useLocale();
  const t = useTranslations('Navigation');

  const pathname = usePathname();
  const session = useSession();

  const router = useRouter();

  const handleChangeLocale = (newLocale: any) => {
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');
    const redirectPath = `/${newLocale}/${pathWithoutLocale}`;
    router.push(redirectPath);
  };

  return (
    <>
      {navLinks.map(link => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.label}
            href={link.href}
            className={isActive ? 'active' : ''}
          >
            {link.label}
          </Link>
        );
      })}
      {session?.data && (
        <Link href={`/[locale]/profile`} as={`/${locale}/profile`}>
          {t('profile')}
        </Link>
      )}

      {session?.data ? (
        <Link href="#" onClick={() => signOut({ callbackUrl: `/${locale}` })}>
          {t('signout')}
        </Link>
      ) : (
        <Link href={`/${locale}/signin`}>{t('signin')}</Link>
      )}

      <Autocomplete
        options={Object.keys(calendarLocales)}
        style={{ width: 100 }}
        value={locale}
        disableClearable
        onChange={(_, newValue) => {
          if (newValue != null) {
            handleChangeLocale(newValue);
          }
        }}
        renderInput={params => (
          <TextField {...params} label="Locale" fullWidth />
        )}
      />
    </>
  );
};

export { Navigation };
