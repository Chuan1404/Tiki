import ProductCard from 'components/ProductCard'
import { useQuery } from 'hooks'
import React, { useState } from 'react'
import { GrFormNext, GrFormPrevious } from 'react-icons/gr'
import { productService } from 'services'

export default function SliderSection({ title, categories }) {
    const [translate, setTranslate] = useState(0);


    const {
        data,
        fetching
    } = useQuery(() => productService.getProduct(`?categories=${categories}`))
    const handleTranslate = (condition, value) => {
        let trans = condition ? translate : value
        setTranslate(trans)
    }
    const handlenext = () => {
        let newTrans = translate + 100/3 < 99 ? translate + 100/3 : translate;
        setTranslate(newTrans)
    }
    const prev = () => {
        let newTrans = translate - 100/3 >= 0 ? translate - 100/3 : translate;
        setTranslate(newTrans)
    }
    if (fetching && categories == undefined) return '...loading'

    return (
        <section className='sliderSection'>
            <div className="container">
                <h3>{title}</h3>
                <div className="slider">
                    <div className="slider_view" style={{ transform: `translateX(-${translate}%)` }}>
                        {data.data?.map(item => {
                            return <ProductCard
                                key={item._id}
                                slug={item.slug}
                                thumbnail_url={item.images[0].thumbnail_url}
                                name={item.name}
                                price={new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.real_price)}
                                discount={'-' + item.discount_rate + '%'}
                                stars={item.rating_average} />
                        })}
                    </div>
                    <div className="slider_control">
                        <div className="btn prev">
                            <GrFormPrevious onClick={prev} />
                        </div>
                        <div className="btn next" onClick={handlenext}>
                            <GrFormNext />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
