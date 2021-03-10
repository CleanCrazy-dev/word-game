import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import dayjs from 'dayjs';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import AlertDialog from '../../../../Common/Dialog';
import {
  getTotalStoryAmount,
  getSubStoryListById,
  getCurrentStoryByDocId,
  deleteStoryById,
} from '../../../../../utils/StoryFireStore';
import {
  makeSelectStoryList,
  makeSelectStoryTotalNumber,
  makeSelectIsStoryUpdate,
  makeSelectStoryStartStatus,
  makeSelectActiveStory,
} from '../../../../../selectors';
import {
  setStoryList,
  setStoryTotal,
  setIsStoryUpdate,
  setActiveStory,
  setStoryStart,
  setStartOver,
} from '../../../../../actions';

const TitlesComponent = (props: {
  storyList: [];
  total: number;
  isStoryUpdate: boolean;
  isStart: boolean;
  activeStory: any;
  onSetStoryList: (list: any) => void;
  onSetActiveStory: (story: any) => void;
  onSetStoryTotal: (total: number) => void;
  onSetIsStoryUpdate: (status: boolean) => void;
  onSetStoryStart: (status: boolean) => void;
  onSetStartOver: (status: boolean) => void;
}) => {
  const [sort, setSort] = useState('');
  const [bufferStory, setBufferStory] = useState<any | null>([]);
  const [hasMore, setHasMore] = useState(true);
  const [current, setCurrent] = useState(0);
  const [total, setTotal] = useState(0);
  const [alertContent, setAlertContent] = useState(
    'Do you want to delete the selected story?'
  );
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    async function fetchAllStoriesAPI() {
      if (props.storyList.length === 0 && current === 0) {
        props.onSetIsStoryUpdate(false);
        const next = current + 1;
        setCurrent(next);
        let amount = await getTotalStoryAmount();
        if (amount !== 0) {
          const totalPage = Math.floor(Number(amount) / 25) + 1;
          setTotal(totalPage);
          const cStoryList = await getSubStoryListById(current, sort);
          props.onSetStoryTotal(Number(amount));
          props.onSetStoryList(cStoryList);
          if (totalPage > 1) {
            const nStoryList = await getSubStoryListById(next, sort);
            setBufferStory(nStoryList);
          } else {
            setHasMore(false);
          }
        } else {
          setHasMore(false);
        }
      }
    }
    if (props.isStoryUpdate) {
      initState();
    }
    fetchAllStoriesAPI();
  }, [props.storyList, props.isStoryUpdate]);

  const getNextStoryList = async () => {
    const next = current + 1;
    if (current !== 0 && next <= total) {
      setCurrent(next);
      const nStoryList = await getSubStoryListById(next, sort);
      setBufferStory(nStoryList);
    }
  };
  const fetchMoreData = () => {
    if (props.storyList.length >= props.total) {
      setHasMore(false);
    } else {
      const newStory = props.storyList.concat(bufferStory);
      props.onSetStoryList(newStory);
      getNextStoryList();
    }
  };
  const onChangeAccessSort = () => {
    switch (sort) {
      case 'ACCESS_DES':
        setSort('ACCESS_ASC');
        break;
      case 'ACCESS_ASC':
        setSort('ACCESS_DES');
        break;
      default:
        setSort('ACCESS_DES');
    }
    initState();
  };
  const onChangeLevelSort = () => {
    switch (sort) {
      case 'LEVEL_DES':
        setSort('LEVEL_ASC');
        break;
      case 'LEVEL_ASC':
        setSort('LEVEL_DES');
        break;
      default:
        setSort('LEVEL_DES');
    }
    initState();
  };

  const initState = () => {
    setCurrent(0);
    setHasMore(true);
    props.onSetStoryList([]);
    setBufferStory([]);
  };

  const handleClickRow = async (id: string) => {
    const newStory = await getCurrentStoryByDocId(id);
    props.onSetActiveStory(newStory);
  };

  const handleCheckAccess = (access: string) => {
    switch (access) {
      case 'PRIVATE_FRIENDS':
        return 'Priv';
      case 'ALL_FRIENDS':
        return 'Priv';
      case 'PUBLIC_IMAGINAWORD':
        return 'Publ';
      default:
        return '';
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return 'Beg';
      case 2:
        return 'Int';
      case 3:
        return 'Exp';
      default:
        return '';
    }
  };

  const getSaveStatusLabel = (status: string) => {
    switch (status) {
      case 'PUBLISH':
        return 'Published';
      case 'SAVE':
        return 'Saved';
      case 'PAUSE':
        return 'Paused';
      default:
        return '';
    }
  };

  const handleDeleteSelectedStory = async (storyId: string) => {
    const result = await deleteStoryById(storyId);
    if (result === 'OK') {
      setCurrent(0);
      props.onSetActiveStory(null);
      props.onSetStoryList([]);
    }
  };
  const handleClose = () => {
    initeState();
  };
  const handleConfirm = () => {
    handleDeleteSelectedStory(props.activeStory.id);
    initeState();
  };
  const initeState = () => {
    props.onSetActiveStory(null);
    setOpenDialog(false);
  };
  const handleModifiySavedStory = () => {
    props.onSetStoryStart(true);
    props.onSetStartOver(false);
  };
  return (
    <React.Fragment>
      <AlertDialog
        handleClose={handleClose}
        handleConfirm={handleConfirm}
        open={openDialog}
        content={alertContent}
      />
      <div className={props.isStart ? 'table disabled' : 'table'}>
        <div className="row">
          <div className="cell header-cell">
            <div className="table">
              <div className="header">
                <div className="cell" style={{width: '10%', paddingLeft: 10}}>
                  <div
                    className={
                      sort === 'ACCESS_DES'
                        ? 'arrow-down'
                        : sort === 'ACCESS_ASC'
                        ? 'arrow-up'
                        : 'arrow-down'
                    }
                    onClick={onChangeAccessSort}
                  ></div>
                </div>
                <div className="cell" style={{textAlign: 'center'}}>
                  My Titles({props.total})
                </div>
                <div className="cell" style={{width: '10%'}}>
                  <div className="arrow-down"></div>
                </div>
                <div className="cell" style={{width: '10%'}}>
                  <div
                    className={
                      sort === 'LEVEL_DES'
                        ? 'arrow-down'
                        : sort === 'LEVEL_ASC'
                        ? 'arrow-up'
                        : 'arrow-down'
                    }
                    onClick={onChangeLevelSort}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <div>
              <InfiniteScroll
                dataLength={props.storyList.length}
                next={fetchMoreData}
                hasMore={hasMore}
                height={530}
                loader={hasMore && <h4>Loading...</h4>}
                endMessage={
                  <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                  </p>
                }
              >
                <div className="table">
                  {props.storyList.map((item: any, index: number) => {
                    return (
                      <>
                        <div
                          className={index % 2 == 0 ? 'row odd' : 'row'}
                          key={item.id}
                          onClick={() => handleClickRow(item.id)}
                          style={{cursor: 'pointer'}}
                        >
                          <div
                            className="cell label-blue-2 small-label"
                            style={{
                              width: '10%',
                              paddingLeft: 10,
                              paddingTop: 5,
                              verticalAlign: 'top',
                            }}
                          >
                            {handleCheckAccess(item.publishedStatus)}
                          </div>
                          <div className="cell" style={{paddingLeft: 10}}>
                            <div
                              className="lable-red-1"
                              style={{marginBottom: 2}}
                            >
                              {item.name}
                            </div>
                            <div
                              className="small-label"
                              style={{marginBottom: 2}}
                            >
                              {getSaveStatusLabel(item.savedStatus)} &nbsp;
                              {item.createdAt !== ''
                                ? dayjs(item.createdAt).format('D MMM YYYY')
                                : ''}
                            </div>
                            <div style={{marginBottom: 2}}>
                              <span
                                className="label-blue-2 small-label"
                                style={{width: '50%', display: 'inline-block'}}
                              >
                                Rd:{item.reads}
                              </span>
                              <span
                                className="label-green small-label"
                                style={{width: '50%'}}
                              >
                                Likes:{item.likes}
                              </span>
                            </div>
                          </div>
                          <div
                            className="cell"
                            style={{
                              position: 'relative',
                              width: '10%',
                            }}
                          >
                            <div style={{position: 'absolute', top: 1}}>
                              <img
                                src="static/images/Camera.png"
                                alt=""
                                style={{width: '80%', height: '80%'}}
                              />
                            </div>
                            <div
                              style={{
                                position: 'absolute',
                                bottom: 0,
                              }}
                            >
                              <img
                                src="static/images/Bubble.png"
                                alt=""
                              />
                            </div>
                          </div>
                          <div
                            className="cell lable-red-1"
                            style={{
                              width: '10%',
                              position: 'relative',
                            }}
                          >
                            <div style={{position: 'absolute', top: 1}}>
                              {getLevelLabel(item.level)}
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </InfiniteScroll>
            </div>
          </div>
        </div>
      </div>
      <div className="table-footer">
        <div
          className={
            props.activeStory
              ? 'button button-delete small-button'
              : 'button button-delete small-button disabled'
          }
          onClick={() => setOpenDialog(true)}
        >
          D
        </div>
        <div
          className={
            props.activeStory && props.activeStory.savedStatus !== 'PUBLISH'
              ? 'button button-start-over small-button'
              : 'button button-start-over small-button disabled'
          }
          onClick={() => handleModifiySavedStory()}
        >
          M
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  storyList: makeSelectStoryList(),
  total: makeSelectStoryTotalNumber(),
  isStoryUpdate: makeSelectIsStoryUpdate(),
  isStart: makeSelectStoryStartStatus(),
  activeStory: makeSelectActiveStory(),
});

function mapDispatchToProps(dispatch: any) {
  return {
    onSetStoryList: (list: any) => dispatch(setStoryList(list)),
    onSetStoryTotal: (total: number) => dispatch(setStoryTotal(total)),
    onSetIsStoryUpdate: (status: boolean) => dispatch(setIsStoryUpdate(status)),
    onSetActiveStory: (story: any) => dispatch(setActiveStory(story)),
    onSetStoryStart: (status: boolean) => dispatch(setStoryStart(status)),
    onSetStartOver: (status: boolean) => dispatch(setStartOver(status)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(TitlesComponent);
