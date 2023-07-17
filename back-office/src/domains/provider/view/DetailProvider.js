import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { fetchProvider } from "../../../store/provider";

function DetailProvider() {
  const { providerId } = useParams();
  const dispatch = useDispatch();
  const provider = useSelector((state) => state.provider.provider);

  useEffect(() => {
    dispatch(fetchProvider(providerId));
  }, [dispatch, providerId]);

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            {provider?.name}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              alt="Logo"
              image={provider?.logo?.path}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ flexBasis: "45%", my: 2 }}>
              <Typography variant="h5" gutterBottom>
                Email :
              </Typography>
              <Typography variant="body1">{provider?.email}</Typography>
            </Box>
            <Box sx={{ flexBasis: "45%", my: 2 }}>
              <Typography variant="h5" gutterBottom>
                Telephone Number :
              </Typography>
              <Typography variant="body1">{provider?.tel}</Typography>
            </Box>
            <Box sx={{ flexBasis: "45%", my: 2 }}>
              <Typography variant="h5" gutterBottom>
                Adresse :
              </Typography>
              <Typography variant="body1">{provider?.address}</Typography>
            </Box>
            <Box sx={{ flexBasis: "45%", my: 2 }}>
              <Typography variant="h5" gutterBottom>
                Account Balance :
              </Typography>
              <Typography variant="body1">
                {provider?.accountBalance}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default DetailProvider;
