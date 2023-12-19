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
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { useState } from 'react';

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
  const [language, setLanguage] = useState(locale);
  const t = useTranslations('Navigation');

  const pathname = usePathname();
  const session = useSession();

  const router = useRouter();

  const handleChangeLocale = (newLocale: any) => {
    console.log(newLocale, 'LOCALE');
    const pathWithoutLocale = pathname.split('/').slice(2).join('/');
    const redirectPath = `/${newLocale}/${pathWithoutLocale}`;
    router.push(redirectPath);
  };

  return (
    <>
      <Stack direction="row" spacing={3}>
        {navLinks.map(link => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.label}
              href={link.href}
              className={isActive ? 'active' : ''}
            >
              <Typography>{link.label}</Typography>
            </Link>
          );
        })}
        {session?.data && (
          <Link href={`/[locale]/profile`} as={`/${locale}/profile`}>
            <Typography>{t('profile')}</Typography>
          </Link>
        )}

        {session?.data ? (
          <Link href="#" onClick={() => signOut({ callbackUrl: `/${locale}` })}>
            <Typography>{t('signout')}</Typography>
          </Link>
        ) : (
          <Link href={`/${locale}/signin`}>
            <Typography>{t('signin')}</Typography>
          </Link>
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
            <TextField
              {...params}
              variant="outlined"
              color="warning"
              label="Locale"
              fullWidth
            />
          )}
        />
        {/* <Select
          value={language}
          // onChange={(_, newValue) => {
          //   if (newValue != null) {
          //     handleChangeLocale(newValue);
          //   }
          // }}
          onChange={e => {
            setLanguage(e.target.value as string);
          }}
        >
          {Object.keys(calendarLocales).map(item => (
            <MenuItem key={item}>{item}</MenuItem>
          ))}
        </Select> */}
      </Stack>
    </>
  );
};

export { Navigation };
