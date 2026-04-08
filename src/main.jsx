import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_ElB5xN1wh",
  client_id: "4ba0ces3ltr96is47aq2do4b5r",
  redirect_uri: "https://main.dbrkvr6fnlyen.amplifyapp.com/",
  response_type: "code",
  scope: "openid email",
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>
);