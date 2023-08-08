import { FC } from "react";
import { ThreeCircles } from "react-loader-spinner";

export const Loader: FC = () => {
  return (
    <ThreeCircles
      height="30"
      width="30"
      color="#4fa94d"
      wrapperStyle={{
        padding: "1rem 0",
        margin:"0 auto",
        display:'flex',
        justifyContent:'center'
      }}
      
      wrapperClass=""
      visible={true}
      ariaLabel="three-circles-rotating"
      outerCircleColor=""
      innerCircleColor=""
      middleCircleColor=""
    />
  );
};
