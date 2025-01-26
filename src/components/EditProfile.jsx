import { useState } from "react";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL, PROFILE } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [age, setAge] = useState(user?.age || 50);
  const [gender, setGender] = useState(user?.gender);
  const [about, setAbout] = useState(user?.about);
  const [loginError, setLoginError] = useState("");
  const dispatch = useDispatch();

  const saveUserProfile = async () => {
    setLoginError("");
    try {
      const response = await axios.patch(
        BASE_URL + PROFILE + "/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(response?.data?.updatedUser));
    } catch (error) {
      setLoginError(
        error?.response?.data?.error ||
          "Something went wrong while updating the user"
      );
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="flex mx-12">
        <div className="card bg-base-300 shadown-xl w-96">
          <div className="card-body">
            <h2 className="card-title justify-center">Edit Profile</h2>
            <div>
              <label className="form-control w-full max-w-xs my-2">
                <div className="label">
                  <span className="label-text">First Name</span>
                </div>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name</span>
                </div>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo Url</span>
                </div>
                <input
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age</span>
                </div>
                <input
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <input
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <input
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  type="text"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
            </div>
            <div>
              <p className="text-red-600">{loginError}</p>
            </div>
            <div className="card-actions justify-center my-4">
              <button className="btn" onClick={() => saveUserProfile()}>
                Save profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserCard
        userInfo={{ firstName, lastName, photoUrl, age, gender, about }}
      />
    </div>
  );
};

export default EditProfile;
