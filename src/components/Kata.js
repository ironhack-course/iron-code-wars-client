import React from 'react';

export default function Kata(props) {
    let color = props.rank.color === 'white' || props.rank.color === 'yellow' ? 'black' : 'white';
    return (
        <div className='kata'>
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                <span className="" style={{background: props.rank.color, color: color}}>
                    {props.name} - {props.rank.name} - {props.time}
                </span>
            </a>
            <p style={{whiteSpace: 'pre-wrap'}}>
                {props.description}
            </p>
        </div>
    )
}
