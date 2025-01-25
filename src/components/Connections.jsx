import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, USER } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const [userConnections, setUserConnections] = useState(null);
  const connections = useSelector((store) => store?.connection);
  const dispatch = useDispatch();
  const getUserConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + USER + "/connections", {
        withCredentials: true,
      });
      setUserConnections(response?.data?.connections);
      dispatch(addConnections(response?.data?.connections));
    } catch (erorr) {
      console.log("Error obtained while fetching user connections");
    }
  };
  useEffect(() => {
    getUserConnections();
  }, []);

  if (!connections) return <></>;

  if (connections.length === 0) return <h1>No connections found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-black text-4xl">
        You total connections: {userConnections?.length}
      </h1>
      <div className="">
        {connections.map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={connection._id}
              className="flex m-4 mx-auto p-4 bg-base-300 w-1/2"
            >
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={connection.photoUrl}
              />
              <div className="text-left mx-4">
                <h2 className="font-bold text-xl">
                  {firstName + " " + lastName}
                </h2>
                <p>
                  {age} {gender}
                </p>
                <p>{about}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
