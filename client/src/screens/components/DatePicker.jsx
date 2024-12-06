import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const DatePickerCustom = ({
  placeHolder,
  onChange,
  value,
  disabled,
  minDate,
  datePickerProps,
}) => {
  const createdAt = localStorage.getItem('createdAt');

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          value={value ?? dayjs(new Date())}
          format="DD/MM/YYYY"
          onChange={onChange}
          label={placeHolder ?? "Basic date picker"}
          disabled={disabled ?? false}
          disableFuture
          minDate={dayjs(createdAt) || minDate}
          {...datePickerProps}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DatePickerCustom;
