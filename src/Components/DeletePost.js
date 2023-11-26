import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

function DeletePost() {
  const [num, setNum] = useState("");
  const [posts, setPosts] = useState([]);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const findPost = async () => {
    console.log(num);

    axios
      .delete(`/delete/${num}`)
      .then((res) => {
        console.log(res);
        setPosts([res.data]);
      })
      .catch((err) => console.log(err));

    alert("deleted");

    console.log("sent");
  };

  const handleChange = (e) => {
    setNum(e.target.value);
  };

  return (
    <div style={{ textAlign: "center", justifyContent: "center" }}>
      <h1>Delete posts here</h1>

      <Button
        variant="secondary"
        onClick={handleShow}
        style={{ margin: "10px" }}
      >
        Open Delete Modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete the post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Control
                style={{ marginBottom: "1rem" }}
                placeholder="Enter the mongodb id"
                name="cNum"
                value={num}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="outline-success" onClick={findPost}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div>
        {posts.map((post) => (
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
            <p>{post.cNum}</p>
            <p>{post.city}</p>
            <p>{post.state}</p>
            <p>{post.pincode}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeletePost;
