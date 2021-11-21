import request from './request';

export function getTopBanners(){
    return request({
        url:"/banner"
    })
}

export function getHotRecommend(limit){
    return request({
        url:"/personalized",
        params:{
            limit
        }
    })
}

export function getNewAlbums(){
    return request({
        url:"/album/newest"
    })
}

export function getTopList(id) {
    return request({
      url: "/playlist/detail",
      params: {
        id
      }
    })
  }