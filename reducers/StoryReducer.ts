import { fromJS } from 'immutable';
import {
  SET_ACTIVE_PROBLEM,
  SET_ACTIVE_THEME,
  SET_ACIVE_LEVEL,
  SET_LOADING_STATUS,
  SET_START_STATUS,
  SET_START_OVER_STATUS,
  SET_PAUSE_STATUS,
  SET_ACTIVE_STORY,
  SET_STORY_LIST,
  SET_STORIES_TOTAL_NUMBER,
  UPDATED_STORY_LIST,
  SET_PREPARE_STATUS,
  SET_ACTIVE_MODAL_ID
} from '../constants/actionTypes';

const initialState = fromJS({
  activeProblem: null,
  level: 0,
  theme: 0,
  loadingStatus: false,
  start: false,
  startOver: false,
  pause: false,
  prepare:true,
  activeStory: null,
  storyList: [],
  storyTotal:0,
  isStoryUpdate:true,
  activeModalId:'',
});

function storyReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_ACTIVE_PROBLEM:
      return state.set("activeProblem", action.problem);
    case SET_ACTIVE_THEME:
      return state.set("theme", action.theme);
    case SET_ACIVE_LEVEL:
      return state.set("level", action.level);
    case SET_LOADING_STATUS:
      return state.set('loadingStatus', action.status)
    case SET_START_STATUS:
      return state.set('start', action.status)
    case SET_PREPARE_STATUS:
      return state.set('prepare', action.status)
    case SET_START_OVER_STATUS:
      return state.set('startOver', action.status)
    case SET_PAUSE_STATUS:
      return state.set('pause', action.status)
    case SET_ACTIVE_MODAL_ID:
      return state.set('activeModalId', action.modalId)
    case SET_ACTIVE_STORY:
      return state.set('activeStory', action.story)
    case SET_STORY_LIST:
      return state.set('storyList', action.list)
    case SET_STORIES_TOTAL_NUMBER:
      return state.set('storyTotal', action.total)
    case UPDATED_STORY_LIST:
      return state.set('isStoryUpdate', action.status)
    default:
      return state;
  }
}

export default storyReducer;
