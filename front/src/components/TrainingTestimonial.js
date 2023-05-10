import React from 'react'
import { testimonal } from '../dummydata'
import TrainingHeading from './TrainingHeading'




const TrainingTestimonial = () => {
  return (
    <>
        <TrainingHeading subtitle='TESTIMONIAL' title='Our Successful Jalysset' />
    <section className='testimonal padding'>
      <div className='container'>

        
        <div className='contentest'>
          {testimonal.map((e) => (
            <div className='items shadow'>
              <div className='box grid'>
                <div className='img'>
                  <img src={e.cover} alt='taswira' />
                </div>
                <div className='name'>
                  <h2>{e.name}</h2>
                  <span className='epost'>{e.post}</span>
                </div>
              </div>
              <p className='desc'>{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
  )
}

export default TrainingTestimonial