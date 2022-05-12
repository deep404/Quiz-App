import React, {useState, useEffect, useRef} from "react";

function Response  ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep }) {
    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radioWrapper = useRef();


useEffect( () => {
    const findCheckedInput = radioWrapper.current.querySelector('input:checked');
    if (findCheckedInput){
        findCheckedInput.checked = false;
    }
}, [data]);

    const changeHandler = (e) => {
        setSelected(e.target.value);
        if (error){
            setError('');
        }
    }

    const nextClickHandler = (e) => {
        if(selected === ''){
            return setError('Please select one option!');
        }
        onAnswerUpdate(prevState => [... prevState, {q:data.question, a: selected, id:data.id}]);
        setSelected('');
       
        console.log("selected answer: ",selected)

        if (activeQuestion < numberOfQuestions - 1){
            onSetActiveQuestion(activeQuestion + 1);
        } else {
            onSetStep(3);
        }
    }
    
    return(
        <div>
            <br/>
                <h1>{data.question}</h1>
                
                <div className="container" ref={radioWrapper}>
                    {data.answers.map((choice, i) => (
                    
                    <label className="answer-button" key={i}>
                        <input type="radio" name="answer"  value={choice} onChange={changeHandler} />
                        {choice}
                        
                    </label>
                    ))}           
                </div>
                {error && <div className="text-danger">{error}<br/><br/></div>}
                
                <button className="btn btn-dark btn-lg" onClick={nextClickHandler}>Next</button>
        </div>
    )
}
export default Response;