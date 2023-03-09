import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getAllBreeds, setCurrentPage, setLoading } from '../../../redux/actions/actionBreeds';
import Card from './Card/Card';
import Filters from './Filters/Filters';
import Loading from '../../common/Loader/Loading';
import NoFilterResult from './NoFilterResult/NoFilterResult';
import Pagination from '../../common/Pagination/Pagination';
import SearchResults from './SearchResults/SearchResults';
import StatusFilters from './StatusFilters/StatusFilters';
import styles from "./Contents.module.css"

const CardsContainer = ({array}) => (
  <div className={styles.cards__container}>
    { array?.map((element) =>
      <Link to={"/details/"+element.id} key={element.id} >
        <Card
          name={element.name}
          image={element.image}
          weight={element.weight}
          height={element.height}
          life_span={element.life_span}
          temperaments={element.temperaments}
        />
      </Link>
    )}
  </div>
)

const Contents = () => {
  const dispatch = useDispatch();
  const { breeds, loading, currentPage, emptyAfterFiltering, recentSearch } = useSelector((state) => state)
  const [openFilters, setOpenFilters] = useState(false);
  
  useEffect(() => {
    if(!breeds.length && !emptyAfterFiltering) { //true only when init app
      dispatch(setLoading(true))
      dispatch(getAllBreeds())
    }
  }, [dispatch, breeds.length, emptyAfterFiltering]);

  const cardsPerPage = 8;
  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  let currentCards = breeds.slice(firstIndex, lastIndex);
  //funcion que despacha la accion que manda a actualizar el numero de la pagina
  const selectPageNumber = (pageNumber) => dispatch(setCurrentPage(pageNumber));

  return (
    <main className={styles.container}>
      {
        loading 
          ? <Loading />
          : recentSearch 
            ? <SearchResults />
            : <>
                <StatusFilters setOpenFilters={setOpenFilters} openFilters={openFilters} />
                <div className={styles.contents}>
                  <Filters setOpenFilters={setOpenFilters} openFilters={openFilters}/>
                  <div className={`${styles.cards__container} ${openFilters && styles.open__filters}`}>
                    {!emptyAfterFiltering
                      ? <CardsContainer array={currentCards}/> 
                      : <NoFilterResult setOpenFilters={setOpenFilters} openFilters={openFilters}/>
                    }
                  </div>
                </div>
                <Pagination cardsPerPage={cardsPerPage} totalCards={breeds.length} selectPageNumber={selectPageNumber} />
              </> 
      }
    </main>
  )
}

export default Contents