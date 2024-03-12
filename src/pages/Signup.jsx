import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/createuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password, location })
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);
      // If signup is successful, redirect to the home page
      if (data.success) {
        navigate("/");
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error.message);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-9 col-lg-7 col-xl-7">
          <div className="card" style={{ borderRadius: "15px" }}>
            <div className="card-body p-5">
              <h2 className="text-uppercase text-center mb-5">
                Create an account
              </h2>

              <form onSubmit={handleSubmit}>
              <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form3Example1cg"
                    className="form-control form-control-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example1cg">
                    Your Name
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form3Example3cg"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example3cg">
                    Your Email <span style={{fontWeight:"lighter",marginLeft:"10px"}}>Not shared with anyone*</span>
                  </label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form3Example4cg"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label className="form-label" htmlFor="form3Example4cg">
                    Password
                  </label>
                </div>
                <Row className="mb-4">
                  <Col>
                    <div className="form-outline">
                      <input
                        type="text"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Location
                      </label>
                    </div>
                  </Col>

                  <Col xs="auto">
                    <button className="btn btn-outline-warning">
                      Add Current
                    </button>
                  </Col>
                </Row>


                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-success btn-lg gradient-custom-4 text-body"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Register"}
                  </button>
                </div>

                {error && <div className="alert alert-danger mt-3">{error}</div>}

                <p className="text-center text-muted mt-5 mb-0">
                  Have already an account?{" "}
                  <Link to="/login" className="fw-bold text-body">
                    <u>Login here</u>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
