import React, { useState } from "react";
import $ from "jquery";
import "../App.css";
import { Alert } from "@mui/material";

const Contactform = () => {
  const [name, setName] = useState("");
  const [nickname, setNickmane] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [mailsent, setMailsent] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = $(e.target);
    $.ajax({
      type: "POST",
      url: form.attr("action"),
      data: form.serialize(),
      success(data) {
        setName(data);
        setNickmane(data);
        setEmail(data);
        setPhone(data);
        setMessage(data);
      },
    });
    fetch("http://localhost:8080/PHP/server.php").then((response) => {
      if (response.ok) {
        // Status 200
        setMailsent(true);
        setError(null);
      } else {
        // Status 400, 404, 500, etc.
        setError("Failed to send the message");
      }
    });
    setName("");
    setNickmane("");
    setEmail("");
    setPhone("");
    setMessage("");

    setTimeout(() => {
      window.location.reload();
    }, 10000);
  };

  const handleClose = () => {
    setMailsent(false);
    setError(null);
  };

  return (
    <div>
      <form
        action="http://localhost:8080/PHP/server.php"
        method="post"
        onSubmit={handleSubmit}
        className="formContainer"
      >
        <div className="fields">
          <label htmlFor="name">Name *</label>
          <input
            className="input"
            type="text"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="fields" style={{ display: "none" }}>
          <label htmlFor="nickname">Nickname *</label>
          <input
            className="input"
            type="text"
            name="nickname"
            id="nickname"
            onChange={(e) => setNickmane(e.target.value)}
            value={nickname}
          />
        </div>
        <div className="fields">
          <label htmlFor="email">E-mail *</label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="fields">
          <label htmlFor="phone">
            Telephone<small> (optional)</small>
          </label>
          <input
            className="input"
            type="number"
            name="phone"
            id="phone"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
        </div>
        <div className="fields">
          <label htmlFor="message">Message *</label>
          <textarea
            className="textarea"
            type="text"
            name="message"
            id="message"
            required
            onChange={(e) => setMessage(e.target.value)}
            value={message}
          />
        </div>
        <button className="btn">Send</button>
        {mailsent ? (
          <Alert className="alert" onClose={() => setMailsent(false)}>
            <div>Thank you for your message! We will contact you shortly.</div>
          </Alert>
        ) : error !== null ? (
          <Alert className="alert" onClose={handleClose} severity="error">
            <div>Oops.. the message was not sent! Please try again.</div>
          </Alert>
        ) : null}
      </form>
    </div>
  );
};

export default Contactform;
