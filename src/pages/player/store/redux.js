import { Map } from "immutable";
import * as actionTypes from './constants';

const defaultState = Map({
    playlist:[],
    currentSongIndex:0,
    currentSong:{},
    sequence:0, //0：循环，1：随机，2：单曲 ,
    lyricList:[],
    currentLyricIndex:0
})

function reducer (state = defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_CURRENT_SONG:
            return state.set('currentSong',action.currentSong)
        case actionTypes.CHANGE_PLAY_LIST:
            return state.set('playlist',action.playlist)
        case actionTypes.CHANGE_CURRENT_SONG_INDEX:
            return state.set('currentSongIndex',action.currentSongIndex)
        case actionTypes.CHANGE_SEQUENCE:
            return state.set('sequence',action.sequence)
        case actionTypes.CHANGR_LYRIC_LIST:
            return state.set('lyricList',action.lyricList)
        case actionTypes.CHANGE_CURRENT_LYRICINDEX:
            return state.set('currentLyricIndex',action.currentLyricIndex)
        default:
            return state
    }
}

export default reducer;