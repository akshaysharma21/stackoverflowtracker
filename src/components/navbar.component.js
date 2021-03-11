import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class navbar extends Component{

    render() {
        return(
            <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/" className="navbar-brand">Stack Overflow Tracker</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/information" className="nav-link">Information</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/searchTags" className="nav-link">Search Stack Overflow</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}