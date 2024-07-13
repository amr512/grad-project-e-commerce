import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "./styles/mobilenav.css";
import { useEffect, useState } from "react";
import { auth } from "../main";
import Button from "react-bootstrap/esm/Button";
import { API_URL } from "../helpers/constants";
import logo from "../images/trial1.png";

function MoibileNav() {
  const [_refresh, refresh] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.authStateReady().then(() => {
      setUser(auth.currentUser);
    });
  }, []);
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary mobilenav"
      sticky="top"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="ADAS Logo"
          />
          ADAS
        </Navbar.Brand>
        {/* <Button variant="outline" className="align-bottom" data-bs-theme="dark">
          <i className="fa-solid fa-cart-shopping" />
          Checkout
        </Button> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" data-bs-theme="dark" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <Nav.Link href="about">About</Nav.Link>
            <Nav.Link href="contactus">Contact Us</Nav.Link>
            {user?.emailVerified ? (
              <Nav.Link href="/profile">Profile</Nav.Link>
            ) : (
              <>
                <Nav.Link href="/login">Login</Nav.Link>{" "}
                <Nav.Link href="/signup">Register</Nav.Link>
              </>
            )}
            <form
              action={`${API_URL}/cart-checkout`}
              method="POST"
              onSubmit={(e) => {
                localStorage.setItem("cart", JSON.stringify([]));
              }}
            >
              <input
                type="hidden"
                name="items"
                value={JSON.stringify(
                  JSON.parse(localStorage.getItem("cart"))?.map((i) => ({
                    price: i.default_price,
                    quantity: i.amount,
                  }))
                )}
              />
              <button
                type="submit"
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
                className="btn btn-outline-primary"
              >
                <i className="fa-solid fa-cart-shopping"></i> checkout
              </button>
            </form>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MoibileNav;
