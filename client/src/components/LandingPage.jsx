import React from 'react';
import { Link } from 'react-router-dom';
import "../css/LandingPage.css";
import dog from "../img/dogs.svg"

export default function LandingPage(){
    return(
        <div className="landingpage">
            <div className='img_container'>
                <img src={dog} alt="" />
                </div>
            <div className='container'>
                <div className='container_tittle'>
                <p className='container_welcome'>Hi,</p>
                <div  className='container__welcome__bg'>
                <p>Welcome</p>
                </div>
                <p>To <span className='container_span'>Dogs</span> App</p>
                </div>
                    <Link to = '/home'>
                        <button className='container_button'> 
                            GO
                        </button>
                    </Link>
                </div>
        </div>

    )
}