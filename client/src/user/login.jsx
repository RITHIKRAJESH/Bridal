import  { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Divider,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AXIOS from 'axios'
import {decodeToken} from 'react-jwt'

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    AXIOS.post("http://localhost:9000/user/login-user",formData)
    .then((res)=>{
      const response=res.data
      alert(response.message)
      const token=response.token
      const decodedtoken=decodeToken(token)

      const role=decodedtoken.data.role
      if(res.status===200 && role=="user"){
        sessionStorage.setItem("token",token)
        navigate("/userhome")
      }
    })
  };

  // Navigate to registration page
  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <Container
      maxWidth="xs"
      style={{
        marginTop: "100px",
        padding: "20px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        style={{ fontWeight: "bold", color: "#1976d2" }}
      >
        Welcome Back!
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        align="center"
        style={{ color: "#6c757d", marginBottom: "20px" }}
      >
        Login to your account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
            autoFocus
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            style={{
              backgroundColor: "#1976d2",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Login
          </Button>
        </Box>
      </form>

      <Divider style={{ margin: "20px 0" }}>or</Divider>

      <Box textAlign="center">
        <Typography variant="body2" style={{ color: "#6c757d" }}>
          Don't have an account?
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          size="medium"
          onClick={handleRegisterRedirect}
          style={{
            marginTop: "10px",
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          Register Now
        </Button>
      </Box>
    </Container>
  );
}
