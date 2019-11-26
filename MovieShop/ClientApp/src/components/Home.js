import React, { Component } from 'react';
import Table from './Table';
import Form from './Form';
import Button from './Button';


export class Home extends Component {    
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        displayForm : false
    }
    static displayName = Home.name;   

    updateDisplayForm = () => {
        this.setState({ displayForm: !this.state.displayForm });
    }
    
    render() {
        const { displayForm } = this.state;
        if (displayForm) {
            return (
                <div className="container">
                    <Button onClick={this.updateDisplayForm}  label="Create New"/>
                    <Form updateDisplay={this.updateDisplayForm}/>
                </div>
            );
        }
        return (
            <div className="container">
                <Button onClick={this.updateDisplayForm}  label="Create New"/>
                <h1>Welcome to the Movie Shop</h1>
                <Table/>
            </div>
            );
    }
}
export default Home;