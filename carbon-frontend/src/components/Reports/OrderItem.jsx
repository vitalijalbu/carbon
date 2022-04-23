import React from 'react';
import moment from 'moment';

const OrderItem = ({ data }) => {
  return (
    <tr>
      <td>{moment(data.date).format('D MMM YYYY')}</td>
      <td>{data.total_orders}</td>
      <td className="text-right">{data.total_earns+' '+data.currency_code}</td>
    </tr>
  );
};

export default OrderItem;
