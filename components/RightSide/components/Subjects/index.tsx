import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';

import {makeSelectStoryTotalNumber} from '../../../../selectors';

const SubjectsComponent = (props: {
  handleChangeActiveContent: (activeContent: string) => void;
  activeContent: string;
  total: number;
}) => {
  const {handleChangeActiveContent} = props;
  return (
    <div
      className="story-panel subjects"
      style={{backgroundColor: '#ffffcc', height: 90}}
    >
      <div style={{width: '50%', padding: '10px 0px'}}>
        <div>
          <label className="story-panel subjects">
            <div
              className="story-panel"
              style={
                props.activeContent === 'title'
                  ? {justifyContent: 'flex-start'}
                  : {}
              }
            >
              <span
                style={
                  props.activeContent !== 'title'
                    ? {display: 'none'}
                    : {marginLeft: 10, display: 'flex', alignItems: 'center'}
                }
              >
                <img src="static/images/Forward.png" alt="" />
              </span>
              <div
                style={{
                  marginLeft: props.activeContent !== 'title' ? 36 : 10,
                }}
              >
                <span
                  style={{
                    color: '#00b7ef',
                    fontWeight:
                      props.activeContent === 'title' ? 'bold' : 'normal',
                  }}
                  className="middle-label"
                >
                  My titles
                </span>
                <span className="label-red-1 small-label subjects label">
                  ({props.total})
                </span>
              </div>
            </div>
            <div style={{marginRight: 50}} className="custom-radios">
              <div>
                <input
                  type="radio"
                  id="title"
                  name="color"
                  onChange={() => handleChangeActiveContent('title')}
                  defaultChecked={
                    props.activeContent === 'title' ? true : false
                  }
                />
                <label htmlFor="title">
                  <span>
                    <img
                      src="static/images/radio-1.png"
                      alt="Checked Icon"
                    />
                  </span>
                </label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label className="story-panel subjects">
            <div
              className="story-panel"
              style={
                props.activeContent === 'story'
                  ? {justifyContent: 'flex-start'}
                  : {}
              }
            >
              <span
                style={
                  props.activeContent !== 'story'
                    ? {display: 'none'}
                    : {marginLeft: 10, display: 'flex', alignItems: 'center'}
                }
              >
                <img src="static/images/Forward.png" alt="" />
              </span>
              <div
                style={{
                  marginLeft: props.activeContent !== 'story' ? 36 : 10,
                }}
              >
                <span
                  style={{
                    color: '#00b7ef',
                    fontWeight:
                      props.activeContent === 'story' ? 'bold' : 'normal',
                  }}
                  className="middle-label"
                >
                  My favorite stories
                </span>
                <span className="label-red-1 small-label subjects label">
                  (21)
                </span>
              </div>
            </div>
            <div style={{marginRight: 50}} className="custom-radios">
              <div>
                <input
                  type="radio"
                  id="story"
                  name="color"
                  onChange={() => handleChangeActiveContent('story')}
                />
                <label htmlFor="story">
                  <span>
                    <img
                      src="static/images/radio-1.png"
                      alt="Checked Icon"
                    />
                  </span>
                </label>
              </div>
            </div>
          </label>
        </div>
        <div>
          <label className="story-panel subjects">
            <div
              className="story-panel"
              style={
                props.activeContent === 'messages'
                  ? {justifyContent: 'flex-start'}
                  : {}
              }
            >
              <span
                style={
                  props.activeContent !== 'messages'
                    ? {display: 'none'}
                    : {marginLeft: 10, display: 'flex', alignItems: 'center'}
                }
              >
                <img src="static/images/Forward.png" alt="" />
              </span>
              <div
                style={{
                  marginLeft: props.activeContent !== 'messages' ? 36 : 10,
                }}
              >
                <span
                  style={{
                    color: '#00b7ef',
                    fontWeight:
                      props.activeContent === 'messages' ? 'bold' : 'normal',
                  }}
                  className="middle-label"
                >
                  Notifications / messages
                </span>
                <span className="label-red-1 small-label subjects label">
                  (16)
                </span>
              </div>
            </div>
            <div style={{marginRight: 50}} className="custom-radios">
              <div className="custom-radios">
                <div>
                  <input
                    type="radio"
                    id="messages"
                    name="color"
                    onChange={() => handleChangeActiveContent('messages')}
                  />
                  <label htmlFor="messages">
                    <span>
                      <img
                        src="static/images/radio-1.png"
                        alt="Checked Icon"
                      />
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </label>
        </div>
      </div>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <img
          src="static/images/Notes.gif"
          alt=""
          style={{width: 45, marginRight: 15}}
        />
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  total: makeSelectStoryTotalNumber(),
});

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect)(SubjectsComponent);
