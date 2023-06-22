import React from 'react'
import { useParams } from 'react-router-dom'
import { rows } from '../../../constants/providerData'

function EditProvider() {
  const { providerId } = useParams()
  const provider = rows[providerId]
  return (
    <div>
      <div className='container'>
        <div className='card'>
          <div className='container'>
            <form>
              <div className='d-flex mb-2' style={{ justifyContent: 'center', }}>
                <img class="img-fluid rounded-start mt-5" src={provider.logo} alt="Card image cap" style={{ height: 100, width: 250 }} />


              </div>
              <div class="row">
                <div class="form-group col-6 mt-3">
                  <label >Name</label>
                  <input type="text" class="form-control" value={provider.name} />
                </div>
                <div class="form-group col-6 mt-3">
                  <label >Account</label>
                  <input type="number" class="form-control" value={provider.accountBalance} />
                </div>
              </div>

              <div class="row mt-3">
                <div class="form-group col-6">
                  <label >Email</label>
                  <input type="Email" class="form-control" value={provider.email} />
                </div>
                <div class="form-group col-6">
                  <label >Article</label>
                  <input type="text" class="form-control" value={provider.article} />
                </div>
              </div>


              <div class="row mt-3">
                <div class="form-group col-6">
                  <label >Telephone number</label>
                  <input type="number" class="form-control" value={provider.tel} />
                </div>
                <div class="form-group col-6">
                <label >Address</label>
                <input type="text" class="form-control" value={provider.address} />
                </div>
              </div>
              
              <div className="w-100 d-flex justify-content-center">
                <button
                  type="submit"
                  className="confirm-button mt-5   mb-3">
                  <span className="label-btn"> Edit Provider </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProvider
