import Buttons from 'components/Buttons';
import React, { useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import './style.scss'

export default function SliderProduct() {
    const [active, setActive] = useState(0);
    const [translate, setTranslate] = useState(0)
    const listImgs = [
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1d/f0/3d/0871c2aa8043e6370ae0eb77844eb2b0.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1b/e8/81/b7a6a311b671c26d6b3b9eb78badb1bb.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1e/d8/a9/375c6e3ab5459b0b17fe5daf68971c82.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/2a/29/67/777c146ceccf9308b9d944253719be89.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1d/f0/3d/0871c2aa8043e6370ae0eb77844eb2b0.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1d/f0/3d/0871c2aa8043e6370ae0eb77844eb2b0.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1d/f0/3d/0871c2aa8043e6370ae0eb77844eb2b0.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1d/f0/3d/0871c2aa8043e6370ae0eb77844eb2b0.jpg" },
        { img: "https://salt.tikicdn.com/media/catalog/producttmp/1d/f0/3d/0871c2aa8043e6370ae0eb77844eb2b0.jpg" },
    ]
    const number = listImgs.length;
    const widthSlider = number * 20
    const widthItem = (100 / number);

    const handleTranslate = (condition, value) => {
        let trans = condition ? translate : value
        setTranslate(trans)
    }
    console.log(translate)
    return (
        <div className='sliderProduct'>
            <div className='sliderProduct_current'>
                <img src={listImgs[active].img} alt="" />

            </div>
            <div className='sliderProduct_list'>
                <div
                    className="sliderProduct_view"
                    style={{
                        width: `${widthSlider}%`,
                        transform: `translateX(${translate}%)`
                    }}>
                    {listImgs.map((item, index) =>
                        <div
                            className={`item ${index == active && 'active'}`}
                            onClick={() => setActive(index)}
                            style={{ width: `${widthItem}%` }}>
                            <img src={item.img} />
                        </div>)}
                </div>
                <div className="sliderProduct_list-controls">
                    <div
                        className="btn prev"
                        onClick={() => handleTranslate(translate >= 0, translate + widthItem)}>
                        <GrFormPrevious />
                    </div>
                    <div
                        className="btn next"
                        onClick={() => handleTranslate(translate <= (5 - number) * widthItem,
                            translate - widthItem)}>
                        <GrFormNext />
                    </div>
                </div>

            </div>
        </div>
    )
}
