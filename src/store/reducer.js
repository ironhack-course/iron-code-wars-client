import * as actionTypes from './actions';

const initialState = {
    users: [],
    katas: [],
    currentKata: '',
    currentTimer: 0,
    errorMessage: '',
    displayedKata: null
}
const reducer = ( state = initialState, action ) => {
    switch(action.type){
        case actionTypes.onGetKata:
            if(!state.katas.map(x => x.id).includes(action.kata.id)) {
                let katas = state.katas.concat(action.kata)
                let displayedKata = katas.length - 1;
                return {...state, katas, displayedKata};
            } else {
                return {...state, errorMessage: {message: 'Kata already added, try another one'}}
            }
        case actionTypes.errorMessage:
            return {...state, errorMessage: action.errorMessage}
        default:
            return state;
    }
}

export default reducer;