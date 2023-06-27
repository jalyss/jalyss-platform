import { styled } from "@mui/material/styles";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 20,
  backgroundColor: "#e0e0e0",
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
}));

export default Search;