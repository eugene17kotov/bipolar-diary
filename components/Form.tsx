import { TextField, InputLabel, Button, Select, MenuItem } from '@mui/material';
// import { SelectChangeEvent } from '@mui/material/Select';

import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { useFilledDays } from '@/store/index.js';

interface DayInfo {
  day: string | null;
  color: string;
  hour: number;
  description: string;
}

interface FormProps {
  selectedDate: Date | null;
}

const colors: string[] = [
  'green',
  'blue',
  'aqua',
  'yellow',
  'orange',
  'pink',
  'red',
];

const hours = Array.from({ length: 25 }, (_, i) => i);

const initialData = {
  day: '',
  color: '',
  hour: 0,
  description: '',
};

const Form: React.FC<FormProps> = ({ selectedDate }) => {
  const [formData, setFormData] = useState<DayInfo>(initialData);
  const [editOn, setEditOn] = useState(false);

  console.log(selectedDate, ' form');

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fillSelectedDay = useFilledDays(state => state.fillSelectedDay);
  const checkDayInfo = useFilledDays(state => state.checkDayInfo);

  useEffect(() => {
    const dayInfo = checkDayInfo(format(selectedDate, 'dd-MMM-yyyy'));
    setFormData(dayInfo || initialData);
    setEditOn(false);
    console.log(dayInfo, 'проверка прошла');
  }, [checkDayInfo, selectedDate, setEditOn]);

  const handleSaveButtonClick = () => {
    const dayInfo = {
      ...formData,
      day: selectedDate && format(selectedDate, 'dd-MMM-yyyy'),
    };

    fillSelectedDay(dayInfo);
    setEditOn(false);
  };

  return (
    <div>
      <h1>
        {selectedDate
          ? format(selectedDate, 'dd-MMM-yyyy')
          : format(new Date(), 'dd-MMM-yyyy')}
      </h1>

      {editOn ? (
        <>
          <TextField
            name="description"
            label="Description"
            value={formData?.description}
            onChange={handleInputChange}
          />
          <InputLabel id="hour-label">Sleep during</InputLabel>
          <Select
            name="hour"
            value={formData?.hour}
            onChange={handleInputChange}
            labelId="hour-label"
          >
            {hours.map(hour => (
              <MenuItem key={hour} value={hour}>
                {hour}
              </MenuItem>
            ))}
          </Select>

          <InputLabel id="color-label">Feeling</InputLabel>

          <Select
            name="color"
            value={formData?.color}
            onChange={handleInputChange}
            labelId="color-label"
          >
            {colors.map(color => (
              <MenuItem key={color} value={color}>
                {color}
              </MenuItem>
            ))}
          </Select>
          <Button
            type="submit"
            onClick={() => setEditOn(false)}
            variant="contained"
            color="primary"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSaveButtonClick}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </>
      ) : (
        <>
          <p>{formData?.description}</p>
          <p>{formData?.color}</p>
          <p>{formData?.hour}</p>
          <Button
            type="submit"
            onClick={() => setEditOn(true)}
            variant="contained"
            color="primary"
          >
            Edit
          </Button>
        </>
      )}
    </div>
  );
};

export { Form };
