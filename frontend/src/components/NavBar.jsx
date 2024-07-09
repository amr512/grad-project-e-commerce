// import { useColorMode } from "@chakra-ui/react";
import "./styles/navbar.css";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/trial1.png";
import { auth } from "../main";
import { API_URL } from "../helpers/constants";
export default function NavBar() {
  // const { colorMode, toggleColorMode } = useColorMode();
  const [tabIndex, setTabIndex] = useState();
  const [user, setUser] = useState(null);
  const location = useLocation().pathname;
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
    }
  }, []);
  auth.authStateReady().then(() => {
    setUser(auth.currentUser);
  });
  return (
    <header>
      <div className="logo">
        <img src="logo.jpg" alt="logo" />
        <span>ADAS</span>
      </div>

      <ul className="nav-links">
        <li>
          <a href="/" className="active">
            Home
          </a>
        </li>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">
            <span>Contact Us</span>
          </a>
        </li>
      </ul>

      <div className="nav-icons">
        <a href="/profile" className="nav-icon">
          <i className="fa-solid fa-user"></i>
        </a>
        <a href="/login" className="nav-icon">
          Login /
        </a>
        <a href="/signup" className="nav-icon">
          <span>Register</span>
        </a>
        <a href="#" className="nav-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </a>
        <form action={`${API_URL}/cart-checkout/`} method="POST">
          <input type="hidden" name="items" value={JSON.stringify(cart.map(e=>({price:e.default_price,quantity:e.amount})))} />
          <button
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i> checkout
          </button>
        </form>
      </div>

      <div className="hamburger">
        <i className="fa-solid fa-bars"></i>
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
