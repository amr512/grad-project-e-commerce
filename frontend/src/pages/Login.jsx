import { useState } from "react";
import { auth } from "../main";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { Form, Navigate, useNavigate } from "react-router-dom";
import { Button, Card, CardBody, CardFooter, Checkbox, Input, Stack } from "@chakra-ui/react";
export default function Login() {
    const [hidden, setHidden] = useState(true)
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
      alert(error.message);
    }
  };
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const creds = GoogleAuthProvider.credentialFromResult(res);
      const token = creds.accessToken;
      const user = res.user;
      navigate("/user")
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Card padding={"2vw"}margin={"4vw"} >
        <form>
          <CardBody >
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type={hidden ? "password" : "text"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Checkbox defaultChecked checked={hidden} onChange={(e) => setHidden(e.target.checked)}> Hide password</Checkbox>
          </CardBody>
          <CardFooter gap={"2vw"} justifyContent={"center"}  >
            <Stack direction={"column"}>
            <Stack direction={"row"} justifyContent={"space-between"}>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleSignup}>Signup</Button>
            </Stack>
            <Button  variant={"outline"} onClick={handleGoogle}>Sign in with Google</Button>
            </Stack>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
