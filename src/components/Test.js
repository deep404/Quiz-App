import React, {useState, useEffect} from "react";
import axios from "axios";
import Response from "./Response";
import TestResult from "./TestResult";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap';

let interval; 

const Test = () => {
    const [step, setStep] = useState(1);
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);      
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if(step === 3) {
            clearInterval(interval);
          }
        getAllQuizes();
    }, [step]);
    const superId = useParams()

   const getAllQuizes = async () =>{
        await axios.get('https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/'+superId.id,
        {
            headers:{
                    "X-Access-Token": 'b1a569f2feb6c538495d8dcb8b59ac2a4b8c19c634ccb2bacd7ede2eac557f04',
                }
        })
        .then((response) => {
            // console.log(response.data)
            const myQuiz = response.data;
            setQuestions(myQuiz.questions); 
            console.log(questions) 
        })
        .catch(error => console.error(`Error: ${error}`));
    }

   const quizStartHandler = () => {
    setStep(2);

  }

return(
    <div>
        <Nav.Link className="btn btn-primary btn-lg"  href="/">Home</Nav.Link>
        <br/>
        <Nav.Link className="btn btn-primary btn-lg" href="/quizes">Tests</Nav.Link>
        <br/>
        <Nav.Link className="btn btn-primary btn-lg" href="/add">Create</Nav.Link>

        <div className="Quiz">


        {step === 1 &&
                        <div>
                            <div className="card-body">
                                <div>
                                <h1 className="card-title">Let's start the test</h1>
                                <br/>
                                <button className="btn btn-outline-warning btn-lg" onClick={quizStartHandler}>Start</button>
                                </div>
                            </div>
                        </div>
        }
        
       
        {step === 2 && <Response
        data={questions[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={questions.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
        />
        }
        {
            step === 3 && 
            <TestResult 
            results = {answers}
            data = {questions}
            />
        }
        </div>
        </div>
)
}
export default Test;
