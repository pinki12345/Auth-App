import React, { useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import images from "../resource/image";

const LoginContainer = ({ setToken }) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleShowLoginClick = () => {
    setShowLoginForm(true);
    setShowRegisterForm(false);
  };

  const handleShowRegisterForm = () => {
    setShowLoginForm(false);
    setShowRegisterForm(true);
  };

  return (
    <Grid container justify="center" spacing={2}>
      <Grid item xs={8}>
        <img src={images.logo} alt="login" className="logo-image" />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={4} mt={10}>
        {showLoginForm && <LoginForm setToken={setToken} />}

        {showRegisterForm && <RegisterForm />}

        {showLoginForm && (
          <Typography
            variant="subtitle1"
            gutterBottom
            onClick={handleShowRegisterForm}
          >
            Don't have an account ? Register
          </Typography>
        )}
        {showRegisterForm && (
          <Typography
            variant="subtitle1"
            gutterBottom
            onClick={handleShowLoginClick}
          >
            Don't have an account ? Login
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default LoginContainer;
