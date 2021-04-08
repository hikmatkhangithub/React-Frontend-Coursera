import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Jumbotron,
  Nav,
  NavbarToggler,
  NavItem,
  Collapse,
  Button,
  Label,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Input,
} from "reactstrap";
import { NavLink } from "react-router-dom";

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavbarClicked: false,
      isModalClick: false,
    };

    this.onClickToggler = this.onClickToggler.bind(this);
    this.onModalToggler = this.onModalToggler.bind(this);
    this.onHandleModalSubmit = this.onHandleModalSubmit.bind(this);
  }

  onHandleModalSubmit = (event) => {
    this.onModalToggler();
    alert(
      "usernam:" +
        this.username.value +
        "Password:" +
        this.password.value +
        "remember me: " +
        this.check.checked
    );

    event.preventDefault();
  };
  onModalToggler() {
    this.setState({
      isModalClick: !this.state.isModalClick,
    });
  }
  onClickToggler() {
    this.setState({
      isNavbarClicked: !this.state.isNavbarClicked,
    });
  }
  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                width="50px"
                alt="Ristorante confusion"
              ></img>
            </NavbarBrand>
            <NavbarToggler onClick={this.onClickToggler} />
            <Collapse navbar isOpen={this.state.isNavbarClicked}>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span>Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span>Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    US
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto">
                <NavItem>
                  <Button
                    outline
                    color="secondary"
                    onClick={this.onModalToggler}
                  >
                    <span className="fa fa-sign-in fa-lg"> Login</span>
                  </Button>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>

        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={this.state.isModalClick} toggle={this.onModalToggler}>
          <ModalHeader toggle={this.onModalToggler}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onHandleModalSubmit}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  innerRef={(Input) => (this.username = Input)}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  innerRef={(Input) => (this.password = Input)}
                />
              </FormGroup>
              <FormGroup check>
                <Label htmlFor="check">
                  <Input
                    type="checkbox"
                    id="check"
                    name="check"
                    innerRef={(Input) => (this.check = Input)}
                  />
                  Remeber me
                </Label>
              </FormGroup>
              <FormGroup>
                <Button type="submit" value="submit" className="bg-primary">
                  Login
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
