import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../hooks/useModal';
import { cleanUpFilters, getAllBreeds, postBreed, setLoading } from '../../redux/actions/actionBreeds';
import Modal from '../common/Modal/Modal';

import styles from "./CreateBreed.module.css"

let initialState = {
  name: "",
  height_min: "",  // Guinness World Records Milly: 3.77 in
  height_max: "", // Guinness World Records Zeus: 411 in
  weight_min: "", // Guinness World Records Milly: 170 lb
  weight_max: "", //Guinness World Records Zorba: 344 lb
  life_span: "", //Guinness World Records Pebbles: 22 year old
  image: "",
  origin: "",
  temperaments: [],
}
let errorInitialState = {
  name :true, 
  life_span: true, 
  weigth: true, 
  heigth: true, 
  image: false, 
  temperaments: true 
};
function validateMeasure(min, max) {
  return !(/^\d{1,3}(\.\d{1,2})?$/.test(min) && /^\d{1,3}(\.\d{1,2})?$/.test(max) && parseFloat(min) < parseFloat(max));
}
function validate(input) {
  let error = {};
  error.name = !(/^[a-zA-Z0-9\u00C0-\u017F()" "]{3,20}$/.test(input.name));
  error.life_span = !(/^\d{1,2}$/.test(input.life_span) && input.life_span>0 && input.life_span<=25 );
  error.weigth = validateMeasure(input.weight_min, input.weight_max);
  error.heigth = validateMeasure(input.height_min, input.height_max);
  error.image = !input.image.length ? false : !(/^(http(s?):)|([/|.|\w|\s])*\.(?:jpg|jpeg|gif|png)$/.test(input.image));
  error.temperaments = !input.temperaments.length || input.temperaments.length > 15;
  return error;
}

const CreateBreed = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();  //Permite la navegacion entre rutas de mi app
  const [isOpenModal, openModal, closeModal] = useModal();
  const [msgModal, setMsgModal] = useState("");
  const [temperaments, setTemperaments] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("/temperaments");
        setTemperaments(data.map((d) => d.name));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [input, setInput] = useState(initialState);

  useEffect(() => {
    setError({...validate(input) })
  }, [input]);

  const [error, setError] = useState(errorInitialState);
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const handleTemperamentsSelect = (e) => {
    !input.temperaments.includes(e.target.value) 
      && e.target.value.length !== 0
      &&
      setInput({
        ...input,
        temperaments: [...input.temperaments, e.target.value ].sort()
      })
  }
  const handleDeletedSelect = (value) => {
    setInput({
      ...input,
      temperaments: input.temperaments.filter( temperament => temperament !== value)
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let data = await dispatch(postBreed(input));
      setMsgModal(data.msg)
      openModal();
      dispatch(setLoading(true));
      dispatch(getAllBreeds());
      dispatch(cleanUpFilters())
      setInput(initialState);
    } catch (error) {
      setMsgModal(error.msg)
      openModal();
      setInput(initialState);
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.btn__back} onClick={()=>navigate(-1)}><i className="fas fa-arrow-left"></i></button>

      <h1>CREATE YOUR BREED!</h1>
      <form className={styles.form__container} onSubmit={(e) => {handleSubmit(e)}} autoComplete="off">

        <div className={styles.item__1}>
          <label>NAME</label>
          <input type="text" name="name" value={input.name} onChange={(e) => { handleChange(e) }} placeholder="Fox Terrier Toy..." />
          <small className={`${!error.name ? styles.hidden__error : ""}`}>
            👆 (Required) letters, numbers, spaces and/or '()' (min. 3 máx. 20)
          </small>
        </div>

        <div className={styles.item__2}>
          <label>IMAGE (url)</label>
          <input type="text" name="image" value={input.image} onChange={(e) => { handleChange(e) }} placeholder="https://Image.jpg" />
          <small className={`${!error.image ? styles.hidden__error : ""}`}> 👆 (optional) image url or empty </small>
        </div>

        <div className={styles.item__3}>
          <label>HEIGHT (in)</label>
          <div className={styles.measure__container}>
            <div className={styles.measure__min}>
              <label>min</label>
              <input type="text" placeholder='3' name="height_min" value={input.height_min} onChange={(e) => { handleChange(e) }} />
            </div>
            <div className={styles.measure__max}>
              <label>max</label>
              <input type="text" placeholder='450' name="height_max" value={input.height_max} onChange={(e) => { handleChange(e) }} />
            </div>
          </div>
          <small className={`${!error.heigth ? styles.hidden__error : ""}`}>
            👆 (Required) numbers with "." as decimal separator. min &lt; max
          </small>
        </div>
            
        <div className={styles.item__4}>
          <label>WEIGHT (lb)</label>
          <div className={styles.measure__container}>
            <div className={styles.measure__min}>
              <label>min</label>
              <input type="text" placeholder='0' name="weight_min" value={input.weight_min} onChange={(e) => { handleChange(e) }} />
            </div>
            <div className={styles.measure__max}>
              <label>max</label>
              <input type="text" placeholder='300' name="weight_max" value={input.weight_max} onChange={(e) => { handleChange(e) }} />
            </div>
          </div>
          <small className={`${!error.weigth ? styles.hidden__error : ""}`}>
            👆 (Required) numbers with "." as decimal separator. min &lt; max
          </small>
        </div>

        <div className={styles.item__5}>
          <label>LIFE SPAN (years)</label>
          <input type="text" placeholder="12" name="life_span" value={input.life_span} onChange={(e) => { handleChange(e) }}/>
          <small className={`${!error.life_span ? styles.hidden__error : ""}`}>
            👆 (Required) numbers (1 to 25)
          </small>
        </div>

        <div className={styles.item__6}>
          <label>TEMPERAMENTS</label>
          <div className={styles.options__container}>
            <select onChange={(e) => {handleTemperamentsSelect(e)}}>
              <option value=""> --- </option>
              {
                temperaments?.map((temperament, i) => (
                  <option value={temperament} key={i}>{temperament.toUpperCase()}</option>
                ))
              }
            </select>
          </div>
          <div className={styles.platforms__selected}>
            <ul>
              {
                input.temperaments?.map((temperament) => (
                  <li key={temperament} onClick={(e) => {handleDeletedSelect(temperament)}}>
                    <span>"{temperament.toUpperCase()}"</span>
                    <i className="fas fa-times"></i>
                  </li>
                ))
              }
            </ul>
          </div>
          <small className={`${!error.temperaments ? styles.hidden__error : ""}`}>
            👆 (Required) temperaments of your new breed. 15 máx.
          </small>
        </div>

        <button className={styles.item__7} type='submit' disabled={Object.values(error).includes(true)} >CREATE</button>

      </form>

      {
        isOpenModal &&
        <div>
          <Modal isOpen={isOpenModal} closeModal={closeModal}>
            <p>{msgModal}</p>
          </Modal>
        </div>
      }
    </div>
  )
}

export default CreateBreed
