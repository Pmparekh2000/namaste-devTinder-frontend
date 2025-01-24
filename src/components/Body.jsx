import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL, PROFILE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  // Trying to fetch user profile if the JWT token is already set
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(BASE_URL + PROFILE + "/view", {
        withCredentials: true,
      });
      dispatch(addUser(response.data.user));
    } catch (error) {
      if (error.status === 401) {
        dispatch(removeUser());
        navigate("/login");
      }
      console.log("Error obtained while making the profile API call", error);
    }
  };
  useEffect(() => {
    if (userData === null) {
      fetchUserProfile();
    }
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Footer /> */}
    </div>
  );
};

export default Body;
