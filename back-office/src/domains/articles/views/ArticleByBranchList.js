import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import isEnglish from '../../../helpers/isEnglish'
import { fetchArticles, addTransactionStock } from '../../../store/article'
//import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { fetchBranches } from '../../../store/branche'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'

function ArticleByBranchList() {

    const articleStore = useSelector(state => state.article)
    const [articles, setArticles] = useState([])
    const branchStore = useSelector((state) => state.branche)
    const dispatch = useDispatch()
    const isEng = isEnglish()
    const [open, setOpen] = useState(false);
    const [mvtBranch, setMvtBranch] = useState();
    
    useEffect(() => {
        dispatch(fetchArticles())
        dispatch(fetchBranches())
    }, [dispatch])
    useEffect(() => {
        if (articleStore.articles.items.length) {
            let aux = articleStore.articles.items.map(elem => {
                let total = 0
                elem.ArticlesByBranch.forEach(element => {
                    total += element.stock
                });
                return {
                    ...elem,
                    total
                }
            }
            )
            console.log(aux);
            setArticles(aux)
        }
    }, [articleStore.articles.items])


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleMvtChange = (e) => {
        const { name, value } = e.target
        setMvtBranch((MvtBranch) => ({ ...MvtBranch, [name]: value }))
      }
    

    const submitCreate = async (event) => {
        event.preventDefault();
        let aux = Object.assign({}, mvtBranch)
        console.log(aux);
        dispatch(addTransactionStock(aux))
          .then(res => {
            if (!res.error) {
              showSuccessToast(' transmission successfully ')
            } else {
              console.log(res);
              showErrorToast(res.error.message)
            }
          }
          )
    
      }
    return (
        <div>
            <React.Fragment>
                <Dialog
                    fullWidth={100}
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>نقل المخزون</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            اختر الكمية وقم بنقلها من فرع إلى فرع
                        </DialogContentText>
                        <Box
                            noValidate
                            component="form"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                m: 'auto',
                                width: 'fit-content',
                            }}
                        >
                            <div>
                                <div>
                                    <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                        <InputLabel htmlFor="max-width">من</InputLabel>
                                        <Select
                                            autoFocus
                                            value={mvtBranch?.branchSenderId}
                                            onChange={handleMvtChange}
                                            label="branch"

                                        >
                                            {branchStore.branches.items.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}


                                        </Select>

                                    </FormControl>
                                </div>


                                <div>
                                    <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                        <InputLabel htmlFor="max-width">إلى</InputLabel>
                                        <Select
                                            autoFocus
                                            value={mvtBranch?.branchReceiverId}
                                            onChange={handleMvtChange}
                                            label="branch"

                                        >
                                            {branchStore.branches.items.map(item => (
                                                <MenuItem value={item.id}>{item.name}</MenuItem>
                                            ))}


                                        </Select>

                                    </FormControl>
                                </div>
                                <FormControl sx={{ mt: 2, minWidth: 120 }}>
                                    الكمية
                                    <input
                                        min="1"
                                        max="10000"
                                        defaultValue="1"
                                        type="number"
                                        value={mvtBranch?.quantity}
                                        onChange={handleMvtChange}


                                    />



                                </FormControl>
                            </div>



                        </Box>


                    </DialogContent>

                    <DialogActions>
                        <Button onClick={handleClose}>غلق</Button>
                    </DialogActions>
                    <DialogActions>
                        <Button type='submit' onClick={submitCreate}>
                            <i className="glyphicon glyphicon-transfer"></i>تبادل
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>



            <h2>Article By Branch List</h2>
            <div className='d-flex flex-wrap'>
                {articles.map((element, i) => (
                    <div>
                        <div>
                            <img src={element.cover.path} />
                        </div>
                        <div>
                            <div className='d-flex'>
                                <div style={{ width: 100 }}>branch</div>
                                <div style={{ width: 100 }}>qte</div>
                                <div style={{ width: 100 }}>price</div>
                            </div>
                            {element.ArticlesByBranch.map((elem, j) => (
                                <div className='d-flex'>
                                    <div style={{ width: 100 }}>{elem.branch.name}</div>
                                    <div style={{ width: 100 }}>{elem.stock}</div>
                                    <div style={{ width: 100 }}>{elem.price}</div>
                                </div>
                            ))}
                            <div className='d-flex'>
                                <div style={{ width: 100 }}>total</div>
                                <div style={{ width: 100 }}>{element.total}</div>

                            </div>
                        </div>
                        <div><Button onClick={handleClickOpen} >Add transaction</Button></div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ArticleByBranchList