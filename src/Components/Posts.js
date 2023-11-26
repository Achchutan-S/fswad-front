import React from "react";
import "../App.js";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPost] = useState([]);

  //modal requires 1 state and 2 toggles for that state
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [updatedPost, setUpdatedPost] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("/posts")
      .then((res) => {
        // console.log(res);
        setPost(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [posts]);

  const deletePost = (id) => {
    console.log(id);
    axios
      .delete(`/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  // all below updates

  const updatePost = (post) => {
    console.log(post);
    setUpdatedPost(post);
    handleShow();
  };
  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setUpdatedPost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const saveUpdatedPost = () => {
    console.log(updatedPost);
    axios
      .put(`/update/${updatedPost._id}`, updatedPost)
      .then((doc) => {
        console.log(doc);
      })
      .catch((e) => {
        console.log(e);
      });
    handleClose();
  };

  return (
    <div style={{ width: "90%", textAlign: "center" }}>
      <h1> Posts will be shown here</h1>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div
            key={post._id}
            style={{
              border: "solid 2px green",
              borderRadius: "10px",

              marginLeft: "2rem",
              marginBottom: "2rem",
              width: "90%",
              textAlign: "center",
              padding: "1rem",
            }}
          >
            <h2>{post.name}</h2>
            <p>{post._id}</p>
            <p>{post.cNum}</p>
            <p>{post.city}</p>
            <p>{post.state}</p>
            <p>{post.pincode}</p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button onClick={() => updatePost(post)}>Update</Button>
              <Button>Search</Button>
              <Button
                onClick={() => {
                  deletePost(post._id);
                }}
                variant="danger"
              >
                Delete
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p>No posts available</p>
      )}

      {/* Modal for update */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update the post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                style={{ marginBottom: "1rem" }}
                placeholder="name"
                name="name"
                value={updatedPost.name ? updatedPost.name : ""}
                onChange={handleChange}
              />

              <Form.Control
                style={{ marginBottom: "1rem" }}
                placeholder="cNum"
                name="cNum"
                value={updatedPost.cNum ? updatedPost.cNum : ""}
                onChange={handleChange}
              />

              <Form.Control
                style={{ marginBottom: "1rem" }}
                placeholder="city"
                name="city"
                value={updatedPost.city ? updatedPost.city : ""}
                onChange={handleChange}
              />

              <Form.Control
                style={{ marginBottom: "1rem" }}
                placeholder="state"
                name="state"
                value={updatedPost.state ? updatedPost.state : ""}
                onChange={handleChange}
              />

              <Form.Control
                style={{ marginBottom: "1rem" }}
                placeholder="pincode"
                name="pincode"
                value={updatedPost.pincode ? updatedPost.pincode : ""}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="outline-success" onClick={saveUpdatedPost}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Button
        style={{ textAlign: "center", margin: "auto auto" }}
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </Button>
    </div>
  );
}

export default Posts;
