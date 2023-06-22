import React from 'react'
import { Form } from 'react-router-dom'

function CreateProvider() {
  return (
    <div className='container'>
     
      <div className='card'>
        <div className='container'>

          <form>


            <div class="row">
              <div class="form-group col-6 mt-3">
                <label >Name</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group col-6 mt-3">
                <label >Account</label>
                <input type="number" class="form-control" placeholder="0" />
              </div>
            </div>

            <div class="row mt-3">
              <div class="form-group col-6">
                <label >Email</label>
                <input type="Email" class="form-control" placeholder="email@gmail.com" />
              </div>
              <div class="form-group col-6">
                <label >Telephone Number</label>
                <input type="number" class="form-control" placeholder="+21644251517" />
              </div>
            </div>

            <div class="form-group mt-3 ">
              <label >Address</label>
              <input type="text" class="form-control" placeholder="1234 Main St" />
            </div>



            <div className="w-100 d-flex justify-content-center">
              <button
                type="submit"
                className="confirm-button mt-5   mb-3">
                <span className="label-btn"> Add Provider </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProvider
