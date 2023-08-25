import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import mainlogo from '../assets/img/png/logo-no-background.png';
import { useLocation, useNavigate } from "react-router-dom";
import { isloggedin, logoutuser } from "../helper/loginhelper";

function navibar() {


    const [loggedIn, setLoggedIn] = useState(false);
    const location = useLocation()
    const navigate = useNavigate()
    function logout() {
        logoutuser()
        navigate("/login")
    }
    useEffect(() =>
    {
        if(isloggedin())
        {
            setLoggedIn(true)
        }
    },[])

    if (location.pathname == '/login')
    return (
        <Navbar style={{ background: '#6f61c0' }} expand="lg" fixed="top">
            <Container fluid style={{ paddingRight: '7vw', paddingLeft: '7vw', height: '13vh', }}>
                <Navbar.Brand href="/"><img alt={"Eppo"} src={mainlogo} style={{ height: '2rem' }}/></Navbar.Brand>
            </Container>
        </Navbar>
    );
    else
        return (
            <Navbar style={{ background: '#6f61c0' }} expand="lg" fixed="top">
                <Container fluid style={{ paddingRight: '7vw', paddingLeft: '7vw', height: '13vh', }}>
                    <Navbar.Brand href="/"><img alt={"Eppo"} src={mainlogo} style={{ height: '2rem' }}/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    {!loggedIn ? <Navbar.Collapse id="navbarScroll">
                        <Nav style={{ marginLeft: 'auto' }}>
                            <Nav.Link href="/login" style={styles.Navlink}>Login</Nav.Link>
                        </Nav>
                        <Nav className="d-flex">
                            <Nav.Link href="/login" style={styles.Navlink2}>SignUp</Nav.Link>
                        </Nav>

                    </Navbar.Collapse> : <Navbar.Collapse>
                        <Nav style={{ marginLeft: 'auto' }}>
                            <Nav.Link href="/Dashboard" style={styles.Navlink}>Dashboard</Nav.Link>
                        </Nav>
                        <Nav className="d-flex">
                            <Nav.Link onClick={logout} style={styles.Navlink2}>Logout</Nav.Link>
                        </Nav></Navbar.Collapse>}

                </Container>
            </Navbar>
        )
}

const styles = {
    Navlink: {
        fontSize: '250%',
        color: '#fff',
        fontFamily: 'Roboto',
        background: '#6f61c0',
    },
    Navlink2: {
        fontSize: '250%',
        color: '#D5FFE4',
        fontFamily: 'Roboto',
        background: '#6f61c0',
    }
}

export default navibar;
