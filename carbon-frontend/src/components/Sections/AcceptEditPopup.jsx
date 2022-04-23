import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Page,
  Navbar,
  BlockTitle,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  Icon,
  Button,
  Link,
  List,
  ListItem,
  Row,
  Col,
  Tabs,
  Tab,
  Toolbar,
  Segmented,
  f7
} from "framework7-react";
import OrdersMap from "../Orders/OrdersMap";
import SelectPopup from "../Couriers/SelectPopup";
import { acceptOrder, assignOrder } from "../../actions/orders";
import moment from 'moment';

const AcceptEditPopup = ({ opened, data, close }) => {
  //const { f7route, f7router } = props;
  
  const isDelivery = data.type === 'delivery';
  const deadline = useMemo(
    () =>
      typeof data.dropoff_deadline === 'string'
        ? moment(data.dropoff_deadline, 'HH:mm')
        : data.dropoff_deadline,
    [data.dropoff_deadline]
  );

  

  const [loading, setLoading] = useState(true);
  const [couriersPopup, setCouriersPopup] = useState(false);
  const [courier_id, setCourier] = useState();
  const [selected_orders, setSelectedOrders] = useState([]);
  const [minute, setMinute] = useState(deadline);
  const [activeButton, setActiveTimeButton] = useState(0);
  const formatted = useMemo(() => moment(minute).format('HH:mm'), [minute]);

  useEffect(() => {
    setMinute(deadline);
    setSelectedOrders([data.id]);
  }, [deadline]);

  /* Stepper Hour */
  const increaseMin = (time) => {
      setMinute((prev) => moment(prev).add(time ? time : 5, 'minutes'));
      setActiveTimeButton(time);
  };
  const decreaseMin = () =>
    setMinute((prev) =>
      moment.max(deadline, moment(prev).subtract(5, 'minutes'))
    );

  /* Couriers Popup */
  const openCouriersPopup = () => {
    setCouriersPopup(true)
  };
  const closeCouriersPopup = () => {
    setCouriersPopup(false)
  };


   /* Accept order */ 
  const handleAcceptOrder = () => {
      acceptOrder({ id: data.id, dropoff_deadline: formatted })
        .then(({ data }) => {
          /* Toat success */
          f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'success'});
          console.log('✅ success-order-accept');
          f7.tab.show(".order-confirmed");
        })
        .catch((err) => {
          /* Toat errror */
          f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'danger'});
          console.log('🐞 internal error')
        });
    };


      /* Assign orders */
  const handleAssign = useCallback((courier_id) => {
    assignOrder({ courier_id, orders: selected_orders })
    .then(({ data }) => {
        console.log(data);
        console.log('✅', data);
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'success'});
        /* redirect */
        closeCouriersPopup();
        close();
        //f7.views.main.navigate('/home', {reloadAll: true });
      }).catch((err) => {
          console.log('err', err);
          f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'danger'});
      })
    },
    [courier_id, selected_orders]
  );

  return (
    <Popup opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavLeft>
          <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
          </NavLeft>
          <NavTitle>{"Accetta ordine #" + data.id}</NavTitle>
        </Navbar>
        <Tabs animated>
          <Tab id="" className="order-accept" tabActive>
            {isDelivery ? (
              <>
                <BlockTitle>Altri ordini in corso</BlockTitle>
                <Block strong className="no-padding">
                <OrdersMap opened={opened} current={data} />
                </Block>
              </>
            ): (<>
            <BlockTitle>Altri ordini in corso</BlockTitle>
            <Block strong>
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
            <Button large outline>
              {formatted}
            </Button>
            <Button large outline onClick={increaseMin}>
             <Icon f7="plus"></Icon>
            </Button>
            </Segmented>
                </Col>
                <Col width="70">
                  <Button fill large onClick={(e) => handleAcceptOrder()}>
                    Conferma orario
                  </Button>
                </Col>
              </Row>
            </Toolbar>
          </Tab>
          {/* Tab order confirmed */}
          <Tab className="order-confirmed">
            <BlockTitle large>{'Ordine #' + data.id + ' confermato'}</BlockTitle>
            <List>
              <ListItem title="Cliente" after={data?.dropoff?.name} />
              <ListItem title="Prodotti" after={data.total_items}/>
            </List>
            <Block bottom className="padding">
              <Button large fill color="black" className="margin-bottom">
                Stampa ricevuta
              </Button>
              {isDelivery && (
                <Button className="margin-bottom"  large outline onClick={openCouriersPopup}>
                  Assegna corriere
                </Button>
              )}
               <Button href={'/orders/'+data.id} popupClose>
                Vedi ordine
              </Button>
            </Block>
          </Tab>
        </Tabs>
        <SelectPopup opened={couriersPopup} close={closeCouriersPopup}
        setCourier={setCourier}
        onSubmit={handleAssign} />
      </Page>
    </Popup>
  );
};

export default AcceptEditPopup;
