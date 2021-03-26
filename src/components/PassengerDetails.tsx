import React from "react";

type passengerType = {
  _id: string;
  name: string;
  trips: number;
};

const PassengerDetails = (i: passengerType) => {
  return (
    <div className="comment-box">
      <div className="name-email">
        <p className="name"> Passenger id: {i._id}</p>{" "}
        <p className="email">Passenger name: {i.name} </p>{" "}
      </div>
      <p className="comment"> Passenger total trips: {i.trips}</p>
      <p>Total amount of paid : {i.trips * 199}</p>
    </div>
  );
};

export default PassengerDetails;
