import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Row,
  Col,
  List,
  ListItem,
  Page,
  Navbar,
  Segmented,
  Block,
  Button,
  BlockTitle,
  Link,
  NavRight,
  Toolbar,
  Actions,
  ActionsGroup,
  ActionsLabel,
  ActionsButton,
  Preloader,
  Stepper,
  Icon,
  useStore,

  f7,
} from "framework7-react";
import SelectPopup from "../Customers/SelectPopup";
import SelectAddressPopup from "../Customers/SelectAddressPopup";
import DropoffPopup from "./DropoffPopup";
import CheckoutPopup from "./CheckoutPopup";
import { Bike, ShoppingBag } from "../../utilities/Icons";
import moment from "moment";

const CartOverview = () => {
  // Subscribe to store getters
  const cart = useStore('cart');
  const loading = useStore('loading');
  
  const session_guid = import.meta.env.VITE_APP_SESSION_GUID;

  const [type, setOrderType] = useState("pickup");
  const [customersPopup, setCustomersPopup] = useState(false);
  const [addressPopup, setAddressPopup] = useState(false);
  const [dropoffPopup, setDropoffPopup] = useState(false);
  const [checkoutPopup, setCheckoutPopup] = useState(false);
  const [customer, setCustomer] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  const [dropoffDeadline, setDropoffDeadline] = useState("ASAP");

  const query = {
    session_guid: session_guid,
    manually: true,
    type: type,
    address_id: customerAddress?.id,
  };



  useEffect(() => {
    // Load cart from store when component mounted
    f7.store.dispatch('loadCart', { query });
    if(loading === true){
      f7.preloader.show();
    }
  }, [type, customerAddress]);

  /* Edit Modal Handle */
  const openCustomers = () => {
    setCustomersPopup(true);
  };
  const closeCustomers = () => {
    setCustomersPopup(false);
  };

  /* Toggle Address Modal */
  const openAddressCustomer = () => {
    setAddressPopup(true);
  };
  const closeAddressCustomer = () => {
    setAddressPopup(false);
  };

  const openDropoffPopup = () => {
    setDropoffPopup(true);
  };
  const closeDropoffPopup = () => {
    setDropoffPopup(false);
  };

  /* Toggle Address Modal */
  const openCheckout = () => {
    setCheckoutPopup(true);
  };
  const closeCheckout = () => {
    setCheckoutPopup(false);
  };

  
  const incrementItem = (unique_id) => {
    /* data to pass */
    const body = {
      session_guid: session_guid,
      unique_id: unique_id
    };
    // call store here
    f7.store.dispatch('incrementQty', { body, query });
  };
  const decrementItem = (unique_id) => {
    /* data to pass */
    const body = {
      session_guid: session_guid,
      unique_id: unique_id
    };
    // call store here
    f7.store.dispatch('decrementQty', { body, query });
  };

  /* Empty Cart */
  const emptyCart = () => {
    const body = {
      session_guid: session_guid
    };
    console.log('action', body);
    f7.store.dispatch('empyCart', { body, query });
  };



   /* Checkout Action Here */
    const handleSubmit = (values) => {
      /* data to pass */
      const bodyData = {
        ...values,
        session_guid,
        type: data.type,
        customer_id: customer?.id,
        ref_area: customerAddress?.ref_area,
        address_id: customerAddress?.id,
        dropoff_deadline: dropoffDeadline
      };
      console.table(formData);
      // call store here
      f7.store.dispatch('checkOut', { bodyData, query });
    };
    


  return (
    <Page
      tabActive={true}
      className="page-current"
      style={{ paddingBottom: "50px" }}
    >
      <Navbar title="Carrello" inner={true}>
        <NavRight>
          <Link iconF7="trash" actionsOpen="#action-clear-cart"></Link>
        </NavRight>
      </Navbar>
      <Block strong className="no-margin">
        <Segmented strong>
          <Button
            large
            active={type === "delivery"}
            onClick={() => setOrderType("delivery")}
          >
            <Bike />
            Consegna
          </Button>
          <Button
            large
            active={type === "pickup"}
            onClick={() => setOrderType("pickup")}
          >
            <ShoppingBag />
            Ritiro
          </Button>
        </Segmented>
      </Block>
      {/* Cart Items Here */}
      <BlockTitle>Prodotti</BlockTitle>
      <List mediaList>
        {Array.isArray(cart.items) && cart.items.length > 0 ? (
          cart.items.map((item, i) => (
            <li>
              <ListItem
                key={i}
                title={item.name}
                after={item.unit_price + " " + item.currency_code}
              >
                <div slot="media">
                  {/*
                    <Stepper
                    small
                    value={item?.qty || 0}
                    input={false}
                    className="item-qty circle"
                    stepperMinusClick={() => incrementItem(item.unique_id)}
                    stepperPlusClick={() => decrementItem(item.unique_id)}
                    //stepperPlusClick={handleDecrementQty(item.unique_id)}
                  />
                  */}
                  <Segmented tag="div">
                    <Button
                      small
                      outline
                      onClick={() => decrementItem(item.unique_id)}
                    >
                      <Icon f7="minus"></Icon>
                    </Button>
                    <Button small outline outline>
                      {item?.qty}
                    </Button>
                    <Button
                      small
                      outline
                      onClick={() => incrementItem(item.unique_id)}
                    >
                      <Icon f7="plus"></Icon>
                    </Button>
                  </Segmented>
                </div>
              </ListItem>
              {item.variants.length > 0 ? (
                <li>
                  <ul className="item-modifiers">
                    {item.variants.map(({ per_item, name }, v) => {
                      return (
                        <ListItem
                          noHairlines
                          key={v}
                          title={`${per_item}x ${name}`}
                        />
                      );
                    })}
                  </ul>
                </li>
              ) : null}
              {item.special_instructions ? (
                <li>
                  <ul className="item-modifiers">
                    <ListItem title="Istruzioni speciali" />
                    <ListItem title={item.special_instructions} />
                  </ul>
                </li>
              ) : null}
            </li>
          ))
        ) : (
          <Block strong className="no-margin-top empty-state">
            Nessun prodotto
          </Block>
        )}
      </List>
      {/* Customer */}
      <BlockTitle>Cliente</BlockTitle>
      <List mediaList>
        <ListItem
          link="#"
          title={customer ? customer.full_name : "Seleziona cliente"}
          subtitle={customer ? customer.phone_number : null}
          onClick={openCustomers}
        >
          <img
            slot="media"
            src="https://cdn.ceebo.com/assets/images/avatar.png"
            width="80"
          />
        </ListItem>
      </List>
      {/* Customer */}
      {!!customer && type === "delivery" && (
        <>
          <BlockTitle>Indirizzo</BlockTitle>
          <List mediaList>
            <ListItem
              link="#"
              title={
                customerAddress
                  ? customerAddress.formatted_address
                  : "Seleziona indirizzo"
              }
              subtitle={customerAddress ? customerAddress.name : ""}
              onClick={openAddressCustomer}
              className={!customer ? "disabled" : ""}
            >
              <img
                slot="media"
                src="https://cdn.ceebo.com/assets/images/avatar.png"
                width="80"
              />
            </ListItem>
          </List>
        </>
      )}
      {/* Dropoff Hour */}
      <BlockTitle>Orario di consegna</BlockTitle>
      <List mediaList>
        <ListItem
          link="#"
          title={dropoffDeadline ? dropoffDeadline : "Seleziona orario"}
          onClick={openDropoffPopup}
        >
          <img
            slot="media"
            src="https://cdn.ceebo.com/assets/images/avatar.png"
            width="80"
          />
        </ListItem>
      </List>
      {/* Summary order */}
      <BlockTitle>Riepilogo ordine</BlockTitle>
      <List>
        <ListItem
          title="Subtotale"
          after={cart.cart_subtotal > 0 ? (cart.cart_subtotal + " " + cart.currency_code) : '0.00'}
        />
        <ListItem
          title="Spese di servizio"
          after={cart.purchase_fee > 0 ? (cart.purchase_fee + " " + cart?.currency_code) : '0.00'}
        />
        <ListItem
          title="Spese di consegna"
          after={cart.delivery_fee > 0 ? (cart.delivery_fee + " " + cart?.currency_code) : '0.00'}
        />
        <ListItem
          className="text-bold"
          title="Totale"
          after={cart.cart_total > 0 ? (cart.cart_total+ " " + cart.currency_code) : '0.00'}
        />
      </List>
      <Toolbar
        className="tab-footer padding"
        tabbar
        bottom
        inner={false}
        style={{ marginBottom: "50px" }}
      >
        <Button
          large
          fill
          preloader
          loading={loading}
          onClick={openCheckout}
          //className={customer ? "" : "disabled"}
        >
          Continua {cart.cart_total > 0 ? (cart.cart_total+ " " + cart.currency_code) : '0.00'}
        </Button>
      </Toolbar>
      {/* Popups Here */}
      <SelectPopup
        opened={customersPopup}
        close={closeCustomers}
        onSubmit={setCustomer}
      />
      <SelectAddressPopup
        opened={addressPopup}
        close={closeAddressCustomer}
        onSubmit={setCustomerAddress}
        id={customer?.id}
      />
      <DropoffPopup
        opened={dropoffPopup}
        close={closeDropoffPopup}
        type={type}
        deadline={dropoffDeadline}
        onSubmit={setDropoffDeadline}
      />
      <CheckoutPopup opened={checkoutPopup} close={closeCheckout} data={cart}/>

      {/* Actions buttons */}
      <Actions id="action-clear-cart">
        <ActionsGroup>
          <ActionsLabel>Il carrello non sarà più recuperabile</ActionsLabel>
          <ActionsButton onClick={emptyCart}>Svuota il carrello</ActionsButton>
          <ActionsButton color="red">Annulla</ActionsButton>
        </ActionsGroup>
      </Actions>
    </Page>
  );
};

export default CartOverview;
