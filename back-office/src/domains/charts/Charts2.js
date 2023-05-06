import React from 'react'
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
    LineChart, Line
  } from "recharts";
  


const Charts2 = () => {
  const data = [
    { name: "January", SIGN_UP: 150 },
    { name: "February", SIGN_UP: 250 },
    { name: "March", SIGN_UP: 95 },
    { name: "April", SIGN_UP: 500 },
  ];

  return (
    
    <div >
   
      <div className="App">
      <LineChart
         width={400}
         height={430}
         data={data}
         margin={{
           top: 5,
           right: 30,
           left: 1,
           bottom: 5,
         }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="SIGN_UP" stroke='rgba(54, 162, 235, 1)' activeDot={{ r: 7 }} />
          
        </LineChart>
     
      </div>
    </div>
    
  );
};

export default Charts2