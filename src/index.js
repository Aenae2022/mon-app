import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/Dictation/App";
import Survey from "./pages/Survey/Survey";  

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Survey />} />
    <Route path="/dictation" element={<App />} >
      <Route path=":exercise" element={<App />} />
      </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);

