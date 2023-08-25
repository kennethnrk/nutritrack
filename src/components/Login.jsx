import React, { useEffect, useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Row } from "react-bootstrap";
import sideimg from "../assets/img/side.webp"
import Formlabel from "../subcomponenets/formlabel";
import Inputbox from "../subcomponenets/inputbox";
import Thebutton from "../subcomponenets/thebutton";
import { userLogin, userSignup } from "../apis";
import { useNavigate } from "react-router-dom";
import { isloggedin } from "../helper/loginhelper";

function Landing(props) {


    const [loginText, setLoginText] = useState(true)
    const [signuptext, setSignuPText] = useState(true)
    const [alert, setAlert] = useState("")
    const navigate = useNavigate()

    useEffect(() =>
    {
       if(isloggedin())
       {
           navigate('/')
       }
    },[])

    const loginfunc = () => {
        if (formData.password != "" && formData.username != "") {
            setLoginText(false);
            setAlert("");
            const payload = {
                username: formData.username.toLowerCase(),
                password: formData.password
            }
            userLogin(payload).then((response) => {
                    if(response.success){
                        localStorage.setItem("username" , formData.username.toLowerCase())
                        navigate("/Dashboard")

                    }
                    else
                    {
                        setAlert(response.msg)
                        setLoginText(true)

                    }
                }
            )
        } else {
            setAlert("Incorrect Details");
        }

    }
    const signupfunc = () => {

        if (formData.password == formData.passwordAgain && formData.password != "" && formData.username != "") {
            setSignuPText(false);
            setAlert("");
            const payload = {
                username: formData.username.toLowerCase(),
                password: formData.password
            }
            userSignup(payload).then((response) => {
                    if(response.success){
                        localStorage.setItem("username" , formData.username.toLowerCase())
                        navigate("/Dashboard")
                    }
                    else
                    {
                        setAlert(response.msg)
                        setSignuPText(true)
                    }
                }
            )
        } else {
            setAlert("Incorrect Details");
        }

    }

    const formReducer = (currentState, action) => {

        switch (action.type) {
            case 'username':
                return { ...currentState, username: action.value }
            case 'password':
                return { ...currentState, password: action.value }
            case 'passwordAgain':
                return { ...currentState, passwordAgain: action.value }
        }
    }

    function updateuName(name) {
        setForm({ type: 'username', value: name.target.value });
    }

    function updatePassword(password) {
        setForm({ type: 'password', value: password.target.value });
    }

    function updatePasswordAgain(passwordAgain) {
        setForm({ type: 'passwordAgain', value: passwordAgain.target.value });
    }

    const [newUser, setNewUser] = useState(false);
    const [formData, setForm] = useReducer(formReducer, { password: '', passwordAgain: '', username: '' })

    return (
        <div style={{ overflow: 'hidden' }}>
            <Row className="bg-white" style={{ padding: '5vh 5vw 5vh 5vw' }}>
                <Col sm={8}>
                    <Row className="my-auto">

                        <Col sm={4} style={{ padding: '15vh 0 15vh 0' }}>
                            <h1 style={{
                                color: '#6f61c0',
                                fontFamily: 'Exo',
                                fontWeight: 'Bold',
                                fontSize: '8vh'
                            }}>Your Nutrition, In your Hands</h1>
                        </Col>
                        <Col sm={8} style={{ padding: '5vh 0 5vh 0' }}>
                            <img src={sideimg}/>
                        </Col>
                    </Row>
                </Col>
                {newUser ? <Col sm={4} style={{ padding: '5vh 0 5vh 0' }}>
                    <div className="bg-white rounded-4 p-4 shadow-lg">
                        <h2 style={{
                            color: '#6f61c0',
                            padding: '2vh 0 2vh 0',
                            fontFamily: 'Exo',
                            fontSize: '6vh',
                            fontWeight: 'bold'
                        }}>Signup</h2>
                        <div className="mb-3">
                            <Formlabel text='User Name'/>
                            <Inputbox type="text"
                                      className="form-control"
                                      placeholder="Enter User Name"
                                      onChange={updateuName}
                            />
                        </div>
                        <div className="mb-3">
                            <Formlabel text='Password'/>
                            <Inputbox type="password"
                                      className="form-control"
                                      placeholder="Enter password"
                                      onChange={updatePassword}
                            />

                        </div>
                        <div className="mb-3">
                            <Formlabel text='Re-Enter Password'/>
                            <Inputbox type="password"
                                      className="form-control"
                                      placeholder="Enter password"
                                      onChange={updatePasswordAgain}
                            />

                        </div>
                        <div className="mb-3">
                            <Thebutton text={signuptext ? "Sign Up" : "Loading"} onClick={signupfunc}/>
                        </div>
                        <div className="mb-3">
                            <p style={{ color: '#c71313' }}>{alert}</p>
                            Already Have an account? <a style={{ cursor: 'pointer' }}
                                                        onClick={() => setNewUser(false)}>Login</a>
                        </div>


                    </div>
                </Col> : <Col sm={4} style={{ padding: '5vh 0 5vh 0' }}>
                    <div className="bg-white rounded-4 p-4 shadow-lg">
                        <h2 style={{
                            color: '#6f61c0',
                            padding: '2vh 0 2vh 0',
                            fontFamily: 'Exo',
                            fontSize: '6vh',
                            fontWeight: 'bold'
                        }}>Login</h2>
                        <div className="mb-3">
                            <Formlabel text='User Name'/>
                            <Inputbox type="text"
                                      className="form-control"
                                      placeholder="Enter User Name"
                                      onChange={updateuName}
                            />
                        </div>
                        <div className="mb-3">
                            <Formlabel text='Password'/>
                            <Inputbox type="password"
                                      className="form-control"
                                      placeholder="Enter password"
                                      onChange={updatePassword}
                            />

                        </div>
                        <div className="mb-3">
                            <Thebutton text={loginText ? "Login" : "Loading"} onClick={loginfunc}/>
                        </div>
                        <div className="mb-3">
                            <p style={{ color: '#c71313' }}>{alert}</p>
                            New here? <a style={{ cursor: 'pointer' }} onClick={() => setNewUser(true)}>Sign Up</a>
                        </div>


                    </div>
                </Col>}

            </Row>

        </div>
    );
}

export default Landing;
