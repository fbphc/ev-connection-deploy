import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillCheckCircle,
} from "react-icons/ai";
import { IoCloseOutline } from "react-icons/io5";
import useAuth from "../../../context/authContext/useAuth";
import { typeOfStreetDataset } from "../../../dataset/dataset.js";
import axios from "axios";
import { MainButton } from "../../../components.styled/styledComponents.js";

export default function Register({ modalRegister, toggleRegister, closeMenu }) {
  const { signUp, resetError } = useAuth();
  const navigate = useNavigate();

  // show and hide wall-box owner state
  const [registerToggle, setRegisterToggle] = useState(false);

  const initAddress = {
    city: "",
    postalcode: "",
    street: "",
    houseNr: "",
    state: "Germany",
    statecode: "DE",
    typeOfStreet: "strasse",
  };

  // register information state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    isOwner: false,
    availability: "whole_week",
    telNumber: "",
    typeOfCharger: "Type 1",
    address: initAddress,
    addressInfo: {},
    imgProfile: "no_photo",
  });

  //check if password and confirm password match state
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });
  // error message state
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });

  // form changes function
  function registerFormHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    setRegisterForm((prevState) => {
      return { ...prevState, [element]: value };
    });
  }

  // address changes function
  function addressHandler(e) {
    const element = e.target.name;
    const value = e.target.value;
    resetError();
    setRegisterForm((prevState) => {
      return {
        ...prevState,
        address: { ...prevState.address, [element]: value },
      };
    });
  }

  // show and hide password and confirm password state
  const [passToggle, setPassToggle] = useState({
    showPassword: "",
    showConfirmPassword: "",
  });

  // show and hide password function
  function show_hidePassword(e) {
    if (e === "password") {
      setPassToggle({
        ...passToggle,
        showPassword: e === passToggle.showPassword ? "" : e,
      });
    } else if (e === "confirmPassword") {
      setPassToggle({
        ...passToggle,
        showConfirmPassword: e === passToggle.showConfirmPassword ? "" : e,
      });
    }
  }

  // checking if password and confirm password match function
  const inputValidator = (e) => {
    let { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj["confirmPassword"] =
              "Password and Confirm Password don't match.";
          } else {
            stateObj["confirmPassword"] = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;

        case "confirmPassword":
          if (input.password && value !== input.password) {
            stateObj[name] = "Password and Confirm Password don't match.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  // password change function
  const inputChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    inputValidator(e);
  };

  function submit(e) {
    e.preventDefault();
    if (input.password !== input.confirmPassword)
      return alert("password and confirm password don't match");

    const isIncluded = typeOfStreetDataset.filter((item) =>
      registerForm.address.street.toLowerCase().includes(item)
    );
    if (isIncluded.length > 0) {
      const newStreet = isIncluded.map((item) => {
        return registerForm.address.street.toLowerCase().split(item)[0].trim();
      });

      registerForm.address.street = newStreet[0].trim();
    } else {
      registerForm.address.street = registerForm.address.street.trim();
    }
    
    signUp(registerForm);
    navigate("/germany");
    closeMenu();
    toggleRegister();
  }
  /****** IMAGES ***** */
  const [imageSelected, setImageSelected] = useState("");

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "schoolGroup");

    axios
      .post(
        "https://api.cloudinary.com/v1_1/schoolgroupfinal/image/upload",
        formData
      )
      .then((response) =>
        setRegisterForm({ ...registerForm, imgProfile: response.data.url })
      )
      .catch((err) => {
        setRegisterForm({ ...registerForm, imgProfile: "no_photo" });
        return console.log(err);
      });
  };
  /********************* */
  return (
    <>
      <Modal isOpen={modalRegister}>
        <ModalHeader className="d-flex">
          Register
          <IoCloseOutline
            className="fs-3 position-absolute end-0 me-2"
            onClick={toggleRegister}
            role="button"
          />
        </ModalHeader>
        <ModalBody className="secondary rounded-bottom">
          <Form onSubmit={submit}>
            <div onChange={(e) => registerFormHandler(e)}>
              <FormGroup>
                <div className="d-flex align-items-center gap-1">
                  <Input
                    className="h2 mr-1"
                    type="file"
                    onChange={(e) => setImageSelected(e.target.files[0])}
                  />

                  {registerForm.imgProfile !== "no_photo" ? (
                    <AiFillCheckCircle className="h2 danger" />
                  ) : (
                    <AiFillCheckCircle className="h2 text-light" />
                  )}
                </div>
                <MainButton onClick={uploadImage}>Upload Image</MainButton>
              </FormGroup>
              <FormGroup onChange={() => setRegisterToggle(!registerToggle)}>
                <Input required name="isOwner" type="select" bsSize="2">
                  <option value={false}>Car Owner</option>
                  <option value={true}>Wall-Box Owner</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Input
                  required
                  name="username"
                  placeholder="UserName"
                  type="text"
                  maxLength={16}
                />
              </FormGroup>
              <div className="d-flex gap-2">
                <FormGroup>
                  <Input
                    required
                    name="fname"
                    placeholder="First Name"
                    type="text"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    required
                    name="lname"
                    placeholder="Last Name"
                    type="text"
                  />
                </FormGroup>
              </div>
              <FormGroup>
                <Input required name="email" placeholder="Email" type="email" />
              </FormGroup>
              <FormGroup className="position-relative">
                <Input
                  required
                  name="password"
                  placeholder="password"
                  type={
                    passToggle.showPassword === "password" ? "text" : "password"
                  }
                  minLength={6}
                  autoComplete=""
                  value={input.username}
                  onChange={inputChange}
                  onBlur={inputValidator}
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
                {error.password && <p className="darkText">{error.password}</p>}
              </FormGroup>
              <FormGroup style={{ position: "relative" }}>
                <Input
                  required
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  type={
                    passToggle.showConfirmPassword === "confirmPassword"
                      ? "text"
                      : "password"
                  }
                  minLength={6}
                  autoComplete=""
                  value={input.username}
                  onChange={inputChange}
                  onBlur={inputValidator}
                />
                {passToggle.showConfirmPassword === "confirmPassword" ? (
                  <AiOutlineEyeInvisible
                    className="position-absolute top-50 end-0 translate-middle"
                    onClick={() => show_hidePassword("confirmPassword")}
                  />
                ) : (
                  <AiOutlineEye
                    className="position-absolute top-50 end-0 translate-middle"
                    onClick={() => show_hidePassword("confirmPassword")}
                  />
                )}
              </FormGroup>
              {error.confirmPassword && <p className="darkText">{error.confirmPassword}</p>}
              <FormGroup>
                <Input type="tel" name="telNumber" placeholder="Phone Number" />
              </FormGroup>
            </div>

            {registerToggle && (
              <>
                <div onChange={(e) => registerFormHandler(e)} className="darkText">
                  <FormGroup>
                    <Label>Type of charger</Label>
                    <Input required name="typeOfCharger" type="select" bsSize="4">
                      <option value="Type 1">Type 1</option>
                      <option value="Type 2">Type 2</option>
                      <option value="CCS">CCS</option>
                      <option value="CHAdeMO">CHAdeMO</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label>availability</Label>
                    <Input required name="availability" type="select" bsSize="3">
                      <option value="whole_week">Whole Week</option>
                      <option value="not_weekend">Not on the Weekend</option>
                      <option value="night_avaiable">Night Availability</option>
                    </Input>
                  </FormGroup>
                </div>

                <div onChange={(e) => addressHandler(e)}  className="darkText">
                  <Label >
                    <b>Address</b>
                  </Label>

                  <FormGroup>
                    <Input
                      required
                      name="city"
                      placeholder="city"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup className="">
                    <Input
                      required
                      name="street"
                      placeholder="street"
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup className="">
                    <Input required name="type" type="select" bsSize="13">
                      <option value="strasse">strasse</option>
                      <option value="damm">damm</option>
                      <option value="alle">alle</option>
                      <option value="chaussee">chaussee</option>
                      <option value="gasse">gasse</option>
                      <option value="landstrasse">landstrasse</option>
                      <option value="pfad">pfad</option>
                      <option value="platz">platz</option>
                      <option value="ring">ring</option>
                      <option value="steig">steig</option>
                      <option value="ufer">ufer</option>
                      <option value="weg">weg</option>
                      <option value="zeile">zeile</option>
                    </Input>
                  </FormGroup>

                  <div className="d-flex gap-2">
                    <FormGroup className="w-25">
                      <Input
                        required
                        name="houseNr"
                        placeholder="houseNr"
                        type="text"
                      />
                    </FormGroup>
                    <FormGroup className="w-75">
                      <Input
                        required
                        name="postalcode"
                        placeholder="postal Code"
                        type="text"
                      />
                    </FormGroup>
                  </div>
                </div>
              </>
            )}
            <ModalFooter>
              <MainButton
                type="submit"
                onClick={() => (registerForm ? toggleRegister : null)}
              >
                sign up
              </MainButton>
            </ModalFooter>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
}
