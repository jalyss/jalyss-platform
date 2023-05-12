import React from 'react'
import TrainingHeading from './TrainingHeading'
import { awrapper } from '../dummydata'

const MentorDes = () => {
  return (
    <section id="about">
      <div className="About_container">
      <div id='Heading' >
     
     <TrainingHeading  title='SO MANY REASONS TO START' />
   </div>
   <section>
        <p>TwensaEvents is a website dedicated to buy tickets for events in Tunisia. Whether you're looking for music festivals, art exhibits, or sports events, we've got you covered.</p>
        <div className="icon-row">
          <div className="icon">
            <img src="https://cdn-icons-png.flaticon.com/512/3844/3844724.png" alt="Music Icon" />
            <h3>Music Festivals</h3>
          </div>
          <div className="icon">
            <img src="https://media.istockphoto.com/id/1155278164/vector/theatrical-masks-set.jpg?s=612x612&w=0&k=20&c=WH0oQRqYG8BsOTFt7x-uuGB7vi5lXECPoNIy1CTZ-Xc=" alt="Art Icon" />
            <h3>Art Exhibits</h3>
          </div>
          <div className="icon">
            <img src="https://media.istockphoto.com/id/1155278164/vector/theatrical-masks-set.jpg?s=612x612&w=0&k=20&c=WH0oQRqYG8BsOTFt7x-uuGB7vi5lXECPoNIy1CTZ-Xc=" alt="Art Icon" />
            <h3>Art Exhibits</h3>
          </div>
          
        </div></section>
      </div>
      <section className='Mentorawrapper'>
        <div className='containermentor griddy'>
          {awrapper.map((e) => {
            return (
              <div className='box flex'>
                <div className='text'>
                  <h1>{e.data}</h1>
                  <h3>{e.title}</h3>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </section>
  )
}

export default MentorDes