'use strict';

ReactDOM.render(
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/">Home</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/profile">Profile</Nav.Link>
      <Nav.Link href="/resume">Resume</Nav.Link>
      <Nav.Link href="/generate">Generate</Nav.Link>
      <Nav.Link href="/logout">Logout</Nav.Link>
    </Nav>
    </Container>
  </Navbar>, 
    document.getElementById('navbar')
);