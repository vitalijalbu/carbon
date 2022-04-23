import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Navbar,
  Subnavbar,
  Searchbar,
  Popup,
  NavLeft,
  NavTitle,
  Icon,
  Chip,
  List,
  ListItem,
  Toolbar,
  Button,
  NavRight,
} from "framework7-react";
import { getAllCustomers } from "../../actions/customers";
import CustomerPopup from "./CustomerPopup";

const SelectPopup = ({ opened, close, setCustomer, onSubmit }) => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState({});
  const [createPopup, setCreateCustomer] = useState(false);

  /* Query get */
  const getCustomers = useCallback(() => {
    getAllCustomers()
      .then(({ data }) => {
        setCustomers(data?.data || []);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    getCustomers();
  }, [getCustomers]);

  const handleSubmit = () => {
    //setCustomer(selected);
    onSubmit(selected);
    close();
  };

  /* Toggle Address Modal */
  const openCreatePopup = () => {
    setCreateCustomer(true);
  };
  const closeCreatePopup = () => {
    setCreateCustomer(false);
  };

  return (
    <Popup opened={opened} onPopupClosed={close}>
      <Page>
        <Navbar>
          <NavLeft>
            <Button className="close" onClick={close}>
              <Icon f7="xmark"></Icon>
            </Button>
          </NavLeft>
          <NavTitle>Seleziona cliente</NavTitle>
          <NavRight>
            <Button type="button" onClick={handleSubmit} disabled={!selected}>
              Fatto
            </Button>
          </NavRight>
        </Navbar>
        <Subnavbar inner={false}>
          <Searchbar
            searchContainer=".search-list"
            searchIn=".item-title"
            disableButtonText="Annulla"
            placeholder="Cerca"
            clearButton={true}
          ></Searchbar>
        </Subnavbar>
        <List mediaList>
          {customers.map((data, i) => (
            <ListItem
              radio
              onChange={(e) => setSelected(data)}
              value={data.id}
              key={data.id}
              name="select-customer"
              mediaItem={true}
              media={data.image_url}
              title={data.full_name}
              subtitle={data.phone_number}
              text={data.total_orders}
            />
          ))}
        </List>
        <Toolbar className="tab-footer" tabbar bottom inner={false}>
          <Button large fill onClick={openCreatePopup}>
            Crea nuovo cliente
          </Button>
        </Toolbar>
        <CustomerPopup opened={createPopup} close={closeCreatePopup} />
      </Page>
    </Popup>
  );
};

export default SelectPopup;