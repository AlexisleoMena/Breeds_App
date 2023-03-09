import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { cleanUpSearchByName } from '../../../../redux/actions/actionBreeds';
import Card from '../Card/Card';
import noResultImage from "../../../../assets/images/noResultsC.jpg"
import styles from "./SearchResults.module.css"
const SearchResults = () => {
  const dispatch = useDispatch()
  let breedsSearched = useSelector((state) => state.breedsSearched);
  
  function handleClick(){
    dispatch(cleanUpSearchByName());
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  }
  return (
    <div className={styles.container}>
      <span className="fas fa-times" onClick={() => {handleClick()}}></span>
      <h2>Matches: {breedsSearched.length} Breeds.</h2>
      {
        breedsSearched.length
          ? <div className={styles.cards__container}>
              { breedsSearched.map((element) =>
                <Link to={"/details/"+element.id} key={element.id} >
                  <Card
                    name={element.name}
                    image={element.image}
                    weight={element.weight}
                    temperaments={element.temperaments}
                    />
                </Link>
              )}
            </div>
          : <img src={noResultImage} alt="" />
      }
      <button onClick={() => { handleClick()}}>Go to home</button>
    </div>
  )
}

export default SearchResults