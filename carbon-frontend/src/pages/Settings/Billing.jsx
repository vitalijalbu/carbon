import React, { useState, useEffect } from 'react';
import { Page, Navbar, Preloader, Link, Block, List, ListItem, BlockTitle } from 'framework7-react';


const Billing = () => {

  return (
    <Page>
      <Navbar large title="Il mio piano" titleLarge="Il mio piano">
      </Navbar>
      <BlockTitle>Azioni</BlockTitle>
        <List>
        <ListItem title="Account ID" link="#" after="#1000"></ListItem>
        <ListItem className="text-danger" title="Disattiva account" link="mailto:partner@ceebo.com?subject=Disattiva account" external></ListItem>
        </List>
    </Page>
  );
}

export default Billing;

