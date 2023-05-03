import React ,{  useState }from 'react'
import TrainingHeading from './TrainingHeading'
import { faq } from '../dummydata'


const Faq = () => {
    const [click, setClick] = useState(false)
    const toggle = (i) => {
        return click===i?setClick(null):setClick(i)
      }
  return (
    <section>
        <TrainingHeading subtitle='FAQS' title='Frequesntly Ask Question'/>
        <div className='faq' style={{marginTop:'50px'}}>
        <div className=''>
          {faq.map((e, index) => (
            <div className='box'>
              <button className='accordion' onClick={() => toggle(index)} key={index}>
                <h2>{e.title}</h2>
                <span className='unicode'>{click === index ?<>&#x2304;</> : <>&#8250;</>}</span>
              </button>
              {click === index ? (
                <div className='text'>
                  <p>{e.desc}</p>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Faq