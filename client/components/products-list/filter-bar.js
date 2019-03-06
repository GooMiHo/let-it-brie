import React from 'react'
import { Link } from 'react-router-dom';

const FilterBar = ({ handleChange, products }) => {
  const categories = products.map(product => product.category);
  const unique = categories.sort().filter((prev, i, product) => !i || prev !== product[i - 1])

  return (
    <div id="dropdown" className="dropdown-content">
        <Link to="/products"><p onClick={() => handleChange('all')} >all</p></Link>
        {unique.map((category) => <Link key={category} to="/products"><p id={category} onClick={(ev) => handleChange(ev.target.id) }>{`${category}s`}</p></Link>)}
    </div>
  )
}

export default FilterBar

