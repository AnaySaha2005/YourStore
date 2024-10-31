import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./redux/isLogged/isLogged";
import { toast } from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(import.meta.env.VITE_API_URL+"/login", {
        ...loginData,
      });
      if (!data.error) {
        dispatch(login(data.user));
        navigate("/");
        toast.success("Successfully logged");
      } else {
        toast.error(data.error);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: "100%" }} action="POST">
          <TextField
            label="Email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            color="neutral"
            required
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            fullWidth
            color="neutral"
            margin="normal"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="neutral"
            fullWidth
            sx={{ marginTop: 3, padding: 1.5 }}
          >
            Login
          </Button>
        </form>
        
        <br />
        <span>
          <Link to="/signup">Signup?</Link>
          &nbsp;
          <Link to="/">Home</Link>
        </span>
      </Box>
    </Container>
  );
};

export default Login;
