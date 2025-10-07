import { Table, Form, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message.jsx";
import Loader from "../components/Loader.jsx";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // auto fill user name and email
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const [profile, { isLoading: loadingProfile }] = useProfileMutation();
  const dispatch = useDispatch();
  // update user profile
  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      // .unwrap() → extracts the actual data or throws an error.
      const response = await profile({
        name,
        email,
        password,
      }).unwrap();

      // upload userInfo in localStorage
      dispatch(setCredentials(response));
      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-3">
            Update
          </Button>

          {loadingProfile && <Loader />}
        </Form>
      </Col>

      <Col md={9}>
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
        </Table>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
