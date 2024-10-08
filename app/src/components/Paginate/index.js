import React from 'react'
import { GrNext, GrPrevious } from 'react-icons/gr'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import { queryObject, queryString } from 'utils'
import './style.scss'


export default function Paginate({ totalPage = 1 }) {
    const { pathname } = useLocation();
    const query = queryObject({ page: '1' });
    const renderList = () => {
        const list = [];
        let start = parseInt(query.page) - 2;
        let end = parseInt(query.page) + 2;

        if (start < 1) {
            start = 1;
            end = 5
        }
        if (end > totalPage) {
            end = totalPage
            start = (totalPage - 5) >= 1 ? totalPage - 5 : 1
        }

        for (let i = start; i <= end; i++) {
            list.push(
                <li key={i} className={`paginate_list-item ${query.page == i && 'active'}`}><Link to={`${pathname}?${queryString({ ...query, page: i })}`}>{i}</Link></li>
            )
        }
        return list
    }
    return (
        <div className='paginate'>
            {parseInt(query.page) - 2 > 1 &&
                <Link to={`${pathname}?${queryString({ ...query, page: query.page - 1 })}`} className='paginate_btn prev'>
                    <GrPrevious />
                </Link>}
            <ul className='paginate_list'>
                {renderList()}
            </ul>
            {parseInt(query.page) + 2 < totalPage &&
                <Link to={`${pathname}?${queryString({ ...query, page: parseInt(query.page) + 1 })}`} className='paginate_btn next'>
                    <GrNext />
                </Link>}
        </div>
    )
}
