import React, { memo } from 'react';

import {
    ChildWarrper
} from './style'
import {getSizeImage} from '@/utils/format-utils'
export default memo(function HYChild(props) {
    const {imgUrl,name,position} = props
    return (
        <ChildWarrper>
            <img src={getSizeImage(imgUrl,40)} alt="" className="img" />
            <div className="text">
                <p>{name}</p>
                <p>{position}</p>
            </div>
        </ChildWarrper>
    )
})
