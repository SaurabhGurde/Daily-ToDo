import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserLogin = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const Submit = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (!email || !password) {
      toast.error("Enter all fields !");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/user/loginuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        }
      );
      const json = await response.json();

      if (json.success) {
        //save the auth toke to local storage and redirect
        localStorage.setItem('userEmail', credentials.email)
        localStorage.setItem('userName', json.user.name)
        localStorage.setItem('token', json.authToken)
        localStorage.setItem('createdAt', json.user.createdAt)
        navigate("/userpage");

      } else {
        toast.error(json.errorMsg);
      }
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong !");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#ddddf0", height: "100vh", width: "100vw" }}
    >
      <form className="container" style={{ paddingTop: "25vh" }}>
        <h1 style={{ textAlign: "center" }}>User Login</h1>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            onChange={onChange}
            name="email"
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={onChange}
            name="password"
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>

        <button onClick={Submit} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserLogin;
