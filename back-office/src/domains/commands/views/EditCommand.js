import {
  Box,
  Checkbox,
  InputLabel,
  Container,
  MenuItem,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCommand } from "../../../store/command";
import { users } from "../../../constants/users";
import Select from "react-select";

function EditCommand() {
  const [commandLine, setcommandLine] = useState([]);
  const [inputsNumber, setinputsNumber] = useState(1);
  const [quantity, setquantity] = useState(0);
    const [value, setValue] = useState([]);
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);
    const [data2, setdata2] = useState([]);
    const [data1, setdata1] = useState([]);
    const [data3, setdata3] = useState([]);
  const [clientName, setclientName] = useState();
  const [clientAddress, setclientAddress] = useState();
  const [clientTel, setclientTel] = useState();
  const [clientEmail, setclientEmail] = useState();
  const [delivered, setdelivered] = useState(false);
  const [paid, setpaid] = useState(false);
  const [countryId, setcountryId] = useState();
  const [cityId, setcityId] = useState();
  const [branshId, setBranshId] = useState();
  const [titles, settitles] = useState([]);
  const [quantities, setquantities] = useState();
  const [confirmDelivery, setConfirmDelivery] = useState(false);
  const [hasDelivery, setHasDelivery] = useState(false);
  const [confirmHasDelivery, setConfirmHasDelivery] = useState(false);
  const [render, setRender] = useState(0);

  const command = useSelector((state) => state.command.command);
  // console.log( command?.commandLine[0].articleByBranch.article.title, "loll");
  // console.log( command?.commandLine[0].quantity, "lll");
  console.log(quantities, "lllllll");
  const { commandId } = useParams();
  const dispatch = useDispatch();
  const [com, setCom] = useState({});

  useEffect(() => {
    dispatch(fetchCommand(commandId));
  }, [commandId,dispatch]);

useEffect(()=>{
  const res = [];
  command?.commandLine.map((item, i) => {
    res.push(item.articleByBranch.article.title);
    settitles(res);
  });
  const res1 = [];
  command?.commandLine.map((item, i) => {
    res1.push(item.quantity);
    setquantities(res1);
  });
},[render])

  useEffect(()=>{
    setdata1({
      value: command?.country.nameEn,
      label: command?.country.nameEn,
    });
    setdata2({
      value: command?.city?.nameEn,
      label: command?.city?.nameEn,
    });
    setdata3({
      value: command?.branch.name,
      label: command?.branch.name,
    });

  },[render])

  const renderInputs = () => {
    return quantities?.map((e, i) => (
      <Box key={i} mt={3} mb={3} display="flex" alignItems="center">
        <div style={{ flex: 2, zIndex: 999 }}>
          <Select
            value={titles[i] ? { label: titles[i], value: titles[i] } : null}
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
            value={e}
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
      </Box>
    ));
  };

  return (
    <div>
      <Container maxWidth="md">
        <Box mt={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Details Command (edit)
          </Typography>

          <div className="row">
            <Box mt={2} className="col-6">
              <TextField
                label="Name"
                variant="outlined"
                value={command?.clientName}
                fullWidth
                required
                margin="normal"
              />
            </Box>
            <Box mt={2} className="col-6">
              <TextField
                label="Tel"
                variant="outlined"
                type="number"
                value={command?.clientTel}
                fullWidth
                required
                margin="normal"
              />
            </Box>
          </div>
          <Box mt={3}>
            <TextField
              label="Adress"
              variant="outlined"
              value={command?.clientAddress}
              fullWidth
              required
              margin="normal"
            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Email"
              variant="outlined"
              value={command?.clientEmail}
              fullWidth
              required
              margin="normal"
            />
          </Box>
          <div className="row">
            <Box mt={4} className="col-4">
              <Select
                style={{ zIndex: 999 }}
                options={value3}
                value={data3}
                onChange={(e) => {
                  setBranshId(e[0]?.value);
                }}
                isMulti
              />
            </Box>
            <Box mt={4} className="col-4">
              <Select
                style={{ zIndex: 999 }}
                options={value1}
                value={data1}
                onChange={(e) => {
                  setcountryId(e[0]?.value);
                }}
                isMulti
              />
            </Box>
            <Box mt={4} className="col-4">
              <Select
                style={{ zIndex: 999 }}
                options={value2}
                value={data2}
                onChange={(e) => {
                  setcityId(e[0]?.value);
                }}
                isMulti
              />
            </Box>
          </div>

          {renderInputs()}
      
     <div className="row" style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Box mt={2} style={{ flex: 1 ,display: "flex", justifyContent: "space-between",justifyContent:'flex',alignItems:'flex'}}>
    <Typography>Confirm :</Typography>
    <Checkbox
      checked={confirmDelivery}
      onChange={(e) => setConfirmDelivery(e.target.checked)}
      label="Confirm Delivery"
    />
  </Box>
  <Box mt={2} style={{ flex: 1,display: "flex", justifyContent: "space-between",justifyContent:'flex',alignItems:'flex' }}>
    <Typography>Has Delivery :</Typography>
    <Checkbox
      checked={hasDelivery}
      onChange={(e) => setHasDelivery(e.target.checked)}
      label="Has Delivery"
    />
  </Box>
  <Box mt={2} style={{ flex: 1,display: "flex", justifyContent: "space-between",justifyContent:'flex',alignItems:'flex' }}>
    <Typography>Confirm Delivery :</Typography>
    <Checkbox
      checked={confirmHasDelivery}
      onChange={(e) => setConfirmHasDelivery(e.target.checked)}
      label="Confirm Has Delivery"
    />
  </Box>
</div>

          <div className="w-100 d-flex justify-content-center">
            <button
              type="submit"
              onClick={() => navigate(`edit`)}
              className="confirm-button mt-5   mb-3"
            >
              <span className="label-btn"> Edit Commande </span>
            </button>
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default EditCommand;
