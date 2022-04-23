import React, { useState, useRef } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  NavRight,
  Button,
  List,
  ListItem,
  Icon,
  Toggle,
  f7,
} from "framework7-react";
import store from '../../js/store';

const StatusPopup = ({ opened, close }) => {

/* Update listing */
 const handleUpdate = (name, checked) => {
    
  };

  return (
    <Popup id="status-popup" opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavLeft>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavLeft>
          <NavTitle>Stato ristorante</NavTitle>
        </Navbar>
        <BlockTitle>Simple Links List</BlockTitle>
    <List>
      <ListItem title="Link 1" link="#"></ListItem>
      <ListItem title="Link 2" link="#"></ListItem>
      <ListItem title="Link 3" link="#"></ListItem>
    </List>
      </Page>
    </Popup>
  );
};

export default StatusPopup;
