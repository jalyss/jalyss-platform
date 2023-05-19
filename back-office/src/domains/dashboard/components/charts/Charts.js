import React from 'react';
import {
  Chart as ChartJS, ArcElement,
  Tooltip, Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2'
import { Doughnut } from 'react-chartjs-2';
import Charts2 from './Charts2';
import Charts3 from './Charts3';
import Charts4 from './Charts4';
import Charts1 from './Charts1';


ChartJS.register(ArcElement, Tooltip, Legend);

const Charts = () => {
  const data = {
    labels: ['Web Developer', 'STUDENT', 'Fitness Trainer', 'Journalist', 'Lawyer'],
    datasets: [
      {
        label: 'USER',
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
    <div>
      <div class="mb-8">
        <h2 class="mb-2"> Dashboard</h2>
        <h5 class="text-700 fw-semi-bold">Here’s what’s going on at your business right now</h5>
      </div>
      <hr class="bg-200 mb-6 mt-4"></hr>
      <div className='carts_container' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: 20 }}>
        <div>
          <section style={{ height: 600, width: 400, marginLeft: -500 }}>
            <h3 style={{ textAlign: 'center' }}>TOTAL ORDERS</h3>
            <Charts2 />
          </section>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, marginTop: 20 }}>
        <section style={{ height: 500, width: 500, marginLeft: 80 }}>
          <h3 style={{ textAlign: 'center' }}> MOST-SELLING CATEGORIES</h3>
          <Charts4 />
        </section>

        <section style={{ height: 600, width: 500 }}>
          <h3 style={{ textAlign: 'center' }}>  MOST ARTICLES SELLS</h3>
          <Charts3 />
        </section>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 1, marginTop: 20 }}>
        <div>
          <section style={{ height: 500, width: 500, marginLeft: 80 }}>
            <h3 style={{ textAlign: 'center' }}>MOST USERS JOB</h3>
            <Charts1 />
          </section>
        </div>
      </div>
    </div>
  )
}

export default Charts