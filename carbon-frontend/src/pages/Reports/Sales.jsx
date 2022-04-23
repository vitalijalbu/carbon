import React, { useState, useEffect } from 'react';
import { Page, Navbar, Preloader, Block, BlockTitle } from 'framework7-react';


const Sales = () => {
  const [loading, setLoading] = useState(true);


  return (
  <Page>
    <Navbar title="Report" title="Report"></Navbar>
    <BlockTitle medium>Ordini</BlockTitle>
    <Block></Block>
  </Page>
);
}

export default Sales;
