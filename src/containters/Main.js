import React, { Component } from 'react';

import Kata from '../components/Kata';
import axios from 'axios';
import './Main.css';

export default class Main extends Component {
    state = {
        users: [],
        katas: [],
        currentKata: '',
        currentTimer: 0,
        kataName: '',
        kataTime: 0,
        errorMessage: ''
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }   

    getKata = async ( e ) => {
        e.preventDefault();
        if(this.state.kataName && this.state.kataTime > 0)
        try {
            const kata = await axios.get(`http://localhost:3000/${this.state.kataName}`);
            if(kata.data.name === 'Error') {
                console.log(kata.data);
                this.setState({
                    errorMessage: kata.data
                });
            }
            else {
                let katas = this.state.katas.slice();
                if(!katas.map(x => x.id).includes(kata.data.id)) {
                    katas.push({...kata.data, time: Number(this.state.kataTime)});
                    this.setState({ 
                        katas: katas
                    })
                }
                else {
                    this.setState({
                        errorMessage: {message: 'Kata already added, try another one'}
                    });
                }
            }
        }
        catch(err) {console.log(err)}
    }

    render() {
        return (
            <div className="main">
                <div className="katas">
                    <div className='controlls'>
                        <form onSubmit={this.getKata}>
                            <label htmlFor="kataName">Name of the Kata:</label>
                            <input type="text" onChange={this.onChangeHandler} name="kataName" className="add-kata"/>
                            <label htmlFor="kataTime">Time for Kata(in minutes):</label>
                            <input type="number" onChange={this.onChangeHandler} name="kataTime" className="add-kata"/>
                            <button type="submit">+</button>
                        </form>
                        <span>^</span>
                    </div>
                    <div className="kata-list">
                        <div className="kata-list1">
                            {this.state.katas.map(kata => <Kata key={kata.id} {...kata}/> )}
                        </div>
                        <div className="kata-list2">
        {this.state.katas.map(kata => <span key={kata.id}>{kata.name} - {kata.time} minutes</span>)}
                        </div>
                    </div>
                </div>
                <div className="users">

                </div>
            </div>
        )
    }
}
