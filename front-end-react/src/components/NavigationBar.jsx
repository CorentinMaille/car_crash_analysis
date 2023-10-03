import {Container, Nav, Navbar} from "react-bootstrap";

export default function NavigationBar() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary position-absolute top-0 w-100">
                <Container className="ms-0">
                    <Navbar.Brand href="/home">Home</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/graphic/1">Accidents par pays</Nav.Link>
                            <Nav.Link href="/graphic/2">Accidents par zones du monde</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}