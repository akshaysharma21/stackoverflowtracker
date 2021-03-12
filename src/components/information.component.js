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
                    <br/>
                    <p>Press the <b>Search Tag</b> button</p>
                    <br/>
                    <p>A list of collapsible elements will be displayed on the screen. Click on any question to reveal its contents and collapsible for its comments and answers. Click the comments collapsible to reveal the comments regarding the question. Click the answers collapsible to reveal a list of answers and collapsible answer comments for each answer. Click on the answer comments collapsible in this list to reveal the comments for the answer.</p>
                </div>
            </div>
        )
    }
}