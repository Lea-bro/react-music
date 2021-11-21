// import {combineReducers} from 'redux';
import {combineReducers} from 'redux-immutable';
// 这里使用的是redux-immutable里的，性能优化

import {reducer as recommendReducer} from '../pages/discover/c-pages/recommend/store';
import {reducer as playerReducer} from '../pages/player/store';

const cReducer = combineReducers({
    recommend:recommendReducer,
    player:playerReducer
});

export default cReducer;