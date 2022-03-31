import { MenuSide, ProductAccordion } from 'components';
import "flickity/dist/flickity.css";
import React from 'react';
import Flickity from 'react-flickity-component';
import './style.scss';


export default function Home() {
    const flickityOptions = {
        initialIndex: 0,
        prevNextButtons: true,
        contain: true,
    }
    return (
        <div id='home'>
            <div className='container home-container'>
                <div className='homeSide'>
                    <MenuSide />
                </div>
                <div className='homeSection'>
                    <h1>Điện Thoại - Máy Tính Bảng</h1>
                    <div className='banner'>
                        <Flickity
                            className={'carousel'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptions} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate // default false
                            static // default false
                        >
                            <div className="banner_slide">
                                <img src="imgs/banner3.png" />
                            </div>
                            <div className="banner_slide">
                                <img src="imgs/banner2.jpg" />
                            </div>
                            <div className="banner_slide">
                                <img src="imgs/banner3.jpg" />
                            </div>

                        </Flickity>
                    </div>
                    <div className='homeProduct'>
                        <ProductAccordion />
                    </div>
                   
                </div>
            </div>
        </div>
    )
}
