import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import useAuth from "../../../context/authContext/useAuth";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import {MainButton} from '../../../components.styled/styledComponents.js'

//isratest@gmail.com
export default function Login({ modalLogin, toggleLogin, closeMenu }) {
  const navigate = useNavigate();
  const { logIn, isAuthenticated } = useAuth();

  const [logInForm, setLogInForm] = useState({
    email: "",
    password: "",
  });

 
  function changeHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setLogInForm((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  const [passToggle, setPassToggle] = useState({
    showPassword: "",
  });

  function show_hidePassword(e) {
    setPassToggle({
      ...passToggle,
      showPassword: e === passToggle.showPassword ? "" : e,
    });
  }
  
  function submit(e) {
    e.preventDefault();
    logIn(logInForm);
    navigate("/germany");
    closeMenu();
    toggleLogin();
  }

  return (
    <Modal isOpen={modalLogin}>
      <ModalHeader>
        Login
        <IoCloseOutline
          className="fs-3 position-absolute end-0 me-2"
          onClick={toggleLogin}
          role="button"
        />
      </ModalHeader>
      <ModalBody className=" rounded-bottom secondary">
        <Form onSubmit={(e) => submit(e)}>
          <div onChange={(e) => changeHandler(e)}>
            <FormGroup>
              <Input name="email" placeholder="email" type="email" required />
            </FormGroup>
            <FormGroup className="position-relative">
              <Input
                name="password"
                placeholder="password placeholder"
                type={
                  passToggle.showPassword === "password" ? "text" : "password"
                }
                required
                minLength={6}
                autoComplete=""
              />
              {passToggle.showPassword === "password" ? (
                <AiOutlineEyeInvisible
                  className="position-absolute top-50 end-0 translate-middle"
                  onClick={() => show_hidePassword("password")}
                />
              ) : (
                <AiOutlineEye
                  className="position-absolute top-50 end-0 translate-middle"
                  onClick={() => show_hidePassword("password")}
                />
              )}
            </FormGroup>
          </div>
          <ModalFooter>
            <MainButton type="submit">
              Login
            </MainButton>
          </ModalFooter>
        </Form>
      </ModalBody>
    </Modal>
  );
}
