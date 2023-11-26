import React from "react";
import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log("added");
      console.log("data");
      await axios.post("/create", data);
      alert("Post created");
      reset();
      navigate("/posts");
    } catch (errors) {
      console.log(errors);
    }
  };

  return (
    <div style={{ width: "90%", textAlign: "center" }}>
      <h1>Create with validation</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Control
            name="name"
            placeholder="name"
            style={{ marginBottom: "1rem" }}
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <small className="red">{errors.name.message}</small>}

          <Form.Control
            name="cNum"
            placeholder="cNum"
            style={{ marginBottom: "1rem" }}
            {...register("cNum", { required: "Customer Number is required" })}
          />
          {errors.cNum && <small className="red">{errors.cNum.message}</small>}

          <Form.Control
            name="city"
            placeholder="City"
            style={{ marginBottom: "1rem" }}
            {...register("city", { required: "City is required" })}
          />
          {errors.city && <small className="red">{errors.city.message}</small>}

          <Form.Control
            name="state"
            placeholder="state"
            style={{ marginBottom: "1rem" }}
            {...register("state", { required: "state is required" })}
          />
          {errors.state && (
            <small className="red">{errors.state.message}</small>
          )}

          <Form.Control
            name="pincode"
            placeholder="pincode"
            style={{ marginBottom: "1rem" }}
            {...register("pincode", {
              required: "pincode is req",
              minLength: { value: 6, message: "Pincode of 6 chars" },
              maxLength: { value: 6, message: "PIncode of 6 chars" },
            })}
          />
          {errors.pincode && (
            <small className="red">{errors.pincode.message}</small>
          )}
        </Form.Group>
        <Button
          type="submit"
          variant="success"
          style={{ marginBottom: "1rem" }}
        >
          Submit
        </Button>
      </Form>
      <Button onClick={() => navigate(-1)}>Back</Button>
    </div>
  );
}

export default Create;
