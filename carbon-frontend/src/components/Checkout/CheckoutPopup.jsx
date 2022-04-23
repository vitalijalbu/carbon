import React, { useState, useCallback } from "react";
import {
  Page,
  Navbar,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  Link,
  Icon,
  List,
  ListItem,
  Button,
  Tabs,
  Tab,
  Segmented,
  BlockTitle,
  f7,
} from "framework7-react";
import SelectPopup from "../Couriers/SelectPopup";

const CheckoutPopup = ({ opened, close, data }) => {
  const [loading, setLoading] = useState(true);
  const [courier_id, setCourier] = useState();
  const [selected_orders, setSelectedOrders] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [couriersPopup, setCouriersPopup] = useState(false);

  /* Accept order */
  const handleAcceptOrder = () => {
    acceptOrder({ id: data.id, dropoff_deadline: formatted })
      .then(({ data }) => {
        /* Toat success */
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2500,
          cssClass: "success",
        });
        console.log("✅ success-order-accept");
        f7.tab.show(".order-confirmed");
      })
      .catch((err) => {
        /* Toat errror */
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2500,
          cssClass: "danger",
        });
        console.log("🐞 internal error");
      });
  };

  /* Assign orders */
  const handleAssign = useCallback(
    (courier_id) => {
      assignOrder({ courier_id, orders: selected_orders })
        .then(({ data }) => {
          console.log(data);
          console.log("✅", data);
          f7.toast.show({
            text: data.message,
            horizontalPosition: "center",
            closeTimeout: 2500,
            cssClass: "success",
          });
          /* redirect */
          closeCouriersPopup();
          close();
          //f7.views.main.navigate('/home', {reloadAll: true });
        })
        .catch((err) => {
          console.log("err", err);
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2500,
            cssClass: "danger",
          });
        });
    },
    [courier_id, selected_orders]
  );

  return (
    <Popup className="update-popup" opened={opened} onPopupClosed={close}>
      <Page pageContent={false}>
        <Navbar>
          <NavLeft>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavLeft>
          <NavTitle>Completa ordine</NavTitle>
        </Navbar>
        {/* TABS */}
        <Tabs animated>
          {/* TAB 1 */}
          <Tab id="order-checkout" className="page-content" tabActive>
            {/* Payment Method */}
            <BlockTitle>Seleziona metodo di pagamento</BlockTitle>
            <Block strong>
              <Segmented strong>
                <Button
                  large
                  active={paymentMethod === "cash"}
                  onClick={() => setPaymentMethod("delivery")}
                >
                  Contanti
                </Button>
                <Button
                  large
                  active={paymentMethod === "pickup"}
                  onClick={() => setPaymentMethod("pickup")}
                >
                  Segna come già pagato
                </Button>
              </Segmented>
            </Block>
            {/* Cart data here */}
            <List>
              <ListItem title="Cliente" after={data?.dropoff?.name} />
              <ListItem title="Prodotti" after={data?.total_items}/>
            </List>

            <Block bottom className="padding">
              <Button
                large
                fill
                className="margin-bottom"
                tabLink="#order-confirmed"
              >
                Conferma ordine
              </Button>
              <Button
                large
                fill
                color="black"
                className="margin-bottom"
                onClick={close}
              >
                Chiudi
              </Button>
            </Block>
          </Tab>
          {/* Tab order confirmed */}
          <Tab id="order-confirmed" className="page-content">
            <BlockTitle large>{"Ordine #234 confermato"}</BlockTitle>
            <List>
              <ListItem title="Cliente" after="demo" />
              <ListItem title="Prodotti" after="2" />
              <ListItem title="Tipo" after="delivery" />
              <ListItem title="Totale" after="24" />
            </List>
            <Block bottom className="padding">
              <Button large outline className="margin-bottom">
                Stampa ricevuta
              </Button>
              <Button large fill color="black" className="margin-bottom">
                Vedi ordine
              </Button>
              <Button large outline>
                Assegna corriere
              </Button>
            </Block>
          </Tab>
        </Tabs>
      </Page>
    </Popup>
  );
};

export default CheckoutPopup;
