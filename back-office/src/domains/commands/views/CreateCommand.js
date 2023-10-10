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
import {
  fetchArticleByBranchWithCode,
  fetchArticlesByBranch,
} from "../../../store/article";
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
import { useNavigate } from "react-router-dom";

function CreateCommand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articlesByBranch = useSelector((state) => state.article.articles.items);
  const articleByBranch = useSelector((state) => state.article.article);
  const clients = useSelector((state) => state.client.clients.items);
  const countries = useSelector((state) => state.country.countries.items);
  const cities = useSelector((state) => state.country.cities.items);
  const branches = useSelector((state) => state.country.branches.items);
  const paymentChoices = useSelector(
    (state) => state.paymentChoice.paymentChoices.items
  );

  const [newCommand, setNewCommand] = useState({
    contactChannel: "on_site",
    paymentType: null,
  });
  const [newCommandLine, setNewCommandLine] = useState({
    quantity: null,
    articleByBranchId: null,
    articleByBranch: null,
  });
  const [Total, setTotal] = useState([]);
  const [openClients, setOpenClients] = useState(false);
  const [openArticles, setOpenArticles] = useState(false);

  const [editCommandLineIndexes, setEditCommandLineIndexes] = useState([]);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [loadingClient, setLoadingClients] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [typingFullName, setTypingFullName] = useState("");
  const [typingCode, setTypingCode] = useState("");
  const [typingArticleTitle, setTypingArticleTitle] = useState("");
  //fetch articles of branch by branchId and articleTitle
  useEffect(() => {
    if (newCommand?.branchId) {
      setLoadingArticles(true);
      dispatch(
        fetchArticlesByBranch({
          identifier: newCommand?.branchId,
          title: typingArticleTitle,
        })
      ).then((res) => setLoadingArticles(false));
      setNewCommand({ ...newCommand, commandLine: [] });
    }
  }, [newCommand?.branchId, typingArticleTitle]);
  // fetch one article of branch by branchId and code
  useEffect(() => {
    if (typingCode)
      dispatch(
        fetchArticleByBranchWithCode({
          identifier: newCommand.branchId,
          code: typingCode,
        })
      );
  }, [typingCode]);
  useEffect(() => {
    if (typingCode) {
      console.log(articleByBranch);
      if (articleByBranch) {
        setNewCommandLine({
          ...newCommandLine,
          quantity: 1,
          articleByBranch: articleByBranch,
          articleByBranchId: articleByBranch.id,
        });
      } else {
        setNewCommandLine({ quantity: "" });
      }
    }
  }, [articleByBranch]);
  // fetch command options
  useEffect(() => {
    dispatch(findAllCitites());
    dispatch(findAllBranches());
    dispatch(fetchCountries());
    dispatch(fetchPaymentChoices());
  }, [dispatch]);
  // fetch clients by fullName
  useEffect(() => {
    setLoadingClients(true);
    dispatch(
      fetchClients({ fullNameEn: typingFullName, skip: 0, take: 5 })
    ).then((res) => setLoadingClients(false));
  }, [dispatch, typingFullName]);
  // total Amount for each command line
  useEffect(() => {
    if (newCommand) {
      const newTotal = newCommand?.commandLine?.map(
        (item) => item?.quantity * item?.articleByBranch?.price
      );
      setTotal(newTotal);
    }
  }, [newCommand]);
  // total Amount of command lines
  const sum = () => {
    let res = 0;
    Total?.map((e, i) => {
      res += e;
    });
    return res;
  };

  const handleCreate = () => {
    const {
      city,
      country,
      branch,
      createdAt,
      updatedAt,
      branchId,
      commandLine,
      ...rest
    } = newCommand;
    let commandLinesArray = commandLine.map(
      ({ quantity, articleByBranchId }) => {
        console.log(articleByBranchId);
        return {
          quantity,
          articleByBranchId,
        };
      }
    );
    let aux = { ...rest, commandLine: commandLinesArray };

    dispatch(createCommand({ ...aux, branchId })).then((res) => {
      if (!res.error) {
        showSuccessToast("command created successfully");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  };
  console.log(newCommand.commandLine);

  return (
    <div>
      <Container maxWidth="md">
        <Box mt={3}>
          <Typography variant="h4" align="center" gutterBottom>
            Create Command
          </Typography>
          <div className="d-flex gap-3 justify-content-center">
            <Box mt={4} className="col-4">
              Branch
              <Form.Select
                value={newCommand?.branchId}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, branchId: e.target.value });
                }}
                size="lg"
              >
                <option disabled selected>
                  Select Branch
                </option>
                {branches.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={4} className="col-4">
              Contact Channel
              <Form.Select
                value={newCommand?.contactChannel}
                onChange={(e) => {
                  setNewCommand({
                    ...newCommand,
                    contactChannel: e.target.value,
                  });
                }}
                size="lg"
              >
                <option disabled selected>
                  Select Channel
                </option>
                {commandChannel.map((e, i) => (
                  <option value={e.value} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
          </div>
          <div className="row align-items-center mt-5">
            <Box className="col-4 align-items-center d-flex">
              <Autocomplete
                aria-required={true}
                fullWidth
                sx={{
                  ".MuiInputBase-root": {
                    height: "43px !important",
                  },
                }}
                open={openClients}
                onOpen={() => {
                  setOpenClients(true);
                }}
                onClose={() => {
                  setOpenClients(false);
                }}
                options={clients}
                loading={loadingClient}
                value={newCommand?.clientName}
                onChange={(event, v) => {
                  setNewCommand({
                    ...newCommand,
                    clientName: v?.fullNameEn,
                    clientTel: v?.tel,
                    clientAddress: v?.address,
                    clientEmail: v?.email,
                    clientId: v?.id,
                  });
                }}
                getOptionLabel={(option) => option.fullNameEn}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setTypingFullName(e.target.value);
                    }}
                    label="Name"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: loadingClient ? (
                        <CircularProgress color="inherit" size={10} />
                      ) : null,
                    }}
                  />
                )}
              />
            </Box>
            <Box
              className="col-3"
              style={{ alignItems: "center", display: "flex" }}
            >
              <TextField
                sx={{ margin: 0 }}
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
            <Box
              className="col-5"
              style={{ alignItems: "center", display: "flex" }}
            >
              <TextField
                sx={{ margin: 0 }}
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
          </div>
          <Box mt={1}>
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

          <div className="row justify-content-center">
            <Box mt={1} className="col-4">
              Country
              <Form.Select
                value={newCommand?.countryId}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, countryId: e.target.value });
                }}
              >
                <option disabled>Select Country</option>
                {countries.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={1} className="col-4">
              City
              <Form.Select
                value={newCommand?.cityId}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, cityId: e.target.value });
                }}
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
          <div className="mt-5 mb-5">
            {newCommand?.commandLine?.map((elem, i) => (
              <Box key={i} mt={5} mb={5} display="flex" alignItems="center">
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
                  <option disabled selected>
                    Select Article
                  </option>
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
            {!newCommand.branchId && (
              <p className="text-center" style={{ color: "red" }}>
                Select branch please
              </p>
            )}
            <Box mt={3} mb={3} display="flex" alignItems="center" gap={2}>
              <div style={{ fontSize: "10px" }} className="col-2">
                <input
                  // min={1}
                  // type="number"
                  size="lg"
                  className="form-control rounded"
                  disabled={!newCommand.branchId}
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
                  }
                  value={
                    newCommandLine?.articleByBranch?.article?.code || typingCode
                  }
                  onChange={(e) => {
                    setTypingCode(e.target.value);
                  }}
                />
              </div>
              <Autocomplete
                aria-required={true}
                disabled={!newCommand.branchId}
                fullWidth
                sx={{
                  ".MuiInputBase-root": {
                    height: "43px !important",
                  },
                }}
                open={openArticles}
                onOpen={() => {
                  setOpenArticles(true);
                }}
                onClose={() => {
                  setOpenArticles(false);
                }}
                options={articlesByBranch}
                loading={loadingArticles}
                value={newCommandLine?.articleByBranch}
                onChange={(event, v) => {
                  setNewCommandLine({
                    ...newCommandLine,
                    quantity: 1,
                    articleByBranch: {
                      ...v,
                    },
                    articleByBranchId: v.id,
                  });
                }}
                getOptionLabel={(option) => option?.article?.title}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setTypingArticleTitle(e.target.value);
                    }}
                    label="Article"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: loadingClient ? (
                        <CircularProgress color="inherit" size={10} />
                      ) : null,
                    }}
                  />
                )}
              />

              <div style={{ fontSize: "10px" }} className="col-1">
                <input
                  min={1}
                  type="number"
                  disabled={!newCommandLine?.quantity}
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
                  newCommandLine?.articleByBranch?.price||''}
              </div>

              <div
                style={{ width: 60 }}
                className="d-flex justify-content-center col-2"
              >
                <button
                  className="btn btn-light"
                  disabled={!newCommand.branchId}
                  onClick={() => {
                    if (
                      newCommandLine?.quantity?.length === 0 ||
                      newCommandLine?.quantity === null
                    )
                      setErrorQuantity(true);
                    else {
                      setNewCommand({
                        ...newCommand,
                        commandLine: [
                          ...newCommand.commandLine,
                          newCommandLine,
                        ],
                      });
                      setNewCommandLine({
                        quantity: "",
                        articleByBranch: null,
                      });
                      setTypingCode("");
                    }
                  }}
                >
                  <BiMessageSquareAdd size={22} style={{ cursor: "pointer" }} />
                </button>
              </div>
            </Box>
          </div>

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
            <Box mt={4} className="col-4 d-flex">
              <Typography>{"Payement Type:"}</Typography>
              <select
                className="form-control rounded"
                value={newCommand?.paymentType}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, paymentType: e.target.value });
                }}
              >
                <option disabled selected>
                  Select Payment type
                </option>
                {paymentTypes.map((e, i) => (
                  <option value={e.value} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </select>
            </Box>

            <Box mt={4} className="col-4 d-flex">
              <Typography>{"Payment Choice :"}</Typography>
              <select
                disabled={newCommand?.paymentType !== "contant"}
                className="form-control rounded"
                value={newCommand?.paymentChoiceId}
                onChange={(e) => {
                  setNewCommand({
                    ...newCommand,
                    paymentChoiceId: e.target.value,
                  });
                }}
                size="lg"
              >
                <option disabled selected>
                  Select Payment Choice
                </option>
                {paymentChoices.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </select>
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
