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
import { fetchBranches,DeleteBranche } from "../../../store/branche";
import Modal from "../../../components/Commun/Modal";
import AutoCompleteFilter from "../../../components/Commun/AutoCompleteFilter";

function BrancheList() {
  const dispatch = useDispatch();
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
      field: "name",
      headerName: "Name",
      width: 150,
      editable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 150,
      editable: false,
    },
    {
      field: "identifier",
      headerName: "Identifier",
      width: 150,
      editable: false,
    },
    {
      field: "mainBranch",
      headerName: "MainBranch",
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
            onClick={()=>toggleShow(id)}
            color="error"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    dispatch(
      fetchBranches()
    );
  }, [dispatch]);

  const toggleShow = (id) => {
    setBranshId(id)
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

  const handleAddClick = (id) => {
    navigate(`detail/${id}`);
  };

  const filteredBranches = branshes.filter((branch) =>
    selectedBranch ? branch.name === selectedBranch[0] : true
  );
  return (
    <div>
      <div className="container">
        <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List of branches</h2>
<div className="d-flex justify-centent-center align-items-center" >

        <AutoCompleteFilter
          data={branshes.map((branch) => ({
            value: branch.name,
            label: branch.name,
          }))}
          valueOptionName="value"
          labelOptionName="label"
          label="Filter by branch name"
          placeholder={selectedBranch[0]}
          onChange={(newValue) => setSelectedBranch(newValue)}
          />

                  <div className="w-100 d-flex">
                  <button
                    type="submit"
                    onClick={()=>{navigate("transiction")}}
                    className="btn btn-light mt-5 m-3 mb-1"
                    >
                    <span className="label-btn"> Make transiction </span>
                  <CiShare1 fontSize={20}/>
                  </button>
                </div>
                   
                    </div>

        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={filteredBranches}
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

export default BrancheList;
