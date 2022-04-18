import React from 'react';

export default function TextSection({ content = '' }) {

  return (
    <section className='textSection'>
      <div className="container">
        <h3>Mô tả sản phẩm</h3>
        <div className='description'
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </section>
  )
}
