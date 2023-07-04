import React from 'react'
import SaveButton from '../../../components/Commun/buttons/SaveButton'

function CreateType() {
  return (
    <div>
      <div className='container'>

        <div className='card' style={{ width: 900 }}>
          <div className='container' >
        <div>

              <div class="form-group col-6 mt-3">
                <label >Name AR</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group col-6 mt-3 " style={{marginRight: '30 px'}}>
                <label >Name EN</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div>
         
            <div className="w-100 d-flex justify-content-center">

              <SaveButton mt={20} mb={15} />
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateType
