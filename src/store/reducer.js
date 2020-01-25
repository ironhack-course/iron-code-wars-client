import * as actionTypes from './actions';

//My initial state
const initialState = {
    users: [],
    katas: [],
    currentKata: '',
    currentTimer: 0,
    errorMessage: '',
    displayedKata: null
}
//Reducer
const reducer = ( state = initialState, action ) => {
    switch(action.type){
        //Once we retrieve Kata from API
        case actionTypes.onGetKata:
            if(!state.katas.map(kata => kata.id).includes(action.kata.id)) {
                let katas = state.katas.concat(action.kata)
                let displayedKata = katas.length--;
                return {...state, katas, displayedKata};
            } else {
                return {...state, errorMessage: {message: 'Kata already added, try another one'}}
            }
        //Here we change the kata that we currently work on
        case actionTypes.changeDisplayedKata: 
            let displayedKata = state.displayedKata + action.change;
            return {...state, displayedKata}
        //Once we get error message we might want to show them on the layover
        case actionTypes.errorMessage:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state;
    }
}

export default reducer;