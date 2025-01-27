import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Form, Input, Button, Select } from 'antd';

export default function Editbridal() {
  const { id } = useParams();  // Get the bridal wear ID from the URL parameters
  // Use history to navigate after submission

  // Form fields state
  const [formData, setFormData] = useState({
    religion: '',
    occassion: '',
    gender: '',
    description: [],
    images: [],
  });

  const [loading, setLoading] = useState(true); // Loading state while data is fetched

  useEffect(() => {
    // Fetch bridal wear data based on ID
    const fetchBridalWearData = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/admin/bridal-wear/${id}`);
        setFormData(response.data); // Set the data to form
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bridal wear data:', err);
        setLoading(false);
      }
    };

    fetchBridalWearData();
  }, [id]);

  const handleSubmit = async (values) => {
    try {
      const response = await axios.put(`http://localhost:9000/admin/update-bridal-wear/${id}`, values);
      console.log('Updated successfully', response.data);
      // Redirect to the bridal wear listing after update
    } catch (error) {
      console.error('Error updating bridal wear data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Edit Bridal Wear</h2>
      <Form
        layout="vertical"
        initialValues={formData} // Pre-fill the form fields with the fetched data
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Religion"
          name="religion"
          rules={[{ required: true, message: 'Please enter religion' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Occasion"
          name="occassion"
          rules={[{ required: true, message: 'Please enter occasion' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please select gender' }]}
        >
          <Select>
            <Select.Option value="Male">Male</Select.Option>
            <Select.Option value="Female">Female</Select.Option>
            <Select.Option value="Unisex">Unisex</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
        
        </Form.Item>

        {/* You can add an image field if needed */}
        <Form.Item
          label="Images (URLs)"
          name="images"
        >
          <Input placeholder="Enter image URLs separated by commas" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
