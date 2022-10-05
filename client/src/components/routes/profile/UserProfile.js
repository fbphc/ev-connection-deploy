import { useEffect } from "react";

import useAuth from "../../../context/authContext/useAuth.js";
import { useLocation } from "react-router-dom";
import noPhoto from "../../../img/noPhoto.png";
import Review from "./Review.js";
import NotAuthorized from "../../error/NotAuthorized.js";
import MessagesForm from "../../directMessages/MessagesForm.js";

import { ProfileImgDivStyled, ImageStyled, ImgStyled, ProfileDataStyled, ProfileContainerStyled } from "../../../components.styled/styledComponents"


function OwnerProfile() {
  const { getProfileInfo, userInfo, isAuthenticated } = useAuth();

  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const { id } = location.state;
      const pathEnd = location.pathname.split("/userProfile/")[1];
      id !== null ? getProfileInfo(pathEnd) : getProfileInfo(id);
    }
  }, [location.state.id]);


  return (
    <>
    {isAuthenticated ?
    <div>
     
        <>
          <ProfileContainerStyled>
            {userInfo.imgProfile && userInfo.imgProfile !== "no_photo" ? (
              <div>
                <ProfileImgDivStyled>
                  <ImageStyled
                    cloudName="schoolgroupfinal"
                    publicId={userInfo.imgProfile}
                  />
                </ProfileImgDivStyled>
                <MessagesForm userInfo={userInfo}/>
              </div>
            ) : (
              <div>
                <ProfileImgDivStyled>
                  <ImgStyled src={noPhoto} alt="user" />
                </ProfileImgDivStyled>
                <MessagesForm userInfo={userInfo}/>
              </div>
            )}
            <ProfileDataStyled>
              <div className="d-flex justify-content-between border-bottom border-light">
                <p>User Name:</p>
                <p>{userInfo.username}</p>
              </div>
              <div className="d-flex justify-content-between border-bottom border-light">
                <p>First Name:</p>
                <p>{userInfo.fname}</p>
              </div>
              <div className="d-flex justify-content-between border-bottom border-light">
                <p>Last Name:</p>
                <p>{userInfo.lname}</p>
              </div>
              <div className="d-flex justify-content-between border-bottom border-light">
                <p>Email:</p>
                <p>{userInfo.email}</p>
              </div>
              {userInfo.isOwner && (
                <div className="d-flex justify-content-between border-bottom border-light">
                <p>Availability:</p>
                <p>
                  {userInfo.availability}
                </p>
              </div>
              )}
              {userInfo.isOwner && (
                <div className="d-flex justify-content-between border-bottom border-light darkText">
                  <p>Address:</p>
                  <p>
                    {userInfo.address.street}
                    {userInfo.address.houseNr}, {userInfo.address.postalcode}
                    <br></br>{userInfo.address.city}
                  </p>
                </div>
              )}
             
              {userInfo.telNumber && (
                <div className="d-flex justify-content-between border-bottom border-light darkText">
                  <p>Phone Number</p>
                  <p>{userInfo.telNumber}</p>
                </div>
              )}
            </ProfileDataStyled>
          </ProfileContainerStyled>

          <Review />
        </>
      
      
    </div> : <NotAuthorized/>}
    </>
    
  );
}
export default OwnerProfile;
