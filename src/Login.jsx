import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmailId] = useState("nik@doshi.com");
  const [password, setPassword] = useState("Nik!2025");

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(
        "Response obtained while making the login API call",
        response.data
      );
    } catch (error) {
      console.log("Error obtained while making the login API call", error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 shadown-xl w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email Id: {emailId}</span>
              </div>
              <input
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                type="text"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password: {password}</span>
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-center my-4">
            <button className="btn" onClick={() => handleLogin()}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
