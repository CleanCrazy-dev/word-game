import Portal from '../../Portal';
import ClickOffComponentWrapper from '../../Common/ClickOffComponentWrapper';
const PublishModal = (props: {
  open: boolean;
  onCloseModal: any;
  activeFormat: string;
  handleChangeActiveFormat: (activeFormat: string) => void;
  handlePublish:() => void;
}) => {
  const {handleChangeActiveFormat,handlePublish} = props;
  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
          {/* <ClickOffComponentWrapper
            {...props}
            onOuterClick={props.onCloseModal}
          > */}
            <div id="modal_publish" className="modal">
              <div>
                <label
                  className="story-panel subjects"
                  style={{marginLeft: 30, marginTop: 30}}
                >
                  <div
                    className="story-panel"
                    style={
                      props.activeFormat === 'ALL_FRIENDS'
                        ? {justifyContent: 'flex-start'}
                        : {}
                    }
                  >
                    <span
                      style={
                        props.activeFormat !== 'ALL_FRIENDS'
                          ? {display: 'none'}
                          : {
                              display: 'flex',
                              alignItems: 'center',
                            }
                      }
                    >
                      <img src="static/images/Forward.png" alt="" />
                    </span>
                    <div
                      style={{
                        marginLeft:
                          props.activeFormat !== 'ALL_FRIENDS' ? 21 : 5,
                      }}
                    >
                      <span
                        style={{
                          color: '#00b7ef',
                          fontWeight:
                            props.activeFormat === 'ALL_FRIENDS'
                              ? 'bold'
                              : 'normal',
                        }}
                        className="large-label"
                      >
                        Publish to all my friends
                      </span>
                    </div>
                  </div>
                  <div
                    style={{position: 'absolute', right: 25}}
                    className="custom-radios"
                  >
                    <div>
                      <input
                        type="radio"
                        id="radio-all-friends"
                        name="PublishFormat"
                        onChange={() => handleChangeActiveFormat('ALL_FRIENDS')}
                        defaultChecked={
                          props.activeFormat === 'ALL_FRIENDS' ? true : false
                        }
                      />
                      <label htmlFor="radio-all-friends">
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
                <label
                  className="story-panel subjects"
                  style={{marginLeft: 30, marginTop: 10}}
                >
                  <div
                    className="story-panel"
                    style={
                      props.activeFormat === 'PRIVATE_FRIENDS'
                        ? {justifyContent: 'flex-start'}
                        : {}
                    }
                  >
                    <span
                      style={
                        props.activeFormat !== 'PRIVATE_FRIENDS'
                          ? {display: 'none'}
                          : {
                              display: 'flex',
                              alignItems: 'center',
                            }
                      }
                    >
                      <img src="static/images/Forward.png" alt="" />
                    </span>
                    <div
                      style={{
                        marginLeft:
                          props.activeFormat !== 'PRIVATE_FRIENDS' ? 21 : 5,
                      }}
                    >
                      <span
                        style={{
                          color: '#00b7ef',
                          fontWeight:
                            props.activeFormat === 'PRIVATE_FRIENDS'
                              ? 'bold'
                              : 'normal',
                        }}
                        className="large-label"
                      >
                        Publish to all my
                      </span>
                      &nbsp;private&nbsp;
                      <span
                        style={{
                          color: '#00b7ef',
                          fontWeight:
                            props.activeFormat === 'PRIVATE_FRIENDS'
                              ? 'bold'
                              : 'normal',
                        }}
                        className="large-label"
                      >
                        friends only
                      </span>
                    </div>
                  </div>
                  <div
                    style={{position: 'absolute', right: 25}}
                    className="custom-radios"
                  >
                    <div>
                      <input
                        type="radio"
                        id="radio-private-friends"
                        name="PublishFormat"
                        onChange={() =>
                          handleChangeActiveFormat('PRIVATE_FRIENDS')
                        }
                      />
                      <label htmlFor="radio-private-friends">
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
                <label
                  className="story-panel subjects"
                  style={{marginLeft: 30, marginTop: 10}}
                >
                  <div
                    className="story-panel"
                    style={
                      props.activeFormat === 'PUBLIC_IMAGINAWORD'
                        ? {justifyContent: 'flex-start'}
                        : {}
                    }
                  >
                    <span
                      style={
                        props.activeFormat !== 'PUBLIC_IMAGINAWORD'
                          ? {display: 'none'}
                          : {
                              display: 'flex',
                              alignItems: 'center',
                            }
                      }
                    >
                      <img src="static/images/Forward.png" alt="" />
                    </span>
                    <div
                      style={{
                        marginLeft:
                          props.activeFormat !== 'PUBLIC_IMAGINAWORD' ? 21 : 5,
                      }}
                    >
                      <span
                        style={{
                          color: '#00b7ef',
                          fontWeight:
                            props.activeFormat === 'PUBLIC_IMAGINAWORD'
                              ? 'bold'
                              : 'normal',
                        }}
                        className="large-label"
                      >
                        Publish publically on &nbsp;
                        <span style={{color: '#cc00ff'}}>I</span>
                        <span style={{color: '#D323FF'}}>m</span>
                        <span style={{color: '#FF0E0E'}}>a</span>
                        <span style={{color: '#0CA753'}}>g</span>
                        <span style={{color: '#FF9900'}}>i</span>
                        <span style={{color: '#AA1231'}}>n</span>
                        <span style={{color: '#FF0404'}}>a</span>
                        <span style = {{color:'black'}}>word</span>
                      </span>
                    </div>
                  </div>
                  <div
                    style={{position: 'absolute', right: 25}}
                    className="custom-radios"
                  >
                    <div>
                      <input
                        type="radio"
                        id="radio-public-imaginaword"
                        name="PublishFormat"
                        onChange={() =>
                          handleChangeActiveFormat('PUBLIC_IMAGINAWORD')
                        }
                      />
                      <label htmlFor="radio-public-imaginaword">
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <div className="button button-pause" onClick = {(e)=>props.onCloseModal(e)}>Cancel</div>
                <div className="button button-publish" onClick = {handlePublish}>Publish</div>
              </div>
            </div>
          {/* </ClickOffComponentWrapper> */}
        </div>
      )}
    </Portal>
  );
};

export default PublishModal;
