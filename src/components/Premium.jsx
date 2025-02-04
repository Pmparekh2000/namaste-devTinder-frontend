import { GOLD, MEMBERSHIP, SILVER, SPACE } from "../utils/constants";

const Premium = () => {
  return (
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
          <button className="btn btn-primary">Enroll Now</button>
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
          <button className="btn btn-primary">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
