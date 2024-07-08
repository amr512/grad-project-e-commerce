import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/signup.css";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      await createUserWithEmailAndPassword(auth, email, password);
      
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <main>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <div id="signup-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="xxxxx@gmail.com"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="xxxxxxxxx"
          />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="xxxxxxxxx"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Sign Up</button>
        </div>
      </div>
    </main>
  );
}
