import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {
  setActiveProblem,
  setActiveLevel,
  setActiveTheme,
  setLoadingStatus,
  setActiveStory,
  setActiveModalId,
} from '../../actions';
import {
  makeSelectLoadingStatus,
  makeSelectStoryStartOverStatus,
  makeSelectStoryStartStatus,
  makeSelectActiveProblem,
  makeSelectActiveStory,
  makeSelectActiveLevel,
  makeSelectActiveTheme,
} from '../../selectors';
import {IProblemProps} from '../../models/ProblemModel';
import {getProblemFromFireStore} from '../../utils/ProblemFireStore';
import {toast} from 'react-toastify';

const ControllerContainer = (props: {
  onSetActiveProblem: (problem: any) => void;
  onSetActiveLevel: (level: number) => void;
  onSetActiveTheme: (theme: number) => void;
  onSetLoadingStatus: (status: boolean) => void;
  onSetActiveModalId: (activeId: string) => void;
  onSetActiveStory: (story: any) => void;
  loadingStatus: boolean;
  isStart: boolean;
  startOver: boolean;
  activeProblem: IProblemProps;
  activeStory: any;
  level: number;
  theme: number;
}) => {
  useEffect(() => {}, []);
  const getData = async (cTheme: number, cLevel: number) => {
    if (!props.loadingStatus) {
      if (cTheme === 0 || cLevel === 0) {
        toast.error('Please select valid theme and level.');
      } else {
        props.onSetActiveStory(null);
        props.onSetLoadingStatus(true);
        const problem = await getProblemFromFireStore(cTheme, cLevel, false);
        props.onSetLoadingStatus(false);
        props.onSetActiveProblem(problem);
        if (!problem) {
          toast.error('⚠️ Something went wrong!.');
        }
      }
    }
  };

  return (
    <div className="controller-panel">
      <img
        src="static/images/Help symbol.png"
        alt=""
        onClick={() => props.onSetActiveModalId('CREAT_STORY')}
      />
      <label className="label-blue-1">Create your Story</label>
      <img src="static/images/Forward.png" className="arrow" alt="" />
      <label className="label-blue-1">Theme</label>
      <select
        onChange={(e: any) => {
          props.onSetActiveTheme(Number(e.target.value));
        }}
        disabled={props.isStart || props.activeStory}
        value={props.theme}
      >
        <option value={0}></option>
        <option value={1}>Theme1</option>
        <option value={2}>Theme2</option>
        <option value={3}>Theme3</option>
      </select>
      <img src="static/images/Forward.png" className="arrow" alt="" />
      <label className="label-blue-1">Level</label>
      <select
        onChange={(e: any) => {
          props.onSetActiveLevel(Number(e.target.value));
        }}
        value={props.level}
        disabled={props.isStart || props.activeStory}
      >
        <option value={0}></option>
        <option value={1}>Beginer</option>
        <option value={2}>Intermediate</option>
        <option value={3}>Expert</option>
      </select>
      <button
        type="submit"
        onClick={() => getData(Number(props.theme), Number(props.level))}
        disabled={props.isStart && !props.startOver ? true : false}
      >
        Go!
      </button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  loadingStatus: makeSelectLoadingStatus(),
  startOver: makeSelectStoryStartOverStatus(),
  isStart: makeSelectStoryStartStatus(),
  activeProblem: makeSelectActiveProblem(),
  activeStory: makeSelectActiveStory(),
  level: makeSelectActiveLevel(),
  theme: makeSelectActiveTheme(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    onSetActiveProblem: (problem: IProblemProps) =>
      dispatch(setActiveProblem(problem)),
    onSetActiveLevel: (level: number) => dispatch(setActiveLevel(level)),
    onSetActiveTheme: (theme: number) => dispatch(setActiveTheme(theme)),
    onSetLoadingStatus: (status: boolean) => dispatch(setLoadingStatus(status)),
    onSetActiveModalId: (activeId: string) =>
      dispatch(setActiveModalId(activeId)),
    onSetActiveStory: (story: any) => dispatch(setActiveStory(story)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(ControllerContainer);
