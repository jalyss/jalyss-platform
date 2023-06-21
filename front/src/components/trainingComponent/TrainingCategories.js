import React from 'react'
import TrainingHeading from '../TrainingHeading'
import Marquee from "react-fast-marquee";


const TrainingCategories = () => {


  return (
    <>
    <section className="categoriess" id="categories">
    <TrainingHeading subtitle='CATEGORIES' title='Browse Top Categories' />
    <Marquee >
    <section>
        <div className="containerCategegories">


          <ul className="grid-list">
          
            <li>
              <div className="cardy category-card" style={{background: 'linear-gradient(125.53deg, #FF9979 20%, #811FFF 100%)'}}>

                <div className="card-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/2867/2867308.png" width="72" height="72" loading="lazy"
                    alt="Data Science icon" />
                </div>

                <div>
                  <h3 className="title-lg">Data Science</h3>

                  <p className="title-sm">68 Courses</p>
                </div>

                <a href="#" className="layer-link" aria-label="Data Science Category"></a>

              </div>
            </li>

            <li>
              <div className="cardy category-card" style={{background: 'linear-gradient(125.53deg, #FF9979 40%, #811FFF 80%)'}}>

                <div className="card-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/2721/2721304.png" width="72" height="72" loading="lazy"
                    alt="UI/UX Design icon" />
                </div>

                <div>
                  <h3 className="title-lg">UI/UX Design</h3>

                  <p className="title-sm">68 Courses</p>
                </div>

                <a href="#" className="layer-link" aria-label="UI/UX Design Category"></a>

              </div>
            </li>

            <li>
              <div className="cardy category-card" style={{background: 'linear-gradient(125.53deg, #FF9979 60%, #811FFF 100%)'}}>

                <div className="card-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/6813/6813705.png" width="72" height="72" loading="lazy"
                    alt="Modern Physics icon" />
                </div>

                <div>
                  <h3 className="title-lg">Modern Physics</h3>

                  <p className="title-sm">68 Courses</p>
                </div>

                <a href="#" className="layer-link" aria-label="Modern Physics Category"></a>

              </div>
            </li>
          </ul>

      

        </div>
      </section>
      </Marquee>
      <div style={{marginTop:'-50px'}}>
        <Marquee direction='right'>
      <ul class="grid-list" >
          
          

      <li>
              <div class="cardy category-card"  style={{background: 'linear-gradient(55deg, #8a2387 10%, #e94057 70%, #f27121 )'}}>

                <div class="card-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/8403/8403908.png" width="72" height="72" loading="lazy"
                    alt="Music Production icon" />
                </div>

                <div>
                  <h3 class="title-lg">Music Production</h3>

                  <p class="title-sm">68 Courses</p>
                </div>

                <a href="#" class="layer-link" aria-label="Music Production Category"></a>

              </div>
            </li>

            <li>
              <div class="cardy category-card" style={{background: 'linear-gradient(337deg, #654ea3, #da98b4)'}}>

                <div class="card-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/2867/2867308.png" width="72" height="72" loading="lazy"
                    alt="Data Science icon" />
                </div>

                <div>
                  <h3 class="title-lg">Data Science</h3>

                  <p class="title-sm">68 Courses</p>
                </div>

                <a href="#" class="layer-link" aria-label="Data Science Category"></a>

              </div>
            </li>

            <li>
              <div class="cardy category-card" style={{background: 'linear-gradient(354deg, #283593 10%, #1976d2 40%)'}}>

                <div class="card-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/5572/5572192.png" width="72" height="72" loading="lazy" alt="Finances icon"/>
                </div>

                <div>
                  <h3 class="title-lg">Finances Course</h3>

                  <p class="title-sm">68 Courses</p>
                </div>

                <a href="#" class="layer-link" aria-label="Finances Category"></a>

              </div>
            </li>
        </ul>
        </Marquee>
      </div>
      <button className='coursesbtn' style={{marginLeft:'450px'}}>EXPLORE CATEGORIES </button>
   </section>
    </>
  )
}

export default TrainingCategories