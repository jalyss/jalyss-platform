import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchClient } from "../../../store/client";
import { Dialog, DialogContent } from "@mui/material";

const profileclient = () => {
  const client = useSelector((state) => state.client?.client);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    dispatch(fetchClient(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (client?.clientCommands?.commandLine) {
      const aux = [];
      client.clientCommands.forEach((command) => {
        command.commandLine.forEach((commandLineItem) => {
          aux.push({
            id: commandLineItem?.id,
            title: commandLineItem?.articleByBranch?.article?.title || "N/A",
            price: commandLineItem?.articleByBranch?.price || "N/A",
            quantity: commandLineItem?.quantity || "N/A",
            code: commandLineItem?.articleByBranch?.article?.code || "N/A",
          });
        });
      });
      console.log(title,'aux');
      setRows(aux);
    }
  }, [client?.clientCommands?.commandLine]);

  
  client?.clientCommands?.forEach((command) => {
    command?.commandLine?.forEach((commandLineItem) => {
      const code = commandLineItem?.articleByBranch?.article?.code;
      const title = commandLineItem?.articleByBranch?.article?.title;
      const price = commandLineItem?.articleByBranch?.price;
      const quantity = commandLineItem?.quantity;
      console.log(code, "code");
      console.log(title, "title");
      console.log(price, "price");
      console.log(quantity, "quantity");
    });
  });
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 130,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 130,
      editable: true,
    },
    {
      field: "code",
      headerName: "Code",
      width: 130,
      editable: true,
    },
  ];

  return (
    <Box sx={{ maxWidth: "90%", height: "100%", margin: "auto" }}>
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
    </Box>
  );
};

export default profileclient;
