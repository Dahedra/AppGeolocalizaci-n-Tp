import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown, Carousel } from 'react-bootstrap';

const Menu = () => {


    return (
        <Container>

            <Navbar bg="light" variant="light">
                <Container>
                    <Navbar.Brand href="/menu"><h1>Home</h1></Navbar.Brand>
                    <Nav className="me-auto">
                        <NavDropdown title="Listados" id="listados-dropdown">
                            <NavDropdown.Item href="/paises">Paises</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/provincias">Provincias</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/ciudades">Ciudades</NavDropdown.Item>
                        </NavDropdown>

                        <NavDropdown title="Nuevo" id="agregar-dropdown">
                            <NavDropdown.Item href="/paises/nuevo">País</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/provincias/nuevo">Provincia</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/ciudades/nuevo">Ciudad</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

            <Carousel>
                <Carousel.Item>
                    <Link to='/paises'>
                        <img
                            className="d-block w-100"
                            src="https://i2.wp.com/webadictos.com/media/2021/04/1.jpg?resize=800%2C534&ssl=1"
                            alt="Paises"
                        >
                        </img>
                    </Link>

                    <Carousel.Caption>
                        <h5>Paises</h5>
                        <p>Listado de paises.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to='/provincias'>
                        <img
                            className="d-block w-100"
                            src="https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg"
                            alt="Provincias"
                        />
                    </Link>

                    <Carousel.Caption>
                        <h5>Provincias</h5>
                        <p>Listado de provincias.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Link to='/ciudades'>
                        <img
                            className="d-block w-100"
                            src="https://i.blogs.es/9199b6/trucos-enfocar-fotografia-paisaje-02/1366_2000.jpg"
                            alt="Ciudades"
                        />
                    </Link>

                    <Carousel.Caption>
                        <h5>Ciudades</h5>
                        <p>Listado de ciudades.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>


        </Container>
    );
}

export default Menu;