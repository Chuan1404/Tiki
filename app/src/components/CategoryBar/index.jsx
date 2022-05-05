import { width } from '@mui/system';
import { Skeleton } from 'components';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { queryString } from 'utils';
import './style.scss';

export default function CategoryBar({ list = [] }) {
    const { pathname } = useLocation()
    const defaultSearch = useSelector(store => store.url)

    return (
        <div className='categoryBar'>
            <div className="container">
                <div className='categoryBar_list'>
                    {
                        list ?
                            list.map((e, i) =>
                                <Link key={i} to={`${pathname}?${queryString({ ...defaultSearch, categories: e.id })}`}>{e.title}</Link>) :
                            [...Array(5)].map(e => <Skeleton width={140} height={50} />)
                    }
                </div>
            </div>
        </div>
    )
}
