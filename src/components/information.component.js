import React, {Component} from 'react';

export default class information extends Component{
    
    render() {
        return(
            <div>
                <div style={{textAlign: 'center'}}>
                    <br/>
                    <h4>Instructions:</h4>
                    <br/>
                    <p>Click the "Search stack overflow" link on the navbar to access the search</p>
                    <br/>
                    <p>Enter the tags you want to search in the tags field separated by a semicolon ';' and without space. (eg: Docker;React)</p>
                    <br/>
                    <p><b>Select one of the following three options for query type:</b></p>
                    <ul style={{listStyleType: "none"}}>
                        <li><b>Newest:</b> This will return a list of 10 newest queries sorted by creation date.</li>
                        <li><b>Most Voted:</b> This will return a list of 10 most voted queries sorted by creation date.</li>
                        <li><b>Both:</b> This will return an aggregated list of 10 newest and 10 most voted queries sorted by creation date.</li>
                    </ul>
                </div>
            </div>
        )
    }
}