import { useState } from "react";
import { auth } from "../main";
import { useEffect } from "react";

export default function Profile() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    auth.authStateReady().then(() => {
      setEmail(auth.currentUser.email);
    });
  },[]);
  return (
    <div>
      <h1>Welcome: {email}</h1>
    </div>
  );
}
