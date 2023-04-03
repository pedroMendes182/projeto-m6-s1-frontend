import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ContactProvider from "./contexts/contact.context";
import UserProvider from "./contexts/user.context";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ContactProvider>
          <App />
        </ContactProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
