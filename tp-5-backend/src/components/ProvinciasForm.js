import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Container, Form, Button, Navbar, Nav, NavDropdown, } from 'react-bootstrap';

const ProvinciasForm = () => {
    const [provincias, setProvincias] = useState();
    const [paises, setPaises] = useState([]);

    const nombreInputRef = useRef();
    const descInputRef = useRef();

    const provInputRef = useRef();
    const paisInputRef = useRef();

    const history = useHistory();
    const { idProvincia } = useParams();

    useEffect(() => {
        obtenerDatos()
    }, [])

    const obtenerDatos = () => {
        axios.get('http://localhost:8000/provincias')
            .then((response) => {
                console.log('todo bien')
                setProvincias(response.data)
            })
            .catch(() => {
                console.log('error')
            })


        axios.get('http://localhost:8000/provincias')
            .then((response) => {
                console.log('todo bien')
                setProvincias(response.data)
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

    const crearProvincia = () => {

        return {
            paisID: paisInputRef.current.value,
            nombre: nombreInputRef.current.value,
            descripcion: descInputRef.current.value
        }
    }
    const agregarProvincia = () => {

        const Provincia = crearProvincia();

        axios.post('http://localhost:8000/Provincias', Provincia)
            .then(() => {
                alert('La Provincia se agregó.')
                history.push('/Provincias')
            })
            .catch(() => {
                alert('Hubo un error al agregar.')
            })
    }

    const editarProvincia = () => {

        const Provincia = crearProvincia()

        axios.put(`http://localhost:8000/Provincias/${idProvincia}`, Provincia)
            .then(() => {
                alert('La Provincia se modificó.')
                history.push('/Provincias')
            })
            .catch(() => {
                alert('Hubo un error al editar.')
            })
    }

    useEffect(() => {
        if (idProvincia) {
            axios.get(`http://localhost:8000/Provincias/${idProvincia}`)
                .then((response) => {

                    const Provincia = response.data;

                    nombreInputRef.current.value = Provincia.nombre;
                    descInputRef.current.value = Provincia.descripcion;
                })
                .catch(() => {

                })
        }
    }, [idProvincia])

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
                <h2>Nueva Provincia:</h2>
                <br />
                <Form.Group>
                    <Form.Label>Seleccione País</Form.Label>
                    <Form.Select ref={paisInputRef} aria-label="Default select example">
                        {provincias != undefined ? paises.map((pais) =>
                            (<option value={pais.id}>{pais.nombre}</option>)) : console.log("error en la carga del map pais")}
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicNombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control ref={nombreInputRef} type="nombre" placeholder="Ingrese nombre" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescripcion">
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control ref={descInputRef} type="descripcion" placeholder="Ingrese descripción" />
                </Form.Group>

                <Button variant="primary" type="agregar" onClick={idProvincia ? editarProvincia : agregarProvincia}>
                    {idProvincia ? "Editar" : "Agregar"}
                </Button>
            </Form>
        </Container>
    );
}

export default ProvinciasForm;