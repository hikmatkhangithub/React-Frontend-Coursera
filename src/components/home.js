import React from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Loading } from "./loading";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform } from "react-animation-components";

function RenderContent({ item, isLoading, errMess }) {
  if (isLoading) {
    return <Loading />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else
    return (
      <FadeTransform
        in
        transformProps={{
          exitTransform: "scale(0.5) translateY(-50%)",
        }}
      >
        <Card>
          <CardImg src={baseUrl + item.image} alt={item.name} />
          <CardBody>
            <CardTitle>{item.name}</CardTitle>
            {item.designation ? (
              <CardSubtitle>{item.designation}</CardSubtitle>
            ) : null}
            <CardText>{item.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    );
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem active> Home</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="row">
          <div className="col-12 col-md-4">
            <RenderContent
              item={this.props.dish}
              isLoading={this.props.dishesLoading}
              errMess={this.props.dishesErrMess}
            />
          </div>
          <div className="col-12 col-md-4">
            <RenderContent
              item={this.props.promotion}
              isLoading={this.props.promoLoading}
              errMess={this.props.promoErrMess}
            />
          </div>
          <div className="col-12 col-md-4">
            <RenderContent
              item={this.props.leader}
              isLoading={this.props.leadersLoading}
              errMess={this.props.leadersErrMess}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
