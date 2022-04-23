import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Page,
  Navbar,
  Icon,
  Popup,
  NavLeft,
  Block,
  BlockTitle,
  NavTitle,
  Button,
  List,
  ListInput,
  Row,
  Col,
  Toolbar,
  Segmented
} from 'framework7-react';
import moment from 'moment';
import OrdersMap from "../Orders/OrdersMap";

const DropoffPopup = ({ opened, close, type, deadline, onSubmit }) => {
  const isDelivery = type === 'delivery';
  //console.log('deadline-popup->', deadline);

  const [minute, setMinute] = useState(deadline);
  const [activeButton, setActiveTimeButton] = useState(0);
  const formatted = useMemo(() => moment(minute).format('HH:mm'), [minute]);

  /* Stepper Hour */
  const increaseMin = (time) => {
    setMinute((prev) => moment(prev).add(time ? time : 5, 'minutes'));
    setActiveTimeButton(time);
};
const decreaseMin = () =>
  setMinute((prev) =>
    moment.max(deadline, moment(prev).subtract(5, 'minutes'))
  );



      
  return (
    <Popup opened={opened} onPopupClosed={close}>
    <Page>
          <Navbar>
             <NavLeft>
             <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavLeft>
            <NavTitle>Seleziona orario</NavTitle>
          </Navbar>
          {isDelivery ? (
              <>
                <BlockTitle>Altri ordini in corso</BlockTitle>
                <Block strong className="no-padding">
                  <OrdersMap opened={opened}/>
                </Block>
              </>
            ) : (
            <>
              <BlockTitle>Tipo ordine asporto</BlockTitle>
              <Block strong className="empty-state">
                La mappa non è disponibile per ordini d'asporto
              </Block>
            </>)}
            <Toolbar className="tab-footer" tabbar bottom inner={false}>
            <Row className="margin-bottom">
                <Col width="100">
              <Segmented tag="div">
                <Button outline large onClick={() => increaseMin(15)} active={activeButton === 15}>+15 min</Button>
                <Button outline large onClick={() => increaseMin(30)} active={activeButton === 30}>+30 min</Button>
                <Button outline large onClick={() => increaseMin(45)} active={activeButton === 45}>+45 min</Button>
              </Segmented>
              </Col>
              </Row>
              <Row>
                <Col width="30">
                <Segmented tag="div">
                <Button large outline onClick={decreaseMin}>
                <Icon f7="minus"></Icon>
            </Button>
            <Button large outline outline>
              {formatted}
            </Button>
            <Button large outline onClick={increaseMin}>
             <Icon f7="plus"></Icon>
            </Button>
            </Segmented>
                </Col>
                <Col width="70">
                  <Button fill large onClick={onSubmit}>
                    Conferma orario
                  </Button>
                </Col>
              </Row>
            </Toolbar>
        </Page>
  </Popup>
  );
};

export default DropoffPopup;
