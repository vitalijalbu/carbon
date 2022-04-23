import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListButton,
  SwipeoutActions,
  SwipeoutButton,
  Block,
  f7,
} from "framework7-react";
import AddressPopup from "./AddressPopup";
import {
  getCustomerAddresses,
  deleteCustomerAddress,
  addCustomerAddress,
} from "../../actions/customers";

const AddressList = ({ customerId }) => {
  const [loading, setLoading] = useState(true);
  const [addressPopup, setAddressPopup] = useState(false);
  const [addresses, setAddresses] = useState([]);

  /* Toggle Create Address */
  const openPopup = () => {
    setAddressPopup(true);
  };
  const closePopup = () => {
    setAddressPopup(false);
  };

  useEffect(() => {
    getCustomerAddresses(customerId).then(({ data }) => {
      setAddresses(data || []);
    });
  }, [customerId]);

  const handleSubmit = (ev) => {
    const values = f7.form.convertToData("#address-form");
    //console.log("✅ address-form", values);
    addCustomerAddress({ ...values, customer_id: customerId })
      .then(({ data }) => {
        closePopup();
        setLoading(false);
        setAddresses((prev) => [data, ...prev]);
        f7.toast.show({
          text: data.message,
          horizontalPosition: "center",
          closeTimeout: 2000,
          cssClass: "success",
        });
      })
      .catch((err) => {
        if (err?.message) {
          f7.toast.show({
            text: err.message,
            horizontalPosition: "center",
            closeTimeout: 2000,
            cssClass: "danger",
          });
        }
      });
  };

  const handleDelete = (id) => {
    f7.actions
      .create({
        buttons: [
          [
            {
              text: "Sei sicuro di voler eliminare il deposito?",
              label: true,
            },
            {
              text: "Elimina",
              color: "red",
              onClick: function () {
                deleteCustomerAddress({
                  customer_id: customerId,
                  address_id: id,
                })
                  .then(({ data }) => {
                    setAddresses((prev) => prev.filter((i) => i.id !== id));
                    f7.toast.show({
                      text: data.message,
                      horizontalPosition: "center",
                      closeTimeout: 2000,
                      cssClass: "success",
                    });
                  })
                  .catch((err) => {
                    if (err?.message) {
                      f7.toast.show({
                        text: err.message,
                        horizontalPosition: "center",
                        closeTimeout: 2000,
                        cssClass: "danger",
                      });
                    }
                  });
              },
            },
          ],
          [
            {
              text: "Annulla",
              bold: true,
            },
          ],
        ],
      })
      .open();
  };

  return (
    <>
      <AddressPopup
        opened={addressPopup}
        close={closePopup}
        isLoading={loading}
        onSubmit={handleSubmit}
      />
      {addresses.length ? (
        <List mediaList>
          {addresses.map((data, i) => (
            <ListItem
              key={i}
              swipeout
              title={data.formatted_address}
              subtitle={data.phone_number}
              text={data.name}
            >
              <SwipeoutActions right>
                <SwipeoutButton
                  color="red"
                  onClick={() => handleDelete(data.id)}
                >
                  Elimina
                </SwipeoutButton>
              </SwipeoutActions>
            </ListItem>
          ))}
        </List>
      ) : (
        <Block strong>Il cliente non ha indirizzi</Block>
      )}
      <List>
        <ListButton title="Crea un nuovo indirizzo" onClick={openPopup} />
      </List>
    </>
  );
};

export default AddressList;
