import React, { Component } from "react";
import {
  Popup,
  Page,
  Navbar,
  Button,
  Link,
  List,
  ListItem,
  ListButton,
  ListInput,
  Toggle
} from 'framework7-react';
import * as Icon from "../Addons/Icons";
import { connect } from "react-redux";
import {createCustomer} from "../../redux/actions/customers";



class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            errors: {},
            success: null,
            error: null
        }
        this.onChange = this.onChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        nextProps.Success && this.setState({
            success: nextProps.Success,
            loading: false
        });
        nextProps.Error && this.setState({
            error: nextProps.Error,
            loading: false
        })
        const {text, success} = nextProps;
        this.showToast(text, success);
    }


    onChange(name, value){
        let {data} = this.state;
        data[name] = value;
        console.log('changing', data);
        this.setState({data: data, errors:{}})
    };

    handleSubmit(e) {
        e.preventDefault();
        const {data} = this.state;
        var errors = {};
        if (!data.first_name) {
          errors["first_name"] = "Email field is required!";
        }
        if (Object.keys(errors).length) {
          this.setState({ errors: errors });
          return;
        }
        const {createCustomer} = this.props;
        //TODO:: validation
        console.log('create data here', data);
        createCustomer(data)
    };

    showToast(text){
      const notification = this.$f7.toast.create({
          text: text,
          position: 'bottom',
          closeTimeout: 2000,
          //cssClass : {success ? 'toast_red' : ''}
        });
        notification.open()
    }

    render() {
    const {open, errors, data, success, error} = this.state;
    console.log('errors', errors.lenght);
      //console.log('create data here', this.state.data);
  return (
    <>
    <Popup push animate={false} wipeToClose="to-bottom" className="create-popup">
      <Page className="create-page">
        <Navbar title="Crea un nuovo cliente">
          <Link popupClose slot="left">Chiudi</Link>
          <Button slot="right" onClick={this.handleSubmit} fill round>Salva</Button>
        </Navbar>
        <List noHairlinesMd>
          <ListInput
            label="Nome"
            type="text"
            name="first_name"
            placeholder="Nome"
            onChange={e => this.onChange("first_name", e.target.value)}
            clearButton
            required
            validate
            errorMessage={this.state.errors["first_name"]}
          />

          <ListInput
            label="Cognome"
            type="text"
            placeholder="Cognome"
            onChange={e => this.onChange("last_name", e.target.value)}
            clearButton
            required
            validate
          />

          <ListInput
            label="E-mail"
            type="email"
            placeholder="E-mail"
            onChange={e => this.onChange("email", e.target.value)}
            clearButton
            required
            validate
          />

          <ListInput
            label="Telefono"
            type="tel"
            placeholder="Telefono"
            onChange={e => this.onChange("phone_number", e.target.value)}
            clearButton
            required
            validate
          />
          <ListItem>
            <span>Attivo?</span>
            <Toggle onChange={e => this.onChange("active", e.target.checked)}/>
          </ListItem>
          </List>
          <List>
          <ListInput
            label="Note corriere"
            type="textarea"
            placeholder="Note corriere"
            onChange={e => this.onChange("notes", e.target.value)}
            clearButton
          />
        </List>
      </Page>
    </Popup>
    </>
  );
}
}

const mapStateToProps = state => ({
    Success: state.customerData.create_success,
    Error: state.customerData.create_error,
});

const mapDispatchToProps = {
    createCustomer
};

export default connect(
mapStateToProps,
mapDispatchToProps
)(Create);
