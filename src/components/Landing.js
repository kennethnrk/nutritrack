import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col,  Row } from "react-bootstrap";
import sideimg from "../assets/img/side.webp"
import Thebutton from "../subcomponenets/thebutton";
import { useNavigate } from "react-router-dom";

function Landing(props) {
    const navigate = useNavigate()
    return (
        <div style={{ overflow: 'hidden' }}>
            <Row className="bg-white" style={{ height: '80vh', padding:'5vh 12vw 5vh 12vw' }}>


                        <Col sm={4} style={{padding:'15vh 0 15vh 0', }}>
                            <h1 style={{color:'#6f61c0', fontFamily:'Exo', fontWeight:'Bold', fontSize:'8vh'}}>Your Nutrition, In your Hands</h1>
                            <Thebutton text="Start Now" onClick={() => {navigate("/Dashboard")}}/>
                        </Col>
                        <Col sm={8} style={{padding:'5vh 0 5vh 0'}}>
                            <img src={sideimg} style={{width:'35vw'}} class="rounded mx-auto d-block"/>
                        </Col>
                    </Row>



        </div>
    );
}

export default Landing;
