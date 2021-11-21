import * as actionTypes from './constants';

import {
  getTopBanners,
  getHotRecommend,
  getNewAlbums,
  getTopList
} from '@/service/recommend';

const changeTopBannerAction = (res) => ({
    type:actionTypes.CHANGE_TOP_BANNERS,
    topBanners:res.banners
})
const changeHotRecommentAction = (res) => ({
    type:actionTypes.GET_HOT_RECOMMEND,
    hotRecommends:res.result
})
const changeNewAlbumAction = (res) => ({
    type:actionTypes.GET_NEW_ALBUM,
    newAlbums:res.albums
})



const changeUpRankingAction = (res) => ({
  type: actionTypes.CHANGE_UP_RANKING,
  upRankings: res.playlist
})

const changeNewRankingAction = (res) => ({
  type: actionTypes.CHANGE_NEW_RANKING,
  newRankings: res.playlist
})

const changeOriginRankingAction = (res) => ({
  type: actionTypes.CHANGE_ORIGIN_RANKING,
  originRankings: res.playlist
})



export const getTopBannerAction = () => {
    return dispatch => {
      getTopBanners().then(res => {
        // console.log(res)
        dispatch(changeTopBannerAction(res));
        // dispatch({
        //   type:actionTypes.CHANGE_TOP_BANNERS,
        //   topBanners:res.banners
        // });
      })
    }
};

export const getHotRecommentAction = (limit) => {
  return dispatch => {
    getHotRecommend(limit).then(res => {
      // console.log(res.result)
      dispatch(changeHotRecommentAction(res))
    })
  }
}

export const getNewAlbumAction = () =>{
  return dispatch => {
    getNewAlbums().then(res => {
      dispatch(changeNewAlbumAction(res))
    })
  }
}
export const getTopListAction = (idx) => {
  return dispatch => {
    getTopList(idx).then(res => {
      // console.log(res.playlist.tracks)
      switch (idx) {
        case 19723756:
          dispatch(changeUpRankingAction(res));
          break;
        case 3779629:
          dispatch(changeNewRankingAction(res));
          break;
        case 2884035:
          dispatch(changeOriginRankingAction(res));
          break;
        default:
      }
    });
  }
}