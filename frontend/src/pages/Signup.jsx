import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/signup.css";
import { Helmet } from "react-helmet";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      createUserWithEmailAndPassword(auth, email, password).then(() => {
        auth.authStateReady().then(() => {
          sendEmailVerification(auth.currentUser).then(() => {
            auth.signOut().then(() => {
              alert(
                "A verification email has been sent to your email address, please verify your email then log in."
              );
              navigate("/login");
            });
          });
        });
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <><Helmet>
      <title>ADAS - Signup</title>
      <meta name="description" content="Home Page" />
    </Helmet><main>
        <div className="signup-container">
          <h1>Sign Up</h1>
          <div className="sign-up-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="xxxxx@gmail.com" />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="xxxxxxxxx" />
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="xxxxxxxxx"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} />
            <button type="submit" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </main></>
  );
}
