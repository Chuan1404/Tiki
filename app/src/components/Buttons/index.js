import React from 'react'
import './style.scss';
import classNames from 'classnames';

export default function Buttons({ children, size = 'middle', color = 'none', border, radius }) {
    return (
        <div className={classNames(
            'buttons',
            `size-${size}`,
            `color-${color}`,
            `${border && 'radius'}`,
            `${radius && 'radius'}`)}>
            {children}
        </div>
    )
}
