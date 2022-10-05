import React from "react";
import CommentForm from "./CommentForm.js";
import DisplayComments from "./DisplayComments.js";
import useAuth from "../../../context/authContext/useAuth.js";
import NotAuthorized from "../../error/NotAuthorized.js";

function MessageBoard() {
  const { isAuthenticated } = useAuth();
  return (
    <>
    <p className="h1 text-center m-5 darkText">Message Board</p>
      {isAuthenticated ? (
        <>
          <CommentForm />
          <DisplayComments />
        </>
      ) : (
        <NotAuthorized />
      )}
    </>
  );
}

export default MessageBoard;
