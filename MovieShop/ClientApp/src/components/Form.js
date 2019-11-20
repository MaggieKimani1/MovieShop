import React, { Component } from 'react'
import authService from './api-authorization/AuthorizeService'

class Form extends Component {
    constructor(props) {
        super(props)
        this.submitForm = this.submitForm.bind(this);
        this.state = this.initialstate;
    }

    initialstate = {
        title: '',
        genre: '',
        releaseDate: '',
        price: 0
    }

    handleChange = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value,
        })
    }

    submitForm = async (e) => {
        e.preventDefault();
        var token = await authService.getAccessToken();
        if (!token) {
            token = '';
        }
        // extract form data
        const newFilm = {
            title: this.state.title,
            genre: this.state.genre,
            releaseDate: this.state.releaseDate,
            price: parseInt(this.state.price)
        }
        var data = JSON.stringify(newFilm);
        const response = await fetch('/Films', {
            method: 'POST',
            body: data,
            headers: {
                 'Content-Type': 'application/json',
                 'Authorization' : `Bearer ${token}` 
            },
            
        });

        const resp = await response.json()
        console.log(resp);

    }
    render() {
        return (
            <form onSubmit={this.submitForm} >
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    onChange={this.handleChange} />
                <label>Genre</label>
                <input
                    type="text"
                    name="genre"
                    onChange={this.handleChange} />
                <label>Release Date</label>
                <input
                    type="date"
                    name="releaseDate"
                    onChange={this.handleChange} />
                <label>Price</label>
                <input
                    type="number"
                    name="price"
                    onChange={this.handleChange} />
                <button>Submit</button>
            </form>
        );
    }
}
export default Form;