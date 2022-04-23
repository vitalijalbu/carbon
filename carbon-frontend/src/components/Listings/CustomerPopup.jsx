import React, { useState, useRef } from 'react';
import {
  Page,
  Navbar,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  NavRight,
  Button,
  List,
  ListInput,
  Icon,
  Toolbar,
  f7
} from 'framework7-react';
import AddressField from '../FormFields/AddressField';

const CustomerPopup = ({ opened, onChange, onSubmit, close, isLoading, data }) => {
  /*const [data, setFormValues] = useState({});

  console.log("🌿 data-child", data);

    const onChange = (e) => {
      //e.preventDefault();
      //console.log(e);
        setFormValues((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };*/

  return (
    <Popup
    push
    opened={opened}
    onPopupClosed={close}
  >
    <Page>
          <Navbar>
             <NavLeft>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavLeft>
            <NavTitle>{data ? 'Modifica cliente' : 'Crea nuovo cliente'}</NavTitle>
          </Navbar>
          <List form noHairlinesMd>
         {/* <AddressField name="formatted_address" label="Indirizzo completo" required={false} placeholder="Inserisci indirizzo"/>*/}
          <ListInput
            label="Nome"
            type="text"
            name="first_name"
            placeholder="Nome"
            autoComplete="off"
            clearButton
            required
            validate
            value={data?.first_name || ''}
            onInput={onChange}
          />
          
          <ListInput
            label="Cognome"
            type="text"
            name="last_name"
            placeholder="Cognome"
            autoComplete="off"
            clearButton
            validate
            value={data?.last_name || ''}
            onInput={onChange}
          />

          <ListInput
            label="E-mail (facoltativo)"
            type="email"
            name="email"
            placeholder="E-mail"
            clearButton
            validate
            value={data?.email || ''}
            onInput={onChange}
          />

          <ListInput
            label="Telefono"
            type="number"
            name="phone_number"
            placeholder="Telefono"
            clearButton
            required
            validate
            value={data?.phone_number || ''}
            onInput={onChange}
          />
          </List>
          <List>
          <ListInput
            label="Note cliente"
            type="textarea"
            placeholder="Note cliente"
            name="notes"
            clearButton
            value={data?.notes || ''}
            onInput={onChange}
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

export default CustomerPopup;
