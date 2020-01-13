import React, { Component } from 'react';
import { connect } from 'react-redux';
import Kata from '../components/Kata';
import * as actionTypes from '../store/actions';
import axios from 'axios';
import './Main.css';

class Main extends Component {
    // ToDos
    // do social login with GitHub *required
    // users able to join in room/challenge
    state = {
        kataName: '',
        kataTime: 0
    }

    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }   

    getKata = async ( e ) => {
        e.preventDefault();

        //grab the time to complete Kata
        const kataTime = this.state.kataTime === 0 ? 25 : Number(this.state.kataTime);

        if(this.state.kataName)
        try {
            const kata = await axios.get(`/${this.state.kataName}`);
            if(kata.data.name === 'Error') {
                console.log(kata.data);
                this.props.errorMessage(kata.data);
            }
            else {
                this.props.onGetKata({...kata.data, time: kataTime});
            }
        }
        catch(err) {
            
        }
    }

    render() {
        let kata = this.props.displayedKata != null ? this.props.katas[this.props.displayedKata] : null;
        console.log(kata, this.props.displayedKata, this.props.katas[this.props.displayedKata]);

        // we should be checking if there is an error in global state and displaying it (idealy as hoc/overlay)
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
                            {this.props.katas.map(kata => <div key={kata.id}><span >{kata.name} - {kata.time} minutes</span></div>)}
                            
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
        //state passed as props
        users: state.users,
        katas: state.katas,
        currentKata: state.currentKata,
        currentTimer:state.currentTimer,
        errorMessage: state.errorMessage,
        displayedKata: state.displayedKata
    }
}

const mapDispathToProps = dispatch => {
    return {
        //actions to dispatch
        onGetKata: (kata) => dispatch({ type: actionTypes.onGetKata, kata: kata }),
        errorMessage: (errorMessage) => dispatch({ type: actionTypes.errorMessage, errorMessage })
    }
}

export default connect(mapStateToProps, mapDispathToProps)(Main);