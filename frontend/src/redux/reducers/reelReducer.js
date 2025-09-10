import {
  GET_REELS_REQUEST,
  GET_REELS_SUCCESS,
  GET_REELS_FAILURE,
  CREATE_REEL_REQUEST,
  CREATE_REEL_SUCCESS,
  CREATE_REEL_FAILURE,
  UPDATE_REEL_REQUEST,
  UPDATE_REEL_SUCCESS,
  UPDATE_REEL_FAILURE,
  DELETE_REEL_REQUEST,
  DELETE_REEL_SUCCESS,
  DELETE_REEL_FAILURE,
  CLEAR_REELS,
  SET_CURRENT_REEL,
} from "../actionTypes/reelTypes";

const initialState = {
  reels: [],
  currentReel: null,
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
};

const reelReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REELS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_REEL_REQUEST:
      return {
        ...state,
        creating: true,
        error: null,
      };

    case UPDATE_REEL_REQUEST:
      return {
        ...state,
        updating: true,
        error: null,
      };

    case DELETE_REEL_REQUEST:
      return {
        ...state,
        deleting: true,
        error: null,
      };

    case GET_REELS_SUCCESS:
      return {
        ...state,
        reels: action.payload,
        loading: false,
        error: null,
      };

    case CREATE_REEL_SUCCESS:
      return {
        ...state,
        reels: [action.payload, ...state.reels],
        creating: false,
        error: null,
      };

    case UPDATE_REEL_SUCCESS:
      return {
        ...state,
        reels: state.reels.map((reel) =>
          reel._id === action.payload._id ? action.payload : reel
        ),
        updating: false,
        error: null,
      };

    case DELETE_REEL_SUCCESS:
      return {
        ...state,
        reels: state.reels.filter((reel) => reel._id !== action.payload),
        deleting: false,
        error: null,
      };

    case SET_CURRENT_REEL:
      return {
        ...state,
        currentReel: action.payload,
      };

    case GET_REELS_FAILURE:
    case CREATE_REEL_FAILURE:
    case UPDATE_REEL_FAILURE:
    case DELETE_REEL_FAILURE:
      return {
        ...state,
        loading: false,
        creating: false,
        updating: false,
        deleting: false,
        error: action.payload,
      };

    case CLEAR_REELS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reelReducer;
