import React, { useState, useEffect, useCallback } from "react";
import {
  Page,
  Navbar,
  Subnavbar,
  Searchbar,
  Popup,
  Tabs,
  Tab,
  NavLeft,
  NavTitle,
  Icon,
  Chip,
  List,
  ListItem,
  Toolbar,
  Button,
  NavRight,
  f7,
  Block
} from "framework7-react";
import { getAllCustomers } from "../../actions/customers";
import CustomerPopup from "./CustomerPopup";

const SelectPopup = ({
  opened,
  close,
  setCustomer,
  onSubmit,
  cartType,
  refTab,
}) => {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState({});
  const [createPopup, setCreateCustomer] = useState(false);
  const [activeTab, setActiveTab] = useState(refTab);

  console.log('->open-the-tab', refTab);

     const handleAddress = () => {
          f7.tab.show(".selectAddress");
    };     
    const handleCustomer = () => {
          f7.tab.show(".selectCustomer");
    };

  return (
    <Popup opened={opened} onPopupClosed={close}>
      
      
     
      <Tabs>
          <Tab
            id="select-customer"
            className="selectCustomer"
            tabActive={activeTab}
          >
            <Page>
             <Navbar>
              <NavLeft>
                <Button className="close" onClick={close}>
                  <Icon f7="xmark"></Icon>
                </Button>
              </NavLeft>
              <NavTitle>Seleziona cliente</NavTitle>
            </Navbar>
          <Block strong>
Where does it come from?
Contrary to popular here does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunkhere does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</Block>
            <Toolbar className="tab-footer" tabbar bottom inner={false}>
          <Button large fill onClick={handleAddress}>
            indirizzo
          </Button>
        </Toolbar>
        </Page>
          </Tab>
          {/* Tab order confirmed */}
          <Tab className="selectAddress">
            <Page>
            <Navbar>
              <NavLeft>
                <Button className="close" onClick={close}>
                  <Icon f7="xmark"></Icon>
                </Button>
              </NavLeft>
              <NavTitle>Seleziona indirizzo</NavTitle>
            </Navbar>
        indirizzi qui

        <Toolbar className="tab-footer" tabbar bottom inner={false}>
        <Button large fill onClick={handleCustomer}>
            indietro
          </Button>
        </Toolbar>
        </Page>
        </Tab>
        </Tabs>
      
    </Popup>
  );
};

export default SelectPopup;
