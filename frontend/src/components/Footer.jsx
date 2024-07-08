// import { Box, Image, Link, Text } from "@chakra-ui/react";
import logo from "../images/trial1.png";
import "./styles/footer.css";
export default function Footer() {
  return (
    <footer>
        <div className="footer-logo">
            <img src={logo} alt="ADAS Logo"/>
            <span>ADAS</span>
        </div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                
                <li><a href="#">Contact</a></li>
                <li><a href="#">Purchase</a></li>
            </ul>
        </nav>
        <div className="social-links">
            <a href="#">🐦</a>
            <a href="#">📍</a>
            <a href="#">🔵</a>
            <a href="#">🅾️</a>
            <a href="#">📸</a>
        </div>
        <p>&copy; 2024. All Rights Reserved.</p>
    </footer>
  );
}
