import React from "react";
import mapImg from "../../../img/mapImg.png";
import { MapImgStyled } from "../../../components.styled/styledComponents"

function LandingPage() {
  return (
    <>

      <div className="position-realtive w-75 mx-auto mt-2">
        <MapImgStyled src={mapImg} alt="landing-map" className=" w-100" />
      </div>
      <div className="text-center">
        <p className="h1 text-light"> WELCOME TO <br></br>EV-<span className="text-warning"><b>C</b></span>ONNECTION</p>
      </div>
    </>
  );
}

export default LandingPage;
