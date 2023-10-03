import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCommand } from "../../../store/command";
import { fetchArticlesByBranch } from "../../../store/article";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import Form from "react-bootstrap/Form";
import { FaTrash } from "react-icons/fa";
import {
  fetchCountries,
  findAllCitites,
  findAllBranches,
} from "../../../store/Country";
import { commandChannel } from "../../../constants/channelsCommandData";
import { fetchPaymentChoices } from "../../../store/paymentChoice";
import { paymentTypes } from "../../../constants/paymentTypeData";
import { BiMessageSquareAdd, BiSave } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import SaveButton from "../../../components/Commun/buttons/SaveButton";
import AutoCompleteFilter from "../../../components/Commun/AutoCompleteFilter";
import { fetchClients } from "../../../store/client";

function CreateCommand() {
  const dispatch = useDispatch();

  const articlesByBranch = useSelector((state) => state.article.articles.items);
  const clients = useSelector((state) => state.client.clients.items);
  const countries = useSelector((state) => state.country.countries.items);
  const cities = useSelector((state) => state.country.cities.items);
  const branches = useSelector((state) => state.country.branches.items);
  const paymentChoices = useSelector(
    (state) => state.paymentChoice.paymentChoices.items
  );

  const [newCommand, setNewCommand] = useState({ channel: "on_site" });
  const [newCommandLine, setNewCommandLine] = useState({
    quantity: "",
    articleByBranchId: "",
  });
  const [Total, setTotal] = useState([]);
  const [open, setOpen] = useState(false);

  const [editCommandLineIndexes, setEditCommandLineIndexes] = useState([]);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [loadingClient, setLoadingClients] = useState(false);
  const [typingFullName, setTypingFullName] = useState('');

  useEffect(() => {
    if (newCommand?.branchId) {
      dispatch(fetchArticlesByBranch({ identifier: newCommand?.branchId }));
      setNewCommand({ ...newCommand, commandLine: [] });
    }
  }, [newCommand?.branchId]);

  useEffect(() => {
    dispatch(findAllCitites());
    dispatch(findAllBranches());
    dispatch(fetchCountries());
    dispatch(fetchPaymentChoices());
  }, [dispatch]);

  useEffect(() => {
    setLoadingClients(true);
    dispatch(fetchClients({fullNameEn:typingFullName ,skip: 0, take: 5 })).then(res=>setLoadingClients(false));
  }, [dispatch,typingFullName]);

  useEffect(() => {
    if (newCommand) {
      const newTotal = newCommand?.commandLine?.map(
        (item) => item?.quantity * item?.articleByBranch?.price
      );
      setTotal(newTotal);
    }
  }, [newCommand]);

  const sum = () => {
    let res = 0;
    Total?.map((e, i) => {
      res += e;
    });
    return res;
  };

  const handleCreate = () => {
    const { city, country, branch, createdAt, updatedAt, ...rest } = newCommand;
    dispatch(createCommand(rest)).then((res) => {
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
          <div className="d-flex gap-3 justify-content-center">
            {/* <Button
              disabled={newCommand?.confirm !== "pending"}
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
              disabled={newCommand?.confirm !== "pending"}
              className="btn-danger full "
              title="refuse Command"
              onClick={() => {
                dispatch(confirmCommand({ id: commandId, status: "refused" }));
              }}
            >
              Refuse Command
            </Button> */}
            <Box mt={4} className="col-4">
              Branch
              <Form.Select
                value={newCommand?.branchId}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, branchId: e.target.value });
                }}
                size="lg"
              >
                <option disabled>Select Branch</option>
                {branches.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={4} className="col-4">
              Channel
              <Form.Select
                value={newCommand?.channel}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, channel: e.target.value });
                }}
                size="lg"
              >
                <option disabled>Select Channel</option>
                {commandChannel.map((e, i) => (
                  <option value={e.value} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
          </div>
          <div className="row">
            <Box mt={2} className="col-6">
              {/* <TextField
                label="Name"
                variant="outlined"
                value={newCommand?.clientName || ""}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {
                  setNewCommand({
                    ...newCommand,
                    clientName: e.target.value,
                  });
                }}
              /> */}
              <Autocomplete
                id="asynchronous-demo"
                sx={{ width: 300 ,height:25}}
                open={open}
                onOpen={() => {
                  setOpen(true);
                }}
                onClose={() => {
                  setOpen(false);
                }}
                options={clients}
                loading={loadingClient}
                value={newCommand?.clientName}
                // isOptionEqualToValue={
                //   (option, value) => {
                //     // console.log(option, value);
                //     option.fullNameEn === value.title;
                //   }
                //   // option.fullNameEn.includes(value.title)
                // }
                onChange={(event, newValue) => {
                  console.log(newValue);
                  setNewCommand({ ...newCommand, clientName: newValue.fullNameEn,clientTel:newValue.tel });
                }}
                getOptionLabel={(option) => option.fullNameEn}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onChange={(e)=>{setTypingFullName(e.target.value)}}
                    label="Asynchronous"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        
                          loadingClient ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null
                         
                        
                      ),
                    }}
                  />
                )}
              />
            </Box>
            <Box mt={2} className="col-6">
              <TextField
                label="Tel"
                variant="outlined"
                type="number"
                value={newCommand?.clientTel || ""}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {
                  setNewCommand({ ...newCommand, clientTel: e.target.value });
                }}
              />
            </Box>
          </div>
          <Box mt={3}>
            <TextField
              label="Address"
              variant="outlined"
              value={newCommand?.clientAddress || ""}
              placeholder={newCommand?.clientAddress}
              fullWidth
              required
              margin="normal"
              onChange={(e) => {
                setNewCommand({
                  ...newCommand,
                  clientAddress: e.target.value,
                });
              }}
            />
          </Box>
          <Box mt={3}>
            <TextField
              label="Email"
              variant="outlined"
              value={newCommand?.clientEmail || ""}
              fullWidth
              required
              margin="normal"
              onChange={(e) => {
                setNewCommand({ ...newCommand, clientEmail: e.target.value });
              }}
            />
          </Box>
          <div className="row">
            <Box mt={4} className="col-4">
              Country
              <Form.Select
                value={newCommand?.countryId}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, countryId: e.target.value });
                }}
                size="lg"
              >
                <option disabled>Select Country</option>
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
                value={newCommand?.cityId}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, cityId: e.target.value });
                }}
                size="lg"
              >
                <option disabled>Select City</option>
                {cities.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
          </div>

          {newCommand?.commandLine?.map((elem, i) => (
            <Box key={i} mt={3} mb={3} display="flex" alignItems="center">
              <Form.Select
                disabled={!editCommandLineIndexes.includes(i)}
                value={newCommand.commandLine[i].articleByBranchId}
                onChange={(e) => {
                  let aux = [...newCommand.commandLine];
                  let obj = { ...aux[i] };
                  obj.articleByBranchId = e.target.value;
                  aux[i] = { ...obj };
                  setNewCommand({ ...newCommand, commandLine: aux });
                }}
                style={{ flex: 1, marginRight: "10px" }}
              >
                <option disabled>Select Article</option>
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
                  disabled={!editCommandLineIndexes.includes(i)}
                  value={newCommand.commandLine[i].quantity}
                  onChange={(e) => {
                    let aux = [...newCommand.commandLine];
                    let obj = { ...aux[i] };
                    obj.quantity = +e.target.value;
                    aux[i] = { ...obj };
                    setNewCommand({ ...newCommand, commandLine: aux });
                  }}
                />
              </div>
              <div className=" col-2 text-center">
                {newCommand.commandLine[i]?.articleByBranch?.price}
              </div>
              <div className="col-2 text-center">
                {newCommand.commandLine[i]?.quantity *
                  newCommand.commandLine[i]?.articleByBranch?.price}
              </div>

              <>
                {!editCommandLineIndexes.includes(i) ? (
                  <div
                    style={{ width: 60 }}
                    className="d-flex justify-content-around gap-1"
                  >
                    <button className="btn btn-light">
                      <FaTrash
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          let aux = [...newCommand.commandLine];
                          let result = aux.filter((elem, j) => i !== j);
                          setNewCommand({
                            ...newCommand,
                            commandLine: result,
                          });
                        }}
                      />
                    </button>

                    <button className="btn btn-light">
                      <GrEdit
                        onClick={() =>
                          setEditCommandLineIndexes([
                            ...editCommandLineIndexes,
                            i,
                          ])
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </button>
                  </div>
                ) : (
                  <button className="btn btn-light">
                    <BiSave
                      onClick={() =>
                        setEditCommandLineIndexes(
                          editCommandLineIndexes.filter((elem) => elem !== i)
                        )
                      }
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                )}
              </>
            </Box>
          ))}

          <Box mt={3} mb={3} display="flex" alignItems="center">
            <Form.Select
              value={newCommandLine?.articleByBranchId}
              onChange={(e) => {
                setNewCommandLine({
                  ...newCommandLine,
                  articleByBranch: {
                    ...articlesByBranch.filter(
                      (elem) => elem.id === e.target.value
                    )[0],
                  },

                  articleByBranchId: e.target.value,
                });
              }}
            >
              <option disabled>Select Article</option>
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
              <button className="btn btn-light">
                <BiMessageSquareAdd
                  size={22}
                  onClick={() => {
                    if (newCommandLine.quantity.length === 0)
                      setErrorQuantity(true);
                    else {
                      setNewCommand({
                        ...newCommand,
                        commandLine: [
                          ...newCommand.commandLine,
                          newCommandLine,
                        ],
                      });
                      setNewCommandLine({ quantity: "" });
                    }
                  }}
                  style={{ cursor: "pointer" }}
                />
              </button>
            </div>
          </Box>

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
                    {newCommand?.hasDelivery ? 7 : 0} TND
                  </span>
                </div>
              </div>

              <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                <div class="col-7 text-right">Total Amount</div>
                <div class="col-5">
                  <span class="text-150 text-success-d3 opacity-2">
                    {sum() + (newCommand?.hasDelivery ? 7 : 0)} TND
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
                checked={newCommand?.hasDelivery}
                onChange={(e) => {
                  setNewCommand({
                    ...newCommand,
                    hasDelivery: e.target.checked,
                  });
                }}
                label={"Has Delivery"}
              />
            </Box>

            <Box mt={4} className="col-4 d-flex">
              <Typography>{"Payement Type :"}</Typography>
              <Form.Select
                value={newCommand?.payementType}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, channel: e.target.value });
                }}
                size="lg"
              >
                <option disabled>Select Payement type</option>
                {paymentTypes.map((e, i) => (
                  <option value={e.value} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={4} className="col-4 d-flex">
              <Typography>{"Payement Choise :"}</Typography>
              <Form.Select
                value={newCommand?.payementChoiceId}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, channel: e.target.value });
                }}
                size="lg"
              >
                <option disabled>Select Payement type</option>
                {paymentChoices.map((e, i) => (
                  <option value={e.value} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
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
                checked={newCommand?.delivered}
                onChange={(e) => {
                  setNewCommand({
                    ...newCommand,
                    delivered: e.target.checked,
                  });
                }}
                label={"confirmHasDelivery"}
              />
            </Box>
          </div>

          <div className="w-100 d-flex justify-content-center gap-4 p-4">
            <SaveButton width={100} type="button" onClick={handleCreate} />
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default CreateCommand;
