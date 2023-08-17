import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import React, { useState, useEffect } from 'react'
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import isEnglish from '../../../helpers/isEnglish';
import { useNavigate } from 'react-router-dom';
import DeleteModal from "../../../components/Commun/Modal";
import { Box, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoles } from '../../../store/role';
import { showErrorToast, showSuccessToast } from "../../../utils/toast";


function RolesList() {
  const isEng = isEnglish();
  const Navigate = useNavigate();
  const [rows, setRows] = useState(null);
  const dispatch = useDispatch();
  const [basicModalDelete, setBasicModalDelete] = useState(false);
  const [basicModalDeleteid, setBasicModalDeleteid] = useState(false);
  const roles = useSelector((state) => state.role.roles);

  useEffect(() => {
    dispatch(fetchRoles());
  }, []);

  useEffect(() => {
    if (roles?.items?.length) {
      let roleData = roles.items.map((e, index) => {
        return {
          ...e,
          index: index,
        };
      });
      setRows(roleData);
    }
  }, [roles.items]);


  const columns = [
    { field: "nameAr", headerName: "nameAr", width: 150, editable: false },
    { field: "nameEn", headerName: "nameEn", width: 150, editable: false },
   
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
            label="Edit"
            className="textPrimary"
            onClick={() => handleEditClick(id)}
            color="inherit"
          />,

          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            onClick={() => {
              toggleShowDelete(id);
            }}
            // should open popup to ask are u sure delete this user (yes/no)
            color="error"
          />,
        ];
      },
    },
  ]
  const handleDeleteClick = (id) => {
    dispatch(deleteRole(basicModalDeleteid)).then((res) => {
      if (res.error) {
        showErrorToast(res.error.message);
      } else {
        showSuccessToast("Role has been deleted");
        dispatch(fetchRoles());
        setBasicModalDelete(false)
      }
    });
  };
  const toggleShowDelete = (id) => {
    setBasicModalDeleteid(id);

    setBasicModalDelete(!basicModalDelete);
  };
  const handleEditClick = (id) => {
    Navigate(`edit/${id}`);
  };

  return (
    <div>
      <DeleteModal
        toggleShow={toggleShowDelete}
        basicModal={basicModalDelete}
        setBasicModal={setBasicModalDelete}
        normal={!true}
        ofDelete={true}
        bodOfDelete={<div className="d-flex justify-content-center align-items-center">You want to Delete this Role ?</div>}
        confirm={() => { handleDeleteClick() }}
      />
      <div>
        <div className="container">
          <h2 style={{ paddingLeft: 10, paddingTop: 10 }}>List Roles</h2>
          <hr></hr>
          <Button
            type="button"
            onClick={() => {
              Navigate("create");
            }}
            variant="outlined"
          >
            <span className="btn btn-sm ">Add Role</span>
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
  )
}

export default RolesList
