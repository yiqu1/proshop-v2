import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../components/FormContainer.jsx";
import Loader from "../components/Loader.jsx";
import { setCredentials } from "../slices/authSlice.js";
import { useLoginMutation } from "../slices/usersApiSlice.js";

const LoginScreen = () => {
  // component level state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Mutation hooks returns an array with 2 things, login → a function, An object with the mutation state
  const [login, { isLoading }] = useLoginMutation();

  // extract userInfo from state.auth state
  const { userInfo } = useSelector((state) => state.auth);

  // useLocation() returns the location object. extract search → query string (?redirect=/shipping)
  const { search } = useLocation();
  // URLSearchParams is a built-in JavaScript API for working with query strings. give it the search string, and it lets you easily get key/value pairs.
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/"; // /shipping or go to home page
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // .unwrap() → extracts the actual data or throws an error.
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials(response));
      navigate(redirect);
    } catch (err) {
      // small popup messages in the corner of the screen. It lets you easily show non-blocking messages to the user
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
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

        <Button
          type="submit"
          variant="primary"
          className="mt-2"
          disabled={isLoading}
        >
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
