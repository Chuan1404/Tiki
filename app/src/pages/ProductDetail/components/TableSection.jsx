import React from 'react'

export default function TableSection({ specifications }) {
  return (
    <section className='tableSection'>
      <div className="container">
        <h3>Thông tin chung</h3>
        <table>
          {specifications[0].attributes.map((e, i) => {
            return <tr>
              <th>{e.name}</th>
              <td dangerouslySetInnerHTML={{__html: e.value}} />
            </tr>
          })}
        </table>
      </div>
    </section>
  )
}
