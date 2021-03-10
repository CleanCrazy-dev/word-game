import React from 'react';

const MessagesComponent = () => {
  return (
    <React.Fragment>
      <div className="table">
        <div className="row">
          <div className="cell header-cell">
            <div className="table">
              <div className="header">
                <div className="cell">
                  <select
                    style={{
                      width: '43%',
                      height: '25px',
                      background: '#FFC20E',
                      color: '#964c03',
                    }}
                  >
                    <option>Option1</option>
                    <option>Option2</option>
                    <option>Option3</option>
                  </select>
                  &nbsp;(16)
                </div>
                <div className="cell" style={{width: '10%', paddingLeft: 10}}>
                  <div className="arrow-down"></div>
                </div>
                <div className="cell" style={{width: '10%'}}>
                  <div className="arrow-down"></div>
                </div>
                <div className="cell" style={{width: '10%'}}></div>
                <div className="cell" style={{width: '10%'}}>
                  <div className="arrow-down"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="cell">
            <div style={{height: 535, overflowY: 'scroll'}}>
              <div className="table">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => {
                  return (
                    <>
                      <div className="row odd">
                        <div
                          className="cell"
                          style={{
                            display: 'flex',
                            paddingLeft: 10,
                          }}
                        >
                          <div
                            style={{
                              marginTop: 10,
                              marginBottom: 4,
                              marginRight: 20,
                            }}
                          >
                            <img
                              src="static/images/BlankWoman.png"
                              alt=""
                              style={{width: 41, height: 41}}
                            />
                          </div>
                          <div>
                            <div>
                              <div className="lable-red-1">Chow mein girl</div>
                              <div>
                                <span className="lable-red-3 small-label">
                                  Marion Tremblay
                                </span>
                                <span className="dot"></span>
                              </div>
                              <div className="label-blue-2 small-label">
                                Published?: 15hours ago
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className="cell"
                          style={{
                            position: 'relative',
                            width: '10%',
                            paddingLeft: 15,
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
                            <img src="static/images/Bubble.png" alt="" />
                          </div>
                        </div>
                        <div
                          className="cell lable-red-1"
                          style={{width: '10%', position: 'relative'}}
                        >
                          <div style={{position: 'absolute', top: 1}}>Adv</div>
                        </div>

                        <div
                          className="cell lable-red-1"
                          style={{
                            width: '10%',
                            paddingLeft: 10,
                            verticalAlign: 'middle',
                          }}
                        >
                          <img src="static/images/Modify.png" alt="" />
                        </div>
                        <div
                          className="cell lable-red-1"
                          style={{
                            width: '10%',
                            paddingLeft: 10,
                            verticalAlign: 'middle',
                          }}
                        >
                          <img src="static/images/AmieGris.png" alt="" />
                        </div>
                      </div>
                      <div className="row">
                        <div
                          className="cell"
                          style={{
                            display: 'flex',
                            paddingLeft: 10,
                          }}
                        >
                          <div
                            style={{
                              marginTop: 10,
                              marginBottom: 4,
                              marginRight: 20,
                            }}
                          >
                            <img
                              src="static/images/BlankWoman.png"
                              alt=""
                              style={{width: 41, height: 41}}
                            />
                          </div>
                          <div>
                            <div className="lable-red-1">Louis Jolicoeur</div>
                            <div>
                              <span className="lable-red-3 small-label">
                                Antonio Nadella
                              </span>
                              <span className="dot"></span>
                            </div>
                            <div className="label-blue-2 small-label">
                              Recommends this title
                            </div>
                          </div>
                        </div>
                        <div
                          className="cell"
                          style={{
                            position: 'relative',
                            width: '10%',
                            paddingLeft: 15,
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
                            <img src="static/images/Bubble.png" alt="" />
                          </div>
                        </div>
                        <div
                          className="cell lable-red-1"
                          style={{width: '10%', position: 'relative'}}
                        >
                          <div style={{position: 'absolute', top: 1}}>Adv</div>
                        </div>

                        <div
                          className="cell lable-red-1"
                          style={{
                            width: '10%',
                            paddingLeft: 10,
                            verticalAlign: 'middle',
                          }}
                        >
                          <img src="static/images/Modify.png" alt="" />
                        </div>
                        <div
                          className="cell lable-red-1"
                          style={{
                            width: '10%',
                            paddingLeft: 10,
                            verticalAlign: 'middle',
                          }}
                        >
                          <img
                            src="static/images/User group.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table-footer">
        <div className="button button-delete small-button">S</div>
        <div className="button button-start small-button">A</div>
        <div className="button small-button" style={{height: 25}}>
          <img
            src="static/images/FriendsButton.png"
            style={{height: 27}}
            alt=""
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MessagesComponent;
