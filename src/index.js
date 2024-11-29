import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./styles.css";

import Home from "./pages/Home";
import Survey from './pages/Survey/Survey.js';
import Header from './components/Header';
import Error from './components/Error';

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/survey/:questionNumber" element={<Survey />} />
          <Route path="*" element={<Error />} />
        </Routes>
    </Router>
  </StrictMode>
);