import React, { useEffect, useState } from "react";
import useComments from "../../context/commentsContext/useComments";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Fade, Form, FormGroup, Input } from "reactstrap";

import {
  ImageStyled,
  ImgStyled,
  DiMsgImgDivStyled,
  LinkStyled,
  MainButton,
  ParDisplayStyled
} from "../../components.styled/styledComponents.js";

import noPhoto from "../../img/noPhoto.png";
function Conversations() {
  const {
    getAllConversations,
    allConversations,
    getDirectMsgs,
    allDirectMsgs,
    addADirectMsg
  } = useComments();
  const [user, setUser] = useState({});
  const [dirMsgs, setDirMsgs] = useState();
  const [modal, setModal] = useState(false);
  const initState = { directMsg: "", senderId: "", receiverId: "" };
  const [message, setMessage] = useState(initState);
  const [requiredToggle, setRequiredToggle] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    getDirectMsgs({ conversationId: dirMsgs });
    
  }, [modal]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));
      setUser(user);
      getAllConversations({ userId: user.id });
      
    }
  }, []);
  
  function inputHandler(e) {
    setMessage((prev)=>({
      directMsg: e.target.value,
      senderId: user !== null ? user.id : null,
      receiverId:
        allDirectMsgs.firId === user.id
          ? allDirectMsgs.secId
          : allDirectMsgs.firId,
    }))
  }
  function submit(e) {
    
    if (message.directMsg === "") return setRequiredToggle(true)
    addADirectMsg(message);
    toggle();
  }

  return (
    <Fade className="mx-auto w-75 mt-4 p-2">
      {allConversations.map((item, idx) => {
        return (
          <div key={idx + ""} >
            <ParDisplayStyled
              
              onClick={() => {
                setDirMsgs(item.conversationId);
                setModal(!modal);
              }}
            >
              {item.senderId !== user.id ? item.senderName : item.receiverName}
            </ParDisplayStyled>
          </div>
        );
      })}
      <Modal isOpen={modal} toggle={toggle} fullscreen>
        <ModalHeader toggle={toggle}>Messages</ModalHeader>
        <ModalBody className="secondary darkText ">
          <div className="pb-3 border border-top-0 border-start-0 border-end-0">
            <Form>
              <FormGroup>
                <Input
                  className="mb-2"
                  placeholder="Your Message"
                  onChange={inputHandler}
                  onFocus={() => setRequiredToggle(false)}
                  rows="3"
                  name="text"
                  type="textarea"
                />
                {requiredToggle && (
                  <Fade className="mt-3 mx-1">
                    Please add a{" "}
                    <span className="danger mx-1">
                      <b>Message</b>
                    </span>
                  </Fade>
                )}
              </FormGroup>
            </Form>
              <MainButton onClick={submit}>
                Reply
              </MainButton>
            {allDirectMsgs.sortedConv &&
              allDirectMsgs.sortedConv.map((item, idx) => {
                if (item.currentMessageSender === user.id) {
                  return (
                    <div
                      key={idx + ""}
                      className="d-flex align-items-center border border-bottom-0 border-start-0 border-end-0 pt-3 mb-2 mt-3"
                    >
                      {user.imgProfile === "no_photo" ? (
                        <>
                          <div>
                            <DiMsgImgDivStyled>
                              <ImgStyled src={noPhoto} alt="user" />
                            </DiMsgImgDivStyled>
                            <p className="my-auto ms-1 sm">
                              <small>{item.dateNow && item.dateNow[0]}</small>
                            </p>
                          </div>
                          <p className="my-0 mx-2">{item.messageText}</p>
                        </>
                      ) : (
                        <>
                          <div>
                            <DiMsgImgDivStyled>
                              <ImageStyled
                                cloudName="schoolgroupfinal"
                                publicId={user.imgProfile}
                              />
                            </DiMsgImgDivStyled>
                            <p className="my-auto ms-1 sm">
                              <small>{item.dateNow && item.dateNow[0]}</small>
                            </p>
                          </div>
                          <p className="my-auto mx-2"> {item.messageText}</p>
                        </>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={idx + ""}
                      className="d-flex align-items-center border border-bottom-0 border-start-0 border-end-0 pt-3 mb-2"
                    >
                      <>
                        {user.id === allDirectMsgs.firId ? (
                          allDirectMsgs.secImgProfile === "no_photo" ? (
                            <>
                              <div>
                                <DiMsgImgDivStyled>
                                  <ImgStyled src={noPhoto} alt="user" />
                                </DiMsgImgDivStyled>
                                <p className="my-auto ms-1 sm">
                                  <small>
                                    {item.dateNow && item.dateNow[0]}
                                  </small>
                                </p>
                              </div>
                            </>
                          ) : (
                            <>
                              <div>
                                <DiMsgImgDivStyled>
                                  <ImageStyled
                                    cloudName="schoolgroupfinal"
                                    publicId={allDirectMsgs.secImgProfile}
                                  />
                                </DiMsgImgDivStyled>
                                <p className="my-auto ms-1 sm">
                                  <small>
                                    {item.dateNow && item.dateNow[0]}
                                  </small>
                                </p>
                              </div>
                            </>
                          )
                        ) : allDirectMsgs.firImgProfile === "no_photo" ? ( // else
                          <>
                            <div>
                              <DiMsgImgDivStyled>
                                <ImgStyled src={noPhoto} alt="user" />
                              </DiMsgImgDivStyled>
                              <p className="my-auto ms-1 sm">
                                <small>{item.dateNow && item.dateNow[0]}</small>
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div>
                              <DiMsgImgDivStyled>
                                <ImageStyled
                                  cloudName="schoolgroupfinal"
                                  publicId={allDirectMsgs.firImgProfile}
                                />
                              </DiMsgImgDivStyled>
                              <p className="my-auto ms-1 sm">
                                <small>{item.dateNow && item.dateNow[0]}</small>
                              </p>
                            </div>
                          </>
                        )}
                        <div>
                          <LinkStyled
                            to={
                              user.id === allDirectMsgs.secId
                                ? `/userProfile/${allDirectMsgs.firId}`
                                : `/userProfile/${allDirectMsgs.secId}`
                            }
                            state={
                              user.id === allDirectMsgs.secId
                                ? { id: allDirectMsgs.firId }
                                : { id: allDirectMsgs.secId }
                            }
                            className="my-0"
                          >
                            <p className="my-0">
                              <b>
                                {user.id === allDirectMsgs.secId
                                  ? allDirectMsgs.firName
                                  : allDirectMsgs.secName}
                              </b>
                            </p>
                          </LinkStyled>
                          <p className="my-0 mx-2">{item.messageText}</p>
                        </div>
                      </>
                    </div>
                  );
                }
              })}
          </div>
        </ModalBody>
        <ModalFooter className="secondary border-0"></ModalFooter>
      </Modal>
    </Fade>
  );
}

export default Conversations;
