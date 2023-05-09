import React from 'react'
import { price } from '../dummydata'
import TrainingHeading from './TrainingHeading'

const TrainingPricing = () => {

  return (
    <>
    
    <TrainingHeading subtitle='PRICING' title='Choose The Right Plan' />
    
    <section className='price padding'>
      <div className='container grid'>
      <>
      {price.map((el,i) => (
        <div className='items shadow' key={i}>
          <h4>{el.name}
          <span className='know'>{el.type}</span></h4> 
          <h1>
           
            {el.price}
             <span>DT</span>
          </h1>
          <p>{el.desc}</p>
          <button className='outline-btn'>GET STARTED</button>
        </div>
      ))}
    </>
        
      </div>
    </section>
    
  </>
  )
}

export default TrainingPricing