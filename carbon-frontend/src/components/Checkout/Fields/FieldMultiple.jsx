import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  Stepper
} from "framework7-react";

const FieldMultiple = ({ modifier, value, currency_code, onChange }) => {
  const [disabled, setDisabled] = useState(false);
  
  useEffect(() => {
    const total = Object.values(value).reduce((acc, i) => acc + i.qty, 0);
    if (total + 1 > +modifier.max_qty) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [modifier.max_qty, value]);

  const handleChange = (qty, id, price, name) => {
    const total = Object.values(value).reduce((acc, i) => (i.id !== id ? acc + i.qty : acc), 0);
    if (total + qty > +modifier.max_qty) return;
    onChange(modifier.id, { ...value, [id]: { id, price, qty, name, checked: !!qty } });

  };

  
  return (
    <List mediaList>
     {modifier.variants.map(({ name, price, id }) => {
        const hasValue = value[id]?.qty;
        return (
        <ListItem
          key={id}
          key={id}
          title={name}
          value={id}
          after={'+ '+price+' '+currency_code}
        >
          <div slot="media">
          <Stepper
              small
              input={false}
              max={modifier.max_qty}
             className="item-qty circle"
             value={value[id]?.qty || 0}
             onStepperChange={(val) => handleChange(val, id, +price, name)}
          />
          </div>
        </ListItem>
        );
      })}
    </List>
  );
};

export default FieldMultiple;
