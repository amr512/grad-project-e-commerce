// import { Box, Image, Link, Text } from "@chakra-ui/react";
import logo from "../images/trial1.png";
import "./styles/footer.css";
export default function Footer() {
  return (
    <footer className="footer">
        <div className="footer-logo">
            <img src={logo} alt="ADAS Logo"/>
            <span>ADAS</span>
        </div>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                
                <li><a href="/ContactUs">Contact</a></li>
                <li><a href="/products">Purchase</a></li>
                <li><a href="/">Download Application</a></li>
            </ul>
        </nav>
        <div className="social-links">
            <a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-github"></i></a>
            <a href="#" target="_blank"><i className="fa-brands fa-linkedin"></i></a>
        </div>
        <p>&copy; 2024. All Rights Reserved.</p>
    </footer>
  );
}
