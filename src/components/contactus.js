import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormGroup,
  Col,
  Label,
  Input,
  Select,
  Button,
  FormFeedback,
} from "reactstrap";
import { Link } from "react-router-dom";

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
      agree: false,
      contactType: "Tel.",
      message: "",
      touched: {
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
      },
    };

    this.onSubmitHandle = this.onSubmitHandle.bind(this);
    this.onChangeHandleInput = this.onChangeHandleInput.bind(this);
    this.onHandleBlur = this.onHandleBlur.bind(this);
  }

  onHandleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  validate(firstname, lastname, telnum, email) {
    const errors = {
      firstname: "",
      lastname: "",
      telnum: "",
      email: "",
    };
    //---first name -----
    if (this.state.touched.firstname && firstname.length < 3) {
      errors.firstname =
        "The first name should not be empty or  <= 3 characters";
    } else if (this.state.touched.firstname && firstname.length > 12) {
      errors.firstname = "The first name should not be >= 12 caracters";
    }
    // ----last name-----
    if (this.state.touched.lastname && lastname.length < 3) {
      errors.lastname =
        "The last name should not be empty or  <= 3 characters ";
    } else if (this.state.touched.lastname && lastname.length >= 12) {
      errors.lastname = "The last name should not be >= 12 characters ";
    }
    //---tel number -----
    const reg = /^\d+$/;
    if (this.state.touched.telnum && !reg.test(telnum)) {
      errors.telnum =
        " Tele no. Is not a valid telephne number , only numbers are allowed";
    }
    //------email-------
    if (
      this.state.touched.email &&
      email.split("").filter((x) => x === "@").length !== 1
    ) {
      errors.email = "Email should be correct one! and contain @ sign";
    }

    return errors;
  }
  onChangeHandleInput(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    const name = target.name;
    this.setState({ [name]: value });
  }
  onSubmitHandle(event) {
    console.log("submitted form", JSON.stringify(this.state));
    alert("submitted form" + JSON.stringify(this.state));
    event.preventDefault();
  }

  render() {
    const errors = this.validate(
      this.state.firstname,
      this.state.lastname,
      this.state.telnum,
      this.state.email
    );
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Contactus</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row row-content">
          <div className="col-12">
            <h3>Location Information</h3>
          </div>
          <div className="col-12 col-sm-4 offset-sm-1">
            <h5>Our Address</h5>
            <address>
              121, Clear Water Bay Road
              <br />
              Clear Water Bay, Kowloon
              <br />
              HONG KONG
              <br />
              <i className="fa fa-phone"></i>: +852 1234 5678
              <br />
              <i className="fa fa-fax"></i>: +852 8765 4321
              <br />
              <i className="fa fa-envelope"></i>:{" "}
              <a href="mailto:confusion@food.net">confusion@food.net</a>
            </address>
          </div>
          <div className="col-12 col-sm-6 offset-sm-1">
            <h5>Map of our Location</h5>
          </div>
          <div className="col-12 col-sm-11 offset-sm-1">
            <div className="btn-group" role="group">
              <a
                role="button"
                className="btn btn-primary"
                href="tel:+85212345678"
              >
                <i className="fa fa-phone"></i> Call
              </a>
              <a href="#" role="button" className="btn btn-info">
                <i className="fa fa-skype"></i> Skype
              </a>
              <a
                role="button"
                className="btn btn-success"
                href="mailto:confusion@food.net"
              >
                <i className="fa fa-envelope-o"></i> Email
              </a>
            </div>
          </div>
        </div>
        <div className="row row-content">
          <div className="col-12 col-md-9">
            <h3> Send us your Feedback</h3>

            <Form onSubmit={this.onSubmitHandle}>
              <FormGroup row>
                <Label htmlFor="firstname" md={2}>
                  {" "}
                  First name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="firstname"
                    name="firstname"
                    value={this.state.firstname}
                    valid={errors.firstname === ""}
                    invalid={errors.firstname !== ""}
                    onBlur={this.onHandleBlur("firstname")}
                    onChange={this.onChangeHandleInput}
                    placeholder="First Name"
                  ></Input>
                  <FormFeedback>{errors.firstname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="lastname" md={2}>
                  Last Name
                </Label>
                <Col md={10}>
                  <Input
                    type="text"
                    id="lastname"
                    name="lastname"
                    value={this.state.lastname}
                    valid={errors.lastname === ""}
                    invalid={errors.lastname !== ""}
                    onBlur={this.onHandleBlur("lastname")}
                    onChange={this.onChangeHandleInput}
                    placeholder="Last Name"
                  ></Input>
                  <FormFeedback>{errors.lastname}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="telnum" md={2}>
                  Tel. Number
                </Label>
                <Col md={10}>
                  <Input
                    type="tel"
                    id="telnum"
                    name="telnum"
                    value={this.state.telnum}
                    valid={errors.telnum === ""}
                    invalid={errors.telnum !== ""}
                    onBlur={this.onHandleBlur("telnum")}
                    onChange={this.onChangeHandleInput}
                    placeholder="Tele Number"
                  ></Input>
                  <FormFeedback>{errors.telnum}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="email" md={2}>
                  Email Address
                </Label>
                <Col md={10}>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={this.state.email}
                    valid={errors.email === ""}
                    invalid={errors.email !== ""}
                    onBlur={this.onHandleBlur("email")}
                    onChange={this.onChangeHandleInput}
                    placeholder="Email Address"
                  ></Input>
                  <FormFeedback>{errors.email}</FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 6, offset: 2 }}>
                  <Input
                    type="checkbox"
                    name="agree"
                    checked={this.state.agree}
                    onChange={this.onChangeHandleInput}
                  ></Input>
                  <Label htmlFor="checkbox">How to contact you!</Label>
                </Col>

                <Col md={{ size: 3, offset: 1 }}>
                  <Input
                    type="select"
                    id="contactType"
                    name="contactType"
                    value={this.state.contactType}
                    onChange={this.onChangeHandleInput}
                  >
                    <option>email</option>
                    <option>tel.no</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label htmlFor="message" md={2}>
                  Message
                </Label>
                <Col md={10}>
                  <Input
                    rows="12"
                    type="textarea"
                    id="message"
                    name="message"
                    value={this.state.message}
                    onChange={this.onChangeHandleInput}
                    placeholder="Type here!"
                  ></Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Send feedback!
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
