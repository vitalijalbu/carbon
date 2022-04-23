import React, { useState, useEffect } from 'react';
import { Page, Navbar, Preloader, Link, Block, List, ListItem, BlockTitle } from 'framework7-react';


const Support = () => {

  return (
    <Page>
      <Navbar title="Assistenza">
      </Navbar>
      <BlockTitle>Azioni</BlockTitle>
        <List>
        <ListItem title="Chiamaci" link="#" after="+390023992"></ListItem>
        <ListItem title="Contattaci" link="mailto:support@ceebo.com?subject=Assistenza" external after="support@ceebo.com"></ListItem>
        </List>
    </Page>
  );
}

export default Support;

