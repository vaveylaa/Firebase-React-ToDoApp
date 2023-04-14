import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signIn } from "./firebase";
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardHeader,
  MDBCol,
  MDBCardBody,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsPane,
  MDBTabsContent,
  MDBIcon,
  MDBCheckbox,
  MDBInput,
  MDBBtn,
  MDBTextArea,
} from "mdb-react-ui-kit";
import SignUp from "./SignUpp.css";

function SignInn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const navigate = useNavigate(); // navigate değişkenini tanımlayın
  
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
    <MDBContainer onSubmit={handleSubmit} fluid className="mt-5">
      <section className="background-radial-gradient overflow-hidden">
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1
                className="my-5 display-3 fw-bold ls-tight"
                style={{ color: "hsl(218, 81%, 95%)" }}
              >
                Simplify Your Life with Our <br />
                <span style={{ color: "hsl(218, 81%, 75%)" }}>Todo App!</span>
              </h1>
              <p
                className="mb-4 opacity-70"
                style={{ color: "hsl(218, 81%, 85%)" }}
              >
                      Hello there!
                Welcome to our Todo application ! Simply sign up, create
                a profile, and start using it! You can save to-do lists, daily
                activities, personal goals and many more things. By using this
                application, you can become more organized in every aspect of
                your life. We can't wait to have you on board with
                us!{" "}
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div
                id="radius-shape-1"
                className="position-absolute rounded-circle shadow-5-strong"
              ></div>
              <div
                id="radius-shape-2"
                className="position-absolute shadow-5-strong"
              ></div>

                <div className="card bg-glass ">
                  <div className="card-body px-4 py-5 px-md-5">
                    <form>
                    

                      <MDBInput
                        className="mb-4"
                        type="email"
                        id="email2"
                        placeholder="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <MDBInput
                        className="mb-4"
                        type="password"
                        id="password2"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />

                      <MDBRow className="mb-4 justify-content-center">
                        <MDBCol md="6" className="d-flex justify-content-center">
                          <MDBCheckbox
                            className=" mb-3 mb-md-0"
                            defaultChecked
                            label=" Subscribe to our newsletter"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBBtn
                        type="submit"
                        block
                        className="mb-4 text-center"
                        style={{
                          margin: "0 auto",
                          resize: "none",
                          height: "50px",
                          width: "100%",
                        }}
                      >
                        Sign in
                      </MDBBtn>

                      <div className="text-center">
                        <p className="mt-2 text-sm text-gray-600 text-center">
                        Don't have an account?{" "}
                          <Link to="/" className="text-purple-600">
                          Sign up here.
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
            </div>
            
          </div>
          <p  style={{marginTop: "16%" , color: "#8CB1F3"}} className=" text-sm text-gray-600 text-center" >© 2023 Büşra ÖZÇELİK. All Rights Reserved.</p>

        </div>
      </section>
    </MDBContainer>
  );
}

export default SignInn;
