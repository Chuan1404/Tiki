import React from 'react'
import { Link } from 'react-router-dom';
import { queryString } from 'utils';
import { useLocation } from 'react-router'
import './style.scss';
import { useSelector } from 'react-redux';

export default function CategoryBar({ list = [] }) {
    const { pathname } = useLocation()
    const defaultSearch = useSelector(store => store.url)

    return (
        <div className='categoryBar'>
            <div className="container">
                <div className='categories_list'>
                    {list.map(e =>
                        <Link to={`${pathname}?${queryString({ ...defaultSearch, categories: e.categories })}`}>{e.title}</Link>)
                    }
                </div>
            </div>
        </div>
    )
}
