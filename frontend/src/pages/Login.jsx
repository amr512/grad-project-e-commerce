import { useState } from "react";
import { auth } from "../main";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  browserLocalPersistence,
  sendEmailVerification
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./styles/login.css"
import { Helmet } from "react-helmet";

export default function Login() {
    const [hidden, setHidden] = useState(true)
  const provider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const handleLogin = async () => {
    try {
      auth.setPersistence(browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with session persistence.
        signInWithEmailAndPassword(auth, email, password).then(() => {
          auth.authStateReady().then(() => {
            
            if(auth.currentUser && !auth.currentUser.emailVerified){
              sendEmailVerification(auth.currentUser).then(() => {
                auth.signOut().then(() => {
                  alert(
                    "A verification email has been sent to your email address, please verify your email then log in."
                  );
                  navigate("/login");
                })
              }).catch((error) => {
                alert(error.message)
              })
            }else{
              navigate("/profile")
            }
          })
        }).catch((error) => {
          alert(error.message)
        })
      })

    } catch (error) {
      alert(error.message);
    }
  };


  const handleGoogle = async () => {
    try {
      auth.setPersistence(browserLocalPersistence).then(async() => {

      const res = await signInWithPopup(auth, provider);
      const creds = GoogleAuthProvider.credentialFromResult(res);
      const token = creds.accessToken;
      const user = res.user;
      navigate("/profile")
      })
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <><Helmet>
      <title>ADAS - Login</title>
      <meta name="description" content="Home Page" />
    </Helmet><main>
        <div className="login-container">
          <h1>Log In</h1>
          <p>Don&apos;t have an account? <a href="/signup">Sign Up</a></p>
          <div className="login-form">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="xxxxx@gmail.com" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="xxxxxxxxx" />
            <button type="submit" onClick={handleLogin}>Log in</button>
          </div>
          <div className="divider">or</div>
          <div className="social-login">
            <button className="google" onClick={handleGoogle}>Continue with Google</button>
          </div>
        </div>
      </main></>

    // <Box display={"flex"} dir="column" alignItems={"center"} justifyContent={"center"} >
    //   <Stack>
    //   <Heading>Login</Heading>
    //   <Card padding={"2rem"} margin={"4rem"}  >
  
    //       <CardBody >
    //         <Input
    //           type="email"
    //           placeholder="Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           />
    //         <Input
    //           type={hidden ? "password" : "text"}
    //           placeholder="Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //           />
    //         <Checkbox defaultChecked checked={hidden} onChange={(e) => setHidden(e.target.checked)}> Hide password</Checkbox>
    //       </CardBody>
    //       <CardFooter gap={"2rem"} justifyContent={"center"}  >
    //         <Stack direction={"column"}>
    //         <Stack direction={"row"} justifyContent={"space-between"}>
    //         <Button onClick={handleLogin}>Login</Button>
    //         <Button onClick={handleSignup}>Signup</Button>
    //         </Stack>
    //         <Button  variant={"outline"} onClick={handleGoogle}>Sign in with Google</Button>
    //         </Stack>
    //       </CardFooter>

    //   </Card>
    //           </Stack>
    // </Box>
  );
}
