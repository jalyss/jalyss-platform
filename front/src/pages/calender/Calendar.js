import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, Calendar } from "@material-ui/pickers";
import { enUS } from "date-fns/locale";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
import blue from "@material-ui/core/colors/blue";
import { format, getMonth, getYear } from "date-fns";

const theme = createTheme({
  palette: {
    primary: { light: blue[300], main: blue[500], dark: blue[700] }
  }
});

function MyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getCalendarHeaderText = (date) => {
    return format(date, "MMMM yyyy");
  };

  const renderDay = (day, selectedDate, dayInCurrentMonth, dayComponent) => {
    const month = getMonth(selectedDate);
    const year = getYear(selectedDate);
    const isToday =
      day.getDate() === new Date().getDate() &&
      day.getMonth() === new Date().getMonth() &&
      day.getFullYear() === new Date().getFullYear();
    const isSelected =
      day.getDate() === selectedDate.getDate() &&
      day.getMonth() === selectedDate.getMonth() &&
      day.getFullYear() === selectedDate.getFullYear();
    const isDisabled = !dayInCurrentMonth;
    return dayComponent({
      ...day,
      month,
      year,
      isToday,
      isSelected,
      isDisabled
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={enUS}>
        <Paper style={{ overflow: "hidden" }}>
          <Calendar
            date={selectedDate}
            onChange={handleDateChange}
            label="Select Day"
            renderDay={renderDay}
            headerRender={({
              date,
              changeMonth,
              decreaseMonth,
              increaseMonth
            }) => (
              <div>
                <button onClick={decreaseMonth}>{`<`}</button>
                <span>{getCalendarHeaderText(date)}</span>
                <button onClick={increaseMonth}>{`>`}</button>
              </div>
            )}
          />
        </Paper>
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}

export default MyCalendar;
