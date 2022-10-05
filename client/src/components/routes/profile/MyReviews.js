import React, { useEffect, useState } from "react";
import useComments from "../../../context/commentsContext/useComments";
import useAuth from "../../../context/authContext/useAuth";
import Pages from "../../pagination/Pages";

import noPhoto from "../../../img/noPhoto.png";

import { Row, Col } from "reactstrap";

import { MsgImgDivStyled, ImageStyled, ImgStyled, MainMsgDivStyled, LinkStyled } from "../../../components.styled/styledComponents";

function MyReviews({ userInfo }) {

  const { getReviews, allReviews } = useComments();
  const { getProfileInfo } = useAuth();

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

  useEffect(() => {
    if (localStorage.getItem("user")) {
      getReviews(userInfo.id);
    }
  }, []);


  return (
    <>
      {currentReviews.length === 0 ? <p className="text-center h2 mt-3">You have no reviews</p> : currentReviews.map((item, idx) => {
        return (
          <MainMsgDivStyled className="my-3 w-75" key={idx + "comment"}>
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
                  className="mx-auto"
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
        <Pages paginate={paginate} numberOfPages={numberOfPages} pages={allReviews} />
      </div>
    </>
  );
}

export default MyReviews;
