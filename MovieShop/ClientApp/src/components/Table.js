import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';


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
   /* componentDidMount = () => {
        this.handleDelete();
    };*/
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
        console.log(data);
        if (data) {
            const oldData = { ...this.state.tableData };
            const newData = oldData.map(movie => movie.id !== id);
            this.setState({ tableData: newData });
        }
       /* this.setState(
            {
                tableData: this.state.tableData.filter((movie) => {
                    return (movie.id !== id);
                })
            });*/
    }


    render () {
        const { tableData } = this.props;
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

                    {tableData.length > 0 && <tbody>{
                        tableData.map((movie, index) => {
                            return (
                                <tr key={movie.id}>
                                    <td>{movie.title}</td>
                                    <td>{movie.genre}</td>
                                    <td>{movie.releaseDate}</td>
                                    <td>{movie.price}</td>
                                    <td>
                                        <button>Edit</button>
                                    </td>
                                    <td>                                        
                                        <button onClick={(id) => this.handleDelete(movie.id)}>Delete</button>
                                    </td>
                                </tr>
                            )
                        })
                    }</tbody>}
                    {tableData.length === 0 && <tbody><tr><td>Loading ...</td></tr></tbody>}
                </table>
            </div>
            //<table>
            //    <TableHeader />
            //    <TableBody characterData={characterData} removeCharacter={removeCharacter} />
            //</table>
        );
    } 
}
export default Table
