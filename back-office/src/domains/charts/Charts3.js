import React from 'react'
import {
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
  } from "recharts";
  


const Charts3 = () => {
  const data = [
    { name: "January", Transcation: 150 },
    { name: "February", Transcation: 250 },
    { name: "March", Transcation: 95 },
    { name: "April", Transcation: 500 },
  ];

  return (
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column',marginTop:20 }} >
    
      <div className="App">
      
        <BarChart
          width={500}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 1,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="Transcation" fill='rgba(54, 162, 235, 1)' background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
    
  );
};

export default Charts3