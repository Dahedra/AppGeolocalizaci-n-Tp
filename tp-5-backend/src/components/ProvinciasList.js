import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { Container, Button, Navbar, Nav, NavDropdown, FormControl, ListGroup } from 'react-bootstrap';

const ProvinciasList = () => {
    const [Provincias, setProvincias] = useState();
    const history = useHistory();
    const busquedaInputRef = useRef();

    useEffect(() => {
        obtenerProvincias()
    }, [])

    const obtenerProvincias = () => {
        axios.get('http://localhost:8000/Provincias')
            .then((response) => {
                console.log('todo bien')
                setProvincias(response.data)
            })
            .catch(() => {
                console.log('error')
            })
    }

    const eliminarprovincia = (index) => {
        axios.delete(`http://localhost:8000/Provincias/${index}`)
            .then((response) => {
                alert('La provincia se eliminó.')
                obtenerProvincias()
            })
            .catch(() => {
                alert('Hubo un error al eliminar.')
            })
    }

    const buscar = () => {
        axios.get(`http://localhost:8000/provincias?_expand=pais&_expand=paise&q=${busquedaInputRef.current.value}`)
            .then((response) => {
                setProvincias(response.data)
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

            <h1>Lista Provincias</h1>
            <br />
            <h2>Busqueda:</h2>
            <FormControl
                ref={busquedaInputRef} onChange={buscar} placeholder="Ingrese búsqueda..."
            />
            <br />

            <ListGroup>
                {Provincias !== undefined ? Provincias.map((provincia, index) => {
                    return (
                        <>
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold">{provincia.nombre}</div>
                                    {provincia.descripcion}
                                </div>
                                <Button onClick={() => eliminarprovincia(provincia.id)}>Eliminar</Button>
                                <Button onClick={() => history.push(`/Provincias/${provincia.id}`)}>Editar</Button>
                            </ListGroup.Item>
                        </>
                    )
                }) : console.log('no se pudo')
                }
            </ListGroup>
        </Container>

    )
}

export default ProvinciasList;