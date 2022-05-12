import React from "react";
import { useNavigate } from "react-router-dom";
import Test from "./Test";

function ShowTests(props){
    let entries = Object.entries(props);
    console.table(entries);

    let navigate = useNavigate();


    function responds(id) {
        console.log(id)
        let idx = id + '';
        let path = '/quizes/'+ idx
        navigate(path);
        <Test id={id}/>
    }
    return(
        <div className="testsContainer">

            {entries.map(quiz => 
            <div className="testContainer"  key={quiz[1].id} onClick = {() =>  responds(quiz[1].id)}>
            <h3>{quiz[1].title}</h3>
            </div>)}
        </div>
    );
}
export default ShowTests;
