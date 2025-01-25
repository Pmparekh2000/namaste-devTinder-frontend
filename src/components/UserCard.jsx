import axios from "axios";
import { BASE_URL, IGNORED, INTERESTED, REQUEST } from "../utils/constants";

const UserCard = (props) => {
  const { userInfo, updateFeed, isFeedPage } = props;

  const userAction = async (_id, status) => {
    try {
      const response = await axios.post(
        BASE_URL + REQUEST + "/send/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log("Response obtained is", response);

      updateFeed(_id);
    } catch (error) {
      console.log("Error obtained while making a connection request");
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={userInfo?.photoUrl} alt={userInfo?.firstName} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {userInfo?.firstName} {userInfo?.lastName}
        </h2>
        <p>{userInfo?.about}</p>
        {isFeedPage ? (
          <div className="card-actions justify-center my-4">
            <button
              className="btn btn-secondary text-black"
              onClick={() => userAction(userInfo._id, INTERESTED.toLowerCase())}
            >
              {INTERESTED}
            </button>
            <button
              className="btn btn-primary text-black"
              onClick={() => userAction(userInfo._id, IGNORED.toLowerCase())}
            >
              {IGNORED}
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default UserCard;
