import { IGNORED, INTERESTED } from "../utils/constants";

const UserCard = (props) => {
  const { userInfo } = props;

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
        <div className="card-actions justify-center my-4">
          <button className="btn btn-secondary text-black">{INTERESTED}</button>
          <button className="btn btn-primary text-black">{IGNORED}</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
