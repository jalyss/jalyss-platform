import React ,{  useState }from 'react'
import TrainingHeading from './Commun/TrainingHeading'


import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchFreqQs } from '../store/Faq';



const Faq = () => {
  const questionStore = useSelector((state)=>(state.faq))
  const {questions}= questionStore
 const dispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchFreqQs())
},[])

 
      const [expanded, setExpanded] = React.useState(false);

      const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
  return (
    <section>
        <TrainingHeading subtitle='FAQS' title='Frequesntly Ask Question'/>

        <div className='mt-5'>
          {questions.items.map((e, index) => (
         
            <Accordion expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: '33%', flexShrink: 0, fontSize: '1.3rem' }}>
              {e.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
               { e.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
          ))}
        </div>
     
      <div>
     
   
   
     
    </div>
    </section>
  )
}

export default Faq
