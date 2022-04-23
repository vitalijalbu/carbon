import React, { useState } from "react";
import { Block, BlockTitle, Preloader, Row, Col } from "framework7-react";
import Item from "./Item";

const SectionItems = ({ data }) => {
  if (!data) return (<div className="empty-state">Non ci sono dati da mostrare</div>);;

  return (
    <Block id={`section-${data.id}`}>
      <BlockTitle medium>{data.name}</BlockTitle>
      {Array.isArray(data.items) ? (
        <Row>
          {data.items.map((item) => (
              <Item data={item} key={item.id}/>
          ))}
        </Row>
      ) : (
        <Block className="empty state">Nessun prodotto</Block>
      )}
    </Block>
  );
};

export default SectionItems;
