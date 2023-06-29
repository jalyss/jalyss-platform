import React from 'react'
import { rows } from '../../../constants/providerData'
import { useParams } from 'react-router-dom'

function DetailProvider() {
  const { providerId } = useParams()
  const provider = rows[providerId]
  return (
    <div>
      <div class="container" >
        
        <div class="card mb-3" style={{ width: 1000 }}>
          <div class="row g-0">
            <div class="col-md-4">

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>

                <img class="img-fluid rounded-start mt-5" src={provider.logo} alt="Card image cap" style={{ height: 100, width: 250 }} />
              </div>
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h3 class="card-title " style={{ textAlign: 'center' }}> {provider.name}</h3>
                <hr></hr>
                <div className='row'>
                  <div className='col-2 '>
                    <h6>Email :</h6>
                  </div>
                  <div className='col-4'>
                    <p class="card-text"><small class="text-muted">{provider.email}</small></p>
                  </div>
                </div>
                <div className='row mt-3'>
                <div className='col-4 '> <h6>Telephone Number:</h6></div>
                <div className='col-4'><p class="card-text"><small class="text-muted"> {provider.tel}</small></p>
                </div>
                </div>
               
                <div className='row mt-3'>
                <div className='col-4 '><h6>Article :</h6></div>
                <div className='col-4'><p class="card-text"><small class="text-muted">{provider.article}</small></p></div>

                </div>
                <div className='row mt-3'>
                <div className='col-4 '><h6>Adresse : </h6></div>
                <div className='col-4'>
                <p class="card-text">{provider.address}</p>
                </div>
                </div>
                
                <div className='row mt-3'>
                <div className='col-4 '>
                  <h6> Account Balance : </h6>
               
                </div>
                <div className='col-4'><p class="card-text"><small class="text-muted">{provider.accountBalance}</small></p></div>
                </div>
                

                
                


              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailProvider
