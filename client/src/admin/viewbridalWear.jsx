// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Button } from "react-bootstrap";
// const BridalWear = () => {
//   const [bridalWearData, setBridalWearData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Fetch bridal wear data from backend
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:9000/admin/view-bridal-wear");
//         setBridalWearData(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching bridal wear data:", err);
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Bridal Wear Details</h2>
//       {bridalWearData.length === 0 ? (
//         <p className="text-center">No bridal wear data available.</p>
//       ) : (
//         <table className="table table-striped table-bordered">
//           <thead className="table-dark">
//             <tr>
//               <th>#</th>
//               <th>Religion</th>
//               <th>Occasion</th>
//               <th>Gender</th>
//               <th>Description</th>
//               <th>Images</th>
//               <th>Delete</th>
//               <th>Edit</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bridalWearData.map((item, index) => (
//               <tr key={item._id}>
//                 <td>{index + 1}</td>
//                 <td>{item.religion}</td>
//                 <td>{item.occassion}</td>
//                 <td>{item.gender}</td>
//                 <td>
//                   <ul>
//                     {item.description.map((desc, idx) => (
//                       <li key={idx}>
//                         <strong>Print:</strong> {desc.print} | <strong>Color:</strong> {desc.color} |{" "}
//                         <strong>Product:</strong> {desc.product} | <strong>Fabric:</strong> {desc.fabric} |{" "}
//                         <strong>Features:</strong> {desc.features} | <strong>Fit:</strong> {desc.fit} |{" "}
//                         <strong>Styling:</strong> {desc.styling} | <strong>Country of Origin:</strong>{" "}
//                         {desc.countryorigin} | <strong>Manufacturer:</strong> {desc.manufacturer}
//                       </li>
//                     ))}
//                   </ul>
//                 </td>
//                 <td>
//                   {item.images.map((image, idx) => (
//                     <img
//                       key={idx}
//                       src={`http://localhost:9000/${image}`}
//                       alt="Bridal Wear"
//                       style={{ width: "100px", margin: "5px" }}
//                     />
//                   ))}
//                 </td>
//                 <td><Button>Delete</Button></td>
//                 <td><Button>EDIT</Button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BridalWear;


import { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd"; // Using Ant Design for table functionality
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"; // Importing icons
import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
const BridalWear = () => {
  const [bridalWearData, setBridalWearData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate()

  useEffect(() => {
    // Fetch bridal wear data from backend
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:9000/admin/view-bridal-wear");
        setBridalWearData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bridal wear data:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  // Function to render description
  const renderDescription = (description) => {
    return (
      <ul>
        {description.map((desc, idx) => (
          <li key={idx}>
            <strong>Print:</strong> {desc.print} | <strong>Color:</strong> {desc.color} |{" "}
            <strong>Product:</strong> {desc.product} | <strong>Fabric:</strong> {desc.fabric} |{" "}
            <strong>Features:</strong> {desc.features} | <strong>Fit:</strong> {desc.fit} |{" "}
            <strong>Styling:</strong> {desc.styling} | <strong>Country of Origin:</strong>{" "}
            {desc.countryorigin} | <strong>Manufacturer:</strong> {desc.manufacturer}
          </li>
        ))}
      </ul>
    );
  };

  // Function to render images
  const renderImages = (images) => {
    return (
      <div>
        {images.length > 0 ? (
          images.map((image, idx) => (
            <img
              key={idx}
              src={`http://localhost:9000/${image}`}
              alt={`Bridal Wear ${idx}`}
              style={{ width: "100px", margin: "5px" }}
            />
          ))
        ) : (
          <p>No images available.</p>
        )}
      </div>
    );
  };

  const handleDelete = (key) => {
    console.log(`Deleting item with key: ${key}`);
    axios.delete('http://localhost:9000/admin/delete-bridal-wear',{headers:{_id:key}})
    .then((res)=>{alert(res.data)
        window.location.reload()
    })
    .catch((err)=>console.log(err))

    
  };

  const handleEdit = (key) => {
    console.log(`Editing item with key: ${key}`);
    navigate(`/admin/editbridal/${key}`)
    
  };

  // Handle redirect to Add Bridal form
  const handleAddBridal = () => {
   navigate("/admin/addbridal");
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <h2 className="text-center mb-4">Bridal Wear Details</h2>
      {bridalWearData.length === 0 ? (
        <p className="text-center">No bridal wear data available.</p>
      ) : (
        <Table
          dataSource={bridalWearData}
          rowKey="_id" // Use a unique identifier for each row
          expandable={{
            expandedRowRender: (record) => (
              <div>
                <h5>Images</h5>
                {renderImages(record.images)}
              </div>
            ),
            rowExpandable: (record) => record.images.length > 0,
          }}
          columns={[
            {
              title: "#",
              dataIndex: "key",
              render: (_, __, index) => index + 1,
            },
            {
              title: "Religion",
              dataIndex: "religion",
            },
            {
              title: "Occasion",
              dataIndex: "occassion",
            },
            {
              title: "Gender",
              dataIndex: "gender",
            },
            {
              title: "Description",
              dataIndex: "description",
              render: renderDescription,
            },
            {
              title: "Action",
              render: (_, record) => (
                <span>
                  <DeleteOutlined
                    style={{ color: "red", marginRight: 10, cursor: "pointer" }}
                    onClick={() => handleDelete(record._id)}
                  />
                  <EditOutlined
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleEdit(record._id)}
                  />
                </span>
              ),
            },
          ]}
        />
      )}

      {/* Floating Button */}
      <button
        className="floating-btn"
        onClick={handleAddBridal}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "30px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        +
      </button>
    </div>
    </>
  );
};

export default BridalWear;
