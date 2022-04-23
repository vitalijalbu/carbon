import React, { useState, useEffect } from "react";
import {
  Page,
  Navbar,
  Block,
  BlockTitle,
  Link,
  NavTitle,
  NavLeft,
  NavRight,
  Row,
  Col,
  Toolbar,
  Button,
  Popover,
  List,
  ListItem,
  Icon,
  Badge,
  f7
} from "framework7-react";
import { getOrder } from "../../actions/orders";
import AcceptPopup from '../../components/Home/AcceptEditPopup';
import RejectPopup from '../../components/Home/RejectPopup';


const View = (props) => {
  const { f7route, f7router } = props;
  let id = f7route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [order, setOrder] = useState({});
  const [rejectPopup, setRejectPopup] = useState(false);
  const [acceptPopup, setAcceptPopup] = useState(false);


  useEffect(() => {
    setLoading(true);
    getOrder(id)
      .then(({ data }) => {
        setLoading(false);
        setOrder(data);
      })
      .catch((err) => {
        //history.goBack();
        console.log('🐞 internal error', err);
      });
  }, [id]);

  /* Edit Modal Handle */
  const openAccept = (dropoff_deadline) => {
    //console.log('dropoff_deadline----->', dropoff_deadline);
    setAcceptPopup(true)
  };
  const closeAccept = () => {
    setAcceptPopup(false)
  };

    /* Reject Popup */
    const openReject = () => {
      setRejectPopup(true)
    };
    const closeReject = () => {
      setRejectPopup(false)
    };

  return (
<>
<RejectPopup
        data={order}
        opened={rejectPopup}
        close={closeReject}
      />
    <AcceptPopup
        data={order}
        opened={acceptPopup}
        close={closeAccept}
      />
    <Page>
 <Navbar>
      <NavLeft>
        <Link iconF7="chevron_left" href="/home" reloadAll={true}>Nuovi ordini</Link>
      </NavLeft>
        <NavTitle>{'Dettaglio ordine #'+order.id}</NavTitle>
        <NavRight>
          <Link href="https://ceebo.tawk.help/" external target="_blank">Aiuto ?</Link>
        </NavRight>
      </Navbar>
      {/* Page content starts here */}
      <BlockTitle medium>{'#'+order.id}</BlockTitle>
      <Block strong>
        <h3 className="text-muted">{'Ordine creato il '+order.created_at ? order.created_at : null}</h3>
        <Badge style={{ background: order.status_color }}>{order.status}</Badge>
        <span><Badge>{order.type}</Badge></span>
      </Block>
      {/* Order Customer */}
      <BlockTitle>Cliente</BlockTitle>
      <List mediaList>
          <ListItem
            title={order.dropoff ? order.dropoff.name : ""}
            subtitle={order.dropoff ? order.dropoff.phone_number : ""}
          />
          <ListItem
            title="Indirizzo"
            subtitle={order.dropoff ? order.dropoff.formatted_address : null}
          />
           <ListItem
            title="Creato"
            after={order.created_at}
          />
           <ListItem
            title="Orario di consegna"
            after={order.dropoff_deadline ? order.dropoff_deadline : null}
          />
          {order.notes &&<ListItem
            title="Note"
            subtitle={order.notes ? order.notes : null}
          />}
          {order.area_name && <ListItem title="Riferimento zona" after={order.area_name}/>}
        </List>
           {/* Order Items */}
           <BlockTitle>Piatti</BlockTitle>
        <List noChevron>
          {Array.isArray(order.items) && order.items.length > 0 ? (
            order.items.map((item, i) => (
              <li>
                <ListItem
                  key={i}
                  title={item.name}
                  after={item.unit_price + " " + item.currency_code}
                >
                  <span slot="media">
                  {item.qty+'x'}
                  </span>
                </ListItem>
                {item.variants.length > 0 ? (
                  <li>
                    <ul>
                      {item.variants.map(({ per_item, name }, v) => {
                        return (
                          <ListItem className="item-modifier" key={v} title={`${per_item}x ${name}`} />
                        );
                      })}
                    </ul>
                  </li>
                ) : null}
                {item.special_instructions ? (
                  <li>
                    <ul>
                      <ListItem title="Istruzioni speciali:" />
                      <ListItem className="item-modifier" title={item.special_instructions} />
                    </ul>
                  </li>
                ) : null}
              </li>
            ))
          ) : (
            <Block strong>Nessun prodotto</Block>
          )}
        </List>

        {/* Overview order */}
        <List>
          <ListItem
            title="Subtotale"
            after={
              order.subtotal_price
                ? order.subtotal_price + " " + order.currency_code
                : ""
            }
          />
          <ListItem
            title="Spese di servizio"
            after={
              order.purchase_fee
                ? order.purchase_fee + " " + order.currency_code
                : ""
            }
          />
          <ListItem
            title="Spese di consegna"
            after={
              order.delivery_fee
                ? order.delivery_fee + " " + order.currency_code
                : ""
            }
          />
          <ListItem
            className="text-bold"
            title="Totale"
            after={
              order.total_price
                ? order.total_price + " " + order.currency_code
                : ""
            }
          />
           <ListItem
            className="text-bold"
            title={order.status_id <= 6 && order.payment_method === 'cash' ? 'Da pagare ' : 'Pagato con '}
            after={order.payment_method === "cash" ? (
              <Icon f7="money_euro_circle"></Icon>
             ) : (
               <Icon f7="creditcard"></Icon>
             )}
          />
        </List>
      {/* CTA order actions */}
      <Toolbar className="tab-footer padding" tabbar bottom inner={false} style={{marginBottom: '50px'}}>
        <Row>
          <Col width="30">
            <Button outline large onClick={openReject} color="red">Rifiuta</Button>
          </Col>
          <Col width="70">
            <Button fill large onClick={openAccept}>Accetta</Button>
          </Col>
        </Row>
      </Toolbar>
      
    </Page>
    </>
  );
};

export default View;
