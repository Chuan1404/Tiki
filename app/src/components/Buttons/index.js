import React from 'react'
import './style.scss';
import classNames from 'classnames';

export default function Buttons({ children, size = 'middle', color = 'none', border, bgcolor = 'none', radius, ...res }) {
    return (
        <div className={classNames(
            'buttons',
            `size-${size}`,
            `color-${color}`,
            `bgcolor-${bgcolor}`,
            `${border && 'border'}`,
            `${radius && 'radius'}`)}
            {...res}>
            {children}
        </div>
    )
}
