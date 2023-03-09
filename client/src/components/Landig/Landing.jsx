import React from 'react'
import { Link } from "react-router-dom"
import linkedinIcon from "../../assets/images/linkedinIcon.png"
import githubIcon from "../../assets/images/githubIcon.png"
import breedsExamples from "../../helpers/breedsExamples.js"
import styles from "./Landing.module.css";
import { useDispatch } from 'react-redux'
import { deepCleanUp } from '../../redux/actions/actionBreeds'
import { useEffect } from 'react'

const Landing = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(deepCleanUp())
  }, [dispatch]);

  let breedsExam = breedsExamples(3);

  return (
    <div className={styles.container} >
      <div className={styles.item__1}>
        <h1>¡Welcome to Breeds App!</h1>
        <p>
          Hi!, here you will find information about beautiful dog's breeds.
          You can also unleash your creativity and create a new exclusive breed!
        </p>
        <div className={styles.btn__container}>
          <Link to="/home"><button>Let's go</button></Link>
        </div>
      </div>
      <div className={styles.item__2}>
        {breedsExam.map((breed, i) => (
          <div className={styles[`breed__example__${i+1}`]} key={breed.name}>
            <img src={breed.img} alt="" />
            <h2>{breed.name}</h2>
          </div>
        ))}
        <div className={styles.links}>
          <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/alexis-leonardo-mena/">
            <img src={linkedinIcon} alt=""/>
          </a>
          <a target="_blank" rel="noopener noreferrer" href="https://github.com/AlexisleoMena">
            <img src={githubIcon} alt=""/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Landing
