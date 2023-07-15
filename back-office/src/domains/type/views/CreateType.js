import React, { useState } from 'react'
import SaveButton from '../../../components/Commun/buttons/SaveButton'
import { useDispatch, useSelector } from 'react-redux'
import { createType } from '../../../store/articleType'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'
import { useTranslation } from 'react-i18next'

function CreateType() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const [type, setType] = useState({})
  const articleTypeStore = useSelector((state) => state.articleType)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setType((Type) => ({ ...Type, [name]: value }));
  };

  const submitCreate = async (event) => {
    event.preventDefault();
    let aux = Object.assign({}, type)
    dispatch(createType(aux))
      .then(res => {
        if (!res.error) {
          showSuccessToast(t("type.created"))
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
        <div className="d-flex justify-content-center" >
          <div className='card' style={{ width: '500px' }} >
            <div className='container' >
              <div>
                <form className='checkout-form' onSubmit={submitCreate}>

                  <div class="form-group  mt-3">
                    <label >Name AR</label>
                    <input type="text" class="form-control" placeholder="Name" name="nameAr"
                      id="nameAr"
                      onChange={handleChange}
                      value={type?.nameAr} />
                  </div>
                  <div class="form-group  mt-3 " style={{ marginRight: '30 px' }}>
                    <label >Name EN</label>
                    <input type="text" class="form-control" placeholder="Name" name="nameEn"
                      id="nameEn"
                      onChange={handleChange}
                      value={type?.nameEn} />
                  </div>

                  <div className=" d-flex justify-content-center">
                    <SaveButton mb={15} onClick={submitCreate} />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateType
