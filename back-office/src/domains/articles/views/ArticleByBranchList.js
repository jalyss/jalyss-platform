import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEnglish from "../../../helpers/isEnglish";
import {
  fetchArticles,
  addTransactionStock,
  updateArticleByBranch,
} from "../../../store/article";
//import { Button } from 'react-bootstrap'
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { fetchBranches } from "../../../store/branche";
import { showErrorToast, showSuccessToast } from "../../../utils/toast";
import { FormHelperText, IconButton, Input, TextField } from "@mui/material";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
// import { MobileDateTimePicker } from '@mui/x-date-pickers';
// import { MobileDateTimePicker } from '@mui/x-date-pickers-pro';

function ArticleByBranchList() {
  const articleStore = useSelector((state) => state.article);
  const [articles, setArticles] = useState([]);
  const branchStore = useSelector((state) => state.branche);
  const dispatch = useDispatch();
  const isEng = isEnglish();
  const [open, setOpen] = useState(false);
  const [openDialogPrice, setOpenDialogPrice] = useState(false);
  const [mvtBranch, setMvtBranch] = useState({
    quantity: 1,
    status: "pending",
  });
  const [selected, setSelected] = useState(null);
  const [selectedForPrice, setSelectedForPrice] = useState(null);

  useEffect(() => {
    dispatch(fetchArticles());
    dispatch(fetchBranches());
  }, [dispatch]);
  useEffect(() => {
    if (articleStore.articles.items.length) {
      let aux = articleStore.articles.items.map((elem) => {
        let total = 0;
        elem.ArticlesByBranch.forEach((element) => {
          total += element.stock;
        });
        return {
          ...elem,
          total,
        };
      });
      console.log(aux);
      setArticles(aux);
    }
  }, [articleStore.articles.items]);

  const handleClickOpen = (id) => {
    setOpen(true);
    setSelected(id);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDialogPrice = () => {
    setOpenDialogPrice(false);
  };
  const handleMvtChange = (e) => {
    const { name, value } = e.target;
    setMvtBranch((MvtBranch) => ({
      ...MvtBranch,
      [name]: name === "quantity" ? +value : value,
    }));
  };
  const handleMvtChangeDateTime = (value) => {
    console.log(value);
    setMvtBranch((MvtBranch) => ({ ...MvtBranch, date: value.toISOString() }));
  };
  const submitCreate = async (event) => {
    event.preventDefault();
    let aux = Object.assign({}, mvtBranch);
    aux.articleId = selected;
    console.log(aux);
    dispatch(addTransactionStock(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(" transmission successfully ");
        setOpen(false);
        setOpenDialogPrice(false);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  const handleChangePrice = (e) => {
    const { value } = e.target;
    setSelectedForPrice((Price) => ({ ...Price, price: +value }));
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    let aux = Object.assign({}, selectedForPrice);
    delete aux.branch;
    delete aux.article;
    delete aux.rating;
    console.log(aux);
    dispatch(updateArticleByBranch(aux)).then((res) => {
      if (!res.error) {
        showSuccessToast(" transmission successfully ");
        setOpen(false);
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };
  return (
    <div className="view">
      <React.Fragment>
        <Dialog fullWidth open={open} onClose={handleClose}>
          <DialogTitle>نقل المخزون</DialogTitle>
          <Box onSubmit={submitCreate} component="form">
            <DialogContent>
              <DialogContentText>
                اختر الكمية وقم بنقلها من فرع إلى فرع
              </DialogContentText>
              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  m: "auto",
                  width: "fit-content",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <FormControl
                  sx={{ mt: 2, minWidth: 120 }}
                  required
                  error={!mvtBranch.branchSenderId}
                >
                  <InputLabel htmlFor="max-width">من</InputLabel>
                  <Select
                    autoFocus
                    value={mvtBranch?.branchSenderId}
                    onChange={handleMvtChange}
                    label="branch"
                    name="branchSenderId"
                  >
                    {branchStore.branches.items.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ mt: 2, minWidth: 120 }} required>
                  <InputLabel htmlFor="max-width">إلى</InputLabel>
                  <Select
                    autoFocus
                    value={mvtBranch?.branchReceiverId}
                    onChange={handleMvtChange}
                    label="branch"
                    name="branchReceiverId"
                  >
                    {branchStore.branches.items.map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ mt: 2, minWidth: 120 }} required>
                  <TextField
                    id="outlined-basic"
                    label="الكمية"
                    variant="outlined"
                    min="1"
                    max="10000"
                    type="number"
                    value={mvtBranch?.quantity}
                    onChange={handleMvtChange}
                    name="quantity"
                  />
                </FormControl>
                <FormControl sx={{ mt: 2, minWidth: 120 }} required>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      ampm={false}
                      onChange={handleMvtChangeDateTime}
                    />
                  </LocalizationProvider>
                  <FormHelperText>Please enter your message</FormHelperText>
                </FormControl>
                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                  <InputLabel htmlFor="max-width">الوضعية الحالية</InputLabel>
                  <Select
                    autoFocus
                    value={mvtBranch?.status}
                    onChange={handleMvtChange}
                    label="branch"
                    name="status"
                  >
                    {[
                      { id: "pending", name: "Pending" },
                      { id: "in_progress", name: "In Progress" },
                      { id: "on_hold", name: "On Hold" },
                      { id: "delivered", name: "Delivered" },
                    ].map((item) => (
                      <MenuItem value={item.id}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleClose}
                color="secondary"
                variant="contained"
                type="button"
              >
                غلق
              </Button>

              <Button
                type="submit"
                onSubmit={submitCreate}
                variant="contained"
                color="primary"
              >
                <i className="glyphicon glyphicon-transfer"></i>تبادل
              </Button>
            </DialogActions>
          </Box>
        </Dialog>
      </React.Fragment>
      <Dialog
        fullWidth
        open={openDialogPrice}
        onClose={() => setOpenDialogPrice(false)}
      >
        <Box
          component="form"
          onSubmit={handleUpdate}
          sx={{
            display: "flex",
            py: "20px",
            m: "auto",
            width: "fit-content",
            justifyContent: "center",
          }}
        >
          <div>
            <DialogTitle>تعديل السعر</DialogTitle>

            <DialogContent>
              <DialogContentText>
                {selectedForPrice?.article.title}
                {selectedForPrice?.branch.name}
              </DialogContentText>
              <FormControl sx={{ mt: 2, minWidth: 120 }} required>
                <TextField
                  id="outlined-basic"
                  label="السعر"
                  variant="outlined"
                  min="1"
                  max="10000"
                  type="number"
                  value={selectedForPrice?.price}
                  onChange={handleChangePrice}
                  name="price"
                />
              </FormControl>
            </DialogContent>
            <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
              <Button
                onClick={handleCloseDialogPrice}
                color="secondary"
                variant="contained"
                type="button"
              >
                غلق
              </Button>

              <Button
                type="submit"
                onSubmit={submitCreate}
                variant="contained"
                color="primary"
              >
                <i className="glyphicon glyphicon-transfer"></i>تغيير
              </Button>
            </DialogActions>
          </div>
        </Box>
      </Dialog>

      <h2>Article By Branch List</h2>
      <div className="d-flex flex-wrap gap-2">
        {articles.map((element, i) => (
          <div className="card">
            <div>
              <img src={element.cover.path} />
            </div>
            <div className="d-flex justify-content-center">
              <div className="">
                <div className="d-flex">
                  <div style={{ width: 100 }}>
                    <h6>Branch</h6>
                  </div>
                  <div style={{ width: 50 }}>
                    <h6>Qte</h6>
                  </div>
                  <div style={{ width: 50 }}>
                    <h6>Price</h6>
                  </div>
                </div>
                {element.ArticlesByBranch.map((elem, j) => (
                  <div className="d-flex py-2">
                    <div style={{ width: 100 }}>{elem.branch.name}</div>
                    <div style={{ width: 50 }}>{elem.stock}</div>
                    <div style={{ width: 50 }}>{elem.price}</div>
                    <Button
                      variant="contained"
                      color="warning"
                      style={{
                        height: 25,
                        width: 80,
                        fontSize: 10,
                        padding: 0,
                      }}
                      onClick={() => {
                        console.log(elem);
                        setSelectedForPrice(elem);
                        setOpenDialogPrice(true);
                      }}
                    >
                      Change Price
                    </Button>
                  </div>
                ))}
                <div className="d-flex">
                  <div style={{ width: 100 }}>total</div>
                  <div style={{ width: 100 }}>{element.total}</div>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-center align-items-end  h-100">
              <div className="border d-flex justify-content-center w-100">
                <Button
                  variant="outlined"
                  onClick={() => handleClickOpen(element.id)}
                >
                  Add transaction
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArticleByBranchList;
