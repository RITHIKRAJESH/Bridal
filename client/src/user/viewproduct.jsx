import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./viewproducts.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Navbar from "./navbar";

export default function ViewProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [size, setSize] = useState("");
  const token = sessionStorage.getItem("token");
  const quantity = 1;

  useEffect(() => {
    axios
      .get(`http://localhost:9000/user/view-products/${id}`)
      .then((res) => {
        const fetchedProduct = res.data[0];
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]); // Set default selected image
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!product) {
    return <h1>Product not found</h1>;
  }

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleSize = (sizeOption) => {
    setSize(sizeOption);
  };

  const addCart = (id) => {
    if (!size) {
      alert("Please select a size before adding to cart.");
      return;
    }

    axios
      .post("http://localhost:9000/user/addcart", {
        productId: id,
        quantity: quantity,
        size: size,
      },{headers:{token:token}})
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="main">
        {/* Left Section */}
        <div className="sub-main1">
          {/* Images Array */}
          <div className="img-arr">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={`http://localhost:9000/${image}`}
                alt={`Product ${index + 1}`}
                className="thumbnail"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>

          <div className="img-card">
            <img
              src={`http://localhost:9000/${selectedImage}`}
              alt="Main Product"
              className="main-img"
            />
          </div>

          <div className="details">
            <h1>{product.description[0].product}</h1>
            <h2>Price: Rs. {product.price}</h2>
            <h3>Occasion: {product.occassion}</h3>
            <div className="size-options">
              <h3>Select Size:</h3>
              {["S", "M", "L", "XL", "XXL"].map((sizeOption) => (
                <div
                  className={`size-box ${size === sizeOption ? "selected" : ""}`}
                  key={sizeOption}
                  onClick={() => handleSize(sizeOption)}
                >
                  {sizeOption}
                </div>
              ))}
            </div>
            <div className="actions">
              <button
                className="btn add-to-cart"
                onClick={() => {
                  addCart(product._id);
                }}
              >
                Add to Cart
              </button>
              <button className="btn add-to-fav">
                <FontAwesomeIcon icon={faHeart} /> Favourite
              </button>
            </div>
            <div>
              <button className="btn buy-now">Buy Now</button>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="sub-main2">
          <h2>Description</h2>
          <p>
            <strong>Features:</strong>{" "}
            {product.description[0].features || "No description available."}
          </p>
          <p>
            <strong>Fabric:</strong>{" "}
            {product.description[0].fabric || "No fabric details available."}
          </p>
          <p>
            <strong>Product Type:</strong>{" "}
            {product.description[0].product || "No product type available."}
          </p>
          <p>
            <strong>Print:</strong>{" "}
            {product.description[0].print || "No print information available."}
          </p>
          <p>
            <strong>Color:</strong>{" "}
            {product.description[0].color || "No color information available."}
          </p>
          <p>
            <strong>Fit:</strong>{" "}
            {product.description[0].fit || "No fit information available."}
          </p>
          <p>
            <strong>Styling:</strong>{" "}
            {product.description[0].styling || "No styling information available."}
          </p>
          <p>
            <strong>Country of Origin:</strong>{" "}
            {product.description[0].countryorigin ||
              "No country of origin available."}
          </p>
          <p>
            <strong>Manufacturer:</strong>{" "}
            {product.description[0].manufacturer || "No manufacturer information available."}
          </p>
        </div>
      </div>
    </>
  );
}
