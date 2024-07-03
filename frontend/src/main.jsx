import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  ChakraProvider,
  ColorModeScript,
  extendTheme,
} from "@chakra-ui/react";

import { BrowserRouter as Router } from "react-router-dom";




const theme = extendTheme({
  config: {
    initialColorMode: "dark",

    // useSystemColorMode: true,
  },

});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
