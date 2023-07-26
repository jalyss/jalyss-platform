import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, CardContent, CardMedia, TextField } from "@mui/material";
import { fetchProvider } from "../../../store/provider";

function DetailProvider() {
  const { providerId } = useParams();
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.provider);

  useEffect(() => {
    dispatch(fetchProvider(providerId));
  }, [dispatch, providerId]);

  return (
    <Box sx={{ maxWidth: "100%",height: "100%", margin: "auto" }}>
      
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              height: "100%",
            }}
          >
            <Box sx={{ flexBasis: "45%", my: 3,ml:5 }}>
              <TextField
                label="Name"
                value={provider?.name}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2",
                  }, 
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: "#8a2be2",  
                  },
                
                }}
              />
              <TextField
                label="Email"
                value={provider?.email}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              <TextField
                label="Telephone Number"
                value={provider?.tel}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              <TextField
                label="Adresse"
                value={provider?.address}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
              <TextField
                label="Account Balance"
                value={provider?.accountBalance}
                disabled
                fullWidth
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "#4b0082", 
                  },
                }}
                sx={{
                  color: "#8a2be2", 
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2", 
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",  
                    },
                }}
              />
            </Box>

            <Box
              sx={{
                flexBasis: "45%",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
                , mr:5
              }} 
            >
              <CardMedia
                component="img"
                alt="Logo"
                image={provider?.logo?.path}
                sx={{
                  width: "90%", 
                  height: "60%", 
                  objectFit: "contain", 
                  borderRadius: "8px", 
                }}
              />
            </Box>
          </Box>
        </CardContent>
      
    </Box>
  );
}

export default DetailProvider;
