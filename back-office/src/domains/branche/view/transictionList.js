import { GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDelete, AiOutlineEye } from "react-icons/ai";
import { CiShare1 } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import isEnglish from "../../../helpers/isEnglish";
import {
  fetchTransitions,
  removeTransition,
  findTransitionsByBranchId,
} from "../../../store/transition";
import Modal from "../../../components/Commun/Modal";
import AutoCompleteFilter from "../../../components/Commun/AutoCompleteFilter";
import { fetchBranches, DeleteBranche } from "../../../store/branche";
import { BsCardList, BsShare } from "react-icons/bs";

function TransictionList() {
  const dispatch = useDispatch();
  const transitions = useSelector(
    (state) => state.transition.transitions.items
  );
  const branshes = useSelector((state) => state.branche.branches.items);

  const isEng = isEnglish();
  const navigate = useNavigate();
  const [selectedBranch, setSelectedBranch] = useState("");
  const [params, setParams] = useState({ skip: 0, take: 10 });
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModal, setBasicModal] = useState(false);
  const [branchId, setBranshId] = useState("");
  const columns = [
    {
      field: "Sender",
      headerName: "Sender",
      width: 150,
      editable: false,
      valueGetter: (params) => `${params.row.branchSender?.name}`,
    },
    {
      field: "reciever",
      headerName: "Reciever",
      width: 150,
      editable: false,
      valueGetter: (params) => `${params.row.branchReceiver?.name}`,
    },
    {
      field: "article",
      headerName: "Article",
      width: 150,
      editable: false,
      valueGetter: (params) =>
        `${params.row.mvtArticle.map((e) => e.article.title).join(", ")}`,
    },

    {
      field: "Quantity",
      headerName: "Quantity",
      width: 150,
      valueGetter: (params) =>
        `${params.row.mvtArticle.map((e) => e.quantity).join(", ")}`,
    },
    {
      field: "status",
      headerName: "status",
      width: 150,
      editable: false,
    },
    {
      field: "reason",
      headerName: "reason",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiOutlineEye />}
            label="Add"
            className="textPrimary"
            onClick={() => handleAddClick(id)}
            color="success"
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => toggleShow(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    if (selectedBranch) {
      dispatch(findTransitionsByBranchId(selectedBranch));
    } else {
      dispatch(fetchTransitions());
    }
  }, [selectedBranch, dispatch]);

  const toggleShow = (id) => {
    setBranshId(id);
    setBasicModal(!basicModal);
  };
  useEffect(() => {
    dispatch(fetchBranches());
  }, [dispatch]);

  const handleDeleteBranch = () => {
    console.log(branchId)
    dispatch(removeTransition(branchId)).then((res) => {
      if (!res.error) {
        setBasicModalDelete(!basicModalDelete);
        showSuccessToast("WorkSpace has been deleted");
      } else {
        showErrorToast(res.error.message);
      }
    });
  };

  const handleAddClick = (id) => {
    navigate(`/branche/transactions/transictionDetails/${id}`);
  };

  return (
    <div>
      <div className="container">
        <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>
          List of transictions
        </h2>
        <div className="d-flex align-items-center">
          <AutoCompleteFilter
            data={branshes.map((branch) => ({
              value: branch.id,
              label: branch.name,
            }))}
            valueOptionName="value"
            labelOptionName="label"
            label="Filter by branch "
            placeholder={"select transitcions by branch"}
            onChange={(newValue) => setSelectedBranch(newValue)}
          />
          <button
            type="submit"
            onClick={() => {
              navigate("sent");
            }}
            className="btn btn-light mt-5 m-3 mb-1"
          >                             
            <span className="label-btn">Make transaction</span>
            <BsShare style={{ marginLeft: "10px" }} fontSize={17} />
          </button>
        </div>
        <Box sx={{ height: 500, width: "90%" }}>
          <DataGrid
            rows={transitions}
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
            pageSizeOptions={[5, 20, 50]}
            disableRowSelectionOnClick
          />
        </Box>
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

export default TransictionList;
