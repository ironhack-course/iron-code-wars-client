import React, { Component } from 'react';
import { connect } from 'react-redux';
import Kata from '../components/Kata';
import axios from 'axios';
import './Main.css';

class Main extends Component {
    state = {
        users: [],
        katas: [],
        currentKata: '',
        currentTimer: 0,
        kataName: '',
        kataTime: 0,
        errorMessage: '',
        displayedKata: null
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
                        katas: katas,
                        displayedKata: katas.length - 1
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
        let kata = this.state.displayedKata != null ? this.state.katas[this.state.displayedKata] : null;
        console.log(kata, this.state.displayedKata, this.state.katas[this.state.displayedKata]);
        return (
            //this is going to be it's own containter
            <div className="main">
                <div className="katas">
                    <div className='kata-add'>
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
                            {kata && <Kata key={kata.id} {...kata}/>}
                            
                        </div>
                        <div className="kata-list2">
                            {this.state.katas.map(kata => <div key={kata.id}><span >{kata.name} - {kata.time} minutes</span></div>)}
                            
                        </div>
                    </div>
                    <div className='kata-start'>
                        <div className="scroll-button">
                            <button> Prev Kata </button>
                            <button> Next Kata </button>
                        </div>
                        <div className="start-button">
                            <button>Start</button>
                        </div>
                    </div>
                </div>
                {/* this is going to be another component */}
                <div className="users">

                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        //state goes here
    }
}

const mapDispathToProps = dispatch => {
    return {
        //actions go here
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Main);