import React from 'react';
import { Chart as ChartJS, ArcElement, 
Tooltip, Legend,
 } from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';
import Charts2 from './Charts2';
import Charts3 from './Charts3';

ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
      const data = {
        labels: ['Web Developer', 'STUDENT', 'Fitness Trainer', 'Journalist', 'Lawyer'],
        datasets: [
          {
            label: 'NUMBER',
            data: [8, 13, 11, 7, 30],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)'
            ],
            borderWidth: 1,
          },
        ],
      };
      
  return (
    <div  className='carts_container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop:20 }}>
        <h2 className="title" style={{ textAlign: 'center' }}>CHARTS</h2>
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between',gap:1,marginTop:20 }}>
        <section style={{height:500,width:400}}>
            <h3 style={{ textAlign: 'center' }}>USERS-JOBS</h3>
            <Doughnut data={data} />
        </section>
        <section style={{height:500,width:400}}>
        <h3 style={{ textAlign: 'center' }}> INSCRIPTIONS</h3>
        <Charts2/>
        </section>
        <section style={{height:500,width:400}}>
        <h3 style={{ textAlign: 'center' }}>  TRANSCATION</h3>
        <Charts3/>
        </section>
        </div>
        
        </div>
  )
}

export default Charts