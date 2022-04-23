import React from 'react';
import { ResponsiveContainer,  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Chart = ({ data }) => {
  const chartData = Array.isArray(data) ? data.map(i=>({...i, total_orders: +i.total_orders})) : [];
  return (
    <ResponsiveContainer height={400} width="100%">
      <AreaChart data={chartData} >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="total_orders" stroke="#ff5d5d" fill="#ff5d5d" />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default Chart;
