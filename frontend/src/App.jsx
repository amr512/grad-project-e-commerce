import React, { useEffect } from "react";
import { Route, Routes, useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Home from "./pages/Home";
import ProductsPage from "./pages/ProductsPage";
import "./App.css";
import NavBar from "./components/NavBar";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import { auth } from "./main";
import { sendEmailVerification } from "firebase/auth";
import ContactUs from "./pages/Contact";
import About from "./pages/About";
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
        path: "/about",
        element: animate(About),
      },
      {
        path: "*",
        element: animate(Home),
      },
    ],
    Location
  );

  if (window.innerHeight > window.innerWidth) {
    return <div>mobile not supported</div>;
  } else {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <NavBar />
        {Location.pathname == "/products" ? (
          <div style={{ minHeight: "240px" }} />
        ) : (
          ""
        )}
        <AnimatePresence>
          {routes}
          {/* </Routes> */}
          {Location.pathname != "/products" ? animate(Footer) : ""}
        </AnimatePresence>
      </div>
    );
  }
};

export default App;
