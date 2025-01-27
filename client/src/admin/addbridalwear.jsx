import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";

const AddBridalWearForm = () => {
  const [formData, setFormData] = useState({
    religion: "",
    occassion: "",
    gender: "",
    description: {
      print: "",
      color: "",
      product: "",
      fabric: "",
      features: "",
      fit: "",
      styling: "",
      countryorigin: "",
      manufacturer: "",
    },
    images: [],
  });

  const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name in formData.description) {
      setFormData((prev) => ({
        ...prev,
        description: { ...prev.description, [name]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = new FormData();
    payload.append("religion", formData.religion);
    payload.append("occassion", formData.occassion);
    payload.append("gender", formData.gender);
    payload.append("description", JSON.stringify([formData.description]));

    formData.images.forEach((image) => {
      payload.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:9000/admin/add-bridal-wear",
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("Bridal wear details added successfully!");
        setFormData({
          religion: "",
          occassion: "",
          gender: "",
          description: {
            print: "",
            color: "",
            product: "",
            fabric: "",
            features: "",
            fit: "",
            styling: "",
            countryorigin: "",
            manufacturer: "",
          },
          images: [],
        });
        navigate("/admin")
      } else {
        alert("Failed to add bridal wear details. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2 className="text-center">Add Bridal Wear Details</h2>
      <form onSubmit={handleSubmit}>
        {/* Religion */}
        <div className="mb-3">
          <label className="form-label">Religion</label>
          <input
            type="text"
            className="form-control"
            name="religion"
            value={formData.religion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Occasion */}
        <div className="mb-3">
          <label className="form-label">Occasion</label>
          <input
            type="text"
            className="form-control"
            name="occassion"
            value={formData.occassion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Images */}
        <div className="mb-3">
          <label className="form-label">Images</label>
          <input
            type="file"
            className="form-control"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <select
            className="form-select"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Unisex">Unisex</option>
          </select>
        </div>

        {/* Description */}
        <fieldset className="border p-3 mb-3">
          <legend>Description</legend>

          {[
            "print",
            "color",
            "product",
            "fabric",
            "features",
            "fit",
            "styling",
            "countryorigin",
            "manufacturer",
          ].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                className="form-control"
                name={field}
                value={formData.description[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </fieldset>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>
    </div>
    </>
  );
};

export default AddBridalWearForm;
