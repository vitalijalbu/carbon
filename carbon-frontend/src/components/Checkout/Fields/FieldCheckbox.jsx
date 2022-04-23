import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
} from "framework7-react";

const FieldCheckbox = ({ modifier, value, currency_code, onChange }) => {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const total = Object.values(value).reduce(
      (acc, i) => (i.checked ? acc + 1 : acc),
      0
    );
    if (total + 1 > +modifier.max_qty) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [modifier.max_qty, value]);

  const handleChange = (checked, id, price, name) => {
    onChange(modifier.id, {
      ...value,
      [id]: { id, price, checked, name, qty: 1 },
    });
  };

  //console.log('field-checkbox', modifier);
  //console.log('field-max-setDisabled', disabled);

  return (
    <List>
    {modifier.variants.map(({ name, price, id }) => {
        const isChecked = !!value[id]?.checked;
        return (
      <ListItem
        key={id}
        checkbox
        title={name}
        value={id}
        name={modifier.id}
        onChange={({ target: { checked } }) =>
            handleChange(checked, id, +price, name)
          }
        checked={!!value[id]?.checked}
        className={!isChecked && disabled ? "disabled" : ""}
        after={'+ '+price+' '+currency_code}
      ></ListItem>
      );
    })}
  </List>
  );
};

export default FieldCheckbox;
