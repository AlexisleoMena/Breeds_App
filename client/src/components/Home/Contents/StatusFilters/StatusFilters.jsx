import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, setFilters, setLoading } from '../../../../redux/actions/actionBreeds'
import styles from "./StatusFilters.module.css"

const FilterActive = ({ name, value, cb }) => (
  <div className={styles.filter__active} onClick={(e) => { cb(name) }}>
    "<span>{value}</span>"
    <i className="fas fa-times"></i>
  </div>
)

const StatusFilters = ({setOpenFilters, openFilters}) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters);

  function handleResetFilter(name) {
    dispatch(setLoading(true));
    name === "order"
      ? dispatch(setFilters({ ...filters, order: "", reverse: false }))
      : dispatch(setFilters({ ...filters, [name]: "" }));
    dispatch(applyFilters());
  }

  return (
    <div className={styles.container}>
        <div id="statusFilterButton" className={styles.btn} onClick={(e) => { setOpenFilters(!openFilters) }}>
          <i className={openFilters ? "fas fa-chevron-left" : "fas fa-chevron-right"}></i>
          {openFilters ? <h3>HIDE FILTERS</h3> : <h3>SHOW FILTERS</h3>}
        </div>
        <div className={styles.filters__actives}>
          {filters.order.length > 0 && <FilterActive name="order" value={filters.order} cb={handleResetFilter} />}
          {filters.ubication.length > 0 && <FilterActive name="ubication" value={filters.ubication} cb={handleResetFilter} />}
          {filters.temperament.length > 0 && <FilterActive name="temperament" value={filters.temperament} cb={handleResetFilter} />}
        </div>
    </div>
  )
}

export default StatusFilters