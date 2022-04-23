import React, { useState } from 'react';
import {
  f7,
  Page,
  LoginScreenTitle,
  List,
  ListInput,
  ListButton,
  Block,
  Button,
  Link
} from 'framework7-react';
import { forgotPassword } from '../../actions/user';


const ForgotPassword = ({ f7router }) => {
  const [form, setFormValues] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  /* Input change parent state */
  const onChange = (e) => {
    e.preventDefault();
      setFormValues((prevState) => {
          return { ...prevState, [e.target.name]: e.target.value };
      });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    const isValid = f7.input.validateInputs('#forgotForm');
    if (isValid === true ){
    setLoading(true);
    forgotPassword({...form})
      .then((data) => {
        f7.toast.show({text: data.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'success'});
      })
      .catch((err) => {
        if (err?.message) {
          f7.toast.show({text: err.message, horizontalPosition: 'center', closeTimeout: 2500, cssClass: 'danger'});
        }
      }).finally(() => {
        setLoading(false);
      });
    }else{
      alert('invalid');
    }
  };

  return (
    <Page noToolbar noNavbar noSwipeback loginScreen>
  <LoginScreenTitle>Ripristina password</LoginScreenTitle>
  <List form id="forgotForm">
    <ListInput
      label="Email"
      type="email"
      name="email"
      placeholder="Email"
      value={form?.email || ''}
      onInput={onChange}
    />
  </List>
  <Block className="margin-bottom-half">
  <Button fill large onClick={handleForgot} preloader loading={loading} className={loading && 'disabled'}>Recupera password</Button>
  </Block>
  <Block className="text-align-center">
        <Link href="/login">Torna al login</Link>
      </Block>
    </Page>
  );
}

export default ForgotPassword;
