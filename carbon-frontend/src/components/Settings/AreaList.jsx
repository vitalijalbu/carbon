import React from 'react';
import { List, ListItem, ListButton, Toggle, f7 } from 'framework7-react';
import { updateDeliveryArea } from '../../actions/listings';


const AreaList = ({ areas }) => {
if (!areas.length) return ('Non ci sono dati da mostrare');

  /* Toggle edit area */
  const toggleArea = (data) => {
    const update_data = {
      'id': data.id,
      'active': !data.active
    }
    updateDeliveryArea(update_data)
      .then(({ data }) => {
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2000, cssClass: 'success'});
      })
      .catch((err) => {
        f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 2000, cssClass: 'danger'});
      });
  };


  return (
    <>
    <List simpleList>
        {areas.map((data, i) => (
            <ListItem key={i}>
            <span>{data.name}</span>
            <Toggle defaultChecked={data.active} color="green" onChange={e => toggleArea(data)}></Toggle>
          </ListItem>
        ))}
    </List>
    <List>
      <ListButton external target="_blank" href="https://partner.ceebo.com/settings/areas">Aggiungi o modifica zone</ListButton>
    </List>
    </>
  );
};

export default AreaList;
