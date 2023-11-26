import React from "react";

import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
  const [post, setPost] = useState({
    name: "",
    cNum: "",
    city: "",
    state: "",
    pincode: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(event.target);
    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = (event) => {
    event.preventDefault();

    axios.post("/create", post);

    setPost({
      name: "",
      cNum: "",
      city: "",
      state: "",
      pincode: "",
    });

    navigate("/posts");
  };

  return (
    <div style={{ width: "90%", textAlign: "center" }}>
      <h1>Create here</h1>

      <Form>
        <Form.Group>
          <Form.Control
            name="name"
            placeholder="Name "
            style={{ marginBottom: "1rem" }}
            value={post.name}
            onChange={handleChange}
          />
          <Form.Control
            name="cNum"
            placeholder="Customer Number "
            style={{ marginBottom: "1rem" }}
            value={post.cNum}
            onChange={handleChange}
          />
          <Form.Control
            name="city"
            placeholder="City "
            style={{ marginBottom: "1rem" }}
            value={post.city}
            onChange={handleChange}
          />
          <Form.Control
            name="state"
            placeholder="State "
            style={{ marginBottom: "1rem" }}
            value={post.state}
            onChange={handleChange}
          />
          <Form.Control
            name="pincode"
            placeholder="Pincode "
            style={{ marginBottom: "1rem" }}
            value={post.pincode}
            onChange={handleChange}
          />
          <Form.Control />
        </Form.Group>
        <Button
          onClick={handleClick}
          variant="success"
          style={{ marginBottom: "1rem" }}
        >
          Submit
        </Button>
      </Form>

      <Button
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </div>
  );
};

export default CreatePost;
