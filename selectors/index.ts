import { createSelector } from "reselect";

const selectImaginaWordDomain = (state:any) => state.storyReducer;

const makeSelectImaginaWordPageState = () =>
  createSelector(selectImaginaWordDomain, substate => (substate ? substate.toJS() : {}));

const makeSelectActiveProblem = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.activeProblem);
const makeSelectActiveLevel = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.level)
const makeSelectActiveTheme = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.theme)
const makeSelectLoadingStatus = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.loadingStatus);
const makeSelectStoryStartStatus = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.start);
const makeSelectStoryPrePareStatus = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.prepare);
const makeSelectStoryPauseStatus = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.pause);
const makeSelectStoryStartOverStatus = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.startOver);
const makeSelectActiveStory = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.activeStory);
const makeSelectStoryList = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.storyList);
const makeSelectStoryTotalNumber = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.storyTotal);
const makeSelectIsStoryUpdate = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.isStoryUpdate);

const makeSelectActiveModalId = () => createSelector(makeSelectImaginaWordPageState(), substate => substate.activeModalId);

export default selectImaginaWordDomain;
export {
  makeSelectImaginaWordPageState,
  makeSelectActiveProblem,
  makeSelectActiveLevel,
  makeSelectActiveTheme,
  makeSelectLoadingStatus,
  makeSelectStoryStartStatus,
  makeSelectStoryPauseStatus,
  makeSelectStoryStartOverStatus,
  makeSelectActiveStory,
  makeSelectStoryList,
  makeSelectStoryTotalNumber,
  makeSelectIsStoryUpdate,
  makeSelectStoryPrePareStatus,
  makeSelectActiveModalId,
};
