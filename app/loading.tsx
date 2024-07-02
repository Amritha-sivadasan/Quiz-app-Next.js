import React from "react";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center">
      <img
        src="https://img.freepik.com/free-photo/red-light-round-podium-black-background-mock-up_43614-950.jpg?size=626&ext=jpg&ga=GA1.1.1991501620.1709119395&semt=sph"
        alt=""
        className="animate-spin h-12 w-12"
      />
    </div>
  );
};

export default Loading;
