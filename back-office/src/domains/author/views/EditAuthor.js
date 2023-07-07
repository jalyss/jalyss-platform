import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { rows } from '../../../constants/authorData'
import UpdateButton from '../../../components/Commun/buttons/UpdateButton'
import { editAuthor, fetchauthor } from '../../../store/author'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'
function EditAuthor() {

  const author = useSelector((state) => state.author.author);
  const { authorId } = useParams()
  const dispatch = useDispatch();

  const [auth, setAuth] = useState({})

  useEffect(() => {
    dispatch(fetchauthor(authorId));
  }, [authorId,dispatch]);
  
  useEffect(()=>{
    if(author)
    setAuth(author)
  },[author])



  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuth((auth) => ({ ...auth, [name]: value }));
  };



  const submitAuth = async (event) => {
    event.preventDefault();
    let aut = { ...auth };
    dispatch(editAuthor(aut)).then((res) => {
      if (!res.error) {
        showSuccessToast(t('author.created'));
      } else {
        console.log(res);
        showErrorToast(res.error.message);
      }
    });
  };


  return (
    <div>
      <div className='container'>
        <div className='d-flex  justify-content-center'>
          <div className='card ' style={{ width: 600 }}>
            <div className='container'>
              <form className='checkout-form'>
                <div class="form-group mt-3">
                  <label >Name AR</label>
                  <input
                    type="text"
                    class="form-control mt-2 "
                    style={{ width: 300 }}
                    name='nameAr'
                    onChange={handleChange}
                    value={auth?.nameAr } />
                </div>
                <div class="form-group mt-3">
                  <label >Biography AR</label>
                  <textarea class="form-control mt-2"
                    rows="3"
                    name='biographyAr'
                    onChange={(e) => handleChange(e)}
                    value={auth?.biographyAr}
                  ></textarea>
                </div>
                <div class="form-group mt-3">
                  <label >Name EN</label>
                  <input type="text"
                    class="form-control mt-2"
                    style={{ width: 300 }}
                    name='nameEn'
                    onChange={(e) => handleChange(e)}
                    value={auth?.nameEn} />
                </div>
                <div class="form-group mt-3">
                  <label >biography EN</label>
                  <textarea class="form-control mt-2 mb-3"
                    rows="3"
                    name='biographyEn'
                    onChange={(e) => handleChange(e)}
                    value={auth?.biographyEn}
                  >

                  </textarea>
                </div>
                <div className='d-flex  justify-content-center'>
                  <UpdateButton mb={15} onClick={submitAuth} />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default EditAuthor;