import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useHistory, useParams } from "react-router-dom";
import { Alert, Container, Form, Button, Navbar, Nav, NavDropdown, } from 'react-bootstrap';

const CiudadesForm = () => {
    const [provincias, setProvincias] = useState();
    const [paises, setPaises] = useState([]);

    const nombreInputRef = useRef();
    const descInputRef = useRef();

    const provInputRef = useRef();
    const paisInputRef = useRef();

    const history = useHistory();
    const { idCiudad } = useParams();

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

        axios.get('http://localhost:8000/paises')
            .then((response) => {
                console.log('todo bien')
                setPaises(response.data)
            })
            .catch(() => {
                console.log('error')
            })
    }

    const crearCiudad = () => {

        return {
            paisID: paisInputRef.current.value,
            provinciaID: provInputRef.current.value,
            nombre: nombreInputRef.current.value,
            descripcion: descInputRef.current.value
        }
    }
    const agregarCiudad = () => {

        const ciudad = crearCiudad();

        axios.post('http://localhost:8000/ciudades', ciudad)
            .then(() => {
                alert('La ciudad se agregó.')
                history.push('/ciudades')
            })
            .catch(() => {
                alert('Hubo un error al agregar.')
            })
    }

    const editarCiudad = () => {

        const ciudad = crearCiudad()

        axios.put(`http://localhost:8000/ciudades/${idCiudad}`, ciudad)
            .then(() => {
                alert('La ciudad se modificó.')
                history.push('/ciudades')
            })
            .catch(() => {
                alert('Hubo un error al editar.')
            })
    }

    useEffect(() => {
        if (idCiudad) {
            axios.get(`http://localhost:8000/ciudades/${idCiudad}`)
                .then((response) => {

                    const ciudad = response.data;

                    nombreInputRef.current.value = ciudad.nombre;
                    descInputRef.current.value = ciudad.descripcion;
                })
                .catch(() => {

                })
        }
    }, [idCiudad])

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
                <h2>Nueva Ciudad:</h2>
                <br/>
                <Form.Group>
                    <Form.Label>Seleccione País</Form.Label>
                    <Form.Select ref={paisInputRef} aria-label="Default select example">
                        {paises != undefined ? paises.map((pais) =>
                            (<option value={pais.id}>{pais.nombre}</option>)) : console.log("error en la carga del map pais")}
                    </Form.Select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Seleccione Provincia</Form.Label>
                    <Form.Select ref={provInputRef} aria-label="Default select example">
                        {provincias != undefined ? provincias.map((provincia) =>
                            (<option value={provincia.id}>{provincia.nombre}</option>)) : console.log("error en la carga del map provincias")}
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

                <Button variant="primary" type="agregar" onClick={idCiudad ? editarCiudad : agregarCiudad}>
                    {idCiudad ? "Editar" : "Agregar"}
                </Button>
            </Form>
        </Container>
    );
}

export default CiudadesForm;