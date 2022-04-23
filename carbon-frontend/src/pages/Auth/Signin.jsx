import React from 'react';
import { FormGroup, Stack, TextInput, RadioButtonGroup, RadioButton, Button, Accordion, AccordionItem } from '@carbon/react';




const Auth = () => {

  return(
  <>
     <FormGroup
  legendId="formgroup-legend-id"
  legendText="FormGroup Legend"
  style={{
    maxWidth: '400px'
  }}
>
  <Stack gap={7}>
    <TextInput
      id="one"
      labelText="First Name"
    />
    <TextInput
      id="two"
      labelText="Last Name"
    />
    <RadioButtonGroup
      defaultSelected="radio-1"
      legendText="Radio button heading"
      name="radio-button-group"
    >
      <RadioButton
        id="radio-1"
        labelText="Option 1"
        value="radio-1"
      />
      <RadioButton
        id="radio-2"
        labelText="Option 2"
        value="radio-2"
      />
      <RadioButton
        id="radio-3"
        labelText="Option 3"
        value="radio-3"
      />
    </RadioButtonGroup>
    <Button>
      Submit
    </Button>
  </Stack>
</FormGroup>
  </>
)
};
export default Auth;