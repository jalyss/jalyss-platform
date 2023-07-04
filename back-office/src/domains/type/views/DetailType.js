import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { rows } from '../../../constants/typeData';

function DetailType() {

  const { typeId } = useParams()
  const type = rows[typeId]
  return (
    <div>
      <div class="container" >

        <div class="card mb-3" style={{ width: 1000 }}>
          <div class="row g-0">
            <div class="col-md-8">
              <div class="card-body">

                <div className='row'>
                  <div className='col-2 '>
                    <h6>Name AR :</h6>
                  </div>
                  <div className='col-4'>
                    <p class="card-text"><small class="text-muted">{type.nameAr}</small></p>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-2 '>
                    <h6>Name EN :</h6>
                  </div>
                  <div className='col-4'>
                    <p class="card-text"><small class="text-muted"> {type.nameEn}</small></p>
                  </div>
                </div>
                
                <div className='row mt-3'>
                <div className='col-2 '><h6>Article :</h6></div>
                <div className='col-4'><p class="card-text"><small class="text-muted">{type.article}</small></p></div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailType

