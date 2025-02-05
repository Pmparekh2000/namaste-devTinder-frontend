import axios from "axios";
import {
  BASE_URL,
  GOLD,
  MEMBERSHIP,
  PAYMENT,
  SILVER,
  SPACE,
} from "../utils/constants";
import { useState } from "react";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  const verifyPremiumUser = async () => {
    const res = axios.get(BASE_URL + PAYMENT + "/verify", {
      withCredentials: true,
    });
    if (res.data.isPremium) {
      setIsUserPremium(true);
    }
  };
  const handleBuyClick = async (membershipType) => {
    const order = await axios.post(
      BASE_URL + PAYMENT + "/create",
      {
        membershipType,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId, emailId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Dev Tinder",
      description: "Connect to other developers",
      orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emaildId,
        contact: "999999999",
      },
      theme: {
        color: "#F37254",
      },
      handler: verifyPremiumUser(),
    };
    // It should open the razorpay dialogue box
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  return !isUserPremium ? (
    <div className="m-10">
      <div className="flex w-full">
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">{SILVER + SPACE + MEMBERSHIP}</h1>
          <ul>
            <li>Chat with other people</li>
            <li>100 connections requests per day</li>
            <li>Blue Tick</li>
            <li>Valid for 3 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("silver")}
            className="btn btn-primary"
          >
            Enroll Now
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>
        <div className="card bg-base-300 rounded-box grid h-80 flex-grow place-items-center">
          <h1 className="font-bold text-3xl">{GOLD + SPACE + MEMBERSHIP}</h1>
          <ul>
            <li>Chat with other people</li>
            <li>Infinite connections requests per day</li>
            <li>Blue Tick</li>
            <li>Valid for 6 months</li>
          </ul>
          <button
            onClick={() => handleBuyClick("gold")}
            className="btn btn-primary"
          >
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  ) : (
    <>You are already a premium user</>
  );
};

export default Premium;
