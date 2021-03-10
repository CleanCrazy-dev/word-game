import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import dayjs from 'dayjs';
import ContentEditable from 'react-contenteditable';
import {toast} from 'react-toastify';
import RightSideContainer from '../RightSide';
import PublishModal from '../Modal/PublishModal';
import ShareModal from '../Modal/ShareModal';
import TitlePopUpModal from '../Modal/TitlePopUpModal';
import AlertDialog from '../Common/Dialog';
import PauseSaveModal from '../Modal/PauseSaveModal';
import LetterModal from '../Modal/LetterModal';

import {IProblemProps} from '../../models/ProblemModel';
import {IStoryProps} from '../../models/StoryModel';
import {
  setActiveProblem,
  setLoadingStatus,
  setStartOver,
  setStoryPause,
  setStoryStart,
  setActiveStory,
  setIsStoryUpdate,
  setStoryList,
  setStoryPrePare,
  setActiveModalId,
  setActiveLevel,
  setActiveTheme,
} from '../../actions';
import {
  makeSelectActiveLevel,
  makeSelectActiveTheme,
  makeSelectLoadingStatus,
  makeSelectActiveProblem,
  makeSelectStoryPauseStatus,
  makeSelectStoryStartOverStatus,
  makeSelectStoryStartStatus,
  makeSelectActiveStory,
  makeSelectStoryPrePareStatus,
} from '../../selectors';

