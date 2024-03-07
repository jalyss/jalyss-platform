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
import {
  fetchArticlesByBranch,
  addTransactionStock,
} from "../../../store/article";
import { FaTrash } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import SaveButton from "../../../components/Commun/buttons/SaveButton";


function BrancheList() {
  const dispatch = useDispatch();
  const branshes = useSelector((state) => state.branche.branches.items);
  const articlesByBranch = useSelector((state) => state.article.articles.items);
  const [typingArticleTitle, setTypingArticleTitle] = useState("");
  
  const isEng = isEnglish();
  const navigate = useNavigate();
  
  const [params, setParams] = useState({ skip: 0, take: 10 });
  // const [basicModalDelete, setBasicModalDelete] = useState(false);
  // const [transiction, setTransiction] = useState("");
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [branchSender, setbranchSender] = useState("");
  const [branchReceiver, setbranchReceiver] = useState("");
  const [errorQuantity, setErrorQuantity] = useState(false);
  
  const [reason, setReason] = useState('')
  const [newCommand, setNewCommand] = useState({
    branchSender: "",
    branchReceiver: "",
    status:"",
    reason:reason,
    commandLine: []
  });
  const [openArticles, setOpenArticles] = useState(false);
  
  const [newCommandLine, setNewCommandLine] = useState({
    quantity: null,
    articleByBranchId: null,
    articleByBranch: null,
  })
  
  const [openArticlesEditCommandLines, setOpenArticlesEditCommandLines] =useState([]);
  const [editCommandLineIndexes, setEditCommandLineIndexes] = useState([]);
  
  
  
  const isQuantityCloseToStockLimit = (quantity, stock) => {
    const theholdlimit = 50;
const totalQuantity = quantity+theholdlimit
    return totalQuantity>=stock
  };
  
  function handleTransaction() {

  
   

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    const {  status, reason, commandLine } = newCommand;
     const data = {
      branchSenderId: newCommand.branchSender,
      branchReceiverId: newCommand.branchReceiver,
       status,
       reason,
       date: formattedDateTime,
       articles: commandLine.map(({ articleByBranch, quantity }) => ({
         articleId:articleByBranch.articleId,
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
        ).then((res) =>{
          
          setLoadingArticles(false)})
          
          ;
         ;
        }
      }, [branchReceiver, typingArticleTitle,branchSender]);
      

  


  return (
    <div>
      <Container maxWidth="xl">
<Box mt={3}>
<Typography>
  Make a Transaction

</Typography>
<div className="d-flex gap-3 justify-content-center pb-5">
<Box mt={4} className="col-4">
    Sender Branch 
    <Form.Select 
    size="lg"                 onChange={(e) => {
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
    onChange={(e)=>{ 
      
      setbranchReceiver(e.target.value)
      setNewCommand({
        ...newCommand,
        branchReceiver: e.target.value,
      })
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
     size="lg"                 onChange={(e) => {
      setNewCommand({
        ...newCommand,
        status: e.target.value,
      });
     }}
     >
     <option disabled selected>
     Select Status
     </option>
     <option value={'pending'}>
     Pending
     </option>  
     <option value={'delivered'}>
     Delivered
      </option>
     </Form.Select>
    </Box>
  </div>
  <div className="w-100 bg-purple" style={{ height: 2 }} />

  <div className="row  justify-content-center align-items-center-mt5">
    <Box className="col-4 align-items-center d-flex pt-3 pb-4" >
      <TextField
                    {...params}
                    fullWidth
                    variant="outlined"
                    label="Reason"
                    onChange={(e)=>{ 
      
                      setReason(e.target.value)
                      setNewCommand({
                        ...newCommand,
                        reason: e.target.value,
                      })
                    }}
                  />

 
    </Box>
    {!(newCommand.branchSender && newCommand.branchReceiver) && (
              <p className="text-center" style={{ color: "red" }}>
                Select Sender and Reciever Branch please
              </p>
            )}
  <Box mt={3} mb={3} display="flex" alignItems="center" gap={2}>
  <Autocomplete
                aria-required={true}
                disabled={!(newCommand.branchSender && newCommand.branchReceiver)}
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
                    stock:v?.stock,
                    quantity: 1,
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
                    placeholder="Article title"
                  
                  />
                )}
              />
                 <div style={{}} className="col-1">
                <input
                  min={0}
                  max={newCommandLine?.stock}
                  type="number"
                 
                  style={
                    errorQuantity
                      ? { outlineColor: "red", borderColor: "red", height: 43 }
                      : { height: 43 }
                  }
                  value={newCommandLine.quantity}
                  onChange={(e) => {
                    const newQuantity = +e.target.value;
                    console.log(newQuantity, newCommandLine.stock)
                    // Check if the new quantity is too low
                    const isQuantityTooLow = isQuantityCloseToStockLimit(newQuantity, newCommandLine.stock);
                console.log(isQuantityTooLow)
                    if (isQuantityTooLow) {
                      showErrorToast(`You reached the stock limit , you still ${newCommandLine.stock} of ${newCommandLine.articleByBranch.article.title}`);
                      setErrorQuantity(true);
                    }else{
                    setNewCommandLine({
                      ...newCommandLine,
                      quantity: +e.target.value,
                    });
                    e.target.value.length === 0
                      ? setErrorQuantity(true)
                      : setErrorQuantity(false);}
                  }}
                />
              </div>
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
                     ;
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

            </div>
            <div className="w-100 d-flex justify-content-center gap-4 p-4">
            <SaveButton width={100} type="button" onClick={handleTransaction}  />
          </div>
</Box>

      </Container>
    </div>
  )
}

export default BrancheList;
