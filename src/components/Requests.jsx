import axios from "axios";
import { useEffect, useState } from "react";
import {
  ACCEPTED,
  BASE_URL,
  REJECTED,
  REQUEST,
  USER,
} from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store?.request);
  const [userRequests, setUserRequests] = useState();

  const getUserRequests = async () => {
    try {
      const response = await axios.get(BASE_URL + USER + "/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(response?.data?.pendingConnectionRequests));
      setUserRequests(response?.data?.pendingConnectionRequests);
    } catch (error) {
      console.log("Error obtained while trying to fetch user request data");
    }
  };
  useEffect(() => {
    getUserRequests();
  }, []);

  const handleConnection = async (_id, status) => {
    const response = await axios.post(
      BASE_URL + REQUEST + "/review/" + status + "/" + _id,
      {},
      { withCredentials: true }
    );
    const remainingRequests = userRequests.filter(
      (userRequest) => userRequest._id !== response?.data?.message?._id
    );
    dispatch(addRequest(remainingRequests));
    setUserRequests(remainingRequests);
  };

  if (!requests) return <></>;

  if (requests.length === 0) return <div>No user requests obtained</div>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-black text-4xl">
        You total requests are: {userRequests?.length}
      </h1>
      <div className="">
        {requests.map((request) => {
          const { _id } = request;
          const { firstName, lastName, photoUrl, age, gender, skills } =
            request.fromUserId;
          return (
            <div key={_id} className="flex m-4 mx-auto p-4 bg-base-300 w-1/2">
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl}
              />
              <div className="flex flex-col justify-center mx-auto">
                <div className="text-left mx-4">
                  <h2 className="font-bold text-xl">
                    {firstName + " " + lastName}
                  </h2>
                  <p>
                    {age} {gender}
                  </p>
                  <p>{skills.join(", ")}</p>
                </div>
                <div className="card-actions justify-center my-4">
                  <button
                    className="btn btn-secondary text-black"
                    onClick={() => handleConnection(_id, ACCEPTED)}
                  >
                    {ACCEPTED.toUpperCase()}
                  </button>
                  <button
                    className="btn btn-primary text-black"
                    onClick={() => handleConnection(_id, REJECTED)}
                  >
                    {REJECTED.toUpperCase()}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
