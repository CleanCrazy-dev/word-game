import Portal from '../../Portal';
const ShareModal = (props: {
  open: boolean;
  onCloseModal: any;
  activeFormat: string;
  handleChangeActiveFormat: (activeFormat: string) => void;
  handleShare:() => void;
}) => {
  const {handleChangeActiveFormat,handleShare} = props;
  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
            <div id="modal_publish" className="modal" style = {{backgroundColor:'#EDF7F9'}}>
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
                        Share with all my friends
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
                        Share with my
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
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 30,
                }}
              >
                <div className="button button-pause" onClick = {(e)=>props.onCloseModal(e)}>Annuler</div>
                <div className="button button-share" onClick = {handleShare}>Share</div>
              </div>
            </div>
        </div>
      )}
    </Portal>
  );
};

export default ShareModal;
