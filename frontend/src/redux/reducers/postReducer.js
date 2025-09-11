import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAILURE,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAILURE,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  GET_COMMENTS_REQUEST,
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAILURE,
  VOTE_POLL_SUCCESS,
  CLEAR_POSTS,
} from "../actionTypes/postTypes";

const initialState = {
  posts: [],
  comments: {},
  loading: false,
  error: null,
  creating: false,
  updating: false,
  deleting: false,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case CREATE_POST_REQUEST:
      return {
        ...state,
        creating: true,
        error: null,
      };

    case UPDATE_POST_REQUEST:
      return {
        ...state,
        updating: true,
        error: null,
      };

    case DELETE_POST_REQUEST:
      return {
        ...state,
        deleting: true,
        error: null,
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload.posts,
        loading: false,
        error: null,
      };

    case CREATE_POST_SUCCESS:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        creating: false,
        error: null,
      };

    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        updating: false,
        error: null,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
        deleting: false,
        error: null,
      };

    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case ADD_COMMENT_SUCCESS:
      const { postId, comment } = action.payload;
      return {
        ...state,
        comments: {
          ...state.comments,
          [postId]: [...(state.comments[postId] || []), comment],
        },
        loading: false,
      };

    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.postId]: action.payload.comments,
        },
        loading: false,
      };

    case VOTE_POLL_SUCCESS:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case GET_POSTS_FAILURE:
    case CREATE_POST_FAILURE:
    case UPDATE_POST_FAILURE:
    case DELETE_POST_FAILURE:
    case ADD_COMMENT_FAILURE:
    case GET_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        creating: false,
        updating: false,
        deleting: false,
        error: action.payload,
      };

    case CLEAR_POSTS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default postReducer;
