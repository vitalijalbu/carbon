import React from 'react';
import OrderItem from './OrderItem';

const OrderList = ({ orders }) => {
  if (!orders.length) return [];

  return (
    <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Totale ordini</th>
          <th scope="col" className="text-right">
            Totale guadagni
          </th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <OrderItem data={order} key={order.date} />
        ))}
      </tbody>
    </table>
  );
};

export default OrderList;
