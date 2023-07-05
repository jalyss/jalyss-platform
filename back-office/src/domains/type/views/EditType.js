import React from 'react'
import { useParams } from 'react-router-dom'
import { rows } from '../../../constants/typeData'
import UpdateButton from '../../../components/Commun/buttons/UpdateButton'

function EditType() {
  const { typeId } = useParams()
  const type = rows[typeId]
  return (
    <div>


      <div className='container'>
      <div className="d-flex justify-content-center" >
        <div className='card' style={{width: '500px'}}>
          <div className='container' >
            <div>

              <div class="form-group  mt-3">
                <label >Name AR</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <div class="form-group  mt-3 " style={{ marginRight: '30 px' }}>
                <label >Name EN</label>
                <input type="text" class="form-control" placeholder="Name" />
              </div>
              <div className="   d-flex justify-content-center">
                
                <UpdateButton mb={15} mt={20}/>
              </div>
             
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default EditType

