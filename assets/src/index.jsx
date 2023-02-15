import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import App from "./app";
import "./app.css";

//styling

const root = ReactDOMClient.createRoot(document.getElementById("root"));

root.render(
    <App />
)