import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios"
import { applyFilters, setFilters, setLoading } from '../../../../redux/actions/actionBreeds'
import styles from "./Filters.module.css";

const OptionFilter = ({ name, currentValue, value, cb }) => (
  <label>
    <input type="checkbox" value={value} onChange={(e) => { cb(e, name) }} checked={value === currentValue} />
    <span>{value.toUpperCase()}</span>
  </label>
)

const Filters = ({setOpenFilters, openFilters}) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters);
  const [temperaments, setTemperaments] = useState([]);

  function handleFilters(e, filterName) {
    dispatch(setLoading(true));
    filterName === "order" 
      ? dispatch(setFilters({ ...filters, order: e.target.value, reverse: false }))
      : dispatch(setFilters({ ...filters, [filterName]: e.target.value }));
    dispatch(applyFilters());
    window.scroll({ top: 0, behavior: "smooth" })
  }
  function handleReverse(value) {
    dispatch(setLoading(true));
    dispatch(setFilters({ ...filters, reverse: value }));
    dispatch(applyFilters());
    window.scroll({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios("/temperaments");
        setTemperaments(data.map(({ name }) => name));
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  useEffect(() => {
    const handleClick = (e) => {
      !document.getElementById('filtersContainer').contains(e.target) 
        && !document.getElementById('statusFilterButton').contains(e.target)
        && setOpenFilters(false);
    }
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setOpenFilters]);

  return (
    <div id="filtersContainer" className={`${styles.container} ${openFilters && styles.open_container}`}>
      <div className={styles.options__filters} >
        
        <div className={styles.item}>
          <h3>ORDER</h3>
          <hr />
          <div>
            <OptionFilter name="order" value="alphabetical" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="weight" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="height" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="life span" currentValue={filters.order} cb={handleFilters} />
          </div>
          <div className={styles.reverse__container}>
            {filters.order === "alphabetical"
              && <>
                <i
                  className={`fas fa-sort-alpha-down ${!filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(false) }}
                ></i>
                <i
                  className={`fas fa-sort-alpha-down-alt ${filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(true) }}
                ></i>
              </>
            }
            {(filters.order === "weight" || filters.order === "life span" || filters.order === "height")
              && <>
                <i
                  className={`fas fa-sort-numeric-down ${!filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(false) }}
                ></i>
                <i
                  className={`fas fa-sort-numeric-down-alt ${filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(true) }}
                ></i>
              </>
            }
          </div>
        </div>

        <div className={styles.item}>
          <h3>UBICATION</h3>
          <hr />
          <div>
            <OptionFilter name="ubication" value="API" currentValue={filters.ubication} cb={handleFilters} />
            <OptionFilter name="ubication" value="DATABASE" currentValue={filters.ubication} cb={handleFilters} />
          </div>
        </div>

        <div className={styles.item}>
          <h3>TEMPERAMENTS</h3>
          <hr />
          <div>
            { 
              temperaments?.map((a) => 
                <OptionFilter key={a} name="temperament" value={a} currentValue={filters.temperament} cb={handleFilters} />
              )
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default Filters
