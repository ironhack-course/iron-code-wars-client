import React from 'react'

export default function Controls( props ) {
    return (
        <div className='kata-add'>
            <form onSubmit={props.getKata}>
                <label htmlFor="kataName">Name of the Kata:</label>
                <input type="text" onChange={props.onChangeHandler} name="kataName" className="add-kata" />
                <label htmlFor="kataTime">Time for Kata(in minutes):</label>
                <input type="number" onChange={props.onChangeHandler} name="kataTime" className="add-kata" />
                <button type="submit">+</button>
            </form>
            <span>^</span>
        </div>
    )
}
