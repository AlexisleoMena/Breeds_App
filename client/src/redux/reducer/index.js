import { APPLY_FILTERS, CLEAN_UP_DETAILS, CLEAN_UP_FILTERS, GET_ALL, SEARCH_BY_NAME, GET_DETAILS, POST_BREED, SET_FILTERS, SET_LOADING, SET_PAGE, CLEAN_UP_SEARCH_BY_NAME, DEEP_CLEAN_UP } from "../actions/actionBreeds";


const initialState = {
 allBreeds: [],
 breeds: [],
 breedsSearched: [],
 recentSearch: false,
 details: {},
 filters: { order: "", temperament: "", ubication: "", reverse: false },
 emptyAfterFiltering: false,
 loading: false,
 currentPage: 1
}

function applyFilters (state=initialState) {
  let { order, temperament, ubication, reverse } = state.filters;
  let copy = [...state.allBreeds];
  if(order.length) {
    switch (order) {
      case "alphabetical":
        copy.sort( (a,b) => a.name.localeCompare(b.name));
        break;
      case "height":
        copy.sort( (a,b) => a.height_max - b.height_max);
        break;
      case "weight":
        copy.sort( (a,b) => a.weight_max - b.weight_max);
        break;
      case "life span":
        copy.sort( (a,b) => a.life_span_max - b.life_span_max);
        break;
      default:
    }
    reverse && copy.reverse()
  }
  if(ubication.length) {
    copy = ubication === "API" 
    ? copy.filter( ({id}) => Number.isInteger(id) )
    : copy.filter( ({id}) => !Number.isInteger(id) )
  }
  if(temperament.length) {
    let regEx = new RegExp(temperament, 'i');
    copy = copy.filter( ({temperaments}) =>  regEx.test(temperaments) )
  }
  return copy;
}

export default function rootReducer(state=initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL:
      return {
        ...state,
        allBreeds: [...payload],
        breeds: payload,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: payload
      }
    case SET_PAGE:
      return {
        ...state,
        currentPage: payload
      }
    case SEARCH_BY_NAME:
      return {
        ...state,
        breedsSearched: payload,
        recentSearch: true,
        loading: false,
      }
    case CLEAN_UP_SEARCH_BY_NAME:
      return {
        ...state,
        breedsSearched: initialState.breedsSearched,
        recentSearch: initialState.recentSearch
      }
    case POST_BREED: 
      return {
        ...state,
      }
    case SET_FILTERS: 
      return {
        ...state,
        filters: payload
      }
    case CLEAN_UP_FILTERS: 
      return {
        ...state,
        breeds: [...state.allBreeds],
        emptyAfterFiltering: false,
        currentPage: 1,
        filters: initialState.filters
      }
    case APPLY_FILTERS:
      let breedsFiltered = applyFilters(state);
      return {
        ...state,
        breeds: breedsFiltered,
        loading: false,
        currentPage: 1,
        emptyAfterFiltering: !breedsFiltered.length
      }
    case GET_DETAILS:
      return {
        ...state,
        details: payload,
        loading: false
      }
    case CLEAN_UP_DETAILS:
      return {
        ...state,
        details: {},
      }
    case DEEP_CLEAN_UP: {
      return {
        ...initialState, 
        breeds: [...state.allBreeds],
        allBreeds: state.allBreeds
      }
    }
    default:
      return state;
  }
}