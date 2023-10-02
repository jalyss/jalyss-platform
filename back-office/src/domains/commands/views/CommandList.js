import React, { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import isEnglish from "../../../helpers/isEnglish";
import { useNavigate } from "react-router-dom";
import { GiConfirmed, GiCancel, GiMoneyStack } from "react-icons/gi";
import { AiFillDelete, AiFillEdit, AiOutlineEye } from "react-icons/ai";
import { FcCancel } from "react-icons/fc";
import { GrAdd } from "react-icons/gr";
import { TbTruckDelivery } from "react-icons/tb";
import Modal from "../../../components/Commun/Modal";

import { showErrorToast, showSuccessToast } from "../../../utils/toast";

import {
  fetchCommands,
  deleteCommand,
  updatePaidCommandStatus,
  updateDeliveredCommandStatus,
} from "../../../store/command";
import CreateButton from "../../../components/Commun/buttons/CreateButton";
import CancelButton from "../../../components/Commun/buttons/CancelButton";

function CommandList() {
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const navigate = useNavigate();

  const [selected, setSelected] = useState();
  const [showModalPaid, setShowModalPaid] = useState(false);
  const [showModalDelivered, setShowModalDelivered] = useState(false);

  const columns = [
    {
      field: "clientName",
      headerName: "NAME CLIENT",
      width: 150,
      editable: true,
    },
    {
      field: "clientTel",
      headerName: "PHONE CLIENT ",
      width: 150,
      sortable: false,
    },
    {
      field: "createdAt",
      headerName: "DATE",
      width: 100,
      sortable: true,
      valueGetter: (params) => {
        return `${params.row.createdAt.slice(0, 10)}`;
      },
    },
    {
      field: "hasDelivery",
      headerName: "HAS DELIVERY",
      width: 130,
      sortable: true,
      renderCell: ({ value }) => (value ? "Yes" : "No"), // Render 'Yes' or 'No' instead of boolean
    },
    {
      field: "confirm",
      headerName: "CONFIRM Status",
      width: 150,
      sortable: true,
    },
    {
      field: "paid",
      headerName: "PAYMENT STATUS",
      width: 150,
      sortable: true,
      renderCell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      field: "delivered",
      headerName: "DELIVERY STATUS",
      width: 130,
      renderCell: ({ value }) => (value ? "Yes" : "No"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "ACTIONS",
      width: 200,
      cellClassName: "actions",
      getActions: ({ id, row }) => {
        return [
          <GridActionsCellItem
            icon={<AiOutlineEye color="#8b008b" size={25} />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              navigate(`/commands/detail/${id}`);
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            disabled={row.paid ? true : false}
            icon={
              <GiMoneyStack
                size={25}
                color="green"
                onClick={() => {
                  setSelected(row);
                  setShowModalPaid(true);
                }}
              />
            }
          />,

          <GridActionsCellItem
            disabled={row.delivered ? true : false}
            icon={<TbTruckDelivery size={20} color={"coral"} />}
            onClick={() => {
              setSelected(row);
              setShowModalDelivered(true);
            }}
          />,
        ];
      },
    },
  ];

  const commandStore = useSelector((state) => state.command);

  useEffect(() => {
    dispatch(fetchCommands());
  }, []);

  return (
    <div>
      <div className="p-4 d-flex justify-content-end">
        <Button
          type="button"
          onClick={() => navigate(`create`)}
          variant="outlined"
          endIcon={<GrAdd />}
        >
          <span className="btn btn-sm ">Add Order</span>
        </Button>
      </div>
      <div className="position-relative p-4">
        <Box sx={{ height: 700, width: "100%" }}>
          <DataGrid
            rows={commandStore.commands.items}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            pageSizeOptions={[5]}
          />
        </Box>
      </div>
      <Modal
        toggleShow={() => {
          setShowModalPaid(false);
        }}
        basicModal={showModalPaid}
        setBasicModal={setShowModalPaid}
        title="Paid Command"
        body={
          ["pending", "refused"].includes(selected?.confirm) ? (
            <div>
              <p style={{ color: "red" }}>
                {" "}
                You can't update the command becaus it is not confirmed
              </p>

              <div className="d-flex justify-content-center gap-3 p-3">
                <CancelButton
                  onClick={() => {
                    setShowModalDelivered(false);
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              are you sure to update command status to paid{" "}
              <div className="d-flex justify-content-center gap-3 p-3">
                <CancelButton
                  onClick={() => {
                    setShowModalPaid(false);
                  }}
                />
                <CreateButton
                  title="Confirm"
                  onClick={() => {
                    dispatch(
                      updatePaidCommandStatus({ id: selected.id, status: true })
                    ).then((res) => {
                      if (!res.error) {
                        showSuccessToast("Command has been Paid");
                        setShowModalPaid(false);
                      } else {
                        console.log(res);
                        showErrorToast(res.error.message);
                      }
                    });
                  }}
                />
              </div>
            </div>
          )
        }
        normal
        noButtons
        noFooter
      />
      <Modal
        toggleShow={() => {
          setShowModalDelivered(false);
        }}
        basicModal={showModalDelivered}
        setBasicModal={setShowModalDelivered}
        title="Paid Command"
        body={
          ["pending", "refused"].includes(selected?.confirm) ? (
            <div>
              <p style={{ color: "red" }}>
                You can't update the command becaus it is not confirmed
              </p>

              <div className="d-flex justify-content-center gap-3 p-3">
                <CancelButton
                  onClick={() => {
                    setShowModalDelivered(false);
                  }}
                />
              </div>
            </div>
          ) : (
            <div>
              are you sure to update command status to Delivered{" "}
              <div className="d-flex justify-content-center gap-3 p-3">
                <CancelButton
                  onClick={() => {
                    setShowModalDelivered(false);
                  }}
                />
                <CreateButton
                  title="Confirm"
                  onClick={() => {
                    dispatch(
                      updateDeliveredCommandStatus({
                        id: selected.id,
                        status: true,
                      })
                    ).then((res) => {
                      if (!res.error) {
                        showSuccessToast("Command has been Delivered");
                        setShowModalDelivered(false);
                      } else {
                        console.log(res);
                        showErrorToast(res.error.message);
                      }
                    });
                  }}
                />
              </div>
            </div>
          )
        }
        normal
        noButtons
        noFooter
      />
    </div>
  );
}
export default CommandList;