import {
  getProblemFromFireStore,
  getProblemByIdFireStore,
  mergeIdWithDocData,
} from '../../utils/ProblemFireStore';
import {ConvertSecondsToMinutesSeconds} from '../../utils/ConvertSecondsToMins';
import {addNewStory, updateCurrentStory} from '../../utils/StoryFireStore';
import {getRandomInt} from '../../utils/GetRandomInt';
const PlayGroundComponent = (props: {
  onSetActiveProblem: (problem: any) => void;
  onSetLoadingStatus: (status: boolean) => void;
  onSetStoryStart: (status: boolean) => void;
  onSetStoryPrePare: (status: boolean) => void;
  onSetStartOver: (status: boolean) => void;
  onSetStoryPause: (status: boolean) => void;
  onSetActiveStory: (story: any) => void;
  onSetIsStoryUpdate: (status: boolean) => void;
  onSetStoryList: (list: any) => void;
  onSetActiveModalId: (activeModalId: string) => void;
  onSetActiveLevel: (level: number) => void;
  onSetActiveTheme: (theme: number) => void;
  theme: number;
  level: number;
  loadingStatus: boolean;
  activeProblem: any;
  isStart: boolean;
  isPrePare: boolean;
  isStartOver: boolean;
  isPause: boolean;
  activeStory: IStoryProps;
}) => {
  const [story, setStory] = useState('');
  const [wordsCount, setWordsCount] = useState(0);
  const [timer, setTimer] = useState(1200);
  const [matchWords, setMatchWords] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currntPosition, setCurrentPosition] = useState(0);
  const [enterKey, setEnterKey] = useState(false);
  const [showPubishModal, setShowPublishModal] = useState(false);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [activePublishFormat, setActivePublishFormat] = useState('ALL_FRIENDS');
  const [activeShareFormate, setActiveShareFormat] = useState('ALL_FRIENDS');
  const [activeStoryTitle, setActiveStoryTitle] = useState('');
  const [publishMode, setPublishMode] = useState('');
  const [activeStoryId, setActiveStoryId] = useState('');
  const [showPauseSaveModal, setShowPauseSaveModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showLetterModal, setShowLetterModal] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [alertContent, setAlertContent] = useState('');
  const storyEditorRef = useRef(null);
  const startRef = useRef(null);
  useEffect(() => {
    const {activeProblem} = props;
    if (
      activeProblem &&
      activeProblem.words &&
      activeProblem.words.length !== 0 &&
      activeProblem.words.length !== matchWords.length &&
      !props.isStart
    ) {
      setMatchWords(activeProblem.words);
    }
    if (story && !enterKey) {
      setCurrentCursorPosition(currntPosition);
    }
    if (
      props.activeStory &&
      props.activeStory.id &&
      props.activeStory.id !== activeStoryId
    ) {
      setActiveStoryId(props.activeStory.id);
      handleSetActiveProblem(props.activeStory);
    }
  }, [props.activeProblem, story, props.activeStory]);

  const useInterval = (callback: any, delay: number) => {
    const savedCallback = useRef(null);
    // Remember the latest function.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    // Set up the interval.
    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };
  useInterval(() => {
    if (props.isStart) {
      setTimer(timer - 1);
    }
  }, 1000);
  const getData = async (isToday: boolean) => {
    if (!props.loadingStatus) {
      if (isToday) {
        props.onSetLoadingStatus(true);
        const rTheme = getRandomInt(3);
        const problem = await getProblemFromFireStore(rTheme, 2, isToday);
        props.onSetLoadingStatus(false);
        props.onSetActiveProblem(problem);
        if (!problem) {
          const rProblem = await getProblemFromFireStore(2, 2, false);
          props.onSetLoadingStatus(false);
          props.onSetActiveProblem(rProblem);
          handleSetThemeAndLevel(rProblem);
        } else {
          handleSetThemeAndLevel(problem);
        }
      } else {
        if (props.theme !== 0 && props.level !== 0) {
          props.onSetLoadingStatus(true);
          const problem = await getProblemFromFireStore(
            props.theme,
            props.level,
            isToday
          );
          props.onSetLoadingStatus(false);
          props.onSetActiveProblem(problem);
          if (!problem) {
            toast.error('Something went wrong!.');
          } else {
            handleSetThemeAndLevel(problem);
          }
        } else {
          toast.error('Please select theme and level and press Go !');
        }
      }
    }
  };

  const handleSetThemeAndLevel = (problem: any) => {
    const {onSetActiveTheme, onSetActiveLevel} = props;
    onSetActiveLevel(problem.level);
    onSetActiveTheme(problem.theme);
  };

  const handleChangeStory = (event: any) => {
    const {activeProblem} = props;
    const currentFocus = getCaretCharacterOffsetWithin(
      document.getElementById('contentEditableEl')
    );
    setCurrentPosition(currentFocus);
    let storyHtml = event.target.value.replace(/<\/?strong>/gi, '');
    let exp: any;
    if (
      activeProblem &&
      activeProblem.words &&
      activeProblem.words.length !== 0
    ) {
      let remaingWords = matchWords;
      activeProblem.words.map((word: string) => {
        exp = new RegExp('\\b(' + word + ')\\b', 'gi');
        storyHtml = storyHtml.replace(exp, (matchedWord: string) => {
          remaingWords = remaingWords.filter(
            (w: string) => w.toUpperCase() !== matchedWord.toUpperCase()
          );
          return '<strong>' + matchedWord + '</strong>';
        });
        let tempStory = storyHtml;
        tempStory = tempStory.replace(/<[^>]*>/g, ' ');
        tempStory = tempStory.replace(/&nbsp;/g, ' ');
        tempStory = tempStory.replace(/\s+/g, ' ');
        tempStory = tempStory.trim();
        if (tempStory === '') {
          setWordsCount(0);
        } else {
          const wordsCount = tempStory.split(' ').length;
          setWordsCount(wordsCount);
        }
      });
      setMatchWords(remaingWords);
    }
    setStory(storyHtml);
  };

  const onHandleStart = () => {
    const {activeStory, isStart, isStartOver, activeProblem, isPrePare} = props;
    if (isPrePare) {
      props.onSetActiveModalId('CREAT_STORY');
      props.onSetActiveStory(null);
      props.onSetStoryPrePare(false);
    } else {
      if (activeStory) {
        if (activeStory.publishedStatus === 'PUBLISH') {
          toast.error('You need to fetch words before start.');
        } else {
          if (!isStartOver) {
            if (!isStart) {
              toast.error(
                'You can go continuously by clicking Start Over button.'
              );
            } else {
              toast.error('You are already writting the story.');
            }
          }
        }
      } else {
        if (isStart) {
          toast.error('You are already writting the story.');
        } else {
          if (matchWords.length === 0) {
            toast.error('You need to fetch words before start.');
          } else {
            if (activeProblem) {
              const {level, theme} = props;
              if (
                level === activeProblem.level &&
                theme === activeProblem.theme
              ) {
                setTimeout(() => {
                  storyEditorRef.current.focus();
                }, 500);
                if (!props.isStart) {
                  props.onSetStoryStart(true);
                }
                initeState();
                props.onSetStoryPause(false);
              } else {
                toast.error(
                  'You have changed the theme/level of current words, a new set of words will be fetched if you press Go !'
                );
              }
            }
          }
        }
      }
    }
  };

  const onHandlePause = () => {
    if (!props.isStart) {
      //still not started yet.
      toast.error('There is nothing the started story!');
    } else {
      const {activeStory} = props;
      let tempPublishMode = '';
      if (matchWords.length === 0) {
        tempPublishMode = 'SAVE';
        setPublishMode('SAVE');
      } else {
        tempPublishMode = 'PAUSE';
        setPublishMode('PAUSE');
      }
      if (activeStory) {
        onSaveCurrentStroy(tempPublishMode);
      } else {
        setShowTitleModal(true);
      }
    }
  };
  const handlePublish = () => {
    setShowPublishModal(false);
    onSaveCurrentStroy('');
  };

  const onSaveCurrentStroy = async (tempPublishMode = '') => {
    const {activeStory} = props;
    let finalPublishMode = '';
    if (publishMode !== '') {
      finalPublishMode = publishMode;
    }
    if (tempPublishMode !== '') {
      finalPublishMode = tempPublishMode;
    }
    if (finalPublishMode !== '') {
      const data = {
        story,
        name: activeStory ? activeStory.name : activeStoryTitle,
        duration: timer > 0 ? 1200 - timer : timer,
        problemId: props.activeProblem.id,
        wordsCount,
        reads: finalPublishMode === 'PUBLISH' ? getRandomInt(100) : 0,
        likes: finalPublishMode === 'PUBLISH' ? getRandomInt(100) : 0,
        publishedStatus:
          finalPublishMode === 'PUBLISH' ? activePublishFormat : '',
        savedStatus: finalPublishMode,
        access:
          finalPublishMode === 'PUBLISH'
            ? activePublishFormat === 'ALL_FRIENDS' ||
              activePublishFormat === 'PRIVATE_FRIENDS'
              ? 1
              : activePublishFormat === 'PUBLIC_IMAGINAWORD'
              ? 2
              : 0
            : 0,
        level: activeStory ? activeStory.level : props.level,
        createdAt: dayjs().format(),
      };
      setActivePublishFormat('ALL_FRIENDS');
      setPublishMode('');
      if (activeStory) {
        const result = await updateCurrentStory(data, props.activeStory.id);
        if (result === 'Ok') {
          props.onSetStoryStart(false);
          props.onSetIsStoryUpdate(true);
          props.onSetStoryList([]);
          props.onSetActiveStory(null);
        }
        showMessage(result);
      } else {
        const result = await addNewStory(data);
        if(result === 'Ok'){
          props.onSetStoryStart(false);
          props.onSetIsStoryUpdate(true);
          props.onSetStoryList([]);
        }
        showMessage(result);
      }
    }
  };

  const onCheckPublishable = () => {
    if (
      matchWords.length !== 0 ||
      (!props.isStart && props.activeStory.savedStatus !== 'SAVE')
    ) {
      //any words from the set are missing in the story or still not starte yet.
      toast.error(
        'There are no match words or you have not started the story yet.'
      );
    } else {
      const {activeStory} = props;
      setPublishMode('PUBLISH');
      if (activeStory) {
        setShowPublishModal(true);
      } else {
        setShowTitleModal(true);
      }
    }
  };

  const showMessage = (status: string | void) => {
    if (status === 'Ok') {
      toast.success('Saved successfully.');
    } else {
      toast.error('Something went wrong!.');
    }
  };
  const handleClose = () => {
    const {activeStory, isStart} = props;
    if (activeStory) {
      props.onSetStoryStart(true);
      props.onSetStartOver(false);
    }
    if (isStart) {
      const {onSetStoryStart, onSetStoryPrePare} = props;
      initeState();
      onSetStoryPrePare(true);
      onSetStoryStart(false);
    }
    setTimeout(() => {
      storyEditorRef.current.focus();
    }, 500);
    setOpenDialog(false);
  };
  const handleConfirm = () => {
    setOpenDialog(false);
    initeState();
    props.onSetStoryPrePare(false);
    props.onSetStoryStart(true);
    props.onSetStartOver(false);
    setTimeout(() => {
      storyEditorRef.current.focus();
    }, 500);
  };

  const initeState = () => {
    setStory('');
    setWordsCount(0);
    setTimer(1200);
  };

  const onHandleStartOver = () => {
    const {activeStory, isStart} = props;
    if (activeStory) {
      if (activeStory.publishedStatus === 'PUBLISH') {
        toast.error('This story was already completed!');
      } else {
        if (props.isStart) {
          toast.error(
            'There is working story.You need to stop the current story!'
          );
        } else {
          setAlertContent('Do you want to cancel or Start over?');
          setOpenDialog(true);
        }
      }
    } else {
      if (isStart) {
        setAlertContent('Do you want to cancel or Start over?');
        setOpenDialog(true);
      } else {
        toast.error('There is nothing the fetched story!');
      }
    }
  };

  const handleSetActiveProblem = async (activeStory: any) => {
    const {story, wordsCount, problemId, duration} = activeStory;
    const result = await getProblemByIdFireStore(problemId);
    if (result) {
      props.onSetActiveProblem(result);
      handleSetThemeAndLevel(result);
    }
    setStory(story);
    setWordsCount(wordsCount);
    setTimer(duration);
    props.onSetActiveStory(activeStory);
  };

  const createRange = (node: any, chars: any, range: any) => {
    if (!range) {
      range = document.createRange();
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = createRange(node.childNodes[lp], chars, range);

          if (chars.count === 0) {
            break;
          }
        }
      }
    }
    return range;
  };

  const setCurrentCursorPosition = (chars: any) => {
    if (chars >= 0) {
      var selection = window.getSelection();
      const range = createRange(
        document.getElementById('contentEditableEl').parentNode,
        {count: chars},
        null
      );

      if (range) {
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  };
  const getCaretCharacterOffsetWithin = (element: any) => {
    let caretOffset = 0;
    const doc = document as any;
    if (typeof window.getSelection != 'undefined') {
      let range = window.getSelection().getRangeAt(0);
      let preCaretRange = range.cloneRange();
      preCaretRange.selectNodeContents(element);
      preCaretRange.setEnd(range.endContainer, range.endOffset);
      caretOffset = preCaretRange.toString().length;
    } else if (
      typeof doc.selection != 'undefined' &&
      doc.selection.type != 'Control'
    ) {
      let textRange = doc.selection.createRange();
      let preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint('EndToEnd', textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  };

  const handleDownEnterKey = (e: any) => {
    if (e.code === 'Enter') {
      setEnterKey(true);
      setCurrentPosition(0);
    }
  };
  const handleUpEnterKey = (e: any) => {
    if (e.code === 'Enter') {
      setEnterKey(false);
    }
  };
  const onClosePublishModal = () => {
    setShowPublishModal(false);
  };
  const onCloseShareModal = () => {
    setShowShareModal(false);
  };
  const handleShowShareModal = () => {
    setShowShareModal(true);
  };
  const onCloseTitleModal = () => {
    setShowTitleModal(false);
  };
  const handleChangeActiveFormat = (activeFormat: string) => {
    setActivePublishFormat(activeFormat);
  };
  const onSaveTitleName = () => {
    onCloseTitleModal();
    if (publishMode === 'PAUSE' || publishMode === 'SAVE') {
      onSaveCurrentStroy('');
    } else {
      setShowPublishModal(true);
    }
  };

  const handleChangeTitle = (e: any) => {
    setActiveStoryTitle(e.target.value);
  };

  const onClosePauseModal = () => {
    setShowPauseSaveModal(false);
    props.onSetActiveStory(null);
  };
  const onPauseSave = () => {
    setShowPauseSaveModal(false);
    onHandlePause();
  };
  const handleChangeShareFormat = (activeFormat: string) => {
    setActiveShareFormat(activeFormat);
  };
  const handleShowLetterModal = () => {
    setShowLetterModal(true);
  };
  const onCloseLetterModal = () => {
    setShowLetterModal(false);
  };

  const onSaveSelectedLetter = (sLetter: string) => {
    setSelectedLetter(sLetter);
    setShowLetterModal(false);
  };

  const onHandlePaste = (e: any) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertHTML', false, text);
  };
  const {activeProblem} = props;

  return (
    <React.Fragment>
      <AlertDialog
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        open={openDialog}
        content={alertContent}
      />
      <div>
        <PublishModal
          open={showPubishModal}
          onCloseModal={onClosePublishModal}
          handleChangeActiveFormat={handleChangeActiveFormat}
          activeFormat={activePublishFormat}
          handlePublish={handlePublish}
        />
        <ShareModal
          open={showShareModal}
          onCloseModal={onCloseShareModal}
          handleChangeActiveFormat={handleChangeShareFormat}
          activeFormat={activeShareFormate}
          handleShare={onCloseShareModal}
        />
        <TitlePopUpModal
          open={showTitleModal}
          onCloseModal={onCloseTitleModal}
          onSaveTitleName={onSaveTitleName}
          handleChangeTitle={handleChangeTitle}
        />
        <PauseSaveModal
          open={showPauseSaveModal}
          onCloseModal={onClosePauseModal}
          onPauseSave={onPauseSave}
        />
        <LetterModal
          open={showLetterModal}
          onCloseModal={onCloseLetterModal}
          onSaveSelectedLetter={onSaveSelectedLetter}
        />
      </div>
      <div className="story-panel">
        <div style={{width: '100%'}}></div>
        <div className="back-frame-yellow">
          <div className="label-container">
            <div className="words-of-day">
              <span
                className={
                  props.isStart
                    ? 'button button-start disabled'
                    : 'button button-start'
                }
                onClick={() => !props.isStart && getData(true)}
              >
                Words of the day
              </span>
            </div>
            <div className="label-left">
              <span className="label-blue-1">Words offered by:</span>
              <span className="label-red-1" style={{minWidth: 56}}>
                Imaginaword
              </span>
              <span className="label-blue-1">Sequence No:</span>
              <span className="label-red-1">
                {activeProblem && activeProblem.id ? activeProblem.id : ''}
              </span>
              <img
                src="static/images/Help symbol.png"
                alt=""
                onClick={() => props.onSetActiveModalId('SEQUENCE_NUMBER')}
              />
            </div>
            <div className="label-right">
              <p>
                <span className="label-blue-1">Time to do it:</span>
                <span className="label-red-1">
                  {ConvertSecondsToMinutesSeconds(timer)}min
                </span>
              </p>
              <div className="words-amount">
                <span className="label-blue-1">Words:</span>
                <span className="label-red-1">{wordsCount}</span>
                <img
                  src="static/images/Help symbol.png"
                  alt=""
                  onClick={() => props.onSetActiveModalId('TIME_TO_DO_IT')}
                />
              </div>
              <div className="image-reset">
                <img
                  src="static/images/ResetWords.png"
                  alt=""
                  className={props.isStart || props.isPrePare ? 'disabled' : ''}
                  onClick={() => !props.isStart && getData(false)}
                />
              </div>
            </div>
          </div>
          <div className="back-frame-gray-shadow">
            <ContentEditable
              id="contentEditableEl"
              className={
                props.isStart
                  ? 'story-text-editor started'
                  : 'story-text-editor'
              }
              html={story}
              disabled={props.isStart || props.isStartOver ? false : true} // use true to disable edition
              onChange={e => handleChangeStory(e)} // handle innerHTML change
              onKeyDown={e => handleDownEnterKey(e)}
              onKeyUp={e => handleUpEnterKey(e)}
              onPaste={e => onHandlePaste(e)}
              innerRef={storyEditorRef}
              onFocus={() => {}}
            />
          </div>
          <div className="btn-group">
            <div
              className={
                (props.isPrePare && !props.activeStory) ||
                (!props.isStart && !props.isPrePare && !props.activeStory) ||
                (props.isStart && !props.activeStory) ||
                (props.activeStory && props.activeStory.savedStatus !== 'SAVE')
                  ? 'button button-publish disabled'
                  : 'button button-publish'
              }
              onClick={() => onCheckPublishable()}
            >
              Publish
            </div>
            <div
              className={
                (props.isPrePare && !props.activeStory) ||
                (!props.isStart && !props.isPrePare && !props.activeStory) ||
                (props.isStart && !props.activeStory) ||
                (props.activeStory && props.activeStory.savedStatus !== 'SAVE')
                  ? 'button button-video disabled'
                  : 'button button-video'
              }
            >
              &nbsp;Add a video&nbsp;
            </div>
            <div
              className={
                (props.isPrePare && !props.activeStory) ||
                (props.activeStory &&
                  props.activeStory.savedStatus === 'PUBLISH') ||
                (props.activeStory && props.activeStory.savedStatus === 'SAVE')
                  ? 'button button-start-over disabled'
                  : 'button button-start-over'
              }
              onClick={() => onHandleStartOver()}
            >
              &nbsp;Start over&nbsp;
            </div>
            <div
              className={
                (props.isPrePare && !props.activeStory) ||
                (props.activeStory &&
                  props.activeStory.savedStatus === 'PUBLISH') ||
                (props.activeStory && !props.isStart)
                  ? 'button button-pause disabled'
                  : 'button button-pause'
              }
              onClick={() => onHandlePause()}
            >
              Pause/Save
            </div>
            <div
              className={
                (!props.activeStory && props.isStart && props.isPrePare) ||
                (!props.activeStory && props.isStart) ||
                (props.activeStory &&
                  props.activeStory.savedStatus === 'PUBLISH')
                  ? 'button button-start disabled'
                  : 'button button-start'
              }
              ref={startRef}
              onClick={() => onHandleStart()}
            >
              {props.isPrePare ? 'New Story' : 'Start'}
            </div>
          </div>
          <div>
            <button onClick={() => handleShowShareModal()}>
              Show Share Modal
            </button>
            <button onClick={() => handleShowLetterModal()}>
              Show Theme Letter Selection Modal
            </button>
          </div>
          <div>
            Selected Letter:<span style={{color: 'red'}}>{selectedLetter}</span>
          </div>
        </div>
        <RightSideContainer />
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  level: makeSelectActiveLevel(),
  theme: makeSelectActiveTheme(),
  loadingStatus: makeSelectLoadingStatus(),
  activeProblem: makeSelectActiveProblem(),
  isStart: makeSelectStoryStartStatus(),
  isStartOver: makeSelectStoryStartOverStatus(),
  isPause: makeSelectStoryPauseStatus(),
  activeStory: makeSelectActiveStory(),
  isPrePare: makeSelectStoryPrePareStatus(),
});
function mapDispatchToProps(dispatch: any) {
  return {
    onSetActiveProblem: (problem: IProblemProps) =>
      dispatch(setActiveProblem(problem)),
    onSetLoadingStatus: (status: boolean) => dispatch(setLoadingStatus(status)),
    onSetStoryStart: (status: boolean) => dispatch(setStoryStart(status)),
    onSetStoryPrePare: (status: boolean) => dispatch(setStoryPrePare(status)),
    onSetStartOver: (status: boolean) => dispatch(setStartOver(status)),
    onSetStoryPause: (status: boolean) => dispatch(setStoryPause(status)),
    onSetActiveStory: (story: IStoryProps) => dispatch(setActiveStory(story)),
    onSetIsStoryUpdate: (status: boolean) => dispatch(setIsStoryUpdate(status)),
    onSetStoryList: (list: any) => dispatch(setStoryList(list)),
    onSetActiveModalId: (activeModalId: string) =>
      dispatch(setActiveModalId(activeModalId)),
    onSetActiveLevel: (level: number) => dispatch(setActiveLevel(level)),
    onSetActiveTheme: (theme: number) => dispatch(setActiveTheme(theme)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(PlayGroundComponent);
