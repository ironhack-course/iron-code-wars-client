import React, { Component } from 'react';

import Kata from '../components/Kata';
import axios from 'axios';

export default class Main extends Component {
    state = {
        users: [],
        katas: [],
        time: 0,
        kataName: ''
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }   

    getKata = async ( e ) => {
        e.preventDefault();
        try {
            const kata = await axios.get(`http://localhost:3000/${this.state.kataName}`);//
            // "proxy": "http://localhost:3000",
            console.log(kata.data)
            let katas = this.state.katas.slice();
            katas.push(kata.data);
            this.setState({
                katas: katas
            })
        }
        catch(err) {console.log(err)}
    }

    render() {
        return (
            <div className="main">
                <div className="katas">
                    <form onSubmit={this.getKata}>
                        <input type="text" onChange={this.onChangeHandler} name="kataName" className="add-kata"/>
                    </form>
                    <Kata />
                </div>
                <div className="users">

                </div>
            </div>
        )
    }
}
