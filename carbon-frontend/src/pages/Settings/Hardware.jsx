import React, { useState, useEffect } from 'react';
import { Page, Navbar, Button, Link, Block, BlockTitle, NavLeft, List, ListItem, Toggle, NavRight, NavTitle } from 'framework7-react';
//import { Filesystem, Encoding, Directory } from '@capacitor/filesystem';
import { BluetoothResult, CIDPrint, CIDPrinterListenerTypes, EventType, PrinterLibraryActionType } from '@captureid/capacitor3-cidprint';
import receipt from './receipt';
import kitchen from './kitchen';





const Hardware = () => {
  const [enable, enableBluetooth] = useState(false);
  const [loading, setLoading] = useState(false);
  //const [enabled, enableBluetooth2] = useState(false);
  const [devices, setDevices] = useState([]);
  const [device, setDevice] = useState();
  const [devmac, scanDevmac] = useState();

  

  /* Globally to call, each time to init app */
  const init = async () => {
    CIDPrint.addListener(CIDPrinterListenerTypes.PRINTER_LIBRARY, (data) => {
      switch(data.type) {
        case EventType.SUCCESS:
          handleSuccess(data);
          break;
        case EventType.FAILED:
          handleFailed(data);
          break;
        case EventType.NOTIFY:
          handleNotify(data);
          break;
      }
    });
    await CIDPrint.initCIDPrinterLib();
  }

  const handleSuccess = (data) => {
    console.log("success = " + JSON.stringify(data));
    switch(data.action) {
      case PrinterLibraryActionType.PRINT:

      break;
    }
  }

  const handleFailed = (data) => {
    console.log("failed = " + JSON.stringify(data));
    switch(data.action) {
      
    }
  }

  const handleNotify = (data) => {
    console.log("notify = " + JSON.stringify(data));
    switch(data.action) {
      case PrinterLibraryActionType.DISCOVER_DETECT:
        /* Push devices array to the state */
        const res = data?.data.discovereddevice;
        setDevices((devices) => [
          ...devices,
          res
        ]); 
        setLoading(false); 
        break;
    }
  }

  const enablebt = () => {
    CIDPrint.enableBluetoothPrinting({ enable: true});
  }

  const discover = () => {
    setLoading(true);
    CIDPrint.discoverDevices();
  }

  const connectToPrinter = (address) => {
    console.log("app connect to printer->", address);
    CIDPrint.connectToPreferredPrinter({mac: address});
  }

  const printPos = () => {
    /* Print Customer Receipt */
    CIDPrint.printReceiptWithObject({ label: 'receipt.bin', data: receipt});
  
    /* Print Kitchen Receipt */
    //CIDPrint.printReceiptWithObject({ label: 'kitchen.bin', data: kitchen});
  }


  return (
    <Page>
      <Navbar>
      <NavLeft>
        <Link icon="icon-back" href="/settings"></Link>
      </NavLeft>
      <NavTitle>Hardware</NavTitle>
      <NavRight>
        <Link href="/settings">Aiuto?</Link>
      </NavRight>
      </Navbar>
      {/* */}
      <List simpleList>
      <ListItem>
        <span>Bluetooth</span>
        <Toggle checked={enable} color="green"></Toggle>
      </ListItem>
      </List>
      <BlockTitle>Devices</BlockTitle>
      <List mediaList>
      {devices.map((data, i) => (
            <ListItem key={i} link="#" subtitle={data.address} title={data.name} after="Connected" onClick={() => connectToPrinter(data.address)}></ListItem>
        ))}
      </List>

      <BlockTitle>Other Devices</BlockTitle>
      <Block strong>
      <Button large outline preloader loading={loading} onClick={discover}>Discover devices</Button>
      </Block>
      <BlockTitle>Print</BlockTitle>
      <Block strong>
      <Button className="margin-bottom" large fill onClick={init}>Init</Button>
      <Button className="margin-bottom" large outline onClick={enablebt}>Enable BT</Button>
      <Button className="margin-bottom" large outline onClick={printPos}>Print test</Button>
      </Block>
    </Page>
  );
}

export default Hardware;
