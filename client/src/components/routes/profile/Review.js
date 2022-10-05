import React, { useState, useEffect } from "react";
import { Form, Input, FormGroup } from "reactstrap";
import { useLocation } from "react-router-dom";
import useComments from "../../../context/commentsContext/useComments";
import useAuth from "../../../context/authContext/useAuth";
import Pages from "../../pagination/Pages";

import noPhoto from "../../../img/noPhoto.png";

import { Row, Col } from "reactstrap";

import {
  MainButton,
  ImageStyled,
  MainMsgDivStyled,
  MsgImgDivStyled,
  ImgStyled,
  LinkStyled,
} from "../../../components.styled/styledComponents";
import NotAuthorized from "../../error/NotAuthorized";

function Review() {
  const location = useLocation();
  const pathUrl = location.pathname;

  const { addAReview, getReviews, allReviews, state } = useComments();
  const { getProfileInfo, isAuthenticated } = useAuth();

  const initState = {
    fromUsername: "",
    fromUserId: null,
    review: "",
    toUserId: null,
  };

  const [review, setReview] = useState(initState);

  /** */
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentReviews = allReviews.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const numberOfPages = Math.ceil(allReviews.length / commentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  /** */

  useEffect(() => {
    const pathEnd = +location.pathname.split("/userProfile/")[1];
    getReviews(pathEnd);
  }, [state.review]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      const pathEnd = +location.pathname.split("/userProfile/")[1];
      setReview({
        ...review,
        fromUserId: user.id,
        fromUsername: user.username,
        fromImgProfile: user.imgProfile,
        toUserId: pathEnd,
      });
    }
  }, []);

  function changeHandler(e) {
    setReview((prevState) => {
      return { ...prevState, review: e.target.value };
    });
  }
  function submit(e) {
    e.preventDefault();
    addAReview(review);
    e.target.reset();
  }
  return (
    <div className="w-75 mx-auto">
      {localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id !==
            +pathUrl.split("/userProfile/")[1] && (
            <Form onSubmit={submit}>
              <div onChange={changeHandler}>
                <FormGroup>
                  <Input
                    className="mt-2"
                    id="exampleText"
                    name="text"
                    type="textarea"
                    placeholder="Add a Review"
                    required
                  />
                </FormGroup>
              </div>
              <div className="text-center mt-4">
                <MainButton type="submit">Send</MainButton>
              </div>
            </Form>
          )
        : null}
      {currentReviews.map((item, idx) => {
        return (
          <MainMsgDivStyled className="my-3" key={idx + ""}>
            <Row
              className="d-flex mt-1 border border-top-0 border-start-0 border-end-0 pb-1"
            >
              <Col className="my-2 col-3 col-xs-6 me-3 text-center">
                {item.fromImgProfile === "no_photo" ? (
                  <MsgImgDivStyled>
                    <ImgStyled src={noPhoto} alt="user" />
                  </MsgImgDivStyled>
                ) : (
                  <MsgImgDivStyled>
                    <ImageStyled
                      cloudName="schoolgroupfinal"
                      publicId={item.fromImgProfile}
                    />
                  </MsgImgDivStyled>
                )}

                <LinkStyled
                  to={`/userProfile/${item.fromUserId}`}
                  state={{ id: item.fromUserId }}
                  onClick={() => getProfileInfo(item.fromUserId)}
                >
                  {item.fromUsername}
                </LinkStyled>
              </Col>
              <Col className="mx-4">
                <p className="mb-3">
                  <b>Date: </b> {item.dateNow[0]} 
                </p>
                <p className="my-0">
                  <b>Message: </b>{" "}
                </p>
                <p className="my-0">{item.review}</p>
              </Col>
            </Row>
          </MainMsgDivStyled>
        );
      })}
      <div className="mt-5">
        <Pages
          paginate={paginate}
          numberOfPages={numberOfPages}
          pages={allReviews}
        />
      </div>
    </div>
  );
}

export default Review;
