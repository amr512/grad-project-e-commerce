import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import "./App.css"; // Import your CSS animations
import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import {
  ColorModeProvider,
  chakra,
  localStorageManager,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";

const App = () => {
  const Location = useLocation();
  ColorModeProvider({
    colorModeManager: localStorageManager,
    options: { initialColorMode: "system" },
  });

  const animate = (Component) => {
    return function anim() {
      return (
        <motion.div
          key={Location.key}
          initial={{ translateX: 100, opacity: 0.5 }}
          animate={{
            translateX: 0,
            translateY: 0,
            opacity: 1,
          }}
          transition={{
            type: "tween",
          }}
          // exit={{ translateX: -100, opacity: 0}}
        >
          <Component />
        </motion.div>
      );
    };
  };

  return (
    <div className="app">
      <NavBar />
      <AnimatePresence >
        <Routes location={Location} key={Location.pathname}>
          <Route exact path="/" Component={animate(Home)} />
          <Route path="/products" Component={animate(ProductsPage)} />
          {/* <Route path="/contact" component={Contact} /> */}
          {/* <redirect to="/" /> */}
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
