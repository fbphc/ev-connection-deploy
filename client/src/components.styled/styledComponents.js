import styled from "styled-components";
import { Image } from "cloudinary-react";
import { PaginationLink } from "reactstrap";
import { Link } from "react-router-dom";



export const ContactImgDiv = styled.div`
width: 10rem;
height: 10rem;
border-radius: 50%;
border: 2px solid var(--danger-color);
margin: 2rem 3rem 1rem;
`


export const ParDisplayStyled = styled.p`
text-align: center;
font-size: 1.4rem;
transition: all 0.3s;
color: var(--dark-color);
border: 1px solid var(--danger-color);
border-radius: 2rem;
margin: 0.4rem 0;
&:hover{
  background-color: var(--secondarybla-color);
  cursor: pointer;
}

`

export const ProfileContainerStyled = styled.div`
  display: flex;
  width: 60%;
  text-align: center;
  margin: 2.5rem auto;
  ${'' /* padding: 0 0 0 2.5rem; */}
  @media (max-width: 800px) {
    display: block;
    padding: 0;
  }
`;
export const ProfileImgDivStyled = styled.div`
  width: 10rem;
  height: 10rem;
  border: 5px solid var(--dark-color);
  border-radius: 50%;
  margin-top: 2.2rem;
  @media (max-width: 800px) {
    margin: 1rem auto;   
  }
`;
export const PopupImgDivStyled = styled.div`
  width: 4rem;
  height: 4rem;
  border: 5px solid var(--dark-color);
  border-radius: 50%;
  margin: 1.5rem auto 0;
`

export const RouteImgDivStyled = styled.div`
  width: 5rem;
  height: 5rem;
  border: 2px solid var(--dark-color);
  border-radius: 50%;
  margin: 0 auto;
  `
export const ProfileDataStyled = styled.div`
  width: 100%;
  margin-left: 2.5rem;
  padding-top: 2.5rem;
  color: var(--dark-color);
  @media (max-width: 800px) {
    margin: 0 auto;
  }
`

export const MsgImgDivStyled = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 5px solid var(--dark-color);
  margin: 0 auto;
`;
export const DiMsgImgDivStyled = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 5px solid var(--dark-color);
  margin: 0 auto;
`;
export const MainMsgDivStyled = styled.div`
  width: 90%;
  margin: 1rem auto;
  color: var(--dark-color);
  padding: 1rem 2rem;
  background-color: #114360;
  border-radius: 1rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  margin-bottom: 5rem;
`;
export const BurgerImgDivStyled = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid var(--dark-color);
`;

export const LinkStyled = styled(Link)`
  transition: all 0.2s;
  color: var(--dark-color);
  text-align: center;
  /* display: block; */
  text-decoration: none;
  margin-top: 0.5rem;
  &:hover {
    color: var(--danger-color);
  }
`;

export const MainButton = styled.button`
  padding: 0.4rem 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid var(--danger-color);
  background-color: transparent;
  color: var(--dark-color);
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background-color: var(--danger-color);
    border: 1px solid var(--dark-color);
  }
  &:active {
    transform: scale(1.1);
  }
`;

// images
// home page
export const MapImgStyled = styled.img`
  @media (max-width: 1100px) {
    margin-top: 10%;
    margin-bottom: 15%;
  }
  @media (max-width: 700px) {
    margin-top: 30%;
    margin-bottom: 30%;
  }
`;

// about us
export const ImgAboutStyled = styled.img`
  width: 100%;
  max-height: 40rem;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const ImgChargersStyled = styled.img`
  width: 100%;
  @media (min-width: 900px) {
    width: 70%;
  }
`;

export const PagLinkFirstStyled = styled(PaginationLink)`
  padding: 0.4rem 1rem;
  margin: 0 0.2rem;
  border-radius: 0.4rem 0 0 0.4rem;
  border: 1px solid var(--danger-color);
  background-color: transparent;
  color: var(--dark-color);
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background-color: var(--danger-color);
    border: 1px solid var(--dark-color);
  }
  &:active {
    transform: scale(1.1);
  }
  &:focus {
    background-color: transparent;
    color: var(--dark-color);
  }
`;
export const PagLinkLastStyled = styled(PaginationLink)`
  padding: 0.4rem 1rem;
  margin: 0 0.2rem;
  border-radius: 0 0.4rem 0.4rem 0;
  border: 1px solid var(--danger-color);
  background-color: transparent;
  color: var(--dark-color);
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background-color: var(--danger-color);
    border: 1px solid var(--dark-color);
  }
  &:active {
    transform: scale(1.1);
  }
  &:focus {
    background-color: transparent;
    color: var(--dark-color);
  }
`;
export const PagLinkStyledNum = styled(PaginationLink)`
  padding: 0.4rem 1rem;
  margin: 0 0.4rem;
  border: 1px solid var(--danger-color);
  background-color: transparent;
  color: var(--dark-color);
  font-weight: bold;
  transition: all 0.3s;
  &:hover {
    background-color: var(--danger-color);
    border: 1px solid var(--dark-color);
  }
  &:active {
    transform: scale(1.1);
  }
  &:focus {
    background-color: transparent;
    color: var(--dark-color);
  }
`;

export const BurgerLinkStyled = styled.div`
  font-size: 1.2rem;
  transition: all 0.2s;
  display: inline-block;
  &:hover {
    color: var(--danger-color);
  }
`;

export const ImageStyled = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  padding:0.2rem;
`;

export const ImgStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  padding:0.2rem;
`;

export const LogoStyled = styled.div`
  width: 50%;
  padding: 0 1rem;
  @media (min-width: 1000px) {
    width: 25%;
    padding: 0 0.5rem;
  }
`
