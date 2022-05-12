import React from "react";
import {Nav} from 'react-bootstrap';

export default function Home(){
    return(
        <div>
            <img src={process.env.PUBLIC_URL + "/background.png"} className="img-fluid p-5"/>

            <Nav.Link className="btn btn-primary btn-lg"  href="/register">Enter</Nav.Link>
        </div>
    );
}
