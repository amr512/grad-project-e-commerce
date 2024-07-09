import React, { useEffect } from "react";
import { Route, Routes, useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";

import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { auth } from "./main";
import { sendEmailVerification } from "firebase/auth";
import ContactUs from "./pages/Contact";
const App = () => {
  const Location = useLocation();
  useEffect(() => {
    auth.authStateReady().then(() => {
      if (auth.currentUser && !auth.currentUser.emailVerified) {
        sendEmailVerification(auth.currentUser).then(() => {
          alert(
            "A verification email has been sent to your email address, please verify it."
          );
        });
      }
    });
  }, []);
  const animate = (Component) => {
    // return function anim() {
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
    // };
  };

  const routes = useRoutes(
    [
      {
        path: "/",
        element: animate(Home),
      },
      {
        path: "/products",
        element: animate(ProductsPage),
      },
      {
        path: "/login",
        element: animate(Login),
      },
      {
        path: "/signup",
        element: animate(Signup),
      },
      {
        path: "/ContactUs",
        element: animate(ContactUs),
      },
      {
        path: "/profile",
        element: animate(Profile),
      },
      {
        path: "*",
        element: animate(Home),
      },
    ],
    Location
  );

  return (
    <div style={{ gap:(Location.pathname == "/products"?"0px":"0px"), display: "flex", flexDirection: "column" }}>
      <NavBar />
      <div style={{ minHeight: "90px" }} />
      <AnimatePresence>
        {routes}
        {/* </Routes> */}
        {(Location.pathname != "/products")?animate(Footer):""}
      </AnimatePresence>
    </div>
  );
};

export default App;
