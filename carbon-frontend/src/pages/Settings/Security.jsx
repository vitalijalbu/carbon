import React, { useState, useEffect } from 'react';
import { Page, Navbar, Preloader, Link, Block, List, ListItem, BlockTitle } from 'framework7-react';


const Security = () => {
  const [delivery_areas, setAreas] = useState([]);

  return (
    <Page>
      <Navbar title="Il mio account">
      </Navbar>
      <BlockTitle>Azioni</BlockTitle>
        <List>
        <ListItem title="Account ID" link="#" after="#1000"></ListItem>
        <ListItem title="Modifica account" link="mailto:partner@ceebo.com?subject=Modifica dati profilo" external></ListItem>
        <ListItem title="Modifica password" link="/settings/security"></ListItem>
        <ListItem className="text-danger" title="Disattiva account" link="mailto:partner@ceebo.com?subject=Disattiva account" external></ListItem>
        </List>
    </Page>
  );
}

export default Security;

