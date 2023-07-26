import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function AutoCompleteFilter({ value,data, labelOptionName,onChange,valueOptionName,label,fullWidth,placeholder,required ,width}) {
  return (
    <Stack spacing={1}  sx={ fullWidth ? {width: 200} : width ? {width:width} : { width: 500 } }>
      <Autocomplete
        multiple
        // value={value?value:[]}
        aria-required={required}
        id="tags-standard"
        options={data}
        getOptionLabel={(option) => option[labelOptionName]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={label}
            placeholder={placeholder?placeholder:"favories"}
          />
        )}
        
        onChange={(event, newValue) => {
          if(valueOptionName)
         onChange(newValue.map(v=>v[valueOptionName]))
         else{
          onChange(newValue)
         }
        }}
      />
    </Stack>
  );
}

export default AutoCompleteFilter;
