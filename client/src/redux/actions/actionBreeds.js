import axios from "axios"

export const GET_ALL = "GET_ALL";
export const SEARCH_BY_NAME = "SEARCH_BY_NAME";
export const POST_BREED = "POST_BREED";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_UP_DETAILS = "CLEAN_UP_DETAILS";
export const SET_FILTERS = "SET_FILTERS";
export const CLEAN_UP_FILTERS = "CLEAN_UP_FILTERS";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const SET_LOADING = "SET_LOADING";
export const SET_PAGE = "SET_PAGE";
export const CLEAN_UP_SEARCH_BY_NAME = "CLEAN_UP_SEARCH_BY_NAME";
export const DEEP_CLEAN_UP = "DEEP_CLEAN_UP";

export function getAllBreeds () {
  return async function (dispatch) {
    try {
      const { data } = await axios("/breeds");
      return dispatch({type: GET_ALL, payload: data})
    } catch (error) {
      console.log(error)
    }
  }
}
export function searchByName( name ) {
  return async function ( dispatch ) {
    try {
      const { data } = await axios(`/breeds?name=${name}`);
      return dispatch({ type: SEARCH_BY_NAME, payload: data})
    } catch (error) {
      console.log(error)
      return dispatch({ type: SEARCH_BY_NAME, payload:[] })
    }
  }
}
export function postBreed( data ) {
  return function (dispatch) {
    return new Promise( function(resolve, reject) {
      axios.post("/breeds", data)
      .then( (res) => {
        dispatch({ type: POST_BREED, payload: true});
        resolve(res.data);
      })
      .catch( (error) => {
        dispatch({ type: POST_BREED, payload: false});
        reject(error.response.data);
      })
    })
  }
}
export function setFilters( payload ) { 
  return {
    type: SET_FILTERS,
    payload
  }
}
export function applyFilters() {
  return {
    type: APPLY_FILTERS,
  }
}
export function setLoading( payload ) {
  return {
    type: SET_LOADING,
    payload,
  };
};
export function setCurrentPage( payload ) {
  return {
    type: SET_PAGE,
    payload 
  };
};
export function getDetails( id ) {
  return async function (dispatch) {
    try {
      const { data } = await axios("/breeds/"+id)
      return dispatch({ type: GET_DETAILS, payload: data })
    } catch (error) {
      console.log(error)
    }
  }
}
export function cleanUpSearchByName() {
  return {
    type: CLEAN_UP_SEARCH_BY_NAME
  }
}
export function cleanUpDetail() {
  return {
    type: CLEAN_UP_DETAILS
  }
}
export function cleanUpFilters() { 
  return {
    type: CLEAN_UP_FILTERS
  }
}
export function deepCleanUp() {
  return {
    type: DEEP_CLEAN_UP
  }
}