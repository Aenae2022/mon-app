import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import PageGen from "./core/page/PageGen.tsx";
import App from "./dictation/page/App.tsx";
import Home from "./dictation/page/Home.tsx";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Root element not found in the DOM");
}
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
          <Route path=":listIndex/:wordIndex/:exercise" element={<Home />} />

          </Route>
        </Route>
    </Routes>
  </BrowserRouter>
  </StrictMode>
);

