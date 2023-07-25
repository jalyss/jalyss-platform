import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";

export default function DateRangePickerValue({ value, onChange }) {
  //   const [value, setValue] = React.useState([
  //     dayjs('2022-04-17'),
  //     dayjs('2022-04-21'),
  //   ]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateRangePicker", "DateRangePicker"]}>
        <DemoItem label="Uncontrolled picker" component="DateRangePicker">
          <DateRangePicker
            defaultValue={[dayjs(value[0]).format('DD/MM/YYYY'), dayjs(value[1]).format('DD/MM/YYYY')]}
            onChange={(newValue) => onChange(newValue)}
            format="DD/MM/YYYY"
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
