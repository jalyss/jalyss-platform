import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { IoIosPersonAdd } from "react-icons/io";
import { Button } from "react-bootstrap";
import {fetchPublishingHouses,deletePublishingHouse} from "../../../store/publishingHouse"
import { useDispatch, useSelector } from "react-redux";
import DeleteModal from "../../../components/Commun/Modal";

function PublishingHouse() {
  const [show, setShow] = useState(false);
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModalDeleteid, setBasicModalDeleteid] = useState(false);
  const [rows, setRows] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPublishingHouses());
  }, []);

  const publishingHouses = useSelector((state) => state.publishingHouse.publishingHouses);
  useEffect(() => {
    if (publishingHouses?.items?.length) {
      let publishingHousesData = publishingHouses.items.map((e, index) => {
        return {
          ...e,
          logoId: <img src={e?.logo?.path} alt={'img'} />,

        };
      });
      setRows(publishingHousesData);
    }
  }, [publishingHouses.items]);



  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "logoId",
      headerName: "Logo",
      width: 70,
      editable: false,
      renderCell: (params) => {
        return (
          <img
            src={params?.row?.logo?.path}
            alt={params?.row?.logo?.alt}
            style={{width: "100%", height: "95%",borderRadius:"5px" }}
          />
        );
      },
    },
    { field: "name", headerName: "Name", width: 150, editable: false },
    { field: "address", headerName: "Address", width: 150, editable: false },
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
            onClick={() => {
              toggleShowDelete(id);
            }}
            color="error"
          />,
        ];
      },
    },
  ];
  
  const isEng = isEnglish();
  const Navigate = useNavigate();

  const handleDeleteClick = ()=> {
    dispatch(deletePublishingHouse(basicModalDeleteid)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Publishing house has been deleted");
        dispatch(fetchPublishingHouses());
        setBasicModalDelete(false)
      }
    });
  };
  
  const handleAddClick = (id) => {
    Navigate(`detail/${id}`);
  };
  const toggleShowDelete = (id) => {
  setBasicModalDeleteid(id)

    setBasicModalDelete(!basicModalDelete);
  };
  return (
    <div>
        <DeleteModal
        toggleShow={toggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={!true}
        ofDelete={true}
        bodOfDelete={<div className="d-flex justify-content-center align-items-center">You want to Delete this Publishing house ?</div>}
        fn={()=>{handleDeleteClick()}}
      />
      <div>
        <div className="container">
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>
            Publishing House's List
          </h2>
          <hr></hr>
          <Button
            type="button"
            variant="outlined"
            onClick={() => {
              Navigate("create");
            }}
            endIcon={<IoIosPersonAdd />}
          >
            <span className="btn btn-sm ">Add Publishing House</span>
          </Button>
          <Box sx={{ height: 400, width: "100%" }}>
          {rows?.length > 0 ? (
              <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
                disableRowSelectionOnClick
              />
            ) : null}
          </Box>
        </div>
      </div>
    </div>
  );
}

export default PublishingHouse;
