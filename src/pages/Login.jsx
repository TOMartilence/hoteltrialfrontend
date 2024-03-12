import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"
function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/loginuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("authtoken", data.authtoken);
        console.log(localStorage.getItem("authtoken",data.authtoken));
        setSuccess(true);
        Navigate("/");
      } else {
        const data = await response.json();
        setError(data.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong.');
    }
  };

  return (
    <div>
      <section className="w-100 p-4 d-flex justify-content-center pb-4 mt-5">
        <form style={{ width: "22em" }} onSubmit={handleSubmit}>
          <span style={{ textAlign: "center", marginBottom: "17px" }}>Login</span>
          <div className="form-outline mb-4">
            <input
              type="email"
              id="form2Example1"
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="form2Example1">Email address</label>
          </div>

          <div className="form-outline mb-4">
            <input
              type="password"
              id="form2Example2"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="form2Example2">Password</label>
          </div>

          <button type="submit" className="btn btn-primary btn-block mb-4">Log in</button>

          {error && <div className="alert alert-danger" role="alert">{error}</div>}
          {success && <div className="alert alert-success" role="alert">Login successful!</div>}

          <div className="text-center">
            <p>Not a member? <Link to="/signup">Register</Link></p>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
