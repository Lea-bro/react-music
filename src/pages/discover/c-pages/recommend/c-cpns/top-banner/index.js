import React, { memo, useEffect, useRef, useCallback, useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";

import { getTopBannerAction } from "../../store/actionCreators";

import { Carousel } from "antd";
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from "./style";

export default memo(function HYTopBanner(propps) {
  const [currentIndex, setCurrentIndex] = useState();
  const { topBanners } = useSelector((state) => {
    // console.log(state);
    return {
      // topBanners:state.get("recommend").get("topBanners")
      topBanners: state.getIn(["recommend", "topBanners"]), //上下两种写法一样
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  // 发送网络请求
  // 发送 ->
  // 其他hook
  const bannerRef = useRef();
  useEffect(() => {
    dispatch(getTopBannerAction());
  }, [dispatch]);
  //函数
  const bannerChange = useCallback((form, to) => {
    setCurrentIndex(to);
  }, []);

  //   其他业务逻辑
  const bgImage =
    topBanners[currentIndex] &&
    topBanners[currentIndex].imageUrl + "?imageView&blur=40x20";
  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel
            effect="fade"
            autoplay
            easing
            ref={bannerRef}
            beforeChange={bannerChange}
          >
            {topBanners.map((item, index) => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img
                    className="image"
                    src={item.imageUrl}
                    alt={item.typeTitle}
                  />
                </div>
              );
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button
            className="btn left"
            onClick={(e) => bannerRef.current.prev()}
          ></button>
          <button
            className="btn right"
            onClick={(e) => bannerRef.current.next()}
          ></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  );
});
