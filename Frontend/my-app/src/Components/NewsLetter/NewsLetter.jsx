import React from 'react'
import './NewsLetter.css'

const NewsLetter =()=>{
    return(
        <div className="newsletter">
            <h1>Get Exclusive Offers on Your Email</h1>
            <p>Subscribe to our newsletter </p>


            <div>
                <input type="email" placeholder="Your Email Id"/>
                <button>Subscribe</button>
            </div>

        </div>
    )



}

export default NewsLetter


