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
import { useParams } from "react-router-dom";
import {
  confirmCommand,
  fetchCommand,
  updateCommand,
} from "../../../store/command";
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
import { BiMessageSquareAdd, BiSave } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";
import { Button } from "react-bootstrap";
import CancelButton from "../../../components/Commun/buttons/CancelButton";
import SaveButton from "../../../components/Commun/buttons/SaveButton";
import { commandChannel } from "../../../constants/channelsCommandData";
import { fetchPaymentChoices } from "../../../store/paymentChoice";
import { fetchClients } from "../../../store/client";
import { fetchDiscountCode } from "../../../store/discountCode";
import { paymentTypes } from "../../../constants/paymentTypeData";
function EditCommand() {
  const command = useSelector((state) => state.command.command);
  const { commandId } = useParams();
  const dispatch = useDispatch();
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

  const [editCommand, setEditCommand] = useState(null);
  const [newCommandLine, setNewCommandLine] = useState({
    quantity: "",
    articleByBranchId: "",
  });
  const [editMode, setEditMode] = useState(false);
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

  //fetch articles of branch by branchId and articleTitle
  useEffect(() => {
    if (editCommand?.branchId) {
      setLoadingArticles(true);
      dispatch(
        fetchArticlesByBranch({
          identifier: editCommand?.branchId,
          title: typingArticleTitle,
          take: 5,
        })
      ).then((res) => setLoadingArticles(false));
      setEditCommand({ ...editCommand, commandLine: [] });
    }
  }, [editCommand?.branchId, typingArticleTitle]);

  // fetch one article of branch by branchId and code
  useEffect(() => {
    if (typingCode)
      dispatch(
        fetchArticleByBranchWithCode({
          identifier: editCommand.branchId,
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
    dispatch(fetchCommand(commandId));
    dispatch(fetchPaymentChoices());
    dispatch(findAllBranches());
  }, [dispatch]);

  //fetch countries and cites by name
  useEffect(() => {
    setLoadingCountries(true);
    dispatch(fetchCountries({ name: typingCountry, take: 5 })).then((res) =>
      setLoadingCountries(false)
    );
  }, [typingCountry]);

  useEffect(() => {
    if (editCommand?.countryId) {
      setLoadingCites(true);
      dispatch(
        findAllCitites({
          name: typingCity,
          take: 5,
          countryId: editCommand.countryId,
        })
      ).then((res) => setLoadingCites(false));
    }
  }, [editCommand?.countryId, typingCity]);

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
    setTypingFullName(command?.clientName);
  }, [command]);

  // fetch clients by fullName
  useEffect(() => {
    setLoadingClients(true);
    dispatch(
      fetchClients({ fullNameEn: typingFullName, skip: 0, take: 5 })
    ).then((res) => setLoadingClients(false));
  }, [dispatch, typingFullName]);

  useEffect(() => {
    if (editCommand) {
      const newTotal = editCommand?.commandLine?.map((item) =>
        item?.unitPrice
          ? item?.quantity * item?.unitPrice -
            (item.discount * item?.unitPrice) / 100
          : item?.quantity * item?.articleByBranch?.price -
            (item.discount * item?.articleByBranch?.price) / 100
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
  const handleChangeCode = (e) => {
    const { value } = e.target;
    setTypingDiscountCode(value);
    if (value.length > 5) {
      dispatch(fetchDiscountCode(value))
        .then((res) => {
          if (!res.error) {
            setEditCommand({ ...editCommand, discountCode: value });
          } else {
            setEditCommand({ ...editCommand, discountCode: "" });
          }
        })
        .catch((err) => {
          setEditCommand({ ...editCommand, discountCode: "" });
        });
    } else setEditCommand({ ...editCommand, discountCode: "" });
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

          <div className="d-flex gap-3 justify-content-center">
            <Box mt={4} className="col-4">
              Branch
              <Form.Select
                value={editCommand?.branchId}
                disabled={!editMode}
                onChange={(e) => {
                  setEditCommand({ ...editCommand, branchId: e.target.value });
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
                value={editCommand?.contactChannel}
                disabled={!editMode}
                onChange={(e) => {
                  setEditCommand({
                    ...editCommand,
                    contactChannel: e.target.value,
                  });
                }}
                size="lg"
              >
                <option disabled selected>
                  Select Channel
                </option>
                {commandChannel?.map((e, i) => (
                  <option value={e.value} key={i}>
                    {e.nameEn}
                  </option>
                ))}
              </Form.Select>
            </Box>
          </div>
          <div className="row align-items-center mt-5">
            <Box className="col-4 align-items-center d-flex">
              {!editCommand?.clientId ? (
                <TextField
                  sx={{ margin: 0 }}
                  disabled={!editMode}
                  label="Name"
                  variant="outlined"
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
              ) : (
                <Autocomplete
                  disabled={!editMode}
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
                  value={editCommand?.client || {}}
                  onChange={(event, v) => {
                    setEditCommand({
                      ...editCommand,
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
                      value={typingFullName}
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
              )}
            </Box>
            <Box
              className="col-3"
              style={{ alignItems: "center", display: "flex" }}
            >
              <TextField
                sx={{ margin: 0 }}
                disabled={!editMode}
                label="Tel"
                variant="outlined"
                type="number"
                value={editCommand?.clientTel || ""}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {
                  setEditCommand({ ...editCommand, clientTel: e.target.value });
                }}
              />
            </Box>
            <Box
              className="col-5"
              style={{ alignItems: "center", display: "flex" }}
            >
              <TextField
                sx={{ margin: 0 }}
                disabled={!editMode}
                label="Email"
                variant="outlined"
                value={editCommand?.clientEmail || ""}
                fullWidth
                required
                margin="normal"
                onChange={(e) => {
                  setEditCommand({
                    ...editCommand,
                    clientEmail: e.target.value,
                  });
                }}
              />
            </Box>
          </div>
          <Box mt={1}>
            <TextField
              disabled={!editMode}
              label="Address"
              variant="outlined"
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

          <div className="row justify-content-center">
            <Box mt={1} className="col-4">
              <Autocomplete
                disabled={!editMode}
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
                value={editCommand?.countryId}
                onChange={(event, v) => {
                  setEditCommand({
                    ...editCommand,
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
                disabled={!editCommand?.countryId}
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
                value={editCommand?.cityId}
                onChange={(event, v) => {
                  setEditCommand({
                    ...editCommand,
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
          </div>
          <div className="mt-5 mb-5">
            <div className="bg-purple rounded p-3 " style={{ color: "white" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <div className="col-2 ">Code</div>
                <div className="col ">Article</div>
                <div className="col-1 ">Qte</div>
                <div className="col-1  ">PU</div>
                <div className="col-1  ">Discount %</div>
                <div className="col-1 text-center">PT</div>
                {editMode && (
                  <div className="col-2 " style={{ width: 60 }}>
                    Action
                  </div>
                )}
              </Box>
            </div>

            {editCommand?.commandLine?.map((elem, i) => (
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
                      // disabled={!editCommandLineIndexes.includes(i)}
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
                        editCommand.commandLine[i].articleByBranch.article.code
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
                    value={editCommand.commandLine[i].articleByBranch}
                    onChange={(event, v) => {
                      let aux = [...editCommand.commandLine];
                      let obj = { ...aux[i] };
                      obj = {
                        ...obj,
                        articleByBranchId: v?.id,
                        articleByBranch: v,
                      };
                      aux[i] = { ...obj };
                      setEditCommand({ ...editCommand, commandLine: aux });
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
                  <div className=" col-1 text-center">
                    {editCommand.commandLine[i]?.unitPrice
                      ? editCommand.commandLine[i]?.unitPrice
                      : editCommand.commandLine[i]?.articleByBranch.price}
                  </div>
                  <div style={{ fontSize: "10px" }} className="col-1">
                    <input
                      placeholder={elem}
                      type="number"
                      min={1}
                      disabled={!editCommandLineIndexes.includes(i)}
                      value={editCommand.commandLine[i].discount}
                      onChange={(e) => {
                        let aux = [...editCommand.commandLine];
                        let obj = { ...aux[i] };
                        obj.discount = +e.target.value;
                        aux[i] = { ...obj };
                        setEditCommand({ ...editCommand, commandLine: aux });
                      }}
                    />
                  </div>
                  <div className="col-1 text-center">
                    {editCommand.commandLine[i]?.unitPrice
                      ? editCommand.commandLine[i]?.quantity *
                          editCommand.commandLine[i]?.unitPrice -
                        (editCommand.commandLine[i]?.unitPrice *
                          editCommand.commandLine[i]?.discount) /
                          100
                      : editCommand.commandLine[i]?.quantity *
                          editCommand.commandLine[i]?.articleByBranch?.price -
                        (editCommand.commandLine[i]?.articleByBranch?.price *
                          editCommand.commandLine[i]?.discount) /
                          100}
                  </div>
                  {editMode && (
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
                                let aux = [...editCommand.commandLine];
                                let result = aux.filter((elem, j) => i !== j);
                                setEditCommand({
                                  ...editCommand,
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
                  )}
                </Box>
                <div className="w-100 bg-purple" style={{ height: 1 }} />
              </div>
            ))}
            {!editCommand?.branchId && (
              <p className="text-center" style={{ color: "red" }}>
                Select branch please
              </p>
            )}
            {editMode && (
              <Box mt={3} mb={3} display="flex" alignItems="center" gap={2}>
                <div style={{ fontSize: "12px" }} className="col-2">
                  <input
                    size="lg"
                    className="form-control rounded"
                    disabled={!editCommand?.branchId}
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
                      newCommandLine?.articleByBranch?.article?.code ||
                      typingCode
                    }
                    onChange={(e) => {
                      setTypingCode(e.target.value);
                    }}
                  />
                </div>
                <Autocomplete
                  aria-required={true}
                  disabled={!editCommand?.branchId}
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
                        ? {
                            outlineColor: "red",
                            borderColor: "red",
                            height: 43,
                          }
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
                        ? {
                            outlineColor: "red",
                            borderColor: "red",
                            height: 43,
                          }
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
                    disabled={!editCommand?.branchId}
                    onClick={() => {
                      if (
                        newCommandLine?.quantity?.length === 0 ||
                        newCommandLine?.quantity === null
                      )
                        setErrorQuantity(true);
                      else {
                        setEditCommand({
                          ...editCommand,
                          commandLine: [
                            ...editCommand.commandLine,
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
                    <BiMessageSquareAdd
                      size={22}
                      style={{ cursor: "pointer" }}
                    />
                  </button>
                </div>
              </Box>
            )}
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
                    {editCommand?.hasDelivery ? 7 : 0} TND
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
                      editCommand?.discountCode?.length
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
                    {editCommand?.discountCode ? discountCode?.discount : 0} %
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
                        (editCommand?.hasDelivery ? 7 : 0)
                      : sum() + (editCommand?.hasDelivery ? 7 : 0)}{" "}
                    TND
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
              <Typography>{"Delivered :"}</Typography>
              <input
                type="checkbox"
                className="form-check-input"
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
            <Box mt={4} className="col-4 d-flex">
              <Typography>{"Payement Type:"}</Typography>
              <select
                className="form-control rounded"
                value={editCommand?.paymentType}
                onChange={(e) => {
                  setEditCommand({
                    ...editCommand,
                    paymentType: e.target.value,
                  });
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
                disabled={editCommand?.paymentType !== "contant"}
                className="form-control rounded"
                value={editCommand?.paymentChoiceId}
                onChange={(e) => {
                  setEditCommand({
                    ...editCommand,
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
