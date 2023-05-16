import React from 'react'
import {
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  LineChart, Line, ResponsiveContainer, AreaChart, Area
} from "recharts";
import command, { fetchCommands } from '../../store/command';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { format, parseISO } from 'date-fns';

const Charts2 = () => {
  const dispatch = useDispatch()
  const commandStore = useSelector((state) => state.command)
  const [data1, setData1] = useState([])
  useEffect(() => {
    dispatch(fetchCommands())
  }, [dispatch])

  //console.log(commandStore.commands.items.map(e => e.createdAt));


  useEffect(() => {
    if (commandStore.commands.items.length > 0) {
      const dates = commandStore.commands.items.map((command) => {
        const date = new Date(command.createdAt);
        const year = date.getFullYear();
        const month = date.toLocaleString("default", { month: "long" });
        return `${month} ${year}`;
      });
      // console.log(dates);
      setData1(dates);
    }

  }, [commandStore.commands.items])
  const dataCount = data1.filter(e => e === "mai 2023").length
  //console.log(data1);
  //console.log(dataCount);
  //commandStore.commands.items.forEach(order => {
  //const date = new Date(order.createdAt);
  //const month = date.toLocaleString('default', { month: 'long' });
  //const year = date.getFullYear();
  //const monthYears = (`${month} ${year}`);
  //console.log(monthYears);
  //setData1(monthYears)
  //});
  //console.log(data1);


  {/*
  

   useEffect(() => {
    // Group orders by month using date-fns library
    const ordersByMonth = command.reduce((acc, order) => {
      const month = format(parseISO(order.createdAt), 'MMMM yyyy');
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    // Format data for Recharts
    const chartData = Object.keys(ordersByMonth).map((month) => ({
      month,
      orders: ordersByMonth[month],
    }));

    setData1(chartData);
  }, [command]);

*/}
  const data = [

    {
      "name": 'January',
      "orders": 0,
      "amt": 2400
    },
    {
      "name": "February",
      "orders": 0,
      "amt": 2210
    },
    {
      "name": "March",
      "orders": 0,
      "amt": 2290
    },
    {
      "name": data1[0],
      "orders": dataCount,
      "amt": 2000
    },

  ];


  return (

    <div className="App">
      <AreaChart width={1000} height={500} data={data}
        margin={{ top: 10, right: 50, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area type="monotone" dataKey="orders" stroke="#8884d8" fillOpacity={1} fill="url(#colorOrders)" />
      </AreaChart>
    </div>


  );
};

export default Charts2