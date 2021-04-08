import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Label,
  Col,
} from "reactstrap";
import { LocalForm, Control, Errors } from "react-redux-form";
import { FadeTransform, Fade, Stragger } from "react-animation-components";

const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

function RenderDish({ dish }) {
  return (
    <FadeTransform
      in
      transformProps={{
        exitTransform: "scale(0.5) translateY(-50%)",
      }}
    >
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle> {dish.name} </CardTitle>
          <CardText> {dish.description} </CardText>
        </CardBody>
      </Card>
    </FadeTransform>
  );
}

function RenderComment({ comments }) {
  if (comments != null) {
    <Stagger in>
      {comments.map((comment) => {
        return (
          <Fade in>
            <li>
              <div className="row">
                <div className="col">
                  <p> {comment.comment} </p>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <p>
                    {" "}
                    -- {comment.author} ,{" "}
                    {new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(comment.date)))}
                  </p>
                </div>
              </div>
            </li>
          </Fade>
        );
      })}
      ;
    </Stagger>;
    return (
      <div>
        <h4> Comments </h4>
        <ul className="list-unstyled">{comment}</ul>
        <CommentForm />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              {" "}
              <Link to="/menu" style={{ color: "black" }}>
                {" "}
                Menu{" "}
              </Link>{" "}
            </BreadcrumbItem>
            <BreadcrumbItem active> {props.dish.name} </BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3> {props.dish.name} </h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 mt-1 mb-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 mt-1 mb-1">
            <RenderComment comments={props.comment} />
          </div>
        </div>
      </div>
    );
  } else {
    return <div> </div>;
  }
};

//Assignment 3
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    console.log("Button Clicked");
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    alert("Current State is: " + JSON.stringify(values));
    this.toggleModal();
  }

  render() {
    return (
      <>
        <Button outline onClick={this.toggleModal}>
          <span className="fa fa-pencil fa-lg"></span> Submit Comment{" "}
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
          <ModalBody>
            <div className="container">
              <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="rating"> Rating </Label>
                    <Control.select
                      model=".rating"
                      id="rating"
                      name="rating"
                      className="form-control"
                    >
                      <option> 1 </option>
                      <option> 2 </option>
                      <option> 3 </option>
                      <option> 4 </option>
                      <option> 5 </option>
                    </Control.select>
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="fullname"> Your Name </Label>
                    <Control.text
                      model=".fullname"
                      id="fullname"
                      name="fullname"
                      placeholder="Your Name"
                      className="form-control"
                      validators={{
                        maxLength: maxLength(15),
                        minLength: minLength(3),
                      }}
                    />
                    <Errors
                      className="text-danger"
                      model=".fullname"
                      show="touched"
                      messages={{
                        minLength: "Must be greater than 2 characters",
                        maxLength: "Must be 15 characters or less",
                      }}
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Label htmlFor="comment"> Comment </Label>
                    <Control.textarea
                      model=".comment"
                      id="comment"
                      name="comment"
                      className="form-control"
                      rows="6"
                    />
                  </Col>
                </Row>
                <Row className="form-group">
                  <Col md={12}>
                    <Button
                      type="submit"
                      value="submit"
                      style={{ backgroundColor: "#9575CD" }}
                    >
                      Login
                    </Button>
                  </Col>
                </Row>
              </LocalForm>
            </div>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

export default DishDetail;
