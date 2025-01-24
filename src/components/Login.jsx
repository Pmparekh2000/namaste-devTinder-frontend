import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { AUTH, BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("nik@doshi.com");
  const [password, setPassword] = useState("Nik!2025");
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // withCredentials: true is required to successfully set cookie obtained from backend into browser
      const response = await axios.post(
        BASE_URL + AUTH + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response.data.user));
      navigate("/");
    } catch (error) {
      if (error.status === 500) {
        setLoginError(
          error?.response?.data?.error ||
            "Something went wrong while logging-in"
        );
      }
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
          <div>
            <p className="text-red-600">{loginError}</p>
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
