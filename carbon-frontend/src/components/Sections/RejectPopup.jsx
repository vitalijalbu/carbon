import React, { useState, useEffect } from 'react';
import {
  Page,
  Navbar,
  BlockTitle,
  Popup,
  NavLeft,
  NavTitle,
  Icon,
  Button,
  Toolbar,
  List,
  ListItem,
  f7
} from 'framework7-react';
import { getInteractions } from "../../actions/help";
import { rejectOrder } from "../../actions/orders";

const RejectPopup = ({ opened, data, close }) => {

  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState();
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    getInteractions().then(({ data }) => setInteractions(data));
  }, []);

  const handleReject = () => {
        setLoading(true);
        rejectOrder({ id: data.id, interaction_id: checked })
          .then(({ data }) => {
            if (data.success) {
              //toast(data.message);
              //updateOrder();
              /* success */
              close();
              f7.view.main.router.navigate('/', {reloadAll: true});
              f7.toast.show({text: data.message, closeButton: true, horizontalPosition: 'center', closeTimeout: 1300, cssClass: 'success'});
            } else {
              setLoading(false);
              /* success */
              console.log('errot toast');
              f7.toast.show({text: data.message, closeButton: true, horizontalPosition: 'center', closeTimeout: 1300, cssClass: 'danger'});
            }
          })
          .catch((err) => {
            setLoading(false);
            /* success */
            console.log('server error', err);
            f7.toast.show({text: 'Some error occured', closeButton: true, horizontalPosition: 'center', closeTimeout: 1300, cssClass: 'danger'});
          });
  };

  return (
    <Popup opened={opened} onPopupClosed={close}>
    <Page>
          <Navbar>
            <NavLeft>
            <Button className="close" onClick={close}><Icon f7="xmark"></Icon></Button>
            </NavLeft>
            <NavTitle>{'Rifiuta ordine #' + data.id}</NavTitle>
          </Navbar>
          <BlockTitle>  Seleziona motivo riufiuto ordine</BlockTitle>
          <List>
          {interactions.map((interaction, i) => (
              <ListItem
              key={i}
              radio
              radioIcon="end"
              title={interaction.title}
              value={interaction.id}
              name="reject-order"
              onChange={(e) => setChecked(interaction.id)}
            ></ListItem>
            ))}
            </List>
            <Toolbar className="tab-footer" tabbar bottom inner={false}>
              <Button large fill disabled={!checked} onClick={handleReject}>Conferma</Button>
          </Toolbar>
        </Page>
  </Popup>
  );
};

export default RejectPopup;
