import React from 'react'
import styles from "./Card.module.css"

const Card = ({name, image, weight, height, life_span, temperaments}) => {
  return (
    <div className={styles.card_container}>
      <img src={image} alt=""/>
      <div className={styles.info_container}>
        <h2>{name}</h2>
        <ul>
          <li><strong>WEIGHT: </strong> {weight}</li>
          <li><strong>HEIGHT: </strong> {height}</li>
          <li><strong>LIFE SPAN: </strong> {life_span}</li>
          <li><strong>TEMPERAMENTS: </strong>{temperaments}</li>
        </ul>
      </div>
    </div>
  )
}

export default Card
