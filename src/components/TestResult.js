import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap';


const TestResult = ({results, data, time}) => {
    const [userId, setUserId] = useState(JSON.parse(localStorage.getItem('user-info')).id);
    const [response, setResponse] = useState([]);
    const [score, setScore] = useState(0);
    const quizId = useParams().id;
    const [loading, setLoading] = useState(false);


    const navigate = useNavigate();
 
    useEffect(() => {
        console.log('user id', userId);
        results.map(r => submitAnswer(r.id, r.a, userId));
    }, [])

    function submitAnswer (question_id, answer, user_id) {
        const postData = {data : {question_id, answer, user_id}}
        console.log(postData)

        axios.post('https://pure-caverns-82881.herokuapp.com/api/v54/quizzes/'+ quizId +'/submit', postData,  
        {headers:{
                        "X-Access-Token": 'b1a569f2feb6c538495d8dcb8b59ac2a4b8c19c634ccb2bacd7ede2eac557f04',
                    }
                })
        .then((res) => {
            setResponse(prevState => [ ...prevState, res.data])
            console.log("response data", res.data)
            if (res.data.correct)
                setScore(prevState => prevState + 1)
            setLoading(true);
        })
        .catch((err)=>{
            console.log(err)
        })
      }
    
    return(
      <div>
        <br/>
            <h1 className="card-title">Correct answers:</h1>
            <h2 >{score} / {data.length}</h2>
            {loading ?  <p ></p> 
            : <ReactBootStrap.Spinner animation="border"/>}
            <br/>
            <button className='btn btn-dark btn-lg' onClick={()=>navigate("/quizes")}> Exit </button>
      </div>
    );
}
export default TestResult;