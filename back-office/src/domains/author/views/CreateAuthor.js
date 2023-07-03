import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { createAuthor } from '../../../store/author'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'
import UpdateButton from '../../../components/Commun/buttons/UpdateButton'
import SaveButton from '../../../components/Commun/buttons/SaveButton'
import { useEffect } from 'react'

function CreateAuthor() {
    const { t, i18n } = useTranslation()
    const dispatch = useDispatch()
    const [author, setAuthor] = useState({})
    const authorStore = useSelector((state) => state.author)

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAuthor((Author) => ({ ...Author, [name]: value }));
      };


    const submitCreate = async (event) => {
        event.preventDefault();
        let aux = Object.assign({},author)
        dispatch(createAuthor(aux))
          .then(res => {
            if (!res.error) {
              showSuccessToast(t("author.created"))
            } else {
              console.log(res);
              showErrorToast(res.error.message)
            }
          }
          )
        }

    return (
        <div>
            <div className='container'>
                <div className='d-flex  justify-content-center'>
                    <div className='card ' style={{ width: 600 }}>
                        <div className='container'>
                            <form className='checkout-form' onSubmit={submitCreate}>
                                <div class="form-group mt-3">
                                    <label >Name AR</label>
                                    <input type="text"
                                     class="form-control mt-2 "
                                      style={{ width: 300 }} 
                                      placeholder="باللغة العربية"
                                       name="nameAr" 
                                       id="nameAr"                   
                                        onChange={handleChange}
                                      value={author?.nameAr} />
                                </div>
                                <div class="form-group mt-3">
                                    <label >Biography AR</label>
                                    <textarea class="form-control mt-2"
                                     rows="3" 
                                     placeholder=' السيرة' 
                                     name='biographyAr' 
                                     id='biographyAr'
                                     onChange={ handleChange}
                                      value={author?.biographyAr} 
                                      ></textarea>
                                </div>
                                <div class="form-group mt-3">
                                    <label >Name EN</label>
                                    <input type="text"
                                     class="form-control mt-2"
                                      style={{ width: 300 }}
                                       placeholder="English language" 
                                       name='nameEn' 
                                       id='nameEn'
                                       onChange={ handleChange}
                                       value={author?.nameEn} />
                                </div>
                                <div class="form-group mt-3">
                                    <label >biography EN</label>
                                    <textarea class="form-control mt-2 mb-3"
                                     rows="3" 
                                     placeholder='Biography'
                                      name='biographyEn'
                                       id='biographyEn'
                                       onChange={ handleChange}
                                       value={author?.biographyEn}>
                                       </textarea>
                                </div>
                                <div className=" d-flex justify-content-center">
                                <SaveButton mb={15} onClick={submitCreate}/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CreateAuthor
