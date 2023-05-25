import React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function AutoCompleteFilter({ data, labelOptionName,onChange,valueOptionName }) {
  return (
    <Stack spacing={1} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={data}
        getOptionLabel={(option) => option[labelOptionName]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
        
        onChange={(event, newValue) => {
         onChange(newValue.map(v=>v[valueOptionName]));
        }}
      />
    </Stack>
  );
}

export default AutoCompleteFilter;
