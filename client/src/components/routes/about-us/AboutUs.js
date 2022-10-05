import background from "../../../img/background.png";
import efficiency from "../../../img/efficiency.png";
import impact from "../../../img/impact.png";
import innovation from "../../../img/innovation.png";
import passion from "../../../img/passion.png";
import evcharge from "../../../img/evcharge.jpg";
import evcharge1 from "../../../img/evcharge1.jpg";

import { ImgAboutStyled, ImgChargersStyled } from "../../../components.styled/styledComponents";

export default function AboutUs() {
  return (
    <div className="secondary pb-5">
      <div className="position-relative text-center">
        <p className="rounded border border-0 p-1 position-absolute mt-5 start-50 translate-middle dark h1">
          About Us
        </p>
        <div className="mx-auto w-100">
          <ImgAboutStyled
            src={background}
            alt="wall_box"
          />
        </div>
      </div>

      <section className="container-fluid dark">
        <div className="row justify-content-md-center">
          <div className="col-6 col-md-3  d-flex justify-content-center p-3">
            <div className="w-25 info">
              <img className="w-100" src={innovation} alt="innovation-icon" />
            </div>
            <p className="my-auto p-2">Innovation</p>
          </div>
          <div className="col-6 col-md-3  d-flex justify-content-center p-3">
            <div className="w-25 info">
              <img className="w-100" src={passion} alt="innovation-icon" />
            </div>
            <p className="my-auto p-2">Passion</p>
          </div>
          <div className="col-6 col-md-3  d-flex justify-content-center p-3">
            <div className="w-25 info">
              <img className="w-100" src={efficiency} alt="innovation-icon" />
            </div>
            <p className="my-auto p-2">Efficiency</p>
          </div>
          <div className="col-6 col-md-3  d-flex justify-content-center p-3">
            <div className="w-25 info">
              <img className="w-100" src={impact} alt="innovation-icon" />
            </div>
            <p className="my-auto p-2">Impact</p>
          </div>
        </div>
      </section>

      <section className="pt-5 pb-1">
        <div className="dark mt-3 mb-4 ms-5">
          <h3 className="pt-4 ps-4">Who we are</h3>
          <p className="p-4">
            EV-CONNECTION is a platform that facilitates the connection
            between EV drivers & owners of wall-boxes.
            <br />
            <br />
            EV drivers can charge their electrical vehicles on the way just by
            connecting to wall-box owners in their surroundings.
          </p>
        </div>
      </section>

      <section className="pb-1 container-fluid">
        <div className="row justify-content-sm-center">
          <div className="col-9 col-sm-6">
            <div className="w-100 mb-1">
              <ImgChargersStyled src={evcharge} alt="ev-charger" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col"></div>
          <div className="col-9 col-sm-6">
            <div className="w-100">
              <ImgChargersStyled src={evcharge1} alt="ev-charger" />
            </div>
          </div>
        </div>
      </section>

      <section className="pt-2 pb-5">
        <div className="dark mt-3 ms-5">
          <p className="p-4">
            Easy to chat, search on the map & safely pay on the spot. Join the
            community for a more sustainable future & effortless EVcharging.
          </p>
        </div>
      </section>

      <section className="info pb-5 mb-5">
        <h3 className="w-50 text-center mx-auto pt-3 pb-3">
          Join our community today!
        </h3>
        <p className="w-75 text-center mx-auto">
          Are you always on the go? Easy find and charge your EV on the way!
          Connect with wall box owners everywhere.
        </p>
      </section>
      <a
        href="#top"
        className="position-fixed bottom-0 text-decoration-none start-0 p-1 rounded bg-transparent ms-5 mb-5 darkText arrowCSS"
      >
      </a>
    </div>
  );
}
