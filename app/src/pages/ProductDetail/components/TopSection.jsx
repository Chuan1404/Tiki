import { useQuery } from 'hooks'
import React from 'react'
import { productService } from 'Services'

export default function TopSection({ categories }) {

    // const {
    //     data,
    //     fetching} = useQuery(productService.getProduct(`?categories=${categories}&sort=review_count.desc`))
    // }
    return (
        <div className='topSection'>
            <h3>Sản Phẩm Bán Chạy</h3>
        </div>
    )
}
