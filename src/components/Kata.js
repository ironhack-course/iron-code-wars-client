import React from 'react';

export default function Kata(props) {
    let color = props.rank.color === 'white' || props.rank.color === 'yellow' ? 'black' : 'white';
    let description = props.description.split('</h1>');
    console.log(description);
    return (
        <div className='kata'>
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                <span className="" style={{background: props.rank.color, color: color}}>
                    {props.name} - {props.rank.name} - {props.time}
                </span>
            </a>
            {/* {description[0]} */}
            <p style={{whiteSpace: 'pre-wrap'}}>
                {description[1] ? description[1] : description[0]}
            </p>
        </div>
    )
}
