import React, { useState } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import emailjs from "@emailjs/browser";
import fabPro from "../../../img/fabPro.jpg";
import isrPro from "../../../img/isrPro.jpeg";
import wilPro from "../../../img/wilPro.jpeg";

import { MainButton, ContactImgDiv, ImgStyled } from "../../../components.styled/styledComponents";

export default function ContactUs() {
  const [value, setValue] = useState({});

  function contactHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setValue((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_4dho4yn",
        "template_pcnzc8y",
        e.target,
        "1ZmCKBSxMK_G_FGGc"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
    );
    e.target.reset();
  };

  return (
    <div className="text-light p-2 d-flex flex-column gap-4">
      <div className="p-3 ">
        <p className="h1 text-center">Contact Us</p>
        <div className="text-center">
          <p>
            Please get in touch, and our expert support team will answer all
            your questions.
          </p>
        </div>
        <Form
          className="d-flex flex-column align-items-center w-100"
          onSubmit={sendEmail}
          onChange={contactHandler}
        >
          <FormGroup className="w-75">
            <Input
              type="text"
              placeholder="Full Name"
              autoComplete=""
              name="user_name"
            />
          </FormGroup>
          <FormGroup className="w-75">
            <Input
              type="email"
              placeholder="Email"
              autoComplete=""
              name="email"
            />
          </FormGroup>
          <FormGroup className="w-75">
            <Input
              type="textarea"
              placeholder="Your Message"
              rows="12"
              cols="24"
              name="message"
            />
          </FormGroup>
          <div className="d-flex gap-3">
            <MainButton outline type="submit" value="send">
              send
            </MainButton>
            <MainButton outline type="reset">
              reset
            </MainButton>
          </div>
        </Form>
      </div>
      <div className="d-flex flex-column align-items-center gap-1 p-2">
        <p className="w-75 text-center h5">
          Meet our brilliant and knowledgeable support team
        </p>
        <div className=" d-flex justify-content-center flex-wrap">
          <div>
            <ContactImgDiv>
              <ImgStyled
                src={fabPro}
                alt="Fabio Petrella"
              />
            </ContactImgDiv>
              <p className="text-center h4">Fabio Petrella</p>
          </div>
          <div>
          <ContactImgDiv>
              <ImgStyled
                src={isrPro}
                alt="Isra Gonzalez"
              />
              </ContactImgDiv>
              <p className="text-center h4">Isra Gonzalez</p>
          </div>
          <div>
          <ContactImgDiv>
              <ImgStyled
                src={wilPro}
                alt="William Mallak"
              />
              </ContactImgDiv>

              <p className="text-center h4">William Mallak</p>
            </div>
          
        </div>
      </div>
    </div>
  );
}
