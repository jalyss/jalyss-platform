import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import isEnglish from "../../../helpers/isEnglish";
import { fetchBranches, DeleteBranche } from "../../../store/branche";
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { Typography, TextField } from "@mui/material";
import {
  fetchArticlesByBranch,
  addTransactionStock,
} from "../../../store/article";
import Modal from "../../../components/Commun/Modal";
import AutoCompleteFilter from "../../../components/Commun/AutoCompleteFilter";
import { CiShare1 } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";
import Selecto from "react-select";

function BrancheList() {
  const dispatch = useDispatch();
  const branshes = useSelector((state) => state.branche.branches.items);
  const articles = useSelector((state) => state.article.articles.items);

  const isEng = isEnglish();
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [params, setParams] = useState({ skip: 0, take: 10 });
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [branchId, setBranshId] = useState("");
  const [transiction, setTransiction] = useState("");

  const [inputsNumber, setinputsNumber] = useState(1);
  const [value, setValue] = useState([]);
  const [commandLine, setcommandLine] = useState([0]);
  const [dataaa, setdata] = useState({});
  const [data0, setdata0] = useState([]);
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);
  console.log(data0,'data0')
  console.log(dataaa,'dataaaaa')
  useEffect(() => {
    dispatch(fetchArticlesByBranch({ identifier: selectedBranch }));
  }, [selectedBranch]);

  useEffect(() => {
    setValue(
      articles.map((e) => ({
        value: e?.article?.id,
        label: e?.article?.title,
      }))
    );
  }, [selectedBranch]);

  useEffect(() => {
   
  }, [data0])
  
  const toggleShow = (id) => {
    setBranshId(id);
    setBasicModal(!basicModal);
  };

  const handleDeleteBranch = () => {
    dispatch(DeleteBranche(branchId)).then((res) => {
      if (!res.error) {
        setBasicModalDelete(!basicModalDelete);
        showSuccessToast("WorkSpace has been deleted");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const addData0Entry = () => {
    const { articleId, quantity } = dataaa;
    if (articleId !== undefined) {
      setdata0((prevData) => [...prevData, { articleId, quantity }]);
    }
    setdata({});
  };
  
  
  function handleTransiction() {
    const { articleId, quantity } = dataaa;
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;
    
      let data = { ...transiction, date: formattedDateTime, articles: data0?.length>1? data0:[{articleId,quantity}] };
      let aux = Object.assign({}, data);

      dispatch(addTransactionStock(aux)).then((res) => {
        if (!res.error) {
          setBasicModalDelete(!basicModalDelete);
          showSuccessToast("Transiction done");
          navigate(-1);
        } else {
          showErrorToast(res.error.message);
        }
      });
  }

  const renderInputs = () => {
    return Array.from({ length: inputsNumber }).map((e, i) => (
      <Box key={i} mt={3} mb={3} display="flex" alignItems="center">
        <div style={{ flex: 2 }}>
          <Selecto
            placeholder="Search by article"
            options={articles.map((e) => ({
              value: e?.article?.id,
              label: e?.article?.title,
            }))}
            style={{ flex: 1, marginRight: "10px" }}
            onChange={(e) => {
              setdata({ ...dataaa, articleId: e.value });
            }}
          />
        </div>
        <div style={{ marginLeft: "10px", fontSize: "10px" }}>
          <input
            type="number"
            placeholder="Quantity"
            onChange={(e) => {
              setdata({ ...dataaa, quantity: +e.target.value });
            }}
          />
        </div>
        <div style={{ marginLeft: "10px" }}>
          <FaTrash
            onClick={() => handleDelete(i)}
            style={{ cursor: "pointer" }}
          />
        </div>
      </Box>
    ));
  };

  const handleDelete = (index) => {
  data0.splice(index, 1)}

  return (
    <div>
      <div className="container">
        <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>Make a transaction</h2>
        <div className="d-flex justify-centent-center align-items-center">
          <div>
            {/* <AutoCompleteFilter
              data={branshes.map((branch) => ({
                value: branch.identifier,
                label: branch.identifier,
              }))}
              valueOptionName="value"
              labelOptionName="label"
              label="Filter by branch name"
              placeholder={selectedBranch[0]}
              onChange={(newValue) => setSelectedBranch(newValue)}
            /> */}

            {/* <Box sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={articles}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: params.take,
                    },
                  },
                }}
                onPaginationModelChange={(e) => {
                  setParams({ ...params, take: +e.pageSize * (+e.page + 1) });
                }}
                pageSizeOptions={[10, 20, 50]}
                disableRowSelectionOnClick
              />
            </Box> */}
          </div>
          <div className="m-5" style={{ width: "100%" }}>
            
            <div className="mt-1">from </div>
            <div className="mt-2">
              <select
                 onChange={(e) => {
                  setTransiction({
                    ...transiction,
                    branchSenderId: e.target.value
                  });
                 setSelectedBranch(e.target.value);
                }}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Select branch</option>
                {branshes.map((e, i) => {
                  return <option value={e.id}>{e.name}</option>;
                })}
              </select>
            </div>
            <div className="mt-1">to </div>
            <div className="mt-2">
              <select
                onChange={(e) => {
                  setTransiction({
                    ...transiction,
                    branchReceiverId: e.target.value,
                  });
                }}
                class="form-select"
                aria-label="Default select example"
              >
                <option selected>Select branch to recieve</option>
                {branshes.map((e, i) => {
                  return <option value={e.id}>{e.name}</option>;
                })}
              </select>
            </div>
            <div className="mt-1">reason </div>
            <div className="mt-2">
              <TextField
                onChange={(e) => {
                  setTransiction({
                    ...transiction,
                    reason: e.target.value,
                  });
                }}
                fullWidth
                placeholder="reason"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#8a2be2",
                  },
                  "& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "#8a2be2",
                    },
                }}
              />
            </div>
            <div>Send</div>
            <div className="mt-2 w-100" style={{ width: "100%" }}>
              {renderInputs()}
              <div
                class="button-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <AiOutlinePlusCircle
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    addData0Entry(), setinputsNumber(inputsNumber + 1);
                  }}
                />
                {inputsNumber > 1 ? (
                  <AiOutlineMinusCircle
                    style={{ cursor: "pointer" }}
                    onClick={() => setinputsNumber(inputsNumber - 1)}
                  />
                ) : null}
              </div>
            </div>
            <div>Status</div>
            <div className="mt-2 w-100" style={{ width: "100%" }}>
              <select
                className="form-select"
                aria-label="Default select example"
                value={transiction.articleId}
                onChange={(e) => {
                  setTransiction({ ...transiction, status: e.target.value });
                }}
              >
                <option value="">Select status</option>
                <option key={"1"} value={transiction.status}>
                  delivered{" "}
                </option>
                <option key={"1"} value={transiction.status}>
                  pending
                </option>
                <option key={"1"} value={transiction.status}>
                  refused
                </option>
              </select>
            </div>
            <div className="mt-5">
              <button
                type="submit"
                onClick={() => {
                  handleTransiction();
                }}
                className="btn btn-light"
              >
                <span className="label-btn"> Make transiction </span>
                <CiShare1 fontSize={20} />
              </button>
            </div>
          </div>
        </div>
        <Modal
          bodOfDelete={"are you sure you want to delete this branche?"}
          basicModal={basicModal}
          toggleShow={toggleShow}
          ofDelete={true}
          confirm={() => {
            handleDeleteBranch();
          }}
        />
      </div>
    </div>
  );
}

export default BrancheList;
