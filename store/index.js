import { produce } from 'immer';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const useFilledDays = create(
  persist(
    (set, get) => ({
      filledDays: [],
      loading: false,
      error: null,
      fillSelectedDay: day =>
        set(
          produce(state => {
            const indexToUpdate = state.filledDays.findIndex(item => {
              return item.day === day.day;
            });

            console.log(indexToUpdate, 'INDEX');

            if (indexToUpdate !== -1) {
              state.filledDays[indexToUpdate] = {
                ...state.filledDays[indexToUpdate],
                ...day,
              };
              console.log('UPDATE');
            } else {
              state.filledDays.push(day);
              console.log('CREATE');
            }
          })
        ),
      checkDayInfo: date => {
        console.log(date, ' check');
        return get().filledDays.find(item => item.day === date);
      },
    }),
    {
      name: 'filledDays', // Название для сохранения в storage
      storage: createJSONStorage(() => localStorage),
    }
  )
);
