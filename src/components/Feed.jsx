import axios from "axios";
import { BASE_URL, USER } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const users = useSelector((store) => store?.feed);
  const dispatch = useDispatch();

  const getUserFeed = async () => {
    // If the feed is already present then don't make the API call instead return
    if (users) return;
    try {
      const userFeedData = await axios.get(BASE_URL + USER + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(userFeedData?.data?.users));
    } catch (error) {
      console.log("Error obtained while making the feed API call", error);
    }
  };
  useEffect(() => {
    getUserFeed();
  }, []);

  const updateFeed = (_id) => {
    const remainingFeed = users.filter((user) => {
      return user._id !== _id;
    });
    dispatch(addFeed(remainingFeed));
  };

  return users ? (
    <div className="flex justify-center my-10">
      {users.map((user) => {
        return (
          <UserCard
            key={user._id}
            userInfo={user}
            updateFeed={updateFeed}
            isFeedPage={true}
          />
        );
      })}
    </div>
  ) : (
    <></>
  );
};

export default Feed;
