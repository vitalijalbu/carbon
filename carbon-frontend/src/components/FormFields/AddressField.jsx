import React, { useRef, useState, useCallback } from "react";
import { List, ListInput, f7 } from "framework7-react";
import { autocompleteLocation } from "../../actions/utils";

const AddressField = ({ label, name, placeholder, required, readOnly }) => {
  const [query, setQuery] = useState();

  const autocompleteDropdownAjax = useRef(null);



  // Dropdown with ajax data
  autocompleteDropdownAjax.current = f7.autocomplete.create({
    inputEl: '#autocomplete-dropdown',
    openIn: 'dropdown',
    expandInput: true, // expand input
    preloader: true, // enable preloader
    valueProperty: 'name', // object's "value" property name
    textProperty: 'name', // object's "text" property name
    dropdownPlaceholderText: 'Inserisci indirizzo completo',
    source(query, render) {
        const autocomplete = this;
        const results = [];
        if (query.length === 0) {
          render(results);
          return;
        }
       // Show Preloader
       autocomplete.preloaderShow();

        // Do Ajax request to Autocomplete data
        f7.request({
          url: 'https://jsonplaceholder.typicode.com/users',
          method: 'GET',
          dataType: 'json',
          // send "query" to server. Useful in case you generate response dynamically
          data: {
            query,
          },
          success(data) {
            // Find matched items
            for (let i = 0; i < data.length; i += 1) {
              if (data[i].name.toLowerCase().indexOf(query.toLowerCase()) === 0)
                results.push(data[i]);
            }
            // Hide Preoloader
            autocomplete.preloaderHide();
            // Render items by passing array with result items
            render(results);
          },
        });

    }
  });

 console.log('typing-query', query);


  return (
    <List form noHairlinesMd>
      <ListInput
        label={label}
        name={name}
        placeholder={placeholder}
        clearButton
        required={required}
        validate
        value={query}
        autoComplete={false}
        onChange={(e) => setQuery(e.target.value)}
        type="text"
        name="query"
        clearButton
        inputId="autocomplete-dropdown"
      />
    </List>
  );
};

export default AddressField;
