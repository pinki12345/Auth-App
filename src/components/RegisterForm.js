import React from "react";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { supabase } from "../createClient";

const RegisterForm = () => {
  const [formData, setformData] = useState({
    fullName: "",
    email: "",
    Password: "",
  });

  console.log(formData);

  function handleChange(event) {
    setformData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value,
      };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.Password,
        data: {
          full_name: formData.fullName,
          age: 30,
          location: "San Francisco",
        },
      });

      alert("Check email for varification link");
    } catch (err) {
      alert(err);
    }
  }

  return (
    <React.Fragment>
      <Container>
        <Typography variant="h4" gutterBottom>
          Register account
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Get your free account now.
        </Typography>
        <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="fullName"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                name="Password"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" type="submit" color="primary">
                Register
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </React.Fragment>
  );
};

export default RegisterForm;
