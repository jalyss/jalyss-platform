import React from 'react'

import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function WhiteSelect({value,onChange,data,helper,height,width,}) {
  return (
    <FormControl className='flex-row align-items-center'>
            <FormHelperText sx={{color:'white'}}>{helper}</FormHelperText>
            <Select
              value={value}
              onChange={onChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              sx={{
                m: 1,
                width: width,
                height: height,

                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "rgba(228, 219, 233, 0.25)",
                },
                ".MuiSvgIcon-root ": {
                  fill: "white !important",
                },
              }}
            >
                {data.map((elem,i)=>(

              <MenuItem value={elem.value} key={i}>{elem.label}</MenuItem>
                ))}
            </Select>
          </FormControl>
  )
}

export default WhiteSelect