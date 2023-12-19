import {
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Container,
  Fab,
  InputAdornment,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { Done, Clear } from '@mui/icons-material';
// import { SelectChangeEvent } from '@mui/material/Select';

// import { Button } from '@mui/material-next/';

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
    <>
      <Card sx={{ maxWidth: 300, minHeight: 275 }}>
        <Typography variant="h4" component="h3">
          {selectedDate
            ? format(selectedDate, 'dd-MMM-yyyy')
            : format(new Date(), 'dd-MMM-yyyy')}
        </Typography>

        {editOn ? (
          <>
            <CardContent>
              <TextField
                name="description"
                label="Description"
                multiline
                rows={4}
                placeholder="Text something"
                value={formData?.description}
                onChange={handleInputChange}
              />

              <InputLabel id="hour-label">Sleep during</InputLabel>
              <Select
                name="hour"
                // endAdornment={
                //   <InputAdornment position="end">hours</InputAdornment>
                // }
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
            </CardContent>
            {/* <Button
              type="submit"
              onClick={() => setEditOn(false)}
              variant="contained"
              color="primary"
            >
              Cancel
            </Button> */}
            {/* <Button
              type="submit"
              onClick={handleSaveButtonClick}
              variant="contained"
              color="primary"
            >
              Save
            </Button> */}
            <CardActions>
              <Fab
                type="submit"
                onClick={() => setEditOn(false)}
                variant="contained"
                color="primary"
                aria-label="cancel"
              >
                <Clear />
              </Fab>
              <Fab
                type="submit"
                onClick={handleSaveButtonClick}
                color="primary"
                aria-label="add"
              >
                <Done />
              </Fab>
            </CardActions>
          </>
        ) : (
          <>
            <CardContent>
              <Typography variant="h4" component="p">
                {formData?.description}
              </Typography>
              <Typography variant="h4" component="p">
                {formData?.color}
              </Typography>
              <Typography variant="h4" component="p">
                {formData?.hour}
              </Typography>
            </CardContent>
            {/* <Button
              variant="contained"
              // color="primary"
            >
              Edit
            </Button> */}
            <CardActions>
              <Fab
                type="submit"
                onClick={() => setEditOn(true)}
                color="secondary"
                aria-label="edit"
              >
                <EditIcon />
              </Fab>
            </CardActions>
          </>
        )}
      </Card>
    </>
  );
};

export { Form };
