import { useEffect, useState } from "react";
import { API_URL } from "../helpers/constants";
import "./styles/contact.css";
import { Helmet } from "react-helmet";

export default function ContactUs() {
  //alert if the path includes ?success

  return (
    <>
      <Helmet>
        <title>ADAS - Contact Us</title>
        <meta name="description" content="Home Page" />
      </Helmet>
      <main className="main-contact">
        <div className="contact-info">
          <div className="contact-method">
            <div className="icon">
              <i className="fa-solid fa-phone" />
            </div>
            <h2>Call To Us</h2>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +8801611112222</p>
          </div>
          <div className="contact-method">
            <div className="icon">
              <i className="fa-solid fa-envelope" />
            </div>
            <h2>Write To Us</h2>
            <p>Fill out our form and we will contact you within 24 hours.</p>
            <p>Email: support@adas.amr512.com</p>
          </div>
        </div>
        <iframe name="dummy" id="dummy" style={{ display: "none" }}></iframe>
        <div className="contact-form">
          <form action={API_URL + "/contact"} target="dummy" method="POST">
            <input type="text" name="name" placeholder="Your Name *" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email *"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone *"
              required
            />
            <textarea
              style={{ color: "black" }}
              name="text"
              placeholder="Your Message"
            ></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </main>
    </>
  );
}
