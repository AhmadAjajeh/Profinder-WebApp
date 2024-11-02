import { useEffect } from "react";

import { RouterProvider, useLocation } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider as ReduxProvider } from "react-redux";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

import { queryClient } from "./http/auth";
import router from "./setup/router";
import store from "./store";
import "./App.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    fallbackLng: "en",
    detection: {
      order: ["querystring", "localStorage"],
      caches: ["localStorage"],
    },
    loadPath: "/locales/{{lng}}/{{ns}}.json",
  });

function App() {
  useEffect(() => {
    window.document.dir = i18n.dir();
  }, []);

  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ReduxProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
