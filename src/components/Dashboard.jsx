import React, { useEffect, useReducer, useState } from 'react';
import { isloggedin } from "../helper/loginhelper";
import { useNavigate } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Inputbox from "../subcomponenets/inputbox";
import Formlabel from "../subcomponenets/formlabel";
import Thebutton from "../subcomponenets/thebutton";
import { getFood, getGoal, setGoalPost } from "../apis";
import RechartPieyo from "../subcomponenets/RechartPieyo";
import Accordion from 'react-bootstrap/Accordion';
import { food } from "../subcomponenets/const";

function Dashboard(props) {
    const itemAttributes = ['calories', 'total_fat', 'protein', 'carbohydrate', 'fiber', 'sugars', 'sodium', 'calcium',]

    const formReducer = (currentState, action) => {
        return { ...currentState, [action.type]: action.value }
    }

    const [goal, setGoal] = useState({
        set: false,
        'calories': 2000,
        'total_fat': 100,
        'protein': 200,
        'carbohydrate': 400,
        'fiber': 600,
        'sugars': 50,
        'sodium': 5,
        'calcium': 12,
    })
    const [foodd, setFood] = useState([])
    const [formData, setForm] = useReducer(formReducer, {
        'calories': goal.calories,
        'total_fat': goal.total_fat,
        'protein': goal.protein,
        'carbohydrate': goal.carbohydrate,
        'fiber': goal.fiber,
        'sugars': goal.sugars,
        'sodium': goal.sodium,
        'calcium': goal.calcium,
    })

    const [settingGoal, setsettingGoal] = useState(false)
    const [username, setusername] = useState('')

    const updateGoal = () => {
        const payload =
            {
                'username': localStorage.getItem("username"),
                'goal': {
                    'calories': formData.calories,
                    'total_fat': formData.total_fat,
                    'protein': formData.protein,
                    'carbohydrate': formData.carbohydrate,
                    'fiber': formData.fiber,
                    'sugars': formData.sugars,
                    'sodium': formData.sodium,
                    'calcium': formData.calcium,
                }
            }

        setGoalPost(payload).then(
            (response) => {
                if (response.success) {
                    setGoal(
                        {
                            set: true,
                            ...payload.goal
                        }
                    )
                }
            }
        )

        setsettingGoal(false)
    }

    const navigate = useNavigate()
    useEffect(() => {
        if (!isloggedin()) {
            navigate('/login')
        } else {
            // getFood().then((response) => {
            //     if (response.success) {
            //         setFood(response.food)
            //     }
            //
            // })

            setusername(localStorage.getItem("username"))
            const u = localStorage.getItem("username")
            const payload = { 'username': u }
            getGoal(payload).then(
                (response) => {
                    if (response.success) {
                        if (response.setgoal) {
                            setGoal(
                                {
                                    set: true,
                                    ...response.goal
                                }
                            )
                        }
                    }

                }
            )
        }


    }, [])


    return (

        <div className="bg-light" style={{ overflow: 'hidden' }}>
            <Row className="bg-white rounded-4 shadow-lg"
                 style={{ margin: "10vh 10vw 10vh 10vw", padding: "5vh 5vw 5vh 5vw" }}>
                <Row>
                    <h2 style={{
                        color: '#6f61c0', fontFamily: 'Exo',
                        fontSize: '6vh',
                        fontWeight: 'bold'
                    }}>My Goal </h2>
                    {goal.set && !settingGoal ?
                        <Row>
                            <Col>
                                <RechartPieyo data = {
                                    [
                                        { name: 'Carbohydrates', value: goal.carbohydrate },
                                        { name: 'protein', value: goal.protein },
                                        { name: 'total_fat', value: goal.total_fat},
                                        { name: 'fiber', value: goal.fiber },
                                    ]
                                }/>
                            </Col>
                            <Col style={{padding:'5vh 3vw 5vh 3vw'}}>
                                <Row>
                                {itemAttributes.map((item) =>
                                    <Col sm={6}>
                                        <h3 style={styles.h4for}>{item} = {goal[item]}</h3>
                                    </Col>



                                )}</Row>


                            </Col>
                        </Row>


:null
                    }
                    {settingGoal ?

                        itemAttributes.map((item) =>


                            <Col sm={3} className="my-3">
                                <h3 style={{ color: '#6f61c0' }}>{item}</h3>
                                <Inputbox type="number"
                                          className="form-control"
                                          placeholder={item}
                                          value={formData[item]}
                                          onChange={(val) => {
                                              setForm({ type: item, value: val.target.value })
                                          }}
                                />
                            </Col>
                        )


                        : <div className="mb-3">
                            <Thebutton text={goal.set ?

                                "Update Goal"
                                : "Set Goal"
                            } onClick={() => setsettingGoal(true)}/>
                        </div>}
                    {settingGoal ?
                        <Row className="mb-3">
                            <Col>
                                <Thebutton text="Confirm" onClick={updateGoal}/>
                            </Col>
                            <Col>
                                <Thebutton text="Cancel" style={{ background: '#c71313' }}
                                           onClick={() => setsettingGoal(false)}/>
                            </Col>
                        </Row> : null
                    }
                </Row>
                <div className="mb-3">
                    <Formlabel text='Available Foods'/>
                    <Inputbox type="text"
                              className="form-control"
                              placeholder="Search for Foods"

                    />
                </div><Accordion>

                {food.map(
                    (item, key)=>
                    {
                        return(
                            <Accordion.Item eventKey={item.name}>
                                <Accordion.Header>{item.name}</Accordion.Header>
                                <Accordion.Body>
                                    <Row>
                                    {itemAttributes.map((itm) =>
                                        <Col sm={6}>
                                            <h3 style={styles.h4for}>{itm} = {item[itm]}</h3>
                                        </Col>



                                    )}</Row>

                                </Accordion.Body>
                            </Accordion.Item>
                        )
                    }

                )}


                </Accordion>

            </Row>

        </div>
    );
}

const styles={
    h4for:{
    fontSize: '3vh',
        color: '#6f61c0',
        fontFamily: 'Roboto',
}}
export default Dashboard;
