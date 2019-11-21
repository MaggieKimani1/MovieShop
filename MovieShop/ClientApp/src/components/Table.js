import React, { Component } from 'react';


//const TableHeader = () => {
    // () => props.removeCharacter(index)
//    return <thead/>
//}


class Table extends Component {
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
                                        <button>Delete</button>
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
