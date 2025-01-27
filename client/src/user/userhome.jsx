import React, { useEffect, useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./Navbar";

export default function UserHome() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate
  const token=sessionStorage.getItem('token')
  useEffect(() => {
        axios.get("http://localhost:9000/user/view-bridal-wear",{headers:{token:token}})
        .then((res)=>{
          setItems(res.data)
          console.log(res.data.message)
        })
        .catch((err)=>{
          console.log(err)
        }) 
  }, []);

  const handleCardClick = (id) => {
    navigate(`/userhome/view-product/${id}`); // Navigate to view-product with product ID
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" style={{ marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom align="center">
          Bridal Wear Collection
        </Typography>
        <Grid container spacing={3}>
          {items.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item._id}>
              <Card
                sx={{
                  maxWidth: 300,
                  "&:hover": {
                    transform: "scale(1.05)",
                    transition: "transform 0.3s ease-in-out",
                  },
                }}
                onClick={() => handleCardClick(item._id)} // Add onClick handler
              >
                <Box
                  sx={{
                    overflow: "hidden",
                    "&:hover img": {
                      transform: "scale(1.2)",
                      transition: "transform 0.5s ease-in-out",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="415"
                    image={`http://localhost:9000/${item.images[0]}`} // Show first image by default
                    alt={item.religion}
                    onMouseOver={(e) => {
                      if (item.images[1]) e.target.src = `http://localhost:9000/${item.images[1]}`;
                    }}
                    onMouseOut={(e) => {
                      e.target.src = `http://localhost:9000/${item.images[0]}`;
                    }}
                  />
                </Box>
                <CardContent>
                  <Typography variant="h6" component="div">
                    Name: {item.description[0].product}
                  </Typography>
                  <Typography variant="h6" color="text.primary">
                    Price: Rs.{item.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
