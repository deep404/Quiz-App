import './App.css';
import {useNavigate} from 'react-router-dom';
import {useEffect} from "react";
import Home from './pages/Home';
import Tests from './pages/Tests';
import EnterUser from './pages/EnterUser';
import Create from './pages/Create';
import Test from './components/Test';
import { Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css";
import Sound from 'react-sound';
import FireForceOp from './music/fire-force-op.mp3';


function App() {

  function Security(props){
    // console.log(props)
    let Cmp = props.Cmp
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('user-info'))
        {
            navigate("/register")  
        }
    }, []) 
    return(
        <div>
            <Cmp/>
        </div>
    );
  }

  return (
    <div className="App">

      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/quizes" element={<Security Cmp={Tests}/>} />
        <Route exact path="/add" element={<Security Cmp={Create}/>} />
        <Route exact path="/register" element={<EnterUser/>} />
        <Route path="/quizes/:id" element={<Security Cmp={Test}/>} />

        <Route path="*" element={ <main style={{ padding: "1rem" }}> </main>}
      />
      </Routes>
      <div>
      
      </div>
      <Sound url={FireForceOp} playStatus="PLAYING" loop={true} />
      </div>
  );
}

export default App;


