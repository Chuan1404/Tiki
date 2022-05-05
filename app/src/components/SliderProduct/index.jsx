import React, { useState } from 'react';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';
import './style.scss';

export default function SliderProduct({ images = [] }) {
    const [active, setActive] = useState(0);
    const [translate, setTranslate] = useState(0)
    const number = images.length;
    const widthSlider = number * 20
    const widthItem = (100 / number);

    const handleTranslate = (condition, value) => {
        let trans = condition ? translate : value
        setTranslate(trans)
    }
    return (
        <div className='sliderProduct'>
            <div className='sliderProduct_current'>
                <img src={images[active]?.large_url} alt="" />
            </div>
            <div className='sliderProduct_list'>
                <div className="sliderProduct_view"
                    style={{
                        width: `${widthSlider}%`,
                        transform: `translateX(${translate}%)`
                    }}>
                    {images.map((item, index) =>
                        <div
                            key={index}
                            className={`item ${index == active && 'active'}`}
                            onClick={() => setActive(index)}
                            style={{ width: `${widthItem}%` }}>
                            <img src={item.small_url} />
                        </div>)}
                </div>
                <div className="sliderProduct_list-controls">
                    {/* <div className="btn prev"
                        onClick={() => handleTranslate(
                            translate >= 0,
                            translate + widthItem)}>
                        <GrFormPrevious />
                    </div> */}
                    {
                        translate < 0 &&
                        <div className="btn prev"
                            onClick={() => handleTranslate(
                                translate > 0,
                                translate + widthItem)}>
                            <GrFormPrevious />
                        </div>
                    }
                    {
                        translate > widthSlider * -1 && <div className="btn next"
                            onClick={() => handleTranslate(
                                translate <= (5 - number) * widthItem,
                                translate - widthItem)}>
                            <GrFormNext />
                        </div>
                    }
                    {/* <div className="btn next"
                        onClick={() => handleTranslate(
                            translate <= (5 - number) * widthItem,
                            translate - widthItem)}>
                        <GrFormNext />
                    </div> */}
                </div>

            </div>
        </div>
    )
}
