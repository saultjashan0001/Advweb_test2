import React, { useState } from "react";
import { Navbar, Nav, Container, Button, Modal } from "react-bootstrap";

function CustomNavbar() {
  const [show, setShow] = useState(false);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#">Jashanpreet Singh</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#hero">Hero Section</Nav.Link>
              <Nav.Link href="#three">Three-Column</Nav.Link>
              <Button variant="outline-info" size="sm" onClick={() => setShow(true)}>
                Copyright
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Copyright Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>© 2025 Jashanpreet Singh. All rights reserved.</Modal.Body>
      </Modal>
    </>
  );
}

export default CustomNavbar;
