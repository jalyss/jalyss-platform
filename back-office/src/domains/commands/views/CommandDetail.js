import { Box, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  confirmCommand,
  fetchCommand,
  updateCommand,
} from "../../../store/command";
import { fetchArticlesByBranch } from "../../../store/article";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import Form from "react-bootstrap/Form";

import { FaTrash } from "react-icons/fa";
import {
  fetchCountries,
  findAllCitites,
  findAllBranches,
} from "../../../store/Country";
import { BiMessageSquareAdd, BiSave } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { Button } from "react-bootstrap";
import CancelButton from "../../../components/Commun/buttons/CancelButton";
import SaveButton from "../../../components/Commun/buttons/SaveButton";
function EditCommand() {
  const command = useSelector((state) => state.command.command);
  const { commandId } = useParams();
  const dispatch = useDispatch();

  const articlesByBranch = useSelector((state) => state.article.articles.items);
  const countries = useSelector((state) => state.country.countries.items);
  const cities = useSelector((state) => state.country.cities.items);
  const branches = useSelector((state) => state.country.branches.items);

  const [editCommand, setEditCommand] = useState(null);
  const [newCommandLine, setNewCommandLine] = useState({
    quantity: "",
    articleByBranchId: "",
  });
  const [Total, setTotal] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [editCommanLineIndexes, setEditCommandLineIndexes] = useState([]);
  const [errorQuantity, setErrorQuantity] = useState(false);

  useEffect(() => {
    if (editCommand?.branchId) {
      dispatch(fetchArticlesByBranch({ identifier: editCommand?.branchId }));
      setEditCommand({ ...editCommand, commandLine: [] });
    }
  }, [editCommand?.branchId]);

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
        title: item.articleByBranch.article?.title,
        quantity: item.quantity,
        articleByBranchId: item.articleByBranchId,
      });
    });

    setEditCommand({ ...command });
  }, [command]);
  useEffect(() => {
    if (editCommand) {
      const newTotal = editCommand?.commandLine?.map(
        (item) => item?.quantity * item?.articleByBranch?.price
      );
      setTotal(newTotal);
    }
  }, [editCommand]);

  const sum = () => {
    let res = 0;
    Total?.map((e, i) => {
      res += e;
    });
    return res;
  };

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode);
  };

  const handleEdit = () => {
    const { city, country, branch, createdAt, updatedAt, ...rest } =
      editCommand;
    dispatch(updateCommand(rest)).then((res) => {
      if (!res.error) {
        showSuccessToast("command created successfully");
        toggleEditMode();
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  console.log(editCommand, "editCommand");
  console.log(newCommandLine, "newCommandLine");

  return (
    <div>
      <Container maxWidth="md">
        <Box mt={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Details Command
          </Typography>
          <div className="d-flex gap-3 justify-content-center">
            <Button
              disabled={command?.confirm !== "pending"}
              className="full bg-purple hover-bg-black"
              onClick={() => {
                dispatch(
                  confirmCommand({ id: commandId, status: "confirmed" })
                );
              }}
            >
              Confirm Command
            </Button>
            <Button
              disabled={command?.confirm !== "pending"}
              className="btn-danger full "
              title="refuse Command"
              onClick={() => {
                dispatch(confirmCommand({ id: commandId, status: "refused" }));
              }}
            >
              Refuse Command
            </Button>
          </div>
          <div className="row">
            <Box mt={2} className="col-6">
              <TextField
                label="Name"
                variant="outlined"
                disabled={!editMode}
                value={editCommand?.clientName || ""}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {
                  setEditCommand({
                    ...editCommand,
                    clientName: e.target.value,
                  });
                }}
              />
            </Box>
            <Box mt={2} className="col-6">
              <TextField
                label="Tel"
                variant="outlined"
                type="number"
                disabled={!editMode}
                value={editCommand?.clientTel || ""}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {
                  setEditCommand({ ...editCommand, clientTel: e.target.value });
                }}
              />
            </Box>
          </div>
          <Box mt={3}>
            <TextField
              label="Address"
              variant="outlined"
              disabled={!editMode}
              value={editCommand?.clientAddress || ""}
              placeholder={editCommand?.clientAddress}
              fullWidth
              required
              margin="normal"
              onChange={(e) => {
                setEditCommand({
                  ...editCommand,
                  clientAddress: e.target.value,
                });
              }}
            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Email"
              variant="outlined"
              value={editCommand?.clientEmail || ""}
              fullWidth
              required
              disabled={!editMode}
              margin="normal"
              onChange={(e) => {
                setEditCommand({ ...editCommand, clientEmail: e.target.value });
              }}
            />
          </Box>
          <div className="row">
            <Box mt={4} className="col-4">
              Branch
              <Form.Select
                disabled={!editMode}
                value={editCommand?.branchId}
                onChange={(e) => {
                  setEditCommand({ ...editCommand, branchId: e.target.value });
                }}
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
                disabled={!editMode}
                value={editCommand?.countryId}
                onChange={(e) => {
                  setEditCommand({ ...editCommand, countryId: e.target.value });
                }}
                size="lg"
              >
                {countries.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={4} className="col-4">
              City
              <Form.Select
                disabled={!editMode}
                value={editCommand?.cityId}
                onChange={(e) => {
                  setEditCommand({ ...editCommand, cityId: e.target.value });
                }}
                size="lg"
              >
                {cities.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
          </div>

          {editCommand?.commandLine?.map((elem, i) => (
            <Box key={i} mt={3} mb={3} display="flex" alignItems="center">
              <Form.Select
                disabled={!editCommanLineIndexes.includes(i)}
                value={editCommand.commandLine[i].articleByBranchId}
                onChange={(e) => {
                  let aux = [...editCommand.commandLine];
                  let obj = { ...aux[i] };
                  obj.articleByBranchId = e.target.value;
                  aux[i] = { ...obj };
                  setEditCommand({ ...editCommand, commandLine: aux });
                }}
                style={{ flex: 1, marginRight: "10px" }}
              >
                {articlesByBranch?.map((elem, j) => (
                  <option key={j} value={elem.id}>
                    {elem.article?.title}
                  </option>
                ))}
              </Form.Select>

              <div style={{ marginLeft: "10px", fontSize: "10px" }}>
                <input
                  placeholder={elem}
                  type="number"
                  min={1}
                  disabled={!editCommanLineIndexes.includes(i)}
                  value={editCommand.commandLine[i].quantity}
                  onChange={(e) => {
                    let aux = [...editCommand.commandLine];
                    let obj = { ...aux[i] };
                    obj.quantity = +e.target.value;
                    aux[i] = { ...obj };
                    setEditCommand({ ...editCommand, commandLine: aux });
                  }}
                />
              </div>
              <div className=" col-2 text-center">
                {editCommand.commandLine[i]?.articleByBranch?.price}
              </div>
              <div className="col-2 text-center">
                {editCommand.commandLine[i]?.quantity *
                  editCommand.commandLine[i]?.articleByBranch?.price}
              </div>
              {editMode && (
                <>
                  {!editCommanLineIndexes.includes(i) ? (
                    <div
                      style={{ width: 60 }}
                      className="d-flex justify-content-around"
                    >
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let aux = [...editCommand.commandLine];
                          console.log(aux, "aux");
                          let result = aux.filter((elem, j) => i !== j);
                          console.log(result);
                          setEditCommand({
                            ...editCommand,
                            commandLine: result,
                          });
                        }}
                      />
                      <GrEdit
                        onClick={() =>
                          setEditCommandLineIndexes([
                            ...editCommanLineIndexes,
                            i,
                          ])
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                  ) : (
                    <BiSave
                      onClick={() =>
                        setEditCommandLineIndexes(
                          editCommanLineIndexes.filter((elem) => elem !== i)
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                  )}
                </>
              )}
            </Box>
          ))}
          {editMode && (
            <Box mt={3} mb={3} display="flex" alignItems="center">
              <Form.Select
                disabled={!editMode}
                value={newCommandLine?.articleByBranchId}
                onChange={(e) => {
                  setNewCommandLine({
                    ...newCommandLine,
                    articleByBranch: {
                      ...articlesByBranch.filter(
                        (elem) => elem.id === e.target.value
                      )[0],
                    },
                    commandId: commandId,
                    articleByBranchId: e.target.value,
                  });
                }}
              >
                {articlesByBranch?.map((elem, i) => (
                  <option key={i} value={elem.id}>
                    {elem.article?.title}
                  </option>
                ))}
              </Form.Select>

              <div style={{ marginLeft: "10px", fontSize: "10px" }}>
                <input
                  min={1}
                  type="number"
                  // className="w-50"
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red" }
                      : {}
                  }
                  value={newCommandLine.quantity}
                  disabled={!editMode}
                  onChange={(e) => {
                    setNewCommandLine({
                      ...newCommandLine,
                      quantity: +e.target.value,
                    });
                    e.target.value.length === 0
                      ? setErrorQuantity(true)
                      : setErrorQuantity(false);
                  }}
                />
              </div>
              <div className=" col-2 text-center">
                {newCommandLine?.articleByBranch?.price}
              </div>
              <div className="col-2 text-center">
                {newCommandLine?.quantity *
                  newCommandLine?.articleByBranch?.price}
              </div>

              <div
                style={{ width: 60 }}
                className="d-flex justify-content-center col-2"
              >
                <BiMessageSquareAdd
                  size={22}
                  onClick={() => {
                    if (newCommandLine.quantity.length === 0)
                      setErrorQuantity(true);
                    else {
                      setEditCommand({
                        ...editCommand,
                        commandLine: [
                          ...editCommand.commandLine,
                          newCommandLine,
                        ],
                      });
                      setNewCommandLine({ quantity: "" });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              </div>
            </Box>
          )}
          <div class="row mt-3">
            <div class="col-12 col-sm-7 text-grey-d2 text-95 mt-2 mt-lg-0">
              Extra note such as company or payment information...
            </div>

            <div class="col-12 col-sm-5 text-grey text-90 order-first order-sm-last">
              <div class="row my-2">
                <div class="col-7 text-right">SubTotal</div>
                <div class="col-5">
                  <span class="text-120 text-secondary-d1">{sum()} TND</span>
                </div>
              </div>

              <div class="row my-2">
                <div class="col-7 text-right">Shipping Cost:</div>
                <div class="col-5">
                  <span class="text-110 text-secondary-d1">
                    {editCommand?.hasDelivery ? 7 : 0} TND
                  </span>
                </div>
              </div>

              <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                <div class="col-7 text-right">Total Amount</div>
                <div class="col-5">
                  <span class="text-150 text-success-d3 opacity-2">
                    {sum() + (editCommand?.hasDelivery ? 7 : 0)} TND
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box
              mt={2}
              style={{
                flex: 1,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Typography>{"Has Delivery :"}</Typography>
              <input
                type="checkbox"
                className="form-check-input"
                disabled={!editMode}
                checked={editCommand?.hasDelivery}
                onChange={(e) => {
                  setEditCommand({
                    ...editCommand,
                    hasDelivery: e.target.checked,
                  });
                }}
                label={"Has Delivery"}
              />
            </Box>
            <Box
              mt={2}
              style={{
                flex: 1,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Typography>{"Paid :"}</Typography>
              <input
                type="checkbox"
                className="form-check-input"
                disabled={!editMode}
                checked={editCommand?.paid}
                onChange={(e) => {
                  setEditCommand({ ...editCommand, paid: e.target.checked });
                }}
                label="paid"
              />
            </Box>

            <Box
              mt={2}
              style={{
                flex: 1,
                display: "flex",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Typography>{"Delivered :"}</Typography>
              <input
                type="checkbox"
                className="form-check-input"
                disabled={!editMode}
                checked={editCommand?.delivered}
                onChange={(e) => {
                  setEditCommand({
                    ...editCommand,
                    delivered: e.target.checked,
                  });
                }}
                label={"confirmHasDelivery"}
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
            <div className="w-100 d-flex justify-content-center gap-4 p-4">
              <CancelButton
                type="button"
                width={100}
                onClick={() => {
                  toggleEditMode();
                  setEditCommand(command);
                }}
              />

              <SaveButton width={100} type="button" onClick={handleEdit} />
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default EditCommand;
