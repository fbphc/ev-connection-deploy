import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {  Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";
import { FaBars } from "react-icons/fa";
import { GoPlug } from "react-icons/go";

import LoginModal from "../routes/auth/Login.js";
import Register from "../routes/auth/Register.js";

import { Link, useLocation } from "react-router-dom";
import { BurgerLinkStyled } from "../../components.styled/styledComponents.js";
import useAuth from "../../context/authContext/useAuth.js";
import noPhoto from "../../img/noPhoto.png";
import logosmall from "../../img/logosmall.png";
import { AiFillCar } from "react-icons/ai";
import { MainButton } from "../../components.styled/styledComponents.js";
import {
  ImageStyled,
  ImgStyled,
  BurgerImgDivStyled,
  LinkStyled,
  LogoStyled
} from "../../components.styled/styledComponents.js";

export default function NavBar() {
  const { tokenValidator, signOut, isAuthenticated, getProfileInfo, userInfo, state} =
    useAuth();
  const location = useLocation();
  const [user, setUser] = useState({});
  const [modalLogin, setModalLogin] = useState(false);
  const toggleLogin = () => setModalLogin(!modalLogin);

  const [modalRegister, setModalRegister] = useState(false);
  const toggleRegister = () => setModalRegister(!modalRegister);

  const [show, setShow] = useState(false);
  function closeMenu() {
    setShow(false);
  }

  
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user)
      tokenValidator();
      setUser(parsedUser)
    } else {
      setUser({});
    }
  }, [location.pathname, isAuthenticated, show]);

  function loggingOut() {
    signOut();
    setShow(false);
  }

  return (
    <div className="d-flex align-items-center justify-content-between dark position-sticky fixed-top">
      <LogoStyled>
        <img src={logosmall} className="w-25" alt="logo" />
      </LogoStyled>
      <div className="d-flex align-items-center">
        {isAuthenticated && <AiFillCar className="h3 secondaryText mx-2" />}
        <button
          className="bg-transparent border-0"
          onClick={function noRefCheck() {
            setShow(true);
          }}
        >
          <FaBars className="secondaryText h2" />
        </button>
        <Offcanvas
          className="dark"
          isOpen={show}
          direction="end"
          toggle={function noRefCheck() {
            setShow(false);
          }}
        >
          <OffcanvasHeader
            toggle={function noRefCheck() {
              setShow(false);
            }}
            className="secondary"
          >
            {isAuthenticated  ? (
              <>

                <LinkStyled to="/account" onClick={() => setShow(false)} className="d-flex align-items-center">
                  {user.imgProfile && user.imgProfile !== "no_photo" ? (
                    <>
                      <BurgerImgDivStyled>
                        <ImageStyled

                          cloudName="schoolgroupfinal"
                          publicId={user.imgProfile}
                        />
                      </BurgerImgDivStyled>
                    </>
                  ) : (
                    <>
                      <BurgerImgDivStyled>
                        <ImgStyled
                          src={noPhoto}
                          alt="user"
                        />
                      </BurgerImgDivStyled>
                    </>
                  )}
                  <p className="d-block mx-3 mt-2">My Profile</p>
                  
                </LinkStyled>
              </>
            ) : (
              <MainButton onClick={toggleRegister}>
                Join the community
              </MainButton>
            )}

            <Register
              modalRegister={modalRegister}
              toggleRegister={toggleRegister}
              closeMenu={closeMenu}
            />
          </OffcanvasHeader>

          <OffcanvasBody>
            <strong className="d-flex flex-column gap-3 mt-3">
              <Link
                className="text-dark text-decoration-none"
                onClick={closeMenu}
                to="/"
              >
                <BurgerLinkStyled>
                  <GoPlug className="me-2" />
                  Home
                </BurgerLinkStyled>
              </Link>
              <Link
                className="text-dark text-decoration-none"
                onClick={closeMenu}
                to="aboutus"
              >
                <BurgerLinkStyled>
                  <GoPlug className="me-2" />
                  About us
                </BurgerLinkStyled>
              </Link>

             {isAuthenticated && <Link
                className="text-dark text-decoration-none"
                onClick={closeMenu}
                to="germany"
              >
                <BurgerLinkStyled>
                  <GoPlug className="me-2" />
                  Map
                </BurgerLinkStyled>
              </Link>}
              {isAuthenticated && 
              <Link
              className="text-dark text-decoration-none"
              onClick={closeMenu}
              to="board"
              >
                <BurgerLinkStyled>
                  <GoPlug className="me-2" />
                  Message Board
                </BurgerLinkStyled>
              </Link>
              }
              <Link
                className="text-dark text-decoration-none"
                onClick={closeMenu}
                to="contact"
              >

                <BurgerLinkStyled>
                  <GoPlug className="me-2" />
                  Contact us
                </BurgerLinkStyled>
              </Link>

              {!isAuthenticated ? (
                <BurgerLinkStyled onClick={toggleLogin} role="button">
                  Login
                </BurgerLinkStyled>
              ) : (
                <BurgerLinkStyled role="button" onClick={loggingOut}>
                  Sign Out
                </BurgerLinkStyled>
              )}
              <LoginModal
                modalLogin={modalLogin}
                toggleLogin={toggleLogin}
                closeMenu={closeMenu}
              />
            </strong>
          </OffcanvasBody>
        </Offcanvas>
      </div>
    </div>
  );
}
