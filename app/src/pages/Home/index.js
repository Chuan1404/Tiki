import { MenuSide } from 'components';
import React from 'react';
import './style.scss';

export default function Home() {

    return (
        <div id='home'>
            <div className='container home-container'>
                <div className='homeSide'>
                    <MenuSide />
                </div>
            </div>
        </div>
    )
}
