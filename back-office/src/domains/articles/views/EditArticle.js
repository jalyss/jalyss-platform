import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { editProvider, fetchProvider } from "../../../store/provider";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";

function EditArticle() {
 

  return (
    <Container maxWidth="sm">
    
    </Container>
  );
}

export default EditArticle;
