import { MenuSide } from 'components';
import React from 'react';
import Flickity from 'react-flickity-component';
import './style.scss';

export default function Home() {
    const flickityOptions = {
        initialIndex: 0,
        prevNextButtons: true
        // contain: true,
        // setGallerySize: false
        // accessibility: true
    }
    return (
        <div id='home'>
            <div className='container home-container'>
                <div className='homeSide'>
                    <MenuSide />
                </div>
                <div className='homeSection'>
                    <h1>Điện Tử - Điện Lạnh</h1>
                    <div className='banner'>
                        <Flickity
                            className={'carousel'} // default ''
                            elementType={'div'} // default 'div'
                            options={flickityOptions} // takes flickity options {}
                            disableImagesLoaded={false} // default false
                            reloadOnUpdate // default false
                            static // default false
                        >
                            <img src="imgs/banner1.png" />
                            <img src="imgs/banner2.jpg" />
                            <img src="imgs/banner3.jpg" />
                        </Flickity>
                    </div>
                </div>
            </div>
        </div>
    )
}
