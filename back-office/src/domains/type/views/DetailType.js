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
        
         
            
              <div class="card" style={{width: '500px'}}>
              <div class="container" >
                <div className='row mt-3'>
                  <div className='col-4 '>
                    <h6>Name AR :</h6>
                  </div>
                  <div className='col-4'>
                    <p class="card-text"><small class="text-muted">{type.nameAr}</small></p>
                  </div>
                </div>
                <div className='row mt-3'>
                  <div className='col-4 '>
                    <h6>Name EN :</h6>
                  </div>
                  <div className='col-4'>
                    <p class="card-text"><small class="text-muted"> {type.nameEn}</small></p>
                  </div>
                </div>
                
                <div className='row mt-3 mb-3'>
                <div className='col-4 '><h6>Article :</h6></div>
                <div className='col-4'><p class="card-text"><small class="text-muted">{type.article}</small></p></div>
                </div>


              </div>
            </div>
      </div>
        </div>
        
    
   
  )
}

export default DetailType

