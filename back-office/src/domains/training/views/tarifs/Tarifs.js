import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { red } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { delettarif, fetchtarif } from "../../../../store/tarifss";
import { showErrorToast, showSuccessToast } from "../../../../utils/toast";
import { useNavigate, useParams } from "react-router-dom";
import CreateButton from "../../../../components/Commun/buttons/CreateButton";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Modal from "../../../../components/Commun/Modal"

function Tarifs() {
  const tarifStore = useSelector((state) => state.tarifss.tarifs.items);
  const [rows, setRows] = useState([]);
  const [basicModal, setBasicModal] = useState(false);
  const [idOfDelete,setIdOfDelete]=useState("")
  console.log(tarifStore, "rr");
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  useEffect(() => {
    dispatch(fetchtarif());
  }, [ fetchtarif,dispatch]);

  const toggleShow=()=>{
    setBasicModal(!basicModal)
  }
  const handleDeletetarifClick = (id) => {
    dispatch(delettarif(id))
      .then((action) => {
        if (action.error) {
          showErrorToast(action.error.message);
        } else {
          showSuccessToast("tarif has been deleted");
        }
      })
      .catch((error) => {
        showErrorToast(error.message);
      });
  };
  

  // const handeladd = () => {
  //   navigate("addtarif");
  // };
  useEffect(() => {
    if (tarifStore?.length) {
      let aux = tarifStore.map((e) => {
        return {
          ...e,
         
         title: e.title,
          price: e?.price,
          sessions:e.session?.title
         
        };
      });
      console.log(aux);
      setRows(aux);
    }
  }, [tarifStore.items]);
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
    },
   ,
    {
      field: "title",
      headerName: "Title",
      width: 230,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price ",

      width: 120,
      sortable: true,
    },
    {
      field: "sessions",
      headerName: "Sessions ",

      width: 220,
      sortable: true,
    },
      {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<AiFillEdit />}
            label="Edit"
            className="textPrimary"
            color="inherit"
            onClick={() => navigate(`${id}`)}
          />,
          <GridActionsCellItem
            icon={<AiFillDelete />}
            label="Delete"
            // should open popup to ask are u sure delete this user (yes/no)
            color="inherit"
            // onClick={() => handleDeletesessionsClick(id)}
            onClick={() => {
              toggleShow();
              setIdOfDelete(id);
            }}
          />,
        ];
      },
    },
  ];
console.log("idOfDe",idOfDelete);

  return (
    // <div>
    //   <div>
    //     <Button
    //       sx={{ marginLeft: "900px", top: 20 }}
    //       id="basic-button"
    //       aria-controls={open ? "basic-menu" : undefined}
    //       aria-haspopup="true"
    //       aria-expanded={open ? "true" : undefined}
    //       onClick={handeladd}
    //     >
    //       add new tarif
    //     </Button>
    //   </div>
    //   <div
    //     style={{
    //       gap: "40px",
    //       display: "grid",
    //       gridTemplateColumns: "repeat(2,1fr)",
    //     }}
    //   >
    //      {tarifStore.map((el, key) => (
    //       <Box sx={{ marginTop: 10, marginLeft: 5 }}>
    //         <Card sx={{ maxWidth: 400, maxHeight: 500 }}>
    //           <CardMedia
    //             component="img"
    //             alt="green iguana"
    //             height="140"
    //             image="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=600"
    //           />
    //           <CardContent>
    //             <Typography gutterBottom variant="h5" component="div">
    //               Price :{el.price}
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary">
    //               {el.title}
    //             </Typography>
    //             <Typography variant="body2" color="text.secondary">
    //               Duration: {el.durtion}
    //             </Typography>
    //           </CardContent>
    //           <CardActions>
    //             <Button
    //               size="small"
    //               onClick={() => {
    //                 handleDeletetarifClick(el.id);
    //               }}
    //             >
    //               DELETE
    //             </Button>
    //             <Button size="small" onClick={() => navigate(`${el.id}`)}>
    //               UPDATE
    //             </Button>
    //           </CardActions>
    //         </Card>
    //       </Box>
    //     ))} 
    //   </div>
    // </div>
    <div>
      <div>
        <CreateButton
          title={"add new Tarif"}
          onClick={() => navigate("newtarif")}
          mt={20}
          mb={20}
        />
      </div>
      <div className="position-relative">
        Tarif's List
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </Box>
      </div>
      <Modal  basicModal={basicModal} setBasicModal={setBasicModal} toggleShow={toggleShow} ofDelete={true} bodOfDelete={
        <div className="d-flex justify-content-center align-items-center">
        are you sure to delete this session
        </div>
      }
      confirm={() => {handleDeletetarifClick(idOfDelete)
      setBasicModal(false)}}/>
    </div>
  );
}
export default Tarifs;
