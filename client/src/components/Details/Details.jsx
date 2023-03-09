import React, { useEffect } from 'react'
import { useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { cleanUpDetail, getDetails, setLoading } from '../../redux/actions/actionBreeds'
import Loading from '../common/Loader/Loading'
import styles from "./Details.module.css"

const Details = () => {
  
  const dispatch = useDispatch();
  const { id } = useParams(); //Permite acceder a los params de la ruta actual
  const navigate = useNavigate(); //Permite la navegacion entre rutas de mi app
  const details = useSelector( (state) => state.details)
  const loading = useSelector((state) => state.loading)

  useLayoutEffect(() => {
    dispatch(setLoading(true))
  }, [dispatch])

  useEffect( () => {
    dispatch(getDetails(id));
    return () => dispatch(cleanUpDetail())
  }, [id, dispatch])
  

  return (
    <div className={styles.container} >
      <button className={styles.btn__back} onClick={()=>navigate(-1)}><i className="fas fa-arrow-left"></i></button>
      {
        loading
        ? <Loading />
        : <>
            <div className={styles.contents}>
              <img src={details.image} alt="" className={styles.img} />
              <div className={styles.description}>
                <h1>{details.name}</h1>
                <hr/>
                <ul>
                  <li><strong>Height: </strong> {details.height}</li>
                  <li><strong>Weight: </strong> {details.weight}</li>
                  <li><strong>Life span: </strong> {details.life_span}</li>
                  <li><strong>Temperaments: </strong> {details.temperaments}</li>
                </ul>
              </div>
            </div>
          </>
      }

    </div>
  )
}

export default Details
