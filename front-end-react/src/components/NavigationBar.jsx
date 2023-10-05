import {Container, Nav, Navbar} from "react-bootstrap";

export default function NavigationBar() {
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary w-100">
                <Container className="ms-0">
                    <Navbar.Brand href="/">Accueil</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/graphic/1">Par Pays</Nav.Link>
                            <Nav.Link href="/graphic/2">Par Continent</Nav.Link>
                            <Nav.Link href="/insert">Ajouter une donnée</Nav.Link>
                            <Nav.Link href="/update">Modifier une donnée</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}