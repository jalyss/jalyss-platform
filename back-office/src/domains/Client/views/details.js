// import React, { useEffect, useState, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";

// import { Box } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";

// import { editClient, fetchClient } from "../../../store/client";
// import { fetchCommand } from "../../../store/command";

// const details = () => {
//   const client = useSelector((state) => state.client?.client);
//   const commandStore = useSelector((state) => state.command);
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   const [rows, setRows] = useState([]);
//   const [row, setRow] = useState([]);

//   useEffect(() => {
//     dispatch(fetchClient(id));
//   }, [dispatch, id]);
//   useEffect(() => {
//     dispatch(fetchCommand(id));
//   }, [dispatch, id]);

//   console.log(id, "clientId");
//   console.log(client, "hedha");

//   useEffect(() => {
//     if (client?.cilent?.clients?.items) {
//       let aux = client.cilent?.clients.items.map((e) => {
//         return {
//           id: e.id,
//           educationLevelId: e.educationLevelId,
//           functionalAreaId: e.functionalAreaId,
//           jobTitleId: e.jobTitleId,
//           countryId: e.countryId,
//           cityId: e.cityId,
//         };
//       });
//       setRows(aux);
//     }
//   }, [client?.cilent?.clients.items]);

//   const mapCommandItems = (items) => {
//     return items.map((e) => ({
//       id: e.id,
//       city: e.city,
//       confirm: e.confirm,
//       delivered: e.delivered,
//       paid: e.paid,
//       hasDelivery: e.hasDelivery,
//       branchId: e.branchId,
//     }));
//   };
//   console.log(client?.jobTitle, "hhhh");
//   const columns = [
//     {
//       field: "educationLevel",
//       headerName: "educationLevel",
//       width: 155,
//       editable: false,
//     },

//     {
//       field: "functionalArea",
//       headerName: "functionalArea",
//       width: 155,
//       editable: false,
//     },
//     { field: "jobTitle", headerName: "jobTitle", width: 155, editable: false },
//     { field: "country", headerName: "country", width: 155, editable: false },
//     {
//       field: "city",
//       headerName: "city",
//       width: 155,
//       editable: false,
//     },
//   ];
//   useEffect(() => {
//     if (commandStore?.commands?.items) {
//       setRow(mapCommandItems(commandStore.commands.items));
//     }
//   }, [commandStore?.commands.items]);
//   const column = [
//     {
//       field: "city",
//       headerName: "city",
//       width: 155,
//       editable: false,
//     },

//     { field: "confirm", headerName: "confirm", width: 155, editable: false },
//     {
//       field: "delivered",
//       headerName: "delivered",
//       width: 155,
//       editable: false,
//     },
//     { field: "paid", headerName: "paid", width: 155, editable: false },
//     {
//       field: "hasDelivery",
//       headerName: "hasDelivery",
//       width: 155,
//       editable: false,
//     },
//     {
//       field: "branchId",
//       headerName: "branchId",
//       width: 155,
//       editable: false,
//     },
//   ];
//   return (
//     <Box sx={{ maxWidth: "90%", height: "100%", margin: "auto" }}>
//       <Box sx={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: {
//                 pageSize: 2,
//               },
//             },
//           }}
//           pageSizeOptions={[2]}
//           disableRowSelectionOnClick
//         />
//       </Box>
//       <Box sx={{ height: 400, width: "100%" }}>
//         <DataGrid
//           rows={row}
//           columns={column}
//           initialState={{
//             pagination: {
//               paginationModel: {
//                 pageSize: 10,
//               },
//             },
//           }}
//           pageSizeOptions={[10]}
//           disableRowSelectionOnClick
//         />
//       </Box>
//     </Box>
//   );
// };

// export default details;
