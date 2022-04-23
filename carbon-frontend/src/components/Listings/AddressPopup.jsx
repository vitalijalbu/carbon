import React, { useState } from 'react';
import {
  Page,
  Navbar,
  Icon,
  Popup,
  NavLeft,
  NavTitle,
  Button,
  List,
  ListInput,
  Toolbar,
  
} from 'framework7-react';
import AddressField from '../FormFields/AddressField';

const AddressPopup = ({ opened, close, onSubmit, data, isLoading }) => {
  return (
    <Popup
    push={true}
    opened={opened}
    onPopupClosed={close}
  >
    <Page>
          <Navbar>
             <NavLeft>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavLeft>
            <NavTitle>Crea nuovo indirizzo cliente</NavTitle>
          </Navbar>
          <List form noHairlinesMd id="address-form">
          <AddressField name="formatted_address" label="Indirizzo completo" required={false} placeholder="Inserisci indirizzo"/>
          <ListInput
            label="Nome sul campanello"
            type="text"
            name="name"
            placeholder="Nome sul campanello"
            value={data?.name || ''}
            clearButton
            validate
          />

          <ListInput
            label="Telefono"
            type="number"
            name="phone_number"
            value={data?.phone_number || ''}
            placeholder="Telefono"
            clearButton
            validate
          />
          </List>
          <List>
          <ListInput
            label="Note (facoltativo))"
            type="textarea"
            placeholder="Note (facoltativo)"
            name="notes"
            value={data?.notes || ''}
            clearButton
            minlength="5"
            maxlength="255"
            validate
          />
        </List>
        <Toolbar className="tab-footer" tabbar bottom inner={false}>
              <Button large fill onClick={onSubmit} preloader loading={isLoading} className={isLoading && 'disabled'}>Salva</Button>
          </Toolbar>
        </Page>
  </Popup>
  );
};

export default AddressPopup;
