import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Nav} from 'react-bootstrap';

function Create () {
    const [formFields, setFormFields] = useState([{question:'',answers:[],correct_answer:''},])
    const [title, setTitle] = useState('');
    const [submission, setSubmission] = useState({data:{}})
    const [error, setError] = useState('')
    const navigate = useNavigate();
    
    const handleFormChange = (event, index) => {
        let data = [...formFields];
        console.log("data", event.target.name)
        if (event.target.name === ('answers[0]')){
            data[index]['answers'][0] = event.target.value
        }
        else if (event.target.name === ('answers[1]')){
            data[index]['answers'][1] = event.target.value        
        }
        else if (event.target.name === ('answers[2]')){
            data[index]['answers'][2] = event.target.value        
        }
        else if (event.target.name === ('answers[3]')){
            data[index]['answers'][3] = event.target.value        
        }else
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
      }
    
      const submit = (e) => {
          e.preventDefault();
          console.log(formFields)
          setSubmission(submission.data = {title, "questions":formFields})
          console.log(submission);

          axios.post('https://pure-caverns-82881.herokuapp.com/api/v54/quizzes', submission,  
          {headers:{
                          "X-Access-Token": 'b1a569f2feb6c538495d8dcb8b59ac2a4b8c19c634ccb2bacd7ede2eac557f04',
                      }
                  })
          .then((res) => {navigate("/quizes")})
          .catch((err)=>{console.log(err)})
      
    }
    
  
      const addFields = () => {
        let object = {
          question: '',
          answers: [],
          correct_answer: ''
        }
    
        setFormFields([...formFields, object])
      }

      const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
      }
    
    return (
        <div>
            <Nav.Link className="btn btn-primary btn-lg"  href="/">Home</Nav.Link>
            <br/>
            <Nav.Link className="btn btn-primary btn-lg" href="/quizes">Tests</Nav.Link>
            <br/>
            <Nav.Link className="btn btn-primary btn-lg" href="/add">Create</Nav.Link>

                <div className="card-body">
                    <h1 className="card-title">Create a Test</h1>
                    <form onSubmit={submit}>
                        <input type="text"  className="form-control" placeholder = "Write a title for test" name="title" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <br/>
                        { 
                        formFields.map((form, index) => {
                            return(
                                <div key={index}>
                                    <input type="text"  className="form-control" placeholder = "Define the question" name="question" onChange={event=>handleFormChange(event, index)} value={form.question}/> <br/>

                                    <input type="text" className="form-control" placeholder = "Write answer Nr.1" name="answers[0]" onChange={event=>handleFormChange(event, index)} value={form.answers[0]}/> <br/>

                                    <input type="text" className="form-control" placeholder = "Write answer Nr.2" name="answers[1]" onChange={event=>handleFormChange(event, index)} value={form.answers[1]}/> <br/>

                                    <input type="text" className="form-control" placeholder = "Write answer Nr.3" name="answers[2]" onChange={event=>handleFormChange(event, index)} value={form.answers[2]}/> <br/>

                                    <input type="text" className="form-control" placeholder = "Write answer Nr.4" name="answers[3]" onChange={event=>handleFormChange(event, index)} value={form.answers[3]}/> <br/>
                                        
                                    <label htmlFor="correct_answer" className="form-label">Select the correct variant:</label> <br/>        
                                    <select name="correct_answer" className="form-control" value={form.correct_answer} onChange={event=>handleFormChange(event, index)}>
                                        <option defaultValue value={form.answers[0]}>{form.answers[0]}</option>
                                        <option value={form.answers[1]}>{form.answers[1]}</option>
                                        <option value={form.answers[2]}>{form.answers[2]}</option>
                                        <option value={form.answers[3]}>{form.answers[3]}</option>
                                    </select>
                                    <br/>
                                    {error && <div className="text-danger">{error}</div>}
                                    <br/>
                                    <button className="btn btn-danger mb-3 btn-lg" onClick={() => removeFields(index)}>Delete question </button>
                                </div>
                            )
                        })
                        }
                    </form>
                    
                        <button className="btn btn-dark mb-3 btn-lg" onClick={addFields}>Add question</button> <br/>
                        <button className="btn btn-success btn-lg" onClick={submit}>Create</button>
                    
            </div>
        </div>
    );


}

export default Create;