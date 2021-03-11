import React, {Component} from 'react';

export default class WelcomePage extends Component{
    
    render() {
        return(
            <div>
                <h6>
                    <i>
                    Name: Akshay Sharma<br/>
                    Student Number: 7859678<br/>
                    Course: COMP 4350<br/>
                    Assignment: 1<br/>
                    Instructor: Dr. Shaowei Wang<br/>
                    </i>
                </h6>
                <br/>
                <br/>
                <h2 style={{textAlign: "center" , backgroundColor: "#CDCDCD", margin: "auto", width: "50%", border: "2px solid grey", padding: "10px"}}>
                    Welcome to Stack overflow tracker
                </h2>
            </div>
        )
    }
}