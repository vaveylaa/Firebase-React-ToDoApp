import React, { useState } from "react";
import { signIn } from "./docs/firebase";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // useNavigate ()'i içe aktarın

import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

const Login = ({ setShowSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signIn(email, password);
      console.log("User logged in successfully!");
      navigate("/todos"); // giriş başarılıysa ana sayfaya yönlendirin
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Container 
    style={{ 
      marginTop: "150px"
    }}
    className="main ">
      <Row className="justify-content-center">
        <Col md="6">
          {" "}
          <div className="card">
            {" "}
            <div className="card-body">
              {" "}
              <h2 className="text-center">Login</h2>{" "}
              <Form onSubmit={handleSubmit}>
                {" "}
                <FormGroup>
                  {" "}
                  <Label for="email">Email:</Label>{" "}
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />{" "}
                </FormGroup>{" "}
                <FormGroup>
                  {" "}
                  <Label for="password">Password:</Label>{" "}
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />{" "}
                </FormGroup>{" "}
                <Button type="submit" color="primary" block>
                  {" "}
                  Login{" "}
                </Button>{" "}
              </Form>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <Link to="/" className="text-purple-600"> 
                  Sign up here.
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
