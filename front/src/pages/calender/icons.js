import * as React from "react";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

export default function Icons() {
  return (
    <Box
      sx={{
        "& > :not(style)": {
          m: 2
        }
      }}
    >
      <AddIcon color="blue" fontSize="large" />
    </Box>
  );
}
