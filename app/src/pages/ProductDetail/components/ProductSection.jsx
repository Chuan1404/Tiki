import { ProductInfo, SliderProduct } from 'components'

import React from 'react'

export default function ProductSection({ data, fetching }) {
    return (
        <section className="product">
            <div className="container">
                <div className="product_img">
                    <SliderProduct images={data?.[0].images} />
                </div>
                <div className="product_info">
                    <ProductInfo product={data?.[0]} />
                </div>
            </div>
        </section>
    )
}
