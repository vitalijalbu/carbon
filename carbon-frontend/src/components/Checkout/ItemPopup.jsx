import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Page,
  Navbar,
  Block,
  Popup,
  NavLeft,
  NavTitle,
  Segmented,
  Link,
  List,
  ListItem,
  ListInput,
  Button,
  Row,
  Col,
  Stepper,
  BlockTitle,
  BlockHeader,
  Toolbar,
  Icon,
  useStore,
  f7
} from "framework7-react";
import FieldRadio from "./Fields/FieldRadio";
import FieldCheckbox from "./Fields/FieldCheckbox";
import FieldMultiple from "./Fields/FieldMultiple";


let submitted = false;

const ItemPopup = ({ opened, close, data }) => {

  const loading = useStore('loading');

  const [spec, setSpec] = useState("");
  const [qty, setItemQty] = useState(1);
  const [special_instructions, setInstructions] = useState();
  
  const [values, setVariants] = useState([]);
  const [errors, setErrors] = useState(new Set());
  const [session_guid, setSessionGuid] = useState(
    import.meta.env.VITE_APP_SESSION_GUID
  );



  /* Add Item to Cart */
  const handleAdd = (e) => {
    
     const body = {
      session_guid: session_guid,
      item_id: data.id,
      special_instructions,
      listing_id: import.meta.env.VITE_APP_DEMO_LISTING_ID,
      qty,
      variants: [],
    };
    
    for (const mId in values) {
      if (values.hasOwnProperty(mId)) {
        const modifier = values[mId];
        for (const vId in modifier) {
          if (modifier.hasOwnProperty(vId)) {
            const { checked, id, qty } = modifier[vId];
            if (checked) {
              body.variants.push({ id, qty, modifier_group: +mId });
            }
          }
        }
      }
    }
    //console.log('body-to-add', body);
    f7.store.dispatch('addToCart', { body })
      .finally(() => {
        //console.log("🟡 item-response", response);
        close();
      })
      .catch((err) => {
        if (data?.message) {
          console.log("🔴 error-response", err);
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
        }
      });
  };

  const handleVariantsChanged = (mId, value) => {
    setVariants((prev) => ({
      ...prev,
      [mId]: value,
    }));
  };

  //calc total of the item with selected variants
  const calcTotal = () => {
    let valuesTotal = +data.unit_price;
    Object.values(values).forEach((el) => {
      valuesTotal += Object.values(el).reduce(
        (acc, i) => (i.checked ? acc + i.price * i.qty : acc),
        0
      );
    });

    return `${(valuesTotal * qty).toFixed(2)} ${data.currency_code}`;
  };

  

  return (
    <Popup push opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavLeft>
              <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
          </NavLeft>
          <NavTitle>{data.name}</NavTitle>
        </Navbar>
          {data.modifiers && (
              <div className="product-modifiers">
                {data.modifiers.map((modifier) =>
                  modifier.variants?.length ? (
                    <div
                      className="modifier-group border-bottom pb-3 mb-3"
                      id={modifier.id}
                      key={modifier.id}
                    >
                      <BlockTitle>{modifier.name}</BlockTitle>
                      {modifier?.description && (
                        <BlockHeader>
                          {modifier.description}
                          </BlockHeader>
                      )}

                      <BlockHeader
                        className={`modifier-group-label ${
                          errors.has(modifier.id) ? "text-danger" : ""
                        }`}
                      >
                        {modifier.modifier_label}
                      </BlockHeader>

                      {modifier.type_field === "radio" ? (
                        <FieldRadio
                          modifier={modifier}
                          currency_code={data.currency_code}
                          value={values[modifier.id] || {}}
                          onChange={handleVariantsChanged}
                        />
                      ) : modifier.type_field === "checkbox" ? (
                        <FieldCheckbox
                          modifier={modifier}
                          currency_code={data.currency_code}
                          value={values[modifier.id] || {}}
                          onChange={handleVariantsChanged}
                        />
                      ) : (
                        <FieldMultiple
                          modifier={modifier}
                          currency_code={data.currency_code}
                          value={values[modifier.id] || {}}
                          onChange={handleVariantsChanged}
                        />
                      )}
                    </div>
                  ) : null
                )}
              </div>
            )}
            <List form noHairlinesMd id="item-form">
            <ListInput
              type="textarea" 
              label="Istruzioni speciali"
              placeholder="Istruzioni speciali"
              clearButton
              className="mb-3"
              value={special_instructions}
              onInput={(e) => {
                setInstructions(e.target.value);
              }}
            />
          </List>
          <Toolbar className="tab-footer" tabbar bottom inner={false}>
          <Row>
              <Col width="100" medium="25">
              <Segmented tag="div">
                <Button large outline onClick={() => setItemQty(qty-1)}>
                <Icon f7="minus"></Icon>
            </Button>
            <Button large outline outline>
              {qty}
            </Button>
            <Button large outline onClick={() => setItemQty(qty+1)}>
             <Icon f7="plus"></Icon>
            </Button>
            </Segmented>

              </Col>
              <Col width="100" medium="75">
              <Button large fill onClick={handleAdd} preloader loading={loading} className={loading && 'disabled'}>Aggiungi al carrello {calcTotal()}</Button></Col>
              </Row>
          </Toolbar>
      </Page>
    </Popup>
  );
};

export default ItemPopup;
