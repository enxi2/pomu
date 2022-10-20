import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, Routes } from "react-router-dom";

import Editor from "./Editor";
import Viewer from "./Viewer";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/edit" element={<Editor />} />
        <Route path="/view/*" element={<Viewer />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
