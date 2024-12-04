import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./pages/Dictation/App";
import PageGen from "./pages/PageGen";  
import Home from "./pages/Dictation/Home";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
  <BrowserRouter>
    <Routes>
    <Route path="/" element={<PageGen/>} />
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

