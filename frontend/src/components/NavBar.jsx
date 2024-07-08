// import { useColorMode } from "@chakra-ui/react";
import "./styles/navbar.css";

import { useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../images/trial1.png";
import { auth } from "../main";
export default function NavBar() {
  // const { colorMode, toggleColorMode } = useColorMode();
  const [tabIndex, setTabIndex] = useState();
  const [user, setUser] = useState(null);
  const location = useLocation().pathname;
  auth.authStateReady().then(() => {
    setUser(auth.currentUser);
  });
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
        <span>ADAS</span>
      </div>

      <ul className="nav-links">
        <li>
          <a href="/" className={location == "/" ? "active" : ""}>
            Home
          </a>
        </li>
        <li>
          <a
            href="/products"
            className={location == "/products" ? "active" : ""}
          >
            Products
          </a>
        </li>
        <li>
          <a href="/about" className={location == "/about" ? "active" : ""}>
            About
          </a>
        </li>
        <li>
          <a href="/contact" className={location == "/contact" ? "active" : ""}>
            <span>Contact Us</span>
          </a>
        </li>
      </ul>
      <div className="nav-icons">
        {user ? (
          <a href="/profile" className="nav-icon">
            <i className="fa-solid fa-user"></i>
          </a>
        ) : (
          <>
          <a href="/login" className="nav-icon">
            Login /
          </a>
            <a href="/register" className="nav-icon">
              <span>Register</span>
            </a>
          </>
        )}

        <a href="#" className="nav-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </a>
        <a href="#" className="nav-icon">
          <i className="fa-solid fa-cart-shopping"></i>
        </a>
      </div>
    </header>
    // <Box className="navbar">
    //   {/* brand name to the left */}
    //   <Box className="logo">
    //     <Image src={logo} maxH={"50px"}/>
    //     <Heading textAlign="start">ADAS</Heading>
    //   </Box>
    //   {/* navbar and color mode button to the right */}
    //   <Stack direction={"row"}>
    //     <IconButton
    //       borderRadius={"full"}
    //       aria-label="Toggle Color Mode"
    //       onMouseUp={(e) => {
    //         e.preventDefault();
    //         toggleColorMode();
    //       }}
    //       icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    //     />
    //     <Tabs index={tabIndex} textAlign="end" variant={"soft-rounded"}>
    //       <TabList gap={"0.5vw"}>
    //         <Link to="/">
    //           <Tab id="/">Home</Tab>
    //         </Link>
    //         <Link to="/products">
    //           <Tab id="/products">Products</Tab>
    //         </Link>
    //         <Link to="/login">
    //           <Tab id="/login">Log In/Sign up</Tab>
    //         </Link>
    //         {/* <Tab></Tab> */}
    //       </TabList>
    //     </Tabs>
    //   </Stack>
    // </Box>
  );
}
