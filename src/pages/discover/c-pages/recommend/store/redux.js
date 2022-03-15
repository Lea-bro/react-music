import * as actionTypes from './constants';

import {Map} from 'immutable';
// immutable,性能优化,使用immutable包括对象，修改会返回新的对象

const defaultState = Map({
    topBanners:[],
    hotRecommends:[],
    newAlbums:[],

    upRankings:{},
    newRankings:{},
    originRankings:{},

    settleSinger:[]

})

function reducer(state = defaultState,action){
    // console.log("redux",action)
    switch(action.type){
        case actionTypes.CHANGE_TOP_BANNERS:
            // return {...state,topBanners:action.topBanners}
            // 使用immutable修改数据会返回新的对象
            return state.set("topBanners",action.topBanners)
        case actionTypes.GET_HOT_RECOMMEND:
            return state.set('hotRecommends',action.hotRecommends)
        case actionTypes.GET_NEW_ALBUM:
            return state.set('newAlbums',action.newAlbums)
            
        case actionTypes.CHANGE_UP_RANKING:
            return state.set('upRankings',action.upRankings)
        case actionTypes.CHANGE_NEW_RANKING:
            return state.set('newRankings',action.newRankings)
        case actionTypes.CHANGE_ORIGIN_RANKING:
            return state.set('originRankings',action.originRankings)
        case actionTypes.CHABGE_SETTLE_SINGER:
            return state.set('settleSinger',action.settleSinger)
        default:
            return state
    }
}

export default reducer;