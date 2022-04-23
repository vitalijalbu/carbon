import React from 'react';
import { FlexGrid, Row, Column } from '@carbon/react';



const Footer = () => {

  return (
    <footer className='main-footer'>
    <FlexGrid>
    <Row>
        <Column lg={4}>Span 4 of 12</Column>
        <Column lg={4}>Span 4 of 12</Column>
        <Column lg={4}>Span 4 of 12</Column>
        <Column lg={4}>Span 4 of 12</Column>
      </Row>
  </FlexGrid>
  </footer>
  )
};
export default Footer;