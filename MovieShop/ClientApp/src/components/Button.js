import React, { Component } from 'react';

export function Button(props) {
    return (
        <button className="button" onClick={props.onClick}>
            {props.label}
        </button>
    )
}
     
export default Button;