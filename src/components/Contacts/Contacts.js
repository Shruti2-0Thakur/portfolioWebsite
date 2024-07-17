import { IconButton, Snackbar, SnackbarContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import emailjs from 'emailjs-com';
import React, { useContext, useRef, useState } from "react";
import { AiOutlineCheckCircle, AiOutlineSend } from "react-icons/ai";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FiAtSign, FiPhone } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { SiLeetcode } from "react-icons/si";
import { ThemeContext } from "../../contexts/ThemeContext";
import { contactsData } from "../../data/contactsData";
import { socialsData } from "../../data/socialsData";
import "./Contacts.css";

function Contacts() {
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const form = useRef();

  const { theme } = useContext(ThemeContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const useStyles = makeStyles((t) => ({
    input: {
      border: `4px solid ${theme.primary80}`,
      backgroundColor: `${theme.secondary}`,
      color: `${theme.tertiary}`,
      fontFamily: "var(--primaryFont)",
      fontWeight: 500,
      transition: "border 0.2s ease-in-out",
      "&:focus": {
        border: `4px solid ${theme.primary600}`,
      },
    },
    message: {
      border: `4px solid ${theme.primary80}`,
      backgroundColor: `${theme.secondary}`,
      color: `${theme.tertiary}`,
      fontFamily: "var(--primaryFont)",
      fontWeight: 500,
      transition: "border 0.2s ease-in-out",
      "&:focus": {
        border: `4px solid ${theme.primary600}`,
      },
    },
    label: {
      backgroundColor: `${theme.secondary}`,
      color: `${theme.primary}`,
      fontFamily: "var(--primaryFont)",
      fontWeight: 600,
      fontSize: "0.9rem",
      padding: "0 5px",
      transform: "translate(25px,50%)",
      display: "inline-flex",
    },
    socialIcon: {
      width: "45px",
      height: "45px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "21px",
      backgroundColor: theme.primary,
      color: theme.secondary,
      transition: "250ms ease-in-out",
      "&:hover": {
        transform: "scale(1.1)",
        color: theme.secondary,
        backgroundColor: theme.tertiary,
      },
    },
    detailsIcon: {
      backgroundColor: theme.primary,
      color: theme.secondary,
      borderRadius: "50%",
      width: "45px",
      height: "45px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "23px",
      transition: "250ms ease-in-out",
      flexShrink: 0,
      "&:hover": {
        transform: "scale(1.1)",
        color: theme.secondary,
        backgroundColor: theme.tertiary,
      },
    },
    submitBtn: {
      backgroundColor: theme.primary,
      color: theme.secondary,
      transition: "250ms ease-in-out",
      "&:hover": {
        transform: "scale(1.08)",
        color: theme.secondary,
        backgroundColor: theme.tertiary,
      },
    },
  }));

  const classes = useStyles();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_g93xhuw', 'template_vzqay0t', form.current, 'OePBemdSScPjzdcKt')
    .then((result) => {
        setSuccess(true);
        setErrMsg("");
        setOpen(true);
        if (form.current) {
          form.current.reset(); // Ensure form.current is not null
        }
      }, (error) => {
        setErrMsg("Error! Please try again later.");
        setOpen(true);
        console.log(error.text);
      });
  };

  return (
    <div
      className="contacts"
      id="contacts"
      style={{ backgroundColor: theme.secondary }}
    >
      <div className="contacts--container">
        <h1 style={{ color: theme.primary }}>Contacts</h1>
        <div className="contacts-body">
          <div className="contacts-form">
            <form ref={form} onSubmit={sendEmail}>
              <div className="input-container">
                <label htmlFor="Name" className={classes.label}>
                  Name
                </label>
                <input
                  placeholder="Enter Your Name"
                  name="name"
                  type="text"
                  className={`form-input ${classes.input}`}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="Email" className={classes.label}>
                  Email
                </label>
                <input
                  placeholder="Enter Your Email"
                  name="email"
                  type="email"
                  className={`form-input ${classes.input}`}
                  required
                />
              </div>
              <div className="input-container">
                <label htmlFor="Message" className={classes.label}>
                  Message
                </label>
                <textarea
                  placeholder="Type your message...."
                  name="message"
                  className={`form-message ${classes.message}`}
                  required
                />
              </div>

              <div className="submit-btn">
                <button type="submit" className={classes.submitBtn}>
                  <p>{!success ? "Send" : "Sent"}</p>
                  <div className="submit-icon">
                    <AiOutlineSend
                      className="send-icon"
                      style={{
                        animation: !success ? "initial" : "fly 0.8s linear both",
                        position: success ? "absolute" : "initial",
                      }}
                    />
                    <AiOutlineCheckCircle
                      className="success-icon"
                      style={{
                        display: !success ? "none" : "inline-flex",
                        opacity: !success ? "0" : "1",
                      }}
                    />
                  </div>
                </button>
              </div>
            </form>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              autoHideDuration={4000}
              onClose={handleClose}
            >
              <SnackbarContent
                action={
                  <React.Fragment>
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleClose}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </React.Fragment>
                }
                style={{
                  backgroundColor: theme.primary,
                  color: theme.secondary,
                  fontFamily: "var(--primaryFont)",
                }}
                message={errMsg || "Message sent successfully!"}
              />
            </Snackbar>
          </div>

          <div className="contacts-details">
            <a href={`mailto:${contactsData.email}`} className="personal-details">
              <div className={classes.detailsIcon}>
                <FiAtSign />
              </div>
              <p style={{ color: theme.tertiary }}>{contactsData.email}</p>
            </a>
            <a href={`tel:${contactsData.phone}`} className="personal-details">
              <div className={classes.detailsIcon}>
                <FiPhone />
              </div>
              <p style={{ color: theme.tertiary }}>{contactsData.phone}</p>
            </a>
            <div className="personal-details">
              <div className={classes.detailsIcon}>
                <HiOutlineLocationMarker />
              </div>
              <p style={{ color: theme.tertiary }}>{contactsData.address}</p>
            </div>

            <div className="socialmedia-icons">
              {socialsData.linkedIn && (
                <a
                  href={socialsData.linkedIn}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaLinkedinIn aria-label="LinkedIn" />
                </a>
              )}
              
              {socialsData.github && (
                <a
                  href={socialsData.github}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <FaGithub aria-label="GitHub" />
                </a>
              )}
              {socialsData.leetCode && (
                <a
                  href={socialsData.leetCode}
                  target="_blank"
                  rel="noreferrer"
                  className={classes.socialIcon}
                >
                  <SiLeetcode aria-label="LeetCode" />
                </a>
              )}
              
              
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacts;