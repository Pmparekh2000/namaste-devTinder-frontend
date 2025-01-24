import axios from "axios";
import { BASE_URL, USER } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getUserFeed = async () => {
    // If the feed is already present then don't make the API call instead return
    if (feed) return;
    try {
      const userFeedData = await axios.get(BASE_URL + USER + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(userFeedData?.data));
    } catch (error) {
      console.log("Error obtained while making the feed API call", error);
    }
  };
  useEffect(() => {
    getUserFeed();
  }, []);
  return <div>This is the feed component</div>;
};

export default Feed;
