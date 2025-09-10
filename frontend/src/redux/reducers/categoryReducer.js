import {
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAILURE,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAILURE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAILURE,
  CLEAR_CATEGORIES,
} from "../actionTypes/categoryTypes";

const initialState = {
  categories: [],
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_CATEGORY_REQUEST:
      return {
        ...state,
        creating: true,
        error: null,
      };

    case UPDATE_CATEGORY_REQUEST:
      return {
        ...state,
        updating: true,
        error: null,
      };

    case DELETE_CATEGORY_REQUEST:
      return {
        ...state,
        deleting: true,
        error: null,
      };

    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: [...state.categories, action.payload],
        creating: false,
        error: null,
      };

    case UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category._id === action.payload._id ? action.payload : category
        ),
        updating: false,
        error: null,
      };

    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category._id !== action.payload
        ),
        deleting: false,
        error: null,
      };

    case GET_CATEGORIES_FAILURE:
    case CREATE_CATEGORY_FAILURE:
    case UPDATE_CATEGORY_FAILURE:
    case DELETE_CATEGORY_FAILURE:
      return {
        ...state,
        loading: false,
        creating: false,
        updating: false,
        deleting: false,
        error: action.payload,
      };

    case CLEAR_CATEGORIES:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default categoryReducer;
