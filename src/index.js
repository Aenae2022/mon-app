import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/Dictation/App";
import Survey from "./pages/Survey/Survey";  
import Home from "./pages/Dictation/Home";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<Survey />} />
    <Route path="dictation">
          <Route path="word">
            <Route path=":listIndex/:wordIndex/:exercise" element={<App />} />
          </Route>
          <Route path="list">
            <Route path=":listWordsIndex" element={<Home />} />
          </Route>
        </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);

