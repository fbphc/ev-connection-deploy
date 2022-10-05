import React, { useEffect, useState } from "react";
import "leaflet-routing-machine";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import RoutingComp from "../mainMap/RoutingComp";
import useMap from "../../../context/mapContext/useMap.js";

import { useNavigate, Link, useLocation } from "react-router-dom";
import noPhoto from "../../../img/noPhoto.png";
import route2 from "../../../img/route2.png";

import {
  MainButton,
  PopupImgDivStyled,
  ImageStyled,
  RouteImgDivStyled,
  ImgStyled,
} from "../../../components.styled/styledComponents";

function FinalRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location.pathname);
  const { endPoint, startPoint, locations, ownerArray, getEndPoint } = useMap();
  const [newPosition, setNewPosition] = useState();
  const [newEndPoint, setNewEndPoint] = useState();
  const center = newPosition;
  console.log(newPosition);

  useEffect(() => {
    ownerArray("all");
    if (localStorage.getItem("position")) {
      const actualPosition = localStorage.getItem("position");
      const parsedPos = JSON.parse(actualPosition);
      setNewPosition(parsedPos);
  
      if (localStorage.getItem("goalpoint")) {
      const goalpoint = localStorage.getItem("goalpoint");
      console.log(JSON.parse(goalpoint));
      setNewEndPoint(JSON.parse(goalpoint));
    }
    }
  }, []);

  function getNewCoordinates(routeData) {
    localStorage.setItem("goalpoint", JSON.stringify(routeData))
    getEndPoint(routeData);
  }

  return (
    <>
      <div className="mx-2 my-3 border rounded border-2">
        <MapContainer center={center} zoom={6}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((item, idx) => (
            <Marker
              position={[item.latitude, item.longitude]}
              key={idx + "marker"}
            >
              <Popup>
                <PopupImgDivStyled>
                  <Link to={`/userProfile/${item.id}`} state={{ id: item.id }}>
                    {item.imgProfile && item.imgProfile !== "no_photo" ? (
                      <ImageStyled
                        cloudName="schoolgroupfinal"
                        publicId={item.imgProfile}
                      />
                    ) : (
                      <ImgStyled src={noPhoto} alt="user" />
                    )}
                  </Link>
                </PopupImgDivStyled>
                <div className="text-center mx-auto h5">
                  <p>
                    <b>{item.username}</b>
                  </p>
                  <p>{item.typeOfCharger}</p>
                  {newPosition && (
                    <Link
                      to={
                        location.pathname === "/calc_route"
                          ? "/calc_newroute"
                          : "/calc_route"
                      }
                      onClick={(e) =>
                        getNewCoordinates({
                          lat: item.latitude,
                          lng: item.longitude,
                        })
                      }
                    >
                      <RouteImgDivStyled>
                        <ImgStyled src={route2} alt="route" />
                      </RouteImgDivStyled>
                    </Link>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {newPosition && (
            <RoutingComp
              from={[newPosition.lat, newPosition.lng]}
              to={[newEndPoint.lat, newEndPoint.lng]}
              
            >
              <Popup>
                <p>hello</p>
              </Popup>
            </RoutingComp>
          )}
        </MapContainer>
      </div>
      <div className="d-flex">
        <MainButton
          color="warning"
          outline
          onClick={() => navigate("/germany")}
          className="mx-auto w-25"
        >
          Back
        </MainButton>
      </div>
    </>
  );
}

export default FinalRoute;
