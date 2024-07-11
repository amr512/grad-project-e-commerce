// import { useColorMode } from "@chakra-ui/react";
import "./styles/navbarImpostor.css";

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../images/trial1.png";
import { auth } from "../main";
import { API_URL } from "../helpers/constants";
export default function NavBarImpostor() {
  // const { colorMode, toggleColorMode } = useColorMode();
  const [_refresh, refresh] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation().pathname;
  useEffect(()=>{auth.authStateReady().then(() => {
    setUser(auth.currentUser);
  })},[])
  return (
    <div className="fake-navbar">
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
          <a
            href="/ContactUs"
            className={location == "/contact" ? "active" : ""}
          >
            <span>Contact Us</span>
          </a>
        </li>
      </ul>
      <div className="nav-icons">
        {auth.currentUser ? (
          <a href="/profile" className="nav-icon">
            <i className="fa-solid fa-user"></i>
          </a>
        ) : (
          <>
            <a href="/login" className="nav-icon">
              Login /
            </a>
            <a href="/signup" className="nav-icon">
              <span>Register</span>
            </a>
          </>
        )}
        {/* <a href="#" className="nav-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </a> */}
        <form
          action={`${API_URL}/cart-checkout`}
          method="POST"
          onSubmit={(e)=>{
            localStorage.setItem("cart", JSON.stringify([])); 
          }}
        >
          <input
            type="hidden"
            name="items"
            value={
              JSON.stringify(
              JSON.parse(localStorage.getItem("cart"))?.map((i) => ({
                price: i.default_price,
                quantity: i.amount,
              }))
            )
          }
          />
          <button
            onClick={(e) => {
              refresh(!_refresh);
              if (
                JSON.parse(localStorage.getItem("cart")) == null ||
                JSON.parse(localStorage.getItem("cart"))?.length == 0
              ) {
                e.preventDefault();
                alert("Cart is empty");
              }
            }}
            style={{
              border: "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              marginLeft: "30px",
              marginRight: "10px",
              scale: "1.5",
            }}
          >
            <i className="fa-solid fa-cart-shopping"></i> checkout
          </button>
        </form>
      </div>
    </div>
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
