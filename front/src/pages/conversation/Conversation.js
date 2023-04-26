import { Stack, Box, Avatar, Typography, IconButton, Divider, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import StyledBadge from "../../components/StyledBadge";
import Icon from "../../assets/styles/profile.png"
import { CaretDown, LinkSimple, MagnifyingGlass, PaperPlaneTilt, Phone, Smiley, VideoCamera } from "phosphor-react";
import StyledInput from "../../components/StyledInput";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

const Conversation = () => {

const [openPicker , setPicker] = useState(false)
  

  return (
    <Stack height="100%" maxHeight="100vh" width="auto">
      <Box
      p={2}
        sx={{
          height: "15vh",
          width: "150vh",
          backgroundColor: "#F8FAFF",
          boxShadow: "0px 0px 2px",
        }}
      >
      <Stack alignItems="center" direction="row" justifyContent="space-between" sx={{width :"100%", height:"100%"}}>
         <Stack direction="row" spacing={2}>
         <Box>
          <StyledBadge 
          overlap="circular"
          anchorOrigin={{
            vertical:"bottom",
            horizontal:"right",
          }}
          variant="dot"
          >
            <Avatar alt="profile picture" src={Icon} />
          </StyledBadge>
          
         </Box>
         <Stack spacing={0.2}> 
            <Typography variant="subtitle2">Angel Dimaria</Typography>
            <Typography variant="caption">Online</Typography>

          </Stack>
         </Stack>
         <Stack direction="row" alignItems="center" spacing={3}>
           <IconButton>
            <VideoCamera/>
           </IconButton>
           <IconButton>
            <Phone/>
           </IconButton>
           <IconButton>
            <MagnifyingGlass/>
           </IconButton>
           <Divider orientation="vertical" flexItem/>
           <IconButton>
            <CaretDown/>
           </IconButton>
         </Stack>
      </Stack>

      </Box>

      <Box
        sx={{
          height: "70vh",
          width: "150vh",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px",
        }}
      ></Box>

      <Box
      p={4}
        sx={{
          
          width: "150vh",
          backgroundColor: "#fff",
          boxShadow: "0px 0px 2px",
        }}
      >
        <Stack direction="row" alignItems="center" spacing={3}> 
        <Stack sx={{width : "100%" }}>
        <Box sx={{ display : openPicker ? "inline" : "none" , zIndex :10 , position:"fixed" , bottom : 81, right :100 }}>
        <Picker data={data} onEmojiSelect={console.log} />
        </Box>
        <StyledInput fullWidth placeholder="write a message . . ." variant="filled" InputProps={{
          disableUnderline : true,
          startAdornment : <InputAdornment>
            <IconButton>
              <LinkSimple/>
            </IconButton>
          </InputAdornment>,
          endAdornment : <InputAdornment>
            <IconButton onClick={() => {
              setPicker((prev) => !prev)
            }}>
              <Smiley/>
            </IconButton>
          </InputAdornment>
          
         }} setPicker={setPicker}/>
        </Stack>
         
         <Box sx={{height : 48 , width : 48 , background : "#57385c" , borderRadius : 1.5}}>
         <Stack sx={{height : "100%" , width : "100%"}} alignItems="center" justifyContent="center">
         <IconButton>
            <PaperPlaneTilt color="#fff"/>
           </IconButton>
 
         </Stack>
       </Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Conversation;
