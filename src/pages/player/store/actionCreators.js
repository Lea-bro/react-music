import {getSongDetail,getLyric} from '@/service/player';
import {getRandom} from '@/utils/math-utils';
import {parseLyric} from '@/utils/parse-lyric';
import *as actionTypes from './constants';

const ChangeCurrentSongAction = (currentSong) => ({
    type:actionTypes.CHANGE_CURRENT_SONG,
    currentSong
})
const ChangePlayListAction = (playlist) => ({
    type:actionTypes.CHANGE_PLAY_LIST,
    playlist
})
const ChangeCurrentSongIndexAction = (currentSongIndex) => ({
    type:actionTypes.CHANGE_CURRENT_SONG_INDEX,
    currentSongIndex
})
const changLyricListAction = (lyricList) =>({
    type:actionTypes.CHANGR_LYRIC_LIST,
    lyricList
})


export const ChangeCurrentLyricIndexAction = (currentLyricIndex) => ({
    type:actionTypes.CHANGE_CURRENT_LYRICINDEX,
    currentLyricIndex
})

export const ChangeCurrentSong = (tag) => {
    return (dispatch,getState) => {
        const sequence = getState().getIn(['player','sequence'])
        let currentSong = getState().getIn(['player','currentSongIndex']) + tag;
        const playlist = getState().getIn(['player','playlist']);
        // const currentSongTag = currentSong + tag;

        switch(sequence){
            case 1: //随机播放
                let RandomIndex = getRandom(playlist.length);
                while(RandomIndex === currentSong){
                    RandomIndex = getRandom(playlist.length);
                }
                currentSong = RandomIndex;
                break;
            default: //顺序播放
                if(currentSong === -1) currentSong = playlist.length - 1;
                if(currentSong === playlist.length) currentSong = 0;
        }
        const song = playlist[currentSong];
        dispatch(ChangeCurrentSongIndexAction(currentSong))
        dispatch(ChangeCurrentSongAction(song))

        dispatch(getLyricAction(song.id));

        
        // if(sequence === 1){  
        //     let RandomIndex = -1;
        //     while(RandomIndex === currentSong){
        //          RandomIndex = getRandom(playlist.length -1);
        //     }
        //     currentSong = RandomIndex;
        //     const song = playlist[currentSong];
        //     dispatch(ChangeCurrentSongIndexAction(currentSong))
        //     dispatch(ChangeCurrentSongAction(song)) 
        // } else {
        //     if(currentSong === -1) currentSong = playlist.length - 1;
        //     if(currentSong === playlist.length) currentSong = 0;
        //     const song = playlist[currentSong];
        //     dispatch(ChangeCurrentSongIndexAction(currentSong))
        //     dispatch(ChangeCurrentSongAction(song))
        // }
    }
}

export const ChangeSequenceAction = (sequence) => ({
    type:actionTypes.CHANGE_SEQUENCE,
    sequence
})

export const getSongDetailAction = (ids) => {
    return (dispatch,getState) => {
        // 1、根据id查找playlist中是否已经有了该歌曲
        const playlist = getState().getIn(['player','playlist']);
        const songIndex = playlist.findIndex(song => song.id === ids);
        
        // 2、判断是否找到歌曲
        let song = null;
        if(songIndex !== -1){  //找到歌曲
            dispatch(ChangeCurrentSongIndexAction(songIndex))
            song = playlist[songIndex]
            dispatch(ChangeCurrentSongAction(song))
            dispatch(getLyricAction(song.id));
        }else{  //没有找到歌曲
            getSongDetail(ids).then((res) => {
                song = res.songs && res.songs[0]
                if(!song) return

                // 2.1、将最新请求到的数据添加到playlist中
                const newSonglist = [...playlist];
                newSonglist.push(song);

                // 2.2、更新redux中的值
                dispatch(ChangePlayListAction(newSonglist));
                // console.log(newSonglist.length - 1)
                dispatch(ChangeCurrentSongIndexAction(newSonglist.length - 1));
                dispatch(ChangeCurrentSongAction(song));

                // 2.3请求歌词
                dispatch(getLyricAction(song.id));
            })
        }   
    }
}

export const getLyricAction = (id) => {
    return dispatch => {
      getLyric(id).then(res => {
        const lyric = res.lrc.lyric;
        const lyricList = parseLyric(lyric);
        dispatch(changLyricListAction(lyricList));
        // console.log(lyricList)
      })
    }
  }