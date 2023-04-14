import React, { useState } from "react";
import { signUp } from "./docs/firebase";
import { Link } from 'react-router-dom';
import {
Form,
FormGroup,
Label,
Input,
Button,
Container,
Row,
Col
} from 'reactstrap';

const Signup = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await signUp(name, email, password);
    console.log("User signed up successfully!");
  } catch (error) {
    if (error.code == "auth/email-already-in-use") {
      window.location.href = '/login'
      alert("E-posta adresi zaten başka bir hesap tarafından kullanılıyor");
      

    }
    // handle other errors
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
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Sign up</h2>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="name">Name:</Label>
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email">Email:</Label>
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password:</Label>
                  <Input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </FormGroup>
                <Button type="submit" color="primary" block>
                  Sign up
                </Button>
              </Form>
              <p className="mt-2 text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-purple-600">
                  Login here.
                </Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;