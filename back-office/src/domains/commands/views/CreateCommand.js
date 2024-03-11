import {
  Autocomplete,
  Box,
  CircularProgress,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
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

import { fetchClients } from "../../../store/client";
import { useNavigate } from "react-router-dom";

import { fetchDiscountCode } from "../../../store/discountCode";
import { useReactToPrint } from "react-to-print";
import PrintButton from "../../../components/Commun/buttons/PrintButton";

function CreateCommand() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articlesByBranch = useSelector((state) => state.article.articles.items);
  const articleByBranch = useSelector((state) => state.article.article);
  const clients = useSelector((state) => state.client.clients.items);
  const countries = useSelector((state) => state.country.countries.items);
  const cities = useSelector((state) => state.country.cities.items);
  const branches = useSelector((state) => state.country.branches.items);
  const discountCode = useSelector((state) => state.discountCode.discountCode);
  const paymentChoices = useSelector(
    (state) => state.paymentChoice.paymentChoices.items
  );

  const [newCommand, setNewCommand] = useState({
    contactChannel: "on_site",
    paymentType: null,
    discountCode: "",
    // <financialCommitmentLines>: [],
  });
  const [newCommandLine, setNewCommandLine] = useState({
    quantity: null,
    articleByBranchId: null,
    articleByBranch: null,
  });
  const [Total, setTotal] = useState([]);
  const [openClients, setOpenClients] = useState(false);
  const [openArticles, setOpenArticles] = useState(false);
  const [openArticlesEditCommandLines, setOpenArticlesEditCommandLines] =
    useState([]);
  const [openCites, setOpenCites] = useState(false);
  const [openCountries, setOpenCountries] = useState(false);

  const [editCommandLineIndexes, setEditCommandLineIndexes] = useState([]);
  const [errorQuantity, setErrorQuantity] = useState(false);
  const [loadingClient, setLoadingClients] = useState(false);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [loadingCites, setLoadingCites] = useState(false);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [typingFullName, setTypingFullName] = useState("");
  const [typingCode, setTypingCode] = useState("");
  const [typingArticleTitle, setTypingArticleTitle] = useState("");
  const [typingCountry, setTypingCountry] = useState("");
  const [typingCity, setTypingCity] = useState("");
  const [typingDiscountCode, setTypingDiscountCode] = useState("");

  const [financialCommitmentNumber, setFinancialCommitmentNumber] = useState(1);
  const [financialCommitmentLines, setFinancialCommitmenLines] = useState([
    { amount: 0, date: "" },
  ]);

  const [print, setPrint] = useState(false);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => {
      setPrint(false);
    },
  });

  //#region //useEffect
  //fetch articles of branch by branchId and articleTitle
  useEffect(() => {
    if (newCommand?.branchId) {
      setLoadingArticles(true);
      dispatch(
        fetchArticlesByBranch({
          identifier: newCommand?.branchId,
          title: typingArticleTitle,
          take: 5,
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
    dispatch(findAllBranches());
    dispatch(fetchPaymentChoices());
  }, [dispatch]);
  //fetch countries and cites by name
  useEffect(() => {
    setLoadingCountries(true);
    dispatch(fetchCountries({ name: typingCountry, take: 5 })).then((res) =>
      setLoadingCountries(false)
    );
  }, [typingCountry]);

  useEffect(() => {
    if (newCommand.countryId) {
      setLoadingCites(true);
      dispatch(
        findAllCitites({
          name: typingCity,
          take: 5,
          countryId: newCommand.countryId,
        })
      ).then((res) => setLoadingCites(false));
    }
  }, [newCommand.countryId, typingCity]);
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
        (item) =>
          item?.quantity * item?.articleByBranch?.price -
          (item.discount * item?.articleByBranch?.price) / 100
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
  //#endregion

  const handleChangeCode = (e) => {
    const { value } = e.target;
    setTypingDiscountCode(value);
    if (value.length > 5) {
      dispatch(fetchDiscountCode(value))
        .then((res) => {
          if (!res.error) {
            setNewCommand({ ...newCommand, discountCode: value });
          } else {
            setNewCommand({ ...newCommand, discountCode: "" });
          }
        })
        .catch((err) => {
          setNewCommand({ ...newCommand, discountCode: "" });
        });
    } else setNewCommand({ ...newCommand, discountCode: "" });
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
      ({ quantity, articleByBranchId, discount }) => {
        console.log(articleByBranchId);
        return {
          quantity,
          articleByBranchId,
          discount,
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

  return (
    <div ref={componentRef}>
      <Container maxWidth="md">
        <Box mt={3}>
          <Typography variant="h4" align="center" gutterBottom>
            {!print ? "Create Command" : "Invoice"}
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
                  ".MuiInputBase-input": {
                    padding: "0px  !important",
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
              <Autocomplete
                aria-required={true}
                fullWidth
                sx={{
                  ".MuiInputBase-root": {
                    height: "43px !important",
                  },
                  ".MuiInputBase-input": {
                    padding: "0px  !important",
                  },
                }}
                open={openCountries}
                onOpen={() => {
                  setOpenCountries(true);
                }}
                onClose={() => {
                  setOpenCountries(false);
                }}
                options={countries}
                loading={loadingCountries}
                value={newCommand?.countryId}
                onChange={(event, v) => {
                  setNewCommand({
                    ...newCommand,
                    countryId: v?.id,
                  });
                }}
                getOptionLabel={(option) => option?.nameEn}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setTypingCountry(e.target.value);
                    }}
                    label="Country"
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
            <Box mt={1} className="col-4">
              <Autocomplete
                aria-required={true}
                disabled={!newCommand?.countryId}
                fullWidth
                sx={{
                  ".MuiInputBase-root": {
                    height: "43px !important",
                    alignItems: "center",
                  },
                  ".MuiInputBase-input": {
                    padding: "0px !important",
                  },
                }}
                open={openCites}
                onOpen={() => {
                  setOpenCites(true);
                }}
                onClose={() => {
                  setOpenCites(false);
                }}
                options={cities}
                loading={loadingCites}
                value={newCommand?.cityId}
                onChange={(event, v) => {
                  setNewCommand({
                    ...newCommand,
                    cityId: v.id,
                  });
                }}
                getOptionLabel={(option) => option?.nameEn}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    onChange={(e) => {
                      setTypingCity(e.target.value);
                    }}
                    label="City"
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
          </div>
          {/* order items Details */}
          <div className="mt-5 mb-5">
            <div className="bg-purple rounded p-3 " style={{ color: "white" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <div className="col-2 ">Code</div>
                <div className="col-3 ">Article</div>
                <div className="col-1 ">Qte</div>
                <div className="col-1  ">PU</div>
                <div className="col-1  ">Discount %</div>
                <div className="col-1 text-center">PT</div>
                <div className="col-2 " style={{ width: 60 }}>
                  Action
                </div>
              </Box>
            </div>

            {newCommand?.commandLine?.map((elem, i) => (
              <div>
                <Box
                  key={i}
                  mt={2}
                  mb={2}
                  // padding={3}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <div style={{ fontSize: "10px" }} className="col-2">
                    <input
                      size="lg"
                      readOnly
                      aria-disabled
                      className="form-control rounded"
                      disabled={!editCommandLineIndexes.includes(i)}
                      style={
                        errorQuantity
                          ? {
                              outlineColor: "red",
                              borderColor: "red",
                              height: 43,
                            }
                          : { height: 43 }
                      }
                      value={
                        newCommand.commandLine[i].articleByBranch.article.code
                      }
                    />
                  </div>
                  <Autocomplete
                    aria-required={true}
                    disabled={true}
                    fullWidth
                    sx={{
                      ".MuiInputBase-root": {
                        height: "43px !important",
                      },
                      ".MuiInputBase-input": {
                        padding: "0px !important",
                      },
                    }}
                    open={openArticlesEditCommandLines.includes(i)}
                    onOpen={() => {
                      setOpenArticlesEditCommandLines([
                        ...openArticlesEditCommandLines,
                        i,
                      ]);
                    }}
                    onClose={() => {
                      setOpenArticlesEditCommandLines(
                        openArticlesEditCommandLines.filter(
                          (elem, j) => j !== i
                        )
                      );
                    }}
                    options={articlesByBranch}
                    loading={loadingArticles}
                    value={newCommand.commandLine[i].articleByBranch}
                    onChange={(event, v) => {
                      let aux = [...newCommand.commandLine];
                      let obj = { ...aux[i] };
                      obj = {
                        ...obj,
                        articleByBranchId: v?.id,
                        articleByBranch: v,
                      };
                      aux[i] = { ...obj };
                      setNewCommand({ ...newCommand, commandLine: aux });
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
                        // label="Article"
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
                  <div className=" col-1 text-center">
                    {newCommand.commandLine[i]?.articleByBranch?.price}
                  </div>
                  <div style={{ fontSize: "10px" }} className="col-1">
                    <input
                      placeholder={elem}
                      type="number"
                      min={1}
                      disabled={!editCommandLineIndexes.includes(i)}
                      value={newCommand.commandLine[i].discount}
                      onChange={(e) => {
                        let aux = [...newCommand.commandLine];
                        let obj = { ...aux[i] };
                        obj.discount = +e.target.value;
                        aux[i] = { ...obj };
                        setNewCommand({ ...newCommand, commandLine: aux });
                      }}
                    />
                  </div>
                  <div className="col-1 text-center">
                    {newCommand.commandLine[i]?.quantity *
                      newCommand.commandLine[i]?.articleByBranch?.price -
                      (newCommand.commandLine[i]?.articleByBranch?.price *
                        newCommand.commandLine[i]?.discount) /
                        100}
                  </div>

                  <>
                    {!editCommandLineIndexes.includes(i) ? (
                      <div
                        // style={{ width: 60 }}
                        className="d-flex justify-content-center gap-1 col-2"
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
                      <div
                        // style={{ width: 60 }}
                        className="d-flex justify-content-around gap-1 col-2"
                      >
                        <button className="btn btn-light">
                          <BiSave
                            onClick={() =>
                              setEditCommandLineIndexes(
                                editCommandLineIndexes.filter(
                                  (elem) => elem !== i
                                )
                              )
                            }
                            style={{ cursor: "pointer" }}
                          />
                        </button>
                      </div>
                    )}
                  </>
                </Box>
                <div className="w-100 bg-purple" style={{ height: 1 }} />
              </div>
            ))}
            {!newCommand.branchId && (
              <p className="text-center" style={{ color: "red" }}>
                Select branch please
              </p>
            )}
            <Box mt={3} mb={3} display="flex" alignItems="center" gap={2}>
              <div style={{ fontSize: "12px" }} className="col-2">
                <input
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
                  ".MuiInputBase-input": {
                    padding: "0px !important",
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
                    discount: 0,
                    articleByBranch: v,
                    articleByBranchId: v?.id,
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
                    // label="Article"
                    placeholder="Article title"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: loadingClient ? (
                        <CircularProgress color="inherit" size={10} />
                      ) : null,
                    }}
                  />
                )}
              />

              <div style={{}} className="col-1">
                <input
                  min={1}
                  max={newCommandLine?.articleByBranch?.stock}
                  type="number"
                  disabled={!newCommandLine?.quantity}
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
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
              <div className=" col-1 text-center">
                {newCommandLine?.articleByBranch?.price}
              </div>
              <div style={{}} className="col-1">
                <input
                  min={0}
                  max={99}
                  type="number"
                  disabled={!newCommandLine?.quantity}
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
                  }
                  value={newCommandLine.discount}
                  onChange={(e) => {
                    setNewCommandLine({
                      ...newCommandLine,
                      discount: +e.target.value,
                    });
                    e.target.value.length === 0
                      ? setErrorQuantity(true)
                      : setErrorQuantity(false);
                  }}
                />
              </div>
              <div className="col-1 text-center">
                {newCommandLine?.quantity *
                  newCommandLine?.articleByBranch?.price -
                  (newCommandLine?.articleByBranch?.price *
                    newCommandLine.discount) /
                    100 || ""}
              </div>

              <div
                // style={{ width: 60 }}
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
                        discount: "",
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
          <div className="w-100 bg-purple" style={{ height: 2 }} />
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
              <div class="row my-2 align-items-center">
                <div
                  class="col-7 text-right align-items-center gap-1 "
                  style={{ display: "flex" }}
                >
                  <span>Discount Code: </span>
                  <input
                    placeholder="Discount Code"
                    className="form-control rounded "
                    style={
                      newCommand?.discountCode?.length
                        ? {
                            height: 43,
                            width: 70,
                            outlineColor: "green",
                            borderColor: "green",
                          }
                        : !typingDiscountCode.length
                        ? {
                            height: 43,
                            width: 70,
                          }
                        : {
                            outlineColor: "red",
                            borderColor: "red",
                            height: 43,
                            width: 70,
                          }
                    }
                    onChange={handleChangeCode}
                  />
                </div>
                <div class="col-5">
                  <span class="text-110 text-secondary-d1">
                    {newCommand?.discountCode ? discountCode?.discount : 0} %
                  </span>
                </div>
              </div>

              <div class="row my-2 align-items-center bgc-primary-l3 p-2">
                <div class="col-7 text-right">Total Amount</div>
                <div class="col-5">
                  <span class="text-150 text-success-d3 opacity-2">
                    {discountCode?.discount
                      ? sum() -
                        (sum() * discountCode?.discount) / 100 +
                        (newCommand?.hasDelivery ? 7 : 0)
                      : sum() + (newCommand?.hasDelivery ? 7 : 0)}{" "}
                    TND
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div
            // className="row"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Box mt={4} className="col-4 d-flex">
              <Typography>{"Payement Type:"}</Typography>
              <select
                className="form-control rounded"
                value={newCommand?.paymentType}
                onChange={(e) => {
                  setNewCommand({ ...newCommand, paymentType: e.target.value });
                }}
                style={{
                  height: 43,
                  // width: 70,
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

            {newCommand?.paymentType === "contant" && (
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
                  style={{
                    height: 43,
                    // width: 70,
                  }}
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
            )}
            {newCommand?.paymentType === "easy" && (
              <Box mt={4} className="col-5 ">
                <div className="d-flex p-2">
                  <Typography>{"Financial Commitment Number :"}</Typography>
                  <input
                    placeholder="Number"
                    type="number"
                    min={1}
                    value={financialCommitmentNumber}
                    className="form-control rounded "
                    style={{
                      height: 43,
                      width: 70,
                    }}
                    onChange={(e) => {
                      let array = [];
                      for (let i = 0; i < e.target.value; i++) {
                        array.push({ date: "", amount: 0 });
                      }
                      setFinancialCommitmenLines(array);
                      setFinancialCommitmentNumber(e.target.value);
                    }}
                  />
                </div>
                {financialCommitmentLines.map((elem, i) => (
                  <div class=" d-flex" key={i}>
                    <input
                      type="date"
                      min={1}
                      value={financialCommitmentLines[i]?.date}
                      className="form-control rounded "
                      style={{
                        height: 43,
                      }}
                      onChange={(e) => {
                        let aux = [...financialCommitmentLines];
                        aux[i]["date"] = e.target.value;
                        setFinancialCommitmenLines(aux);
                      }}
                    />
                    <input
                      type="number"
                      min={1}
                      value={financialCommitmentLines[i]?.amount}
                      className="form-control rounded "
                      style={{
                        height: 43,
                      }}
                      onChange={(e) => {
                        let aux = [...financialCommitmentLines];
                        aux[i]["amount"] = e.target.value;
                        setFinancialCommitmenLines(aux);
                      }}
                    />
                    {financialCommitmentLines[i]?.date.length &&
                    new Date(financialCommitmentLines[i]?.date) ===
                      new Date() ? (
                      <span>Paid</span>
                    ) : null}
                  </div>
                ))}
              </Box>
            )}
          </div>

          {print ? (
            <></>
          ) : (
            <div className="w-100 d-flex justify-content-center gap-2 p-4">
              <SaveButton width={100} type="button" onClick={handleCreate} />
              <PrintButton
                width={100}
                type="button"
                onClick={() => {
                  setPrint(true);

                  setTimeout(() => {
                    handlePrint();
                  }, "(500)");
                }}
              />
            </div>
          )}
        </Box>
      </Container>
    </div>
  );
}

export default CreateCommand;
