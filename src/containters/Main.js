import React, { Component } from 'react';
import { connect } from 'react-redux';


import * as actionTypes from '../store/actions';
import axios from 'axios';

import Kata from '../components/Kata';
import Controls from '../components/Controls';
import './Main.css';

class Main extends Component {
    // ToDos
    // do social login with GitHub *required
    // users able to join in room/challenge

    //local state used for adding new kata and time for it
    state = {
        kataName: '',
        kataTime: 0
    }

    //on change for kata/timer
    onChangeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }   

    //Grab a kata from API can be done either via ID or Kata-name
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
                //store Kata in store
                this.props.onGetKata({...kata.data, time: kataTime});
            }
        }
        catch(err) {
            
        }
    }

    render() {
        //kata to be shown
        // console.log(kata, this.props.displayedKata, this.props.katas[this.props.displayedKata]);
        let displayedKata = this.props.displayedKata != null ? this.props.katas[this.props.displayedKata] : null;

        // we should be checking if there is an error in global state and displaying it (idealy as hoc/overlay)
        return (
            <div className="main">
                <div className="katas">
                    <Controls getKata={this.getKata} onChangeHandler={this.onChangeHandler} />
                    <div className="kata-list">
                        <div className="kata-list1">
                            {displayedKata && <Kata key={displayedKata.id} {...displayedKata}/>}
                            
                        </div>
                        <div className="kata-list2">
                            {/* Here we need router to switch over katas */}
                            {this.props.katas.map(kata => <div key={kata.id}><span >{kata.name} - {kata.time} minutes</span></div>)}
                            
                        </div>
                    </div>
                    {/* Here we will create own container */}
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