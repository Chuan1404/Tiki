import React, { useState } from 'react'
import { BsChevronDown } from 'react-icons/bs';


export default function UpdateBox({ descreption = 'Tỉnh/Thành Phố', data = [], address, setAddress, type = 'city', disable }) {
    let [value, setValue] = useState(() => {
        return address[type] ? address[type] : `Vui lòng chọn ${descreption}`
    });
    let updateData = [];
    if (type == 'city') {
        updateData = data
    }
    else if (type == 'district' && address.city) {
        updateData = data.filter(item => item.name == address.city)
        updateData = updateData[0].districts
    }
    else if (type == 'ward' && address.district) {
        updateData = data.filter(item => item.name == address.city)
        updateData = updateData[0].districts.filter(item => item.name == address.district)
        updateData = updateData[0].wards
    }
    const handleClick = (e) => {
        e.stopPropagation()
        e.target.classList.toggle("active")
        window.addEventListener('click', (f) => {
            if (f.target != e.target) e.target.classList.remove("active")
        })

    }
    const changeValue = e => {
        let name = e.target.getAttribute("name")
        let newAdd;

        e.target.parentNode.parentNode.classList.remove('active')

        if (type == 'city') newAdd = { city: name, district: '', ward: '' }
        else if (type == 'district') newAdd = { ...address, district: name, ward: '' }
        else newAdd = { ...address, ward: name }

        setValue(name)
        setAddress(newAdd)
    }
    
    
    return (
        <div className={`updateBox`} >
            <span>{descreption}</span>
            <div className={`select ${disable ? 'disable' : ''}`} onClick={handleClick}>
                {type == 'city' && <span>{address.city ? address.city : `Vui lòng chọn ${descreption}`}</span>}
                {type == 'district' && <span>{address.district ? address.district : `Vui lòng chọn ${descreption}`}</span>}
                {type == 'ward' && <span>{address.ward ? address.ward : `Vui lòng chọn ${descreption}`}</span>}
                <div className="icon"><BsChevronDown /></div>

                <div className="options">
                    {updateData && updateData.map(item => {
                        return <div className='option'
                            key={item.code}
                            name={item.name}
                            onClick={changeValue}
                        >{item.name}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}
