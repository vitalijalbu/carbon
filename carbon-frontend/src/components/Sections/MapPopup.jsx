import React, { useState, useRef } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  NavRight,
  Link,
  Button,
  List,
  ListItem,
  AccordionContent
  
} from 'framework7-react';


const EditOrderPopup = ({ open, onSubmit, close }) => {
  
  return (
    <Popup opened={opened} onPopupClosed={close}>
    <Page>
          <Navbar>
             <NavLeft>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavLeft>
            <NavTitle>Mappa ordini</NavTitle>
          </Navbar>
          <BlockTitle>List View Accordion</BlockTitle>
          <OrdersMap open={open} />
        </Page>
  </Popup>
  );
};

export default EditOrderPopup;
