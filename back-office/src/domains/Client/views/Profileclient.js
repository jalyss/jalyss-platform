import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

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
      let aux = client.clientCommands.commandLine.map((e, i) => ({
        id: e?.id || i,
        ...e,

      }));
      setRows(aux);
    }
  }, [client?.clientCommands?.commandLine]);
  client?.clientCommands?.forEach((command) => {
    command?.commandLine?.forEach((commandLineItem) => {
      const code = commandLineItem?.articleByBranch?.article?.code;
      const title = commandLineItem?.articleByBranch?.article?.title;
      const price = commandLineItem?.articleByBranch?.article?.price;
      const quantity = commandLineItem?.articleByBranch?.article?.quantity;
      console.log(code, "here");
      console.log(title, "here");
      console.log(price, "here");
      console.log(quantity, "here");
    });
  });
  console.log(
    client?.clientCommands?.[0]?.commandLine?.[0]?.articleByBranch,
    "here"
  );
  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 130,
      editable: true,
    },
    {
      field: "Price",
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
