import React from 'react';
import { List, ListItem } from "framework7-react";

const CustomerList = ({ customers }) => {
  if (!customers.length) return ('Non ci sono dati da mostrare');

  return (
    <List mediaList>
        {customers.map((data, i) => (
          <ListItem 
          key={data.id}
          mediaItem={true}
          noChevron={true}
          media={data.image_url}
          link={"/customers/" + data.id} 
          title={data.full_name} subtitle={'Creato il ' +data.created_at} after={data.total_orders}/>
        ))}
      </List>
  );
};

export default CustomerList;
