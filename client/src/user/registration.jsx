import { useState } from "react";
import {useNavigate} from "react-router-dom"
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import AXIOS from 'axios'
export default function Registration() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone:"",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate=useNavigate()

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Registration Data:", formData);
    AXIOS.post("http://localhost:9000/user/register-user",formData)
    .then((res)=>{
        alert(res.data)
        if(res.status===200){
          navigate("/")
        }
    })
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        marginTop: "50px",
        padding: "30px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        style={{ fontWeight: "bold", marginBottom: "20px", color: "#1976d2" }}
      >
        Create an Account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
            </Grid>
          </Grid>
          <TextField
            label="Phone"
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
            fullWidth
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
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
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
            Register
          </Button>
        </Box>
      </form>
      <Typography
        variant="body2"
        align="center"
        style={{ marginTop: "20px", color: "#6c757d" }}
      >
        Already have an account?{" "}
        <span
          style={{
            color: "#1976d2",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => {
            console.log("Navigate to login");
          }}
        >
          Login
        </span>
      </Typography>
    </Container>
  );
}
