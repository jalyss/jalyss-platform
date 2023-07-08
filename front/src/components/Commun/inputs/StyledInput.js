import { TextField, styled } from "@mui/material"


const StyledInput = styled(TextField)(({theme}) => ({
    "& .MuiInputBase-input" : {
        paddingTop : "12px",
        paddingBottom : "12px"     
    }
}))
  


export default StyledInput
