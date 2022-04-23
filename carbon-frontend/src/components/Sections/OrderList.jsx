import React from 'react';
import { List, ListItem, Badge } from "framework7-react";
import { Bike, ShoppingBag } from '../../utilities/Icons/';

const OrderList = ({ orders }) => {
  if (!orders.length) return ('Non ci sono ordini da mostrare');

  const ItemIcon = ({ type }) => {
    switch (type) {
      case "delivery":
        return <Badge><Bike size="16" color="#fff" /></Badge>;
      case "pickup":
        return <Badge><ShoppingBag size="16" color="#fff" /></Badge>;
      default:
        return null;
    }
  };

   const PaymentMethod = ({ type }) => {
    switch (type) {
      case "cash":
        return <Badge color="light">Contanti</Badge>;
      case "discount":
        return <Badge color="dark">Sconto</Badge>;
      case "credit_card":
        return <Badge color="secondary">Digitale</Badge>;
      default:
        return null;
    }
  };



  return (
    <List mediaList>
        {orders.map((data, i) => (
          <ListItem
          className="order-item" 
          key={data.id}
          media={false}
          link={"/home/" + data.id} 
          title={'#'+data.id}
          header={<>{data.type === 'pickup' ? 'Orario ritiro' : 'Orario consegna'} {data.dropoff_deadline}</>}
          subtitle={data.dropoff?.name}
          text={<><Badge style={{ background: data.status_color }}>{data.status}</Badge> <ItemIcon type={data.type} /> <PaymentMethod type={data.payment_method} /></>} after={data.currency_code + ' ' + data.total_price}/>
        ))}
      </List>
  );
};

export default OrderList;
