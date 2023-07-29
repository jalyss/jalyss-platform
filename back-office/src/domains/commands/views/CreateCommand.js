import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCommand } from "../../../store/command";
// import { findArticleTitleAndId } from "../../../store/article";
import {
  fetchCountries,
  findAllCitites,
  findAllBranches,
} from "../../../store/Country";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { useDispatch, useSelector } from "react-redux";
import Selecto from "react-select";
import { FaTrash } from 'react-icons/fa';

function CreateCommand() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  console.clear();

  const [value, setValue] = useState([]);
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);
  const [clientName, setclientName] = useState();
  const [clientAddress, setclientAddress] = useState();
  const [clientTel, setclientTel] = useState();
  const [clientEmail, setclientEmail] = useState();
  const [delivered, setdelivered] = useState(false);
  const [paid, setpaid] = useState(false);
  const [hasDelivery, sethasDelivery] = useState(false);
  const [countryId, setcountryId] = useState();
  const [cityId, setcityId] = useState();
  const [branshId, setBranshId] = useState();
  const [commandLine, setcommandLine] = useState([]);
  const [inputsNumber, setinputsNumber] = useState(1);
  const [quantity, setquantity] = useState(0);

  const articleTitleAndId = useSelector((state) => state.article.article);
  const countries = useSelector((state) => state.country.countries.items);
  const cities = useSelector((state) => state.country.cities.items);
  const branches = useSelector((state) => state.country.branches.items);
  console.log(commandLine);
  useEffect(() => {
    // dispatch(findArticleTitleAndId());
    dispatch(fetchCountries());
    dispatch(findAllCitites());
    dispatch(findAllBranches());
  }, []);
  useEffect(() => {
    if (articleTitleAndId) {
      setValue(
        articleTitleAndId.map((participant) => ({
          value: participant.ArticlesByBranch[0].id,
          label: participant.title,
        }))
      );
      setValue1(
        countries.map((participant) => ({
          value: participant.id,
          label: participant.nameEn,
        }))
      );
      setValue2(
        cities.map((participant) => ({
          value: participant.id,
          label: participant.nameEn,
        }))
      );
      setValue3(
        branches.map((participant) => ({
          value: participant.id,
          label: participant.name,
        }))
      );
    }
  }, []);

  const handleSubmit = () => {
    const aux = {
      clientName: clientName,
      clientAddress: clientAddress,
      clientTel: clientTel,
      clientEmail: clientEmail,
      delivered: delivered,
      paid: paid,
      hasDelivery: hasDelivery,
      countryId: countryId,
      cityId: cityId,
      branshId: branshId,
      commandLine: commandLine,
    };

    dispatch(createCommand(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("command created successfully");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const handleDelete = (index) => {
    const updatedCommandLine = [...commandLine];
    updatedCommandLine.splice(index, 1);
    setcommandLine(updatedCommandLine);
  };

  const renderInputs = () => {
    return Array.from({ length: inputsNumber }).map((_, i) => (
      <Box key={i} mt={3} mb={3} display="flex" alignItems="center">
        <div style={{ flex: 2 }}>
          <Selecto
            onChange={(e) => {
              const existingObjectIndex = commandLine.findIndex(
                (item) => item.articleByBranchId === e.value
              );

              if (existingObjectIndex !== -1) {
                const updatedCommandLine = [...commandLine];
                updatedCommandLine[existingObjectIndex] = {
                  ...updatedCommandLine[existingObjectIndex],
                  quantity: quantity,
                };
                setcommandLine(updatedCommandLine);
              } else {
                const newObject = {
                  articleByBranchId: e.value,
                  quantity: quantity,
                };
                setcommandLine((commandLine) => [...commandLine, newObject]);
              }
            }}
            placeholder="Search by users"
            options={value}
            style={{ flex: 1, marginRight: "10px" }}
          />
        </div>
        <div style={{ marginLeft: "10px", fontSize: "10px" }}>
          <input
            type="number"
            onChange={(e) => {
              const updatedCommandLine = commandLine.map((item, index) => {
                if (index === i) {
                  return {
                    ...item,
                    quantity: parseInt(e.target.value, 10),
                  };
                }
                return item;
              });
              setcommandLine(updatedCommandLine);
            }}
            placeholder="Quantity"
          />
        </div>
                  <div style={{ marginLeft: "10px" }}>
                      <FaTrash onClick={() => handleDelete(1)} style={{ cursor: 'pointer' }} />
                    </div>
      </Box>
    ));
  };

  return (
    <Container maxWidth="md">
      <Box mt={3}>
        <Typography variant="h4" align="center" gutterBottom>
          Create Command
        </Typography>
        <Box mt={3}></Box>
        <div className="row">
          <Box mt={2} className="col-6">
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              onChange={(e) => {
                setclientName(e.target.value);
              }}
            />
          </Box>
          <Box mt={2} className="col-6">
            <TextField
              label="Tel"
              variant="outlined"
              type="number"
              fullWidth
              required
              margin="normal"
              onChange={(e) => {
                setclientTel(e.target.value);
              }}
            />
          </Box>
        </div>
        <Box mt={3}>
          <TextField
            label="Adress"
            variant="outlined"
            onChange={(e) => {
              setclientAddress(e.target.value);
            }}
            fullWidth
            required
            margin="normal"
          />
        </Box>
        <Box mt={3}>
          <TextField
            label="Email"
            onChange={(e) => {
              setclientEmail(e.target.value);
            }}
            variant="outlined"
            fullWidth
            required
            margin="normal"
          />
        </Box>

        <div className="row" style={{ flex: 2, zIndex: 9999 }}>
          <Box mt={4} className="col-4" >
            <Selecto
              options={value3}
              onChange={(e) => {
                setBranshId(e[0]?.value);
              }}
              isMulti
            />
          </Box>
          <Box mt={4} className="col-4">
            <Selecto
              style={{ zIndex: 999 }}
              options={value1}
              onChange={(e) => {
                setcountryId(e[0]?.value);
              }}
              isMulti
            />
          </Box>
          <Box mt={4} className="col-4">
            <Selecto
              style={{ zIndex: 999 }}
              options={value2}
              onChange={(e) => {
                setcityId(e[0]?.value);
              }}
              isMulti
            />
          </Box>
        </div>

        {renderInputs()}
        <div
          class="button-container"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={() => setinputsNumber(inputsNumber + 1)}>+</button>
          {inputsNumber > 1 ? (
            <button onClick={() => setinputsNumber(inputsNumber - 1)}>-</button>
          ) : null}
        </div>

        <div className="w-100 d-flex justify-content-center">
          <button
            type="submit"
            className="confirm-button mt-3"
            onClick={handleSubmit}
          >
            <span className="label-btn"> Add Command </span>
          </button>
        </div>
      </Box>
    </Container>
  );
}

export default CreateCommand;
