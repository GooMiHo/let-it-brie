import React from 'react'

const SearchBar = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    props.searchOnSubmit(e.target.searchVal.value)
    props.history.push("/products")
  }

  return (
    <form className="search" onSubmit={handleSubmit} >
      <input name="searchVal" type="text" placeholder="Search for.." />
    </form>
  );
}

export default SearchBar;
