import {
  take,
  call,
  put,
  all,
  select,
  takeEvery,
  takeLatest,
  debounce,
  throttle,
  delay,
} from "redux-saga/effects";

// import { FETCH_ALL_STORIES } from "./constants/actionTypes";
// import { getTotalStoriesAmount } from "./utils/StoryFireStore";

// function* watchForFetchAllStories() {
//   while (true) {
//     yield take(FETCH_ALL_STORIES);
//     yield call(handleFetchAllStories);
//   }
// }
// function* handleFetchAllStories() {
//   try {
//     const stories = getTotalStoriesAmount();
//   } catch (error) {
//     console.warn("Error occurred in the handleFetchAllStories saga", error);
//   }
// }
export default function* defaultSaga() {
  yield all([
    // watchForFetchAllStories(),
  ]);
}
