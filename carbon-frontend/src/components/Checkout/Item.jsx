import React, { useState } from "react";
import {
  Col,
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "framework7-react";
import ItemPopup from "./ItemPopup";

const Item = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  /* Toggle Create Popup */
  const openPopup = () => {
    setPopup(true);
  }
  const closePopup = () => {
    setPopup(false);
  }


    /* Toggle edit area */
    const handleSubmit = (data) => {
      const datas = {
        'id': data.id,
        'unit_price': data.unit_price,
        'active': !data.active
      }
      console.log('new-data', datas);
      /*updateDeliveryArea(datas)
        .then(({ data }) => {
          f7.toast.show({text: data.message, closeButton: true, horizontalPosition: 'center', closeTimeout: 1200, cssClass: 'success'});
        })
        .catch((err) => {
          f7.toast.show({text: data.message, closeButton: true, horizontalPosition: 'center', closeTimeout: 1200, cssClass: 'danger'});
        });*/
    };

  return (
    <>
     <ItemPopup
          opened={popup} 
          close={closePopup}
          data={data}
        />
    <Col large="33" large="25" width="50" medium="50" onClick={openPopup} className="item-card mb-3">
      <Card noShadow className="item-card_header no-margin">
        <CardHeader valign="bottom">
          <img src={data.image_url} className="card-img" alt={data.title} />
        </CardHeader>
        <CardContent>
          <h2 className="item-card_title m-0">{data.name}</h2>
          {data.active === false ? <p>Non disponibile</p> : null}
        </CardContent>
        <CardFooter>
          <h3 onClick={openPopup} className="text-price">
            {data.currency_code + " " + data.unit_price}
          </h3>
        </CardFooter>
      </Card>
    </Col>
    </>
  );
};

export default Item;
