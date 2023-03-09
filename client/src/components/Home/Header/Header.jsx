import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import styles from "./Header.module.css"
import { deepCleanUp, searchByName, setLoading } from '../../../redux/actions/actionBreeds';
const Header = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [showNavBar, setShowNavBar] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(searchByName(name));
    setName("");
    setShowSearchBar(false);
  }
  function handleClick() {
    dispatch(deepCleanUp());
    setShowNavBar(false);
  }
  const handleBtnCancel = (e) => {
    setShowNavBar(false);
    setShowSearchBar(false);
  }


  return (
    <div className={styles.container}>

        <div className={styles.menu__icon}>
          <span className={`fas fa-bars ${showNavBar && styles.hide}`} onClick={(e) => {setShowNavBar(true)}}></span>
        </div>

        <h1 className={styles.logo} onClick={(e) => {handleClick()}}>
          Breeds App
        </h1>
        
        <div className={`${styles.nav__container} ${showNavBar && styles.active}`}>
          <li><span onClick={(e) => {handleClick()}}> Home </span></li>
          <li><Link to="create/"> Create breed </Link></li> 
          <li><Link to="/"> Exit </Link></li>
        </div>

        <div className={`${styles.search__icon} ${!showSearchBar && !showNavBar ? styles.show : ""}`}>
          <span className="fas fa-search" onClick={(e) => {setShowSearchBar(true)}} ></span>
        </div>

        <div 
          className={`${styles.cancel__icon} ${showSearchBar || showNavBar ? styles.show : ""}`}
          style={{ color: showSearchBar || showNavBar ? "#ff3d00" : '#fff' }}
        >
          <span className="fas fa-times" onClick={(e) => {handleBtnCancel(e)}}></span>
        </div>

        <form className={`${showSearchBar && styles.active}`}>
          
          <input 
            type="search" 
            value={name} 
            className={styles.search__data} 
            placeholder="Search" 
            required 
            onChange={e => handleChange(e)}
          />
          <button 
            type="submit" 
            className={`fas fa-search ${styles.submit__btn}`} 
            onClick={e => { handleSubmit(e) }}
          ></button>
        </form>
    </div>
  )
}

export default Header;
