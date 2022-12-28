import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {store} from "./store";
import {Provider} from "react-redux";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {GOOGLE_OAUTH_CLIENT_ID} from "./http";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Provider store={store}>
          <GoogleOAuthProvider
              clientId={GOOGLE_OAUTH_CLIENT_ID}

          >
              <App />
          </GoogleOAuthProvider>
      </Provider>
  </BrowserRouter>
);

