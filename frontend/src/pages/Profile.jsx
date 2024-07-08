import { useState } from "react";
import { auth } from "../main";
import { useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { Navigate } from "react-router-dom";
export default function Profile() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState();
  const [imgLink, setImgLink] = useState();
  useEffect(() => {
    auth.authStateReady().then(() => {
      setEmail(auth.currentUser.email);
      setDisplayName(auth.currentUser.displayName);
      setPhotoURL(auth.currentUser.photoURL);
      setImgLink(auth.currentUser.photoURL);
    });
  },[]);
  const profileUpdate = () =>{
    updateProfile(auth.currentUser,{
      displayName:displayName,
      photoURL:photoURL
    }).then(()=>{
      alert("Profile Updated Successfully");
      window.location.reload()
    })

  }
  return (
    <div>
      <h1>Welcome: {displayName}! <br/>
      {email}</h1>
      {imgLink && <img src={imgLink} style={{width:"100px", height:"100px", borderRadius:"50px", overflow:"hidden"}} alt="profile picture" />}
      <br/>
      <label>
        Display Name:
      </label>
      <br/>
      <input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
      />
      <br/>
      <label>
        Photo URL:
      </label>
      <br/>
      <input
        type="text"
        value={photoURL}
        onChange={(e) => setPhotoURL(e.target.value)}
      />
      <br/>
      <button onClick={profileUpdate}>Update Profile</button>
    </div>
  );
}
