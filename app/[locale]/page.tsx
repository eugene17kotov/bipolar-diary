'use client';

import { useState } from 'react';
import Stack from '@mui/material/Stack';

import {
  DateCalendar,
  DayCalendarSkeleton,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Form } from '@/components/Form';

import { useLocale } from 'next-intl';
import { useFilledDays } from '@/store/index.js';

import { calendarLocales } from '@/components/Navigation';
import { Grid } from '@mui/material';

type LocaleKey = keyof typeof calendarLocales;

export default function Example() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleDateSelect = (date: Date | null) => {
    setSelectedDate(date);
  };

  const locale = useLocale();

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={calendarLocales[locale as LocaleKey]}
          >
            <DateCalendar
              defaultValue={new Date()}
              onChange={(value: Date | null) => handleDateSelect(value)}
              showDaysOutsideCurrentMonth
              views={['year', 'month', 'day']}
              // loading={isLoading}
              renderLoading={() => <DayCalendarSkeleton />}
              // slots={{
              //   day: 'today',
              // }}
              // slotProps={{
              //   day: {
              //     highlightedDays,
              //   } as any,
              // }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={6}>
          <Form selectedDate={selectedDate} />
        </Grid>
      </Grid>
    </>
  );
}
