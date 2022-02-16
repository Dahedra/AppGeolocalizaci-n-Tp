import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Container, Form, Button, Navbar, Nav, NavDropdown, } from 'react-bootstrap';

const PaisesForm = () => {
    const [paises, setPaises] = useState();

    const nombreInputRef = useRef();
    const cantHabInputRef = useRef();

    const history = useHistory();
    const { idPais } = useParams();

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = () => {
        axios.get('http://localhost:8000/paises')
            .then((response) => {
                console.log('todo bien')
                setPaises(response.data)
            })
            .catch(() => {
                console.log('error')
            })


        axios.get('http://localhost:8000/paises')
            .then((response) => {
                console.log('todo bien')
                setPaises(response.data)
            })
            .catch(() => {
                console.log('error')
            })

        axios.get('http://localhost:8000/paises')
            .then((response) => {
                console.log('todo bien')
                setPaises(response.data)
            })
            .catch(() => {
                console.log('error')
            })
    }

    const crearPais = () => {

        return {
            nombre: nombreInputRef.current.value,
            cantHab: cantHabInputRef.current.value
        }
    }
    const agregarPais = () => {

        const pais = crearPais();

        axios.post('http://localhost:8000/Paises', pais)
            .then(() => {
                alert('El Pais se agregó.')
                history.push('/Paises')
            })
            .catch(() => {
                alert('Hubo un error al agregar.')
            })
    }

    const editarPais = () => {

        const pais = crearPais()

        axios.put(`http://localhost:8000/Paises/${idPais}`, pais)
            .then(() => {
                alert('El Pais se modificó.')
                history.push('/Paises')
            })
            .catch(() => {
                alert('Hubo un error al editar.')
            })
    }

    useEffect(() => {
        if (idPais) {
            axios.get(`http://localhost:8000/Paises/${idPais}`)
                .then((response) => {

                    const Pais = response.data;

                    nombreInputRef.current.value = Pais.nombre;
                    cantHabInputRef.current.value = Pais.descripcion;
                })
                .catch(() => {

                })
        }
    }, [idPais])

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

            <Form>
                <h2>Nuevo País:</h2>
                <br />
                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control ref={nombreInputRef} type="nombre" placeholder="Ingrese nombre" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescripcion">
                    <Form.Label>Cantidad de Habitantes</Form.Label>
                    <Form.Control ref={cantHabInputRef} type="cantHab" placeholder="Ingrese cantidad de habitantes" />
                </Form.Group>

                <Button variant="primary" type="agregar" onClick={idPais ? editarPais : agregarPais}>
                    {idPais ? "Editar" : "Agregar"}
                </Button>
            </Form>
        </Container>
    );
}

export default PaisesForm;