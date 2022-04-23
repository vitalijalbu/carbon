import { useState } from 'react'
import { GlobalTheme, FormGroup, Stack, TextInput, RadioButtonGroup, RadioButton, Button, Accordion, AccordionItem } from '@carbon/react';
import './index.scss';
import { Routes, Route, Link } from "react-router-dom";
import TopHeader from "./components/Includes/TopHeader";
import Footer from "./components/Includes/Footer";

/* pages */
import Home from "./pages/Home";
import Signin from "./pages/Auth/Signin";

function App() {

  return (
    <div>
    <GlobalTheme theme="white">
      <TopHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
      <Footer/>
      </GlobalTheme>
      </div>
  )
}

export default App;
