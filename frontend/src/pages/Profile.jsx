import { useState } from "react";
import { auth } from "../main";
import { useEffect } from "react";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
export default function Profile() {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [imgLink, setImgLink] = useState("");
  const [enabled, setEnabled] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    auth.authStateReady().then(() => {
      if (!auth.currentUser) {
        navigate("/login");
      }
      setEmail(auth.currentUser.email);
      setDisplayName(auth.currentUser.displayName);
      setPhotoURL(auth.currentUser.photoURL);
      setImgLink(auth.currentUser.photoURL);
    });
  }, []);
  const profileUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: displayName,
      photoURL: photoURL,
    }).then(() => {
      alert("Profile Updated Successfully");
      window.location.reload();
    });
  };
  const signOut = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const deleteAccount = () => {
    auth.currentUser.delete().then(() => {
      navigate("/home");
    });
  };

  return (
    <><Helmet>
      <title>ADAS - {displayName || "Profile"}</title>
      <meta name="description" content="Home Page" />
    </Helmet><div
      style={{
        textAlign: "center",
        gap: "10px",
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        alignItems: "center",
      }}
    >
        <h1>
          Welcome: {displayName}! <br />
          {email}
        </h1>
        {imgLink && (
          <img
            src={imgLink}
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50px",
              overflow: "hidden",
            }}
            alt="profile picture" />
        )}

        <label>Display Name:</label>

        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)} />

        <label>Photo URL:</label>

        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)} />

        <button onClick={profileUpdate}>Update Profile</button>
        <button onClick={signOut}>Sign Out</button>
        <div>
          <input
            type="checkbox"
            value={enabled}
            style={{ margin: "10px" }}
            onChange={() => {
              setEnabled(!enabled);
              alert(
                "THIS ACTION IS IRREVERSIBLE! ONLY DELETE YOUR ACCOUNT IF YOU KNOW YOU WILL NEVER NEED IT AGAIN!"
              );
            } } />
          <button
            disabled={!enabled}
            style={enabled ? { color: "black" } : { cursor: "not-allowed" }}
            onClick={deleteAccount}
          >
            Delete Account
          </button>
        </div>
      </div></>
  );
}
