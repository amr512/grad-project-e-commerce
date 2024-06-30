import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  Button,
  ChakraProvider,
  ColorModeScript,
  ThemeProvider,
  extendTheme,
} from "@chakra-ui/react";
import {mode} from "@chakra-ui/theme-tools";
import { BrowserRouter as Router } from "react-router-dom";

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    // useSystemColorMode: true,
  },
  // styles: {
  //   global:props=>({
  //     body: {
  //       // bg: mode("red","green")(props),
  //     },
  //   }),
  // },
  // components:/*(props)=>(*/{
  //   Card:{
  //     baseStyle: props=>({
  //       borderWidth: mode("20px","1px")(props),
  //       borderColor: mode("red","green")(props),
  //       bgColor: mode("red","green")(props),
  //     }),
  //     // defaultProps:props=>({
  //     //   borderWidth: mode("20px","1px")(props),
  //     //   borderColor: mode("red","green")(props),
  //     // })
  //   }
  // }//),
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
