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
import { fetchCommand, updateCommand } from "../../../store/command";
import { fetchArticlesByBranch } from "../../../store/article";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  fetchCountries,
  findAllCitites,
  findAllBranches,
} from "../../../store/Country";
function EditCommand() {
  const command = useSelector((state) => state.command.command);
  const { commandId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [commandLine, setcommandLine] = useState([]);
  const [editCommand, setEditcommand] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const articlesByBranch = useSelector((state) => state.article.articles);
  console.log(articlesByBranch,"okok")

  const countries = useSelector((state) => state.country.countries.items);
  const cities = useSelector((state) => state.country.cities.items);
  const branches = useSelector((state) => state.country.branches.items);

useEffect(()=>{
    dispatch(fetchArticlesByBranch({identifier: editCommand?.branchId}));
},[editCommand?.branchId])

  useEffect(() => {
    dispatch(fetchCommand(commandId));
    dispatch(findAllCitites());
    dispatch(findAllBranches());
    dispatch(fetchCountries());
  }, [dispatch]);

  useEffect(() => {
    const res = { ...command, commandLine: [] };

    command?.commandLine?.map((item, i) => {
      res.commandLine.push({
        title: item.articleByBranch.article.title,
        quantity: item.quantity,
        articleByBranchId: item.articleByBranchId,
      });
    });

    setEditcommand(res);
  }, [command]);

  const handleDelete = (index) => {
    const updatedCommandLine = [...commandLine];
    updatedCommandLine.splice(index, 1);
    setcommandLine(updatedCommandLine);
  };



  // useEffect(() => {
  //   setdata1({
  //     value: command?.country?.id,
  //     label: command?.country?.nameEn,
  //   });
  //   setdata2({
  //     value: command?.city?.id,
  //     label: command?.city?.nameEn,
  //   });
  //   setdata3({
  //     value: command?.branchId,
  //     label: command?.branch?.name,
  //   });
  // }, [delivered, confirmDelivery, hasDelivery]);

  const renderInputs = () => {
    return editCommand?.commandLine?.map((e, i) => (
      <Box key={i} mt={3} mb={3} display="flex" alignItems="center">
        <div style={{ flex: 2 }}>
          {/* <Form
            isDisabled={!editMode}
            placeholder={titles[i] ? titles[i] : null}
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
            options={value}
            style={{ flex: 1, marginRight: "10px" }}
          /> */}

          {/* <Form.Select
          value={editCommand?.branchId}
               onChange={(e) => {setEditcommand({...editCommand,branchId:e.target.value})  }}
            size="lg"
          >
            {branches.map((e, i) => (
              <option value={e.id} key={i}>
                {e.name}
              </option>
            ))}
          </Form.Select> */}

        </div>

        {/* <div style={{ marginLeft: "10px", fontSize: "10px" }}>
          <input
            placeholder={e}
            type="number"
            disabled={!editMode}
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
          />
        </div> */}

        {editMode && (
          <div style={{ marginLeft: "10px" }}>
            <FaTrash
              onClick={() => handleDelete(i)}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </Box>
    ));
  };


  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleEdit = () => {
    const aux = {...editCommand};
    console.log(aux, "aux");
    dispatch(updateCommand(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast("command created successfully");
        toggleEditMode();
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  return (
    <div>
      <Container maxWidth="md">
        <Box mt={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Details Command
          </Typography>

          <div className="row">
            <Box mt={2} className="col-6">
              <TextField
                label="Name"
                variant="outlined"
                disabled={!editMode}
                value={editCommand?.clientName}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {setEditcommand({...editCommand,clientName:e.target.value})  }}

              />
            </Box>
            <Box mt={2} className="col-6">
              <TextField
                label="Tel"
                variant="outlined"
                type="number"
                disabled={!editMode}
                value={editCommand?.clientTel}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {setEditcommand({...editCommand,clientTel:e.target.value})  }}

              />
            </Box>
          </div>
          <Box mt={3}>
            <TextField
              label="Adress"
              variant="outlined"
              disabled={!editMode}
              value={editCommand?.clientAddress}
              fullWidth
              required
              margin="normal"
              onChange={(e) => {setEditcommand({...editCommand,clientAddress:e.target.value})  }}

            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Email"
              variant="outlined"
              value={editCommand?.clientEmail}
              fullWidth
              required
              disabled={!editMode}
              margin="normal"
              onChange={(e) => {setEditcommand({...editCommand,clientEmail:e.target.value})  }}
            />
          </Box>
          <div className="row">
            <Box mt={4} className="col-4">
              Branch
              <Form.Select
              value={editCommand?.branchId}
                         onChange={(e) => {setEditcommand({...editCommand,branchId:e.target.value})  }}

                size="lg"
              >
                {branches.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={4} className="col-4">
              Country
              <Form.Select
                  value={editCommand?.countryId}
                  onChange={(e) => {setEditcommand({...editCommand,countryId:e.target.value})  }}
                size="lg"
              >
                {countries.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={4} className="col-4">
              City
              <Form.Select
                 value={editCommand?.cityId}
                 onChange={(e) => {setEditcommand({...editCommand,cityId:e.target.value})  }}
                size="lg"
              >
                {cities.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Box>
          </div>

          {renderInputs()}

          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              mt={2}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                justifyContent: "flex",
                alignItems: "flex",
              }}
            >
              <Typography>
                {"Paid"}
              </Typography>
              <Checkbox
                disabled={!editMode}
                checked={editCommand?.paid}
                onChange={(e) => {setEditcommand({...editCommand,paid:e.target.checked})  }}
                label="paid"
                
              />
            </Box>
            <Box
              mt={2}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                justifyContent: "flex",
                alignItems: "flex",
              }}
            >
              <Typography>
                {"Has Delivery :"}
              </Typography>
              <Checkbox
                disabled={!editMode}
                checked={editCommand?.hasDelivery}
                onChange={(e) => {setEditcommand({...editCommand,hasDelivery:e.target.checked})  }}
                label={"Has Delivery"}
              />
            </Box>
            <Box
              mt={2}
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "space-between",
                justifyContent: "flex",
                alignItems: "flex",
              }}
            >
              <Typography>
                {"confirmHasDelivery"}
              </Typography>
              <Checkbox
                disabled={!editMode}
                checked={editCommand?.confirmHasDelivery}
                onChange={(e) => {setEditcommand({...editCommand,confirmHasDelivery:e.target.checked})  }}
                label={
                 "confirmHasDelivery"
                }
              />
            </Box>
          </div>
          {!editMode ? (
            <div className="w-100 d-flex justify-content-center">
              <button
                type="button"
                onClick={toggleEditMode}
                className="confirm-button mt-5 mb-3"
              >
                <span className="label-btn">Edit Command</span>
              </button>
            </div>
          ) : (
            <div className="w-100 d-flex justify-content-center">
              <button
                type="button"
                onClick={handleEdit}
                className="confirm-button mt-5 mb-3"
              >
                <span className="label-btn">Save Changes </span>
              </button>
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default EditCommand;
