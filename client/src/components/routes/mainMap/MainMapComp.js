import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";

import LocationMarker from "../finalMap/LocationMarker.js";

import useMap from "../../../context/mapContext/useMap.js";
import useAuth from "../../../context/authContext/useAuth.js";

import noPhoto from "../../../img/noPhoto.png";
import route2 from "../../../img/route2.png";

import {
  ImageStyled,
  ImgStyled,
  PopupImgDivStyled,
  RouteImgDivStyled,
} from "../../../components.styled/styledComponents";

function MainMapComp({ chargerFilter }) {
  const { isAuthenticated } = useAuth();

  const center = [50.56, 9.71];

  const { locations, ownerArray, startPoint, getEndPoint } = useMap();

  useEffect(() => {
    ownerArray(chargerFilter.typeOfCharger);
  }, [chargerFilter]);

  function getCoordinates(routeData) {
    localStorage.setItem("goalpoint", JSON.stringify(routeData))
    
    getEndPoint(routeData);
  }

  return (
    <>
      <div className="border rounded border-2">
        <MapContainer
          center={center}
          zoom={6}
          className="leaflet-container fullscreen"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {isAuthenticated
            ? locations.map((item, idx) => (
                <Marker
                  position={[item.latitude, item.longitude]}
                  key={idx + "marker"}
                >
                  <Popup>
                    <PopupImgDivStyled>
                      <Link
                        to={`/userProfile/${item.id}`}
                        state={{ id: item.id }}
                      >
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
                      {startPoint !== null && (
                        <Link
                          to="/calc_route"
                          onClick={(e) =>
                            getCoordinates({
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
              ))
            : locations.map((item, idx) => (
                <CircleMarker
                  center={[item.latitude, item.longitude]}
                  pathOptions={{
                    fillColor: "blue",
                    fillOpacity: 0.6,
                    color: "lightblue",
                  }}
                  radius={10}
                  key={idx + "marker"}
                >
                  <Popup>
                    <p className="text-center">
                      <b>{item.username}</b>
                    </p>
                  </Popup>
                </CircleMarker>
              ))}
          <LocationMarker />
        </MapContainer>
      </div>
    </>
  );
}

export default MainMapComp;
