import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getNewAlbumAction } from "../../store/actionCreators";

import { Carousel } from "antd";
import HYThemeHeaderRcm from "@/components/theme-header-rcm";
import HYAlbumCover from '@/components/album-cover';
import { NewAlbumWrapper } from "./style";

export default memo(function HYNewAlbum() {
  const pageRef = useRef();

  const { newAlbums } = useSelector((state) => {
    return {
      newAlbums: state.getIn(["recommend", "newAlbums"]),
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNewAlbumAction());
  }, [dispatch]);
  //  console.log(newAlbums)
  return (
    <NewAlbumWrapper>
      <HYThemeHeaderRcm title="新碟上架"></HYThemeHeaderRcm>
      <div className="content">
        <button
          className="arrow arrow-left sprite_02"
          onClick={(e) => pageRef.current.prev()}
        ></button>
        <div className="album">
          <Carousel dots={false} ref={pageRef}>
            {[0, 1].map((item) => {
              return (
                <div key={item} className="page">
                  {newAlbums.slice(item * 5, (item + 1) * 5).map((iten) => {
                    return <HYAlbumCover key={iten.id} 
                                         info={iten}
                                         size={100}
                                         width={118}
                                         bgp="-570px"></HYAlbumCover>
                  })}
                </div>
              );
            })}
          </Carousel>
        </div>
        <button
          className="arrow arrow-right sprite_02"
          onClick={(e) => pageRef.current.next()}
        ></button>
      </div>
    </NewAlbumWrapper>
  );
});
