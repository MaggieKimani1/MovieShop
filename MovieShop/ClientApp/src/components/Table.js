import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';
import Button from './Button';


//const TableHeader = () => {
    // () => props.removeCharacter(index)
//    return <thead/>
//}

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        }
    }
    
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

    handleDelete = async (id) => {
        const token = await authService.getAccessToken();
        const response = await fetch('/Films/' + id,
            {
                headers: !token ? {} :
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                method: 'DELETE'
            })
        const data = await response.json();
        if (data) {
            const { tableData } = this.state;
            const newData = tableData.filter(movie => movie.id !== id);
            this.setState({
                tableData: newData,
            });
            alert("Movie deleted successfully!");
        }
      
    }
    
    
    handleEdit = async (id, title, genre, releaseDate, price) => {
        const token = await authService.getAccessToken();
        const movie = {
            id: id,
            title: title,
            genre: genre,
            releaseDate: releaseDate,
            price: parseInt(price)

        }
        var data = JSON.stringify(movie);
        if (data) {
            await fetch('/Films/' + id,
            {
                headers: !token ? {} :
                    {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                method: 'PUT',
                body: data
            })
            alert("Movie edited successfully!");
        }
        this.populateTableData();  
    }
       
        
    


    render () {
        const { tableData } = this.state;
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                        <th> Title </th>
                        <th> Genre </th>
                        <th> ReleaseDate </th>
                        <th> Price </th>
                        </tr>
                    </thead>
                    {tableData.length > 0 && <tbody>
                        {this.state.tableData.map((movie, key) => {
                            const editField = (value, index) => {
                                const tableData = this.state.tableData.map(movie => ({ ...movie }))
                                tableData[key][index] = value
                                this.setState({ tableData })
                            }
                            return (
                                <tr key={key} className={movie.editing ? 'editing' : ''} onClick={() => {
                                    const tableData = this.state.tableData.map(i => ({ ...i, editing: movie.editing && i === movie }))
                                    tableData[key].editing = true;
                                    this.setState({
                                        clientIsEditing: true,
                                        tableData
                                    })
                                        
                                }}>
                                    <td>{movie.editing ? <input value={tableData[key].title} onChange={e => editField(e.target.value, 'title')} /> :
                                        <span>{movie.title}</span>}</td>
                                    <td>{movie.editing ? <input value={tableData[key].genre} onChange={e => editField(e.target.value, 'genre')} /> :
                                        <span>{movie.genre}</span>}</td>
                                    <td>{movie.editing ? <input value={tableData[key].releaseDate} onChange={e => editField(e.target.value, 'releaseDate')} /> :
                                        <span>{movie.releaseDate}</span>}</td>
                                    <td>{movie.editing ? <input value={tableData[key].price} onChange={e => editField(e.target.value, 'price')} /> :
                                        <span>{movie.price}</span>}</td>
                                    <td>{movie.editing ?
                                        <Button label='Update' onClick={(id, title, genre, releaseDate, price) => this.handleEdit(movie.id, movie.title, movie.genre, movie.releaseDate, movie.price)} /> : <span>{}</span>
                                        }
                                    </td>
                                    <td>                                        
                                        <Button onClick={(id) => this.handleDelete(movie.id)} label ='Delete'/>
                                    </td>
                                </tr>
                            )
                        })
                    }</tbody>}
                    {tableData.length === 0 && <tbody><tr><td>Loading ...</td></tr></tbody>}
                </table>
            </div>
           
        );
    } 
}
export default Table
