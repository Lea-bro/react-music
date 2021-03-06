import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector ,shallowEqual} from "react-redux";

import { 
    AppPlayWrapper, 
    Control,
    PlayInfo,
    Operator 
} from "./style";
import { NavLink } from "react-router-dom";
import {  Slider,message} from 'antd';
import { getSizeImage, formatDate,getPlaySong} from "@/utils/format-utils";
import { 
    getSongDetailAction,
    ChangeSequenceAction,
    ChangeCurrentSong,
    ChangeCurrentLyricIndexAction
} from "../store/actionCreators";


// import {getMusicUrl} from '@/service/player';

export default memo(function HYAppPlayBar() {
    const [currentTime,setCurrentTime] = useState(0);
    const [progress,setProgress] = useState(0);
    const [isChanging,setIsChanging] = useState(false);
    const [isshow,setIsShow] = useState(false);

    // redux hooks
    const {
        currentSong,
        sequence,
        lyricList,
        currentLyricIndex
    } = useSelector((state) => ({
        currentSong:state.getIn(['player','currentSong']),
        sequence:state.getIn(['player','sequence']),
        lyricList:state.getIn(['player','lyricList']),
        currentLyricIndex:state.getIn(['player','currentLyricIndex'])
    }),shallowEqual)
    const dispatch = useDispatch()

    // other hooks 
    const audioRef = useRef()
    useEffect(()=>{
        dispatch(getSongDetailAction(167873))
    },[dispatch])
    useEffect(()=>{
        audioRef.current.src = getPlaySong(currentSong.id)
        audioRef.current.play().then(res =>{
            setIsShow(true)
        }).catch(err =>{
            setIsShow(false)
        })
    },[currentSong])

    // other handle
    const picUrl = (currentSong.al && currentSong.al.picUrl) || "";
    const namesingerName = (currentSong.ar && currentSong.ar[0].name) || "未知歌手";
    const duration = currentSong.dt || 0;
    const showduration =  formatDate(duration,"mm:ss");
    const showCurrentTime =  formatDate(currentTime,"mm:ss");
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const playMusic = useCallback(() =>{
        isshow ? audioRef.current.pause():audioRef.current.play();
        setIsShow(!isshow)
        // if(!isshow){
        //     console.log(audioRef)
        //     audioRef.current.play()
        //     setIsShow(true)
        // } else{
        //     audioRef.current.pause()
        //     setIsShow(false)
        // }
    },[isshow])

    const timeUpdata = (e) =>{
        if(!isChanging){
            setCurrentTime(e.target.currentTime * 1000);
            setProgress(currentTime/duration * 100);
        }

        // 获取歌词
        let i=0;
        for(; i<lyricList.length;i++){
            let lyricItem = lyricList[i];
            if(currentTime < lyricItem.time){
                break;
            }
        }
        if(currentLyricIndex !== i-1){
            dispatch(ChangeCurrentLyricIndexAction(i-1))
            // console.log(lyricList[i-1].content)
            const content = lyricList[i-1] && lyricList[i-1].content;
            message.open({
                key: "lyric",
                content:content,
                duration: 5,
                className: "lyric-class"
              })
        }

    }

    const sliderChange = useCallback((value) =>{
        setIsChanging(true)
        const currentTime = value / 100 * duration / 1000
        setCurrentTime(currentTime * 1000)
        setProgress(value)
          
    },[duration])
    const sliderAfterChange = useCallback((value) =>{
        const currentTime = value / 100 * duration / 1000
        audioRef.current.currentTime = currentTime
        setCurrentTime(currentTime * 1000)
        setIsChanging(false)
        // setTimeout(() => {
        //     setIsChanging(false)
        // }, 200);
        if(!isshow){
            playMusic()
        }
        
    },[duration,isshow,playMusic])

    const Sequence = () =>{
        let sequenceIndex = sequence + 1;
        if(sequenceIndex > 2){
            sequenceIndex = 0
        }
        dispatch(ChangeSequenceAction(sequenceIndex))
    }

    const ChangeMusic = (tag) => {
        dispatch(ChangeCurrentSong(tag))
    }
    const handleMusicEnded = () =>{
        if(sequence === 2){ //单曲循环
            audioRef.current.currentTime = 0;
            audioRef.current.play();
        } else {
            dispatch(ChangeCurrentSong(1));
          }
    }

    return (
        <AppPlayWrapper className="sprite_player">
        <div className="content wrap-v2">
            <Control isPlaying={isshow}>
            <button className="sprite_player prev"
                    onClick={e => ChangeMusic(-1)}></button>
            <button className="sprite_player play" onClick={e => playMusic()}>
            </button>           
            <button className="sprite_player next"
                    onClick={e => ChangeMusic(1)}></button>
            </Control>
            <PlayInfo>
            <div className="image">
                <NavLink to="/discover/player">
                  <img src={getSizeImage(picUrl,35)} alt="" />
                </NavLink>
            </div>
            <div className="info">
                <div className="song">
                    <span className="song-name">{currentSong.name}</span>
                    <a href="#/" className="singer-name">{namesingerName}</a>
                </div>
                <div className="progress">
                <Slider
                    defaultValue={100}
                    value={progress}
                    onChange={sliderChange}
                    onAfterChange={sliderAfterChange}
                />
                <div className="time">
                    <span className="now-time">{showCurrentTime}</span>
                    <span className="divider">/</span>
                    <span className="duration">{showduration}</span>
                </div>
                </div>
            </div>
            </PlayInfo>
            <Operator sequence={sequence}>
            <div className="left">
                <button className="sprite_player btn favor"></button>
                <button className="sprite_player btn share"></button>
            </div>
            <div className="right sprite_player">
                <button className="sprite_player btn volume"></button>
                <button className="sprite_player btn loop" onClick={e => Sequence()}></button>
                <button className="sprite_player btn playlist"></button>
            </div>
            </Operator>
        </div>
        <audio ref={audioRef} 
               onTimeUpdate={e => timeUpdata(e)}
               onEnded={e => handleMusicEnded()}></audio>
        </AppPlayWrapper>
    );
});
