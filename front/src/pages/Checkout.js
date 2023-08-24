import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import { useTranslation } from "react-i18next";
import useMeta from "../hooks/useMeta";
import "../assets/styles/checkout.css";
import { useCart } from "react-use-cart";
import { createCommand, fetchCommands } from "../store/command";
import { useDispatch, useSelector } from "react-redux";
import { showErrorToast, showSuccessToast } from "../utils/toast";
import { FormControlLabel, Radio } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { fetchCountries } from "../store/country";
import { fetchCities } from "../store/city";
import { makeStyles } from "@material-ui/core/styles";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import {
  Container,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CardContent,
  Typography,
  Card,
} from "@material-ui/core";
import SaveButton from "../components/Commun/buttons/SaveButton";
import { red } from "@mui/material/colors";

function Checkout({}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { invoiceId } = useParams();
  const countryStore = useSelector((state) => state.country);
  const cityStore = useSelector((state) => state.city);
  const commandStore = useSelector((state) => state.command);
  const authStore = useSelector((state) => state.auth);
  const { items, cartTotal, updateItemQuantity, emptyCart } = useCart();

  const [command, setCommand] = useState({
    hasDelivery: true,
  });

  useEffect(() => {
    dispatch(fetchCountries());
  }, []);
  useEffect(() => {
    if (command.countryId) dispatch(fetchCities(command?.countryId));
  }, [command?.countryId]);
  // useEffect(() => {
  //   setCommand({
  //     ...command,
  //   });
  // }, [authStore.me]);

  useEffect(() => {
    const commandLine = items.map((item, i) => ({
      articleByBranchId: item.id,
      quantity: item.quantity,
    }));
    if (commandLine.length)
      setCommand({
        ...command,
        commandLine,
        clientId: authStore.me ? authStore.me.client.id : null,
        clientName: authStore.me ? authStore.me?.fullNameEn : null,
        clientEmail: authStore.me ? authStore.me?.email : null,
        clientAddress: authStore.me ? authStore.me?.client?.address : null,
        clientTel: authStore.me ? authStore.me?.client?.tel : null,
      });
  }, [items, authStore.me]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommand((Command) => ({ ...Command, [name]: value }));
  };
  const handleChecked = (e) => {
    const { checked } = e.target;
    setCommand((Command) => ({ ...Command, hasDelivery: checked }));
  };

  const submitCommand = async (event) => {
    event.preventDefault();
    dispatch(createCommand(command)).then((res) => {
      if (!res.error) {
        showSuccessToast(t("command.created"));
        emptyCart();
        // must show the facture navigate to other page to see the command

        navigate(`/invoice/${res.payload.id}`);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      justifyContent: "center",
      margin: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        margin: theme.spacing(10),
      },
    },
    formcontainer: {
      maxWidth: "100%",
      [theme.breakpoints.up("md")]: {
        maxWidth: "70%",
      },
    },
    cartContainer: {
      maxHeight: "70%",
      maxWidth: "90%",
      margin: "7px",
      marginBottom: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        maxHeight: "83%",
        maxWidth: "40%",
        marginLeft: theme.spacing(2),
        marginBottom: 0,
      },
    },
    tableContainer: {
      marginLeft: "0",
      maxHeight: "300px",
      overflowY: "auto",
      borderRadius: theme.spacing(1),
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(2),
        maxHeight: "350px",
      },
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={5}
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        <Card item xs={10} md={5} className={classes.cartContainer}>
          <div className={classes.tableContainer}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell variant="body1">Product</TableCell>
                  <TableCell variant="body1">{t("Quantity")}</TableCell>
                  <TableCell variant="body1">{t("Price")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell
                      className={classes.imageArt}
                      style={{ width: "30%" }}
                    >
                      <div>
                        <img
                          src={item.article.cover.path}
                          alt={item.article.cover.alt}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            flexDirection: "column",
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "100%",
                            borderRadius: "50px",
                            backgroundColor: "rgb(70, 4, 74)",
                            color: "white",
                            flex: 1,
                          }}
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          <AiOutlineMinus style={{ margin: "5px" }} />
                        </span>

                        <span
                          style={{
                            fontSize: "150%",
                            flex: 2,
                            minWidth: "40px",
                            textAlign: "center",
                          }}
                        >
                          {item.quantity}
                        </span>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "100%",
                            borderRadius: "50px",
                            backgroundColor: "rgb(70, 4, 74)",
                            color: "white",
                            flex: 1,
                          }}
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <AiOutlinePlus style={{ margin: "5px" }} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span style={{ fontSize: "25px" }} className="d-flex">
                        {item.price}
                        <p style={{ marginLeft: "5px", fontSize: "10px" }}>
                          {t("label.devise")}
                        </p>
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <Typography variant="h6">{t("TOTAL")}</Typography>
            <Typography variant="h6">{cartTotal}</Typography>
          </div>
        </Card>
        <Grid item xs={12} md={6}>
          <form className={classes.formcontainer} onSubmit={submitCommand}>
            <div class="row">
              <div class="col mb-3 ">
                <label for="clientName">
                  {t("label.name")} <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="clientName"
                  value={command?.clientName}
                  name="clientName"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="clientEmail">
                  {t("label.email")}
                  <span style={{ color: "red" }}>*</span>
                </label>

                <input
                  class="form-control mt-2"
                  required
                  id="clientEmail"
                  value={command?.clientEmail}
                  name="clientEmail"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div class="row">
              <div class="col mb-3 ">
                <label for="clientTel">
                  {t("label.phone")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  type="tel"
                  class="form-control mt-2"
                  id="clientTel"
                  value={command?.clientTel}
                  name="clientTel"
                  onChange={handleChange}
                />
              </div>
              <div class="col mb-3 ">
                <label for="clientAddress">
                  {t("label.address")}
                  <span style={{ color: "red" }}>*</span>
                </label>
                <input
                  required
                  name="clientAddress"
                  class="form-control mt-2"
                  id="clientAddress"
                  value={command?.clientAddress}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div class="row">
              <div class="col mb-3 ">
                <label for="country">{t("label.country")}</label>
                <select
                  name="countryId"
                  class="form-control mt-2"
                  id="country"
                  value={command?.countryId}
                  onChange={handleChange}
                >
                  <option value={null}>--{t("label.selectCountry")}--</option>
                  {countryStore.countries.items.map((item) => (
                    <option value={item.id}>{item.nameAr}</option>
                  ))}
                </select>
              </div>

              <div class="col mb-3 ">
                <label for="city">{t("label.city")}</label>
                <select
                  name="cityId"
                  class="form-control mt-2"
                  id="city"
                  value={command?.cityId}
                  onChange={handleChange}
                >
                  <option value={null}>--{t("label.selectCity")}--</option>
                  {cityStore.cities.items.map((item) => (
                    <option value={item.id}>{item.nameAr}</option>
                  ))}
                </select>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <label for="delivery">{t("label.delivery")}</label>
              <input
                style={{
                  marginRight: "350px",
                }}
                type="checkbox"
                id="delivery"
                checked={command?.hasDelivery}
                onChange={handleChecked}
              />
            </div>

            <div className="w-100 mt-5 d-flex justify-content-center">
              <Button
                style={{
                  maxHeight: "100px",
                  maxwidth: "300px",
                  backgroundColor: "rgb(70, 4, 74)",
                }}
                type="submit"
                // className="confirm-button mt-3"
                onSubmit={submitCommand}
                disabled={items.length === 0 ? true : false}
              >
                <span
                  style={{ color: "white", backgroundColor: "rgb(70, 4, 74)" }}
                >
                  {t("label.btnConfirm")}
                </span>
              </Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Checkout;
