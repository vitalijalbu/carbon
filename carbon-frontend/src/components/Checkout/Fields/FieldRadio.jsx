import React from "react";
import {
  List,
  ListItem,
} from "framework7-react";

const FieldRadio = ({ modifier, value, currency_code, onChange }) => {
  const handleChange = (checked, id, price, name) => {
    onChange(modifier.id, {
      [id]: { id, price, checked, name, qty: 1 },
    });
  };


  return (
    <List>
      {modifier.variants.map(({ name, price, id }) => (
        <ListItem
          key={id}
          radio
          radioIcon="start"
          title={name}
          value={id}
          name={modifier.id}
          onChange={({ target: { checked } }) =>
              handleChange(checked, id, +price, name)
            }
          checked={!!value[id]?.checked}
          after={'+ '+price+' '+currency_code}
        ></ListItem>
      ))}
    </List>
  );
};

export default FieldRadio;
