import React from 'react';
import { List, ListItem, Block } from "framework7-react";

const OrderList = ({ orders }) => {
  if (!orders.length) return (<Block strong>Non ci sono dati da mostrare</Block>);

  return (
    <List mediaList>
        {orders.map((data, i) => (
          <ListItem 
          key={data.id}
          link={"/orders/" + data.id} 
          title={'#'+data.id} subtitle={data.status} text={data.created_at} after={data.currency_code + ' ' + data.total_price}/>
        ))}
      </List>
  );
};

export default OrderList;
