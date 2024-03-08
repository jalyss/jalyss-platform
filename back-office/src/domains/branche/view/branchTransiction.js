import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Container,
  TextField,
  Typography,
  typographyClasses,
} from "@mui/material";
import { BiMessageSquareAdd, BiSave } from "react-icons/bi";
import { GrEdit } from "react-icons/gr";

import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import isEnglish from "../../../helpers/isEnglish";
import { fetchBranches, DeleteBranche } from "../../../store/branche";
import {fetchArticleByBranchWithCode,
  fetchArticlesByBranch,
  addTransactionStock,
} from "../../../store/article";
import { FaTrash } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import SaveButton from "../../../components/Commun/buttons/SaveButton";

function BrancheList() {
  const dispatch = useDispatch();
  const articleByBranch = useSelector((state) => state.article.article);

  const branshes = useSelector((state) => state.branche.branches.items);
  const articlesByBranch = useSelector((state) => state.article.articles.items);
  const [typingArticleTitle, setTypingArticleTitle] = useState("");
  const [typingCode, setTypingCode] = useState("");

  const isEng = isEnglish();
  const navigate = useNavigate();

  const [params, setParams] = useState({ skip: 0, take: 10 });
  // const [basicModalDelete, setBasicModalDelete] = useState(false);
  // const [transiction, setTransiction] = useState("");
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [branchSender, setbranchSender] = useState("");
  const [branchReceiver, setbranchReceiver] = useState("");
  const [errorQuantity, setErrorQuantity] = useState(false);

  const [reason, setReason] = useState("");
  const [newCommand, setNewCommand] = useState({
    branchSender: "",
    branchReceiver: "",
    status: "",
    reason: reason,
    commandLine: [],
  });
  const [openArticles, setOpenArticles] = useState(false);

  const [newCommandLine, setNewCommandLine] = useState({
    quantity: null,
    articleByBranchId: null,
    articleByBranch: null,
  });

  const [openArticlesEditCommandLines, setOpenArticlesEditCommandLines] =
    useState([]);
  const [editCommandLineIndexes, setEditCommandLineIndexes] = useState([]);
  useEffect(() => {
    console.log(typingCode)
    if (typingCode)
    dispatch(
  fetchArticleByBranchWithCode({
    identifier: newCommand.branchSender,
          code: typingCode,
        })
      );
    }, [typingCode]);
    console.log(articlesByBranch)
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
  
  
    const isQuantityCloseToStockLimit = (quantity, stock) => {
    
      
      return quantity >= stock;
    };
  function handleTransaction() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    const { status, reason, commandLine } = newCommand;
    const data = {
      branchSenderId: newCommand.branchSender,
      branchReceiverId: newCommand.branchReceiver,
      status,
      reason,
      date: formattedDateTime,
      articles: commandLine.map(({ articleByBranch, quantity }) => ({
        articleId: articleByBranch.articleId,
        quantity,
      })),
    };
    dispatch(addTransactionStock(data)).then((res) => {
      if (!res.error) {
        // setBasicModalDelete(!basicModalDelete);
        showSuccessToast("Transiction done");
        navigate(-1);
      } else {
        showErrorToast(res.error.message);
      }
    });
  }
 
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);
  useEffect(() => {
    if (newCommand.branchSender) {
      setLoadingArticles(true);
      dispatch(
        fetchArticlesByBranch({
          identifier: newCommand.branchSender,

          take: 5,
        })
      ).then((res) => {
        setLoadingArticles(false);
      });
    }
  }, [branchReceiver, typingArticleTitle, branchSender]);

  return (
    <div>
      <Container maxWidth="xl">
        <Box mt={3}>
          <Typography>Make a Transaction</Typography>
          <div className="d-flex gap-3 justify-content-center pb-5">
            <Box mt={4} className="col-4">
              Sender Branch
              <Form.Select
                size="lg"
                onChange={(e) => {
                  setbranchSender(e.target.value);
                  setNewCommand({
                    ...newCommand,
                    branchSender: e.target.value,
                  });
                }}
              >
                <option disabled selected>
                  Select Sender
                </option>
                {branshes.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box mt={4} className="col-4">
              Reciever Branch
              <Form.Select
                size="lg"
                onChange={(e) => {
                  setbranchReceiver(e.target.value);
                  setNewCommand({
                    ...newCommand,
                    branchReceiver: e.target.value,
                  });
                }}
              >
                <option disabled selected>
                  Select Reciever
                </option>
                {branshes.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.name}
                  </option>
                ))}
              </Form.Select>
            </Box>
            <Box pt={4} className="col-4">
              Delivery status
              <Form.Select
                label="Status"
                size="lg"
                onChange={(e) => {
                  setNewCommand({
                    ...newCommand,
                    status: e.target.value,
                  });
                }}
              >
                <option disabled selected>
                  Select Status
                </option>
                <option value={"pending"}>Pending</option>
                <option value={"delivered"}>Delivered</option>
              </Form.Select>
            </Box>
          </div>
          <div className="w-100 bg-purple" style={{ height: 2 }} />

          <div className="row  justify-content-center align-items-center-mt5">
            <Box className="col-4 align-items-center d-flex pt-3 pb-4">
      
                <TextField
                helperText={'Reason'}
                  {...params}
                  fullWidth
                  variant="outlined"
                  label="Reason"
                  onChange={(e) => {
                    setReason(e.target.value);
                    setNewCommand({
                      ...newCommand,
                      reason: e.target.value,
                    });
                  }}
                />
            
            </Box>
            {!(newCommand.branchSender && newCommand.branchReceiver) && (
              <p className="text-center" style={{ color: "red" }}>
                Select Sender and Reciever Branch please
              </p>
            )}
            <Box mt={3} mb={3} display="flex" alignItems="center" gap={2}>
        
                <TextField
                helperText={"Code"}
                  className="form-control rounded"
                  disabled={
                    !(newCommand.branchSender && newCommand.branchReceiver)
                  }
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
              
          
                <Autocomplete
              className="pt-4"
                  aria-required={true}
                  disabled={
                    !(newCommand.branchSender && newCommand.branchReceiver)
                  }
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
                      stock: v?.stock,
                      quantity: 1,
                      articleByBranch: v,
                      articleByBranchId: v?.id,
                    });
                  }}
                  getOptionLabel={(option) => option?.article?.title}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      helperText={"Article"}
                      fullWidth
                      variant="outlined"
                      onChange={(e) => {
                        setTypingArticleTitle(e.target.value);
                      }}
                      placeholder="Article title"
                    />
                  )}
                />
         <Autocomplete
              className="pt-4"
                  aria-required={true}
                  disabled={
                    !(newCommand.branchSender && newCommand.branchReceiver)
                  }
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
                      stock: v?.stock,
                      quantity: 1,
                      articleByBranch: v,
                      articleByBranchId: v?.id,
                    });
                  }}
                  getOptionLabel={(option) => option.stock}
                  renderInput={(params) => (
                   
                <TextField
                {...params}
                helperText={"Stock"}
                  className="form-control rounded"
                  disabled
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
                  }
                  // value={newCommandLine?.stock}
                />
                  )}
                />
         
            
            
         
                <TextField
              
                helperText={"Qte"}
                  min={1}
                  max={newCommandLine?.stock}
                  type="number"
                  disabled={
                    !(newCommand.branchSender && newCommand.branchReceiver)
                  }
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
                  }
                  value={newCommandLine.quantity}
                  onChange={(e) => {
                    const newQuantity = +e.target.value;
                    console.log(newQuantity, newCommandLine.stock);
                    // Check if the new quantity is too low
                    const isQuantityTooLow = isQuantityCloseToStockLimit(
                      newQuantity,
                      newCommandLine.stock
                    );
                    console.log(isQuantityTooLow);
                    if (isQuantityTooLow) {
                      showErrorToast(
                        <div dangerouslySetInnerHTML={{ __html: `
                          You reached the stock limit, you only have 
                          <u><strong style="color: red;">${newCommandLine.stock}</strong></u>
                          of <u><strong style="color: red;">${newCommandLine.articleByBranch.article.title}</strong></u>
                        ` }} />
                      )
                      setErrorQuantity(true);
                    } else {
                      setNewCommandLine({
                        ...newCommandLine,
                        quantity: +e.target.value,
                      });
                      e.target.value.length === 0
                        ? setErrorQuantity(true)
                        : setErrorQuantity(false);
                    }
                  }}
                />
          
              <div
                // style={{ width: 60 }}
                className="d-flex justify-content-center col-2"
              >
                <button
                  className="btn btn-light"
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
                    }
                  }}
                >
                  <BiMessageSquareAdd size={22} style={{ cursor: "pointer" }} />
                </button>
              </div>
            </Box>

            {newCommand.commandLine?.map((elem, i) => (
              <div>
                <Box
                  key={i}
                  mt={2}
                  mb={2}
                  display="flex"
                  alignItems="center"
                  gap={2}
                >
                  <div className="col-1">
                Code :
                <input
                  className="form-control rounded"
                  disabled
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
                  }
                  value={
                    newCommand?.commandLine[i].articleByBranch?.article?.code
                  }
                  onChange={(e) => {
                    setTypingCode(e.target.value);
                  }}
                />
              </div>
              <div className="col-5">
                  Article :
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
                      />
                    )}
                  />
                            </div>
                            <div className="col-1">
                Stock :
                <input
                  className="form-control rounded"
                  disabled
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
                  }
                  value={newCommand.commandLine[i].stock}
                />
              </div>
              <div  >

                  Quantity :
                  <div style={{ fontSize: "10px" }} className="col-6">

                    <input
                      placeholder={elem}
                      type="number"
                      min={1}
                      disabled={!editCommandLineIndexes.includes(i)}
                      value={newCommand.commandLine[i].quantity}
                  onChange={(e) => {
                        const newQuantity = +e.target.value;
                        console.log(newQuantity, newCommandLine.stock);
                        // Check if the new quantity is too low
                        const isQuantityTooLow = isQuantityCloseToStockLimit(
                          newQuantity,
                          newCommand.commandLine[i].stock
                        );
                        console.log(isQuantityTooLow);
                        if (isQuantityTooLow) {
                          showErrorToast(
                            <div dangerouslySetInnerHTML={{ __html: `
                              You reached the stock limit, you only have 
                              <u><strong style="color: red;">${newCommand.commandLine[i].stock}</strong></u>
                              of <u><strong style="color: red;">${newCommand.commandLine[i].articleByBranch.article.title}</strong></u>
                            ` }} />
                          )
                          setErrorQuantity(true);
                        } else  {
                        let aux = [...newCommand.commandLine];
                        let obj = { ...aux[i] };
                        obj.quantity = +e.target.value;
                        aux[i] = { ...obj };
                        setNewCommand({ ...newCommand, commandLine: aux });
                      }}}
                    />
                  </div> 
                  </div>
                  <>
                    {!editCommandLineIndexes.includes(i) ? (
                      <div
                        // style={{ width: 60 }}
                        className="pt-4 d-flex justify-content-center gap-1 col-2"
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
          </div>
          <div className="w-100 d-flex justify-content-center gap-4 p-4">
            <SaveButton width={100} type="button" onClick={handleTransaction} />
          </div>
        </Box>
      </Container>
    </div>
  );
}

export default BrancheList;
