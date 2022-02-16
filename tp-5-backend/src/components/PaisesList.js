import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, Button, Navbar, Nav, NavDropdown, FormControl, ListGroup } from 'react-bootstrap';

const PaisesList = () => {
    const [paises, setPaises] = useState([]);
    const history = useHistory();
    const busquedaInputRef = useRef();

    useEffect(() => {
        obtenerPaises();
    }, [])

    const obtenerPaises = () => {
        axios.get('http://localhost:8000/paises/')
            .then((response) => {
                console.log('todo bien')
                setPaises(response.data)
            })
            .catch(() => {
                console.log('error')
            })
    }
    
    const eliminarPais = (index) => {
        axios.delete(`http://localhost:8000/paises/${index}`)
            .then((response) => {
                alert('El país se eliminó.')
                obtenerPaises()
            })
            .catch(() => {
                alert('Hubo un error al eliminar.')
            })
    }

    const buscar = () => {
        axios.get(`http://localhost:8000/paises?_expand=pais&_expand=paise&q=${busquedaInputRef.current.value}`)
            .then((response) => {
                setPaises(response.data)
            })
            .catch(() => {
                console.log('error')
            })
    }

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

            <h1>Lista Paises</h1>
            <br />
            <h2>Busqueda:</h2>
            <FormControl
                ref={busquedaInputRef} onChange={buscar} placeholder="Ingrese búsqueda..."
            />
            <br />

            <ListGroup>
                {paises !== undefined ? paises.map((pais, index) => {
                    return (
                        <>
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{pais.nombre}</div>
                                    Cantidad de habitantes: {pais.cantHab}
                                </div>
                                <Button onClick={() => eliminarPais(pais.id)}>Eliminar</Button>
                                <Button onClick={() => history.push(`/paises/${pais.id}`)}>Editar</Button>
                            </ListGroup.Item>
                        </>
                    )
                }) : console.log('no se pudo')
                }
            </ListGroup>
        </Container>
    )
}

export default PaisesList;