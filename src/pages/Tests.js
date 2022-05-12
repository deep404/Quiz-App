import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowTests from "../components/ShowTests";
import * as ReactBootStrap from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


function Tests(){
    const [quizes, setQuizes] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getAllQuizes();
    }, []);

    let navigate = useNavigate();

    function logOut()
    {
        localStorage.clear();
        navigate("/register")
    }
    
   const getAllQuizes = () =>{
        axios.get('https://pure-caverns-82881.herokuapp.com/api/v54/quizzes',
        {headers:{
                    "X-Access-Token": 'b1a569f2feb6c538495d8dcb8b59ac2a4b8c19c634ccb2bacd7ede2eac557f04',
                }
        })
        .then((response) => {
                const allQuizes = response.data;
                setQuizes(allQuizes);         
                setLoading(true);
 
        })
        .catch(error => console.error(`Error: ${error}`));
   }
//    console.log(quizes);

    return(
        <div>
            <Nav.Link className="btn btn-primary btn-lg"  href="/">Home</Nav.Link>
            <br/>
            <Nav.Link className="btn btn-primary btn-lg" href="/quizes">Tests</Nav.Link>
            <br/>
            <Nav.Link className="btn btn-primary btn-lg" href="/add">Create</Nav.Link>
            
            <br/>
            <h3>Available Tests are: </h3>
            {loading ? <ShowTests {...quizes} /> : <ReactBootStrap.Spinner animation="border"/>}
            
            
            
                {}
            <br/>
            <Nav.Link className="btn btn-danger btn-lg" onClick={logOut}>Logout</Nav.Link>
        </div>
    );
}
export default Tests;