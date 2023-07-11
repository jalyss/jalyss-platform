import React, { useState } from 'react'
import { Form } from 'react-router-dom'
import SaveButton from '../../../components/Commun/buttons/SaveButton'
import { useTranslation } from 'react-i18next'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createProvider } from '../../../store/provider'
import { showErrorToast, showSuccessToast } from '../../../utils/toast'

function CreateProvider() {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const [provider, setProvider] = useState({})
  const providerStore = useSelector((state) => state.provider)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProvider((Provider) => ({ ...Provider, [name]: value }));
  };

  const submitCreate = async (event) => {
    event.preventDefault();
    let aux = Object.assign({},provider)
    dispatch(createProvider(aux))
      .then(res => {
        if (!res.error) {
          showSuccessToast(t("provider.created"))
        } else {
          console.log(res);
          showErrorToast(res.error.message)
        }
      }
      )
    }


  return (
    <div className='container'>

      <div className='card'>
        <div className='container'>

          <form>
            <div class=" mt-3">
              <label for="formFile" class="form-label"> Choose a logo</label>
              <input class="form-control" type="file" id="formFile" />
            </div>

            <div class="row">
              <div class="form-group col-6 mt-3">
                <label >Name</label>
                <input type="text"
                 class="form-control"
                  placeholder="Name" 
                  name="name" 
                  id="name"                   
                   onChange={handleChange}
                 value={provider?.name}
                  />
              </div>
              <div class="form-group col-6 mt-3">
                <label >Account</label>
                <input type="number"
                 class="form-control" 
                 placeholder="0"
                 name="accountBalance" 
                 id="accountBalance"                   
                  onChange={handleChange}
                value={provider?.accountBalance}
                 
                 />
              </div>
            </div>

            <div class="row mt-3">
              <div class="form-group col-6">
                <label >Email</label>
                <input type="Email" 
                class="form-control" 
                placeholder="email@gmail.com" 
                name="email" 
                id="email"                   
                 onChange={handleChange}
               value={provider?.email}/>

              </div>
              <div class="form-group col-6">
                <label >Telephone Number</label>
                <input type="number" 
                class="form-control" 
                placeholder="+21644251517" 
                name="tel" 
                id="tel"                   
                 onChange={handleChange}
               value={provider?.tel}/>
              </div>
            </div>

            <div class="form-group mt-3 ">
              <label >Address</label>
              <input type="text" 
              class="form-control"
               placeholder="1234 Main St" 
               name="address" 
               id="address"                   
                onChange={handleChange}
              value={provider?.address}
               />
            </div>



            <div className="w-100 d-flex justify-content-center">

              <SaveButton mt={20} mb={15} onClick={submitCreate} />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProvider
