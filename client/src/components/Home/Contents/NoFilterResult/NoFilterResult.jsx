import React from 'react'
import { useDispatch } from 'react-redux'
import { cleanUpFilters } from '../../../../redux/actions/actionBreeds'
import noResultImage from "../../../../assets/images/noResultsC.jpg"

import styles from "./NoFilterResult.module.css"
const NoFilterResult = ({setOpenFilters, openFilters}) => {
  const dispatch = useDispatch();
  function handleClick() {
    setOpenFilters(false);
    dispatch(cleanUpFilters());
  }
  return (
    <div className={`${styles.container} ${openFilters && styles.open__filters}`}>
      <img src={noResultImage} alt="" />
      <h2>No Breeds Found</h2>
      <p>There are no breeds that match your current filters. Try removing some of them to get better results.</p>
      <button onClick={(e) => {handleClick()}}>Clear All Filter + Start Over</button>
    </div>
  )
}

export default NoFilterResult