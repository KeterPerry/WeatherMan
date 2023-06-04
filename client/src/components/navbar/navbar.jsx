import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import "./navbar.css";

function NavBar() {
  const navigate = useNavigate();
  return (
    <Navbar sticky="top" expand="lg" className="navbar">
      <Container
        style={{
          flexDirection: "row",
          marginLeft: "1.5rem",
          marginBottom: "1rem",
        }}
      >
        <Navbar.Brand href="#home">
          <img
            src="/logo.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <div onClick={() => navigate("/")}>Home</div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
