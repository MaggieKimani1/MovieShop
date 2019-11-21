import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import authService from './api-authorization/AuthorizeService';
import Table from './Table';

export class Home extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }

    }
    static displayName = Home.name;   

    componentDidMount = () => {
        this.populateTableData();
    };

    populateTableData = async () => {
        const token = await authService.getAccessToken();
        const response = await fetch("/Films",
            {
                headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
            });
        const data = await response.json();
        this.setState({ tableData: data }); //sets state value to the output from the api call
    }

    //delete

    //removeCharacter = index => {
    //    const { characters } = this.state
    //    this.setState({
    //        characters: characters.filter((character, i) => {
    //            return i !== index
    //        }),
    //    })
    //}

    //handleSubmit = character => {
    //    this.setState({ characters: [...this.state.characters, character] })
    //}


    render() {
        const { tableData } = this.state
        return (
            <div className="container">
                <nav>
                    <Link to="/form">Create New</Link>
                </nav>
                <h1>Welcome to the Movie Shop</h1>
                <Table tableData={tableData} />
            </div>
            );
    }
}
