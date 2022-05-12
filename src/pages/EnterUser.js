import React, {useState} from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";
import {Nav} from 'react-bootstrap';

function EnterUser(){
    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const submitHandler = (e) => {
        if (name === '' || surname === '')
            setError('Fill all the fields')
        else
        {// To not reload the page on Submit
        e.preventDefault();
        const postData = {data : {name, surname}}
        // console.log(postData)

        axios.post('https://pure-caverns-82881.herokuapp.com/api/v54/users', postData,  
        {headers:{
                        "X-Access-Token": 'b1a569f2feb6c538495d8dcb8b59ac2a4b8c19c634ccb2bacd7ede2eac557f04',
                    }
                })
        .then((res) => {
            // console.log(res.data.id)
            // console.log(postData)
            postData.data.id = res.data.id
            // console.log(postData)
            localStorage.setItem("user-info", JSON.stringify(postData["data"]))
            navigate("/quizes")
        })
        .catch((err)=>{
            console.log(err)
            setError('User with this name and surname already exists!');
            
        })}
        
    }
    return(
        <>
        <form onSubmit={submitHandler}>
            <Nav.Link className="btn btn-primary btn-lg"  href="/">Home</Nav.Link>
            <br/><br/>

            <h1>Enter the Quizes Pool</h1>
            <input type="text" className="form-control" placeholder = "Write your NAME" value={name} onChange={(e)=>setName(e.target.value)}/>
            <br/>
            <input type="text" className="form-control" placeholder = "Write your SURNAME" value={surname} onChange={(e)=>setSurname(e.target.value)}/>
            {error && <div className="text-danger">{error}</div>}
            <br/>
            <button type="submit" className="btn btn-primary btn-lg">Enter</button>
        </form>
       </>
    );
}

export default EnterUser;