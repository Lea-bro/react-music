import React, { memo } from 'react';

import {
    HotSingerWarpper
} from './style';

export default memo(function HyHotSing(props) {
    const {imgUrl,imgText} = props
    return (
        <HotSingerWarpper>
            <img src={imgUrl} alt="" className="left"/>
            <div className="right">
                <p>{imgText}</p>
            </div>
        </HotSingerWarpper>
    )
})
