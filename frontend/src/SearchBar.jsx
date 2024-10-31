import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { update } from './redux/searchBar/searchBar';
const SearchBar = () => {
    const dispatch=useDispatch();
    const searched=useSelector((state)=>state.searchBar)
    function search(e){
        e.preventDefault();
        dispatch(update(e.target[0].value))
    }
  return (
    <li className="nav-item">
    <div class="navbar-nav ms-auto searchbar" >
      <form class="d-flex" onSubmit={search}>
        <input
          class="form-control me-2 "
          type="text"
          placeholder="Search items"
          defaultValue={searched}
        />
        <button class="btn btn-search" type="submit">
          <i class="fa-solid fa-magnifying-glass" style={{fontSize:"1rem"}}></i>
        </button>
      </form>
    </div>
  </li>
  )
}

export default SearchBar