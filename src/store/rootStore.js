import api from '../lib/api';

const initialState = {
  error: null,
  fetching: false,
  total: 0,
  heroes: [],
  selectedHero: null,
};

const actionTypes = {
  FETCHING: 'FETCHING',
  FETCH_ERROR: 'FETCH_ERROR',
  FETCH_HEROES: 'FETCH_HEROES',
  FETCH_HERO_DETAILS: 'FETCH_HERO_DETAILS',
  SAVE_HERO_DATA: 'SAVE_HERO_DATA',
};

export function fetchHeroes({ offset, nameStartsWith } = {}) {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCHING, payload: true });

    try {
      const { data } = await api.get('/characters', {
        params: {
          nameStartsWith: nameStartsWith === '' ? undefined : nameStartsWith,
          offset,
        },
      });

      return dispatch({
        type: actionTypes.FETCH_HEROES,
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err,
      });
    } finally {
      dispatch({ type: actionTypes.FETCHING, payload: false });
    }
  };
}

export function fetchHeroDetails(heroId) {
  return async (dispatch) => {
    dispatch({ type: actionTypes.FETCHING, payload: true });

    try {
      const { data } = await api.get(`/characters/${heroId}`);

      return dispatch({
        type: actionTypes.FETCH_HERO_DETAILS,
        payload: data,
      });
    } catch (err) {
      return dispatch({
        type: actionTypes.FETCH_ERROR,
        payload: err,
      });
    } finally {
      dispatch({ type: actionTypes.FETCHING, payload: false });
    }
  };
}

export function saveHero(heroData) {
  return async (dispatch) => {
    dispatch({ type: actionTypes.SAVE_HERO_DATA, payload: heroData });
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCHING:
      return {
        ...state,
        fetching: action.payload,
        error: action.payload === true ? null : state.error,
      };
    case actionTypes.FETCH_HEROES:
      // when we have offset zero
      // means that we have made a search or first load
      // in this case we use the new fresh result to list
      const heroes =
        action.payload.data.offset === 0
          ? action.payload.data.results
          : [].concat(state.heroes, action.payload.data.results);

      return {
        ...state,
        heroes,
        total: action.payload.data.total,
      };
    case actionTypes.FETCH_HERO_DETAILS:
      return {
        ...state,
        selectedHero: action.payload.data.results[0],
      };

    case actionTypes.SAVE_HERO_DATA:
      return {
        ...state,
        selectedHero: action.payload,
        heroes: state.heroes.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
