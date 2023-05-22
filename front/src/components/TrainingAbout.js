import React from 'react'
import "../assets/styles/training.css"
import bg from '../img/about.png'
import { iconsT } from '../dummydata'
import { awrapper } from '../dummydata'

const TrainingAbout = () => {
  return (
    <>
    <section className='aboutHome'>
        <div class="center-text">
            <h3>GAIN KNOWLEDGE & PUT IT IN USE</h3>
			<h1>Benefits Of Our Courses</h1>
		</div>
      <div className='container-flexSB'>
        <div className='left'>
          <img src={bg}/>
        </div>
        <div className='categories'>
          <div className='items'>
            {iconsT.map((e) => {
              return (
                <div className='item flexSB'>
                  <div className='img'>
                    <img src={e.cover} alt='' />
                  </div>
                  <div className='text'>
                    <h2>{e.title}</h2>
                    <p>{e.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
    <section className='awrapper'>
        <div className='container grid'>
          {awrapper.map((e) => {
            return (
              <div className='box flex'>
                <div className='img'>
                  <img src={e.cover} alt='' />
                </div>
                <div className='text'>
                  <h1>{e.data}</h1>
                  <h3>{e.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
  </>
  )
}

export default TrainingAbout