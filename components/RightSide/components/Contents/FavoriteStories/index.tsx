import React from 'react';

const FavoriteStoriesComponent = () => {
  return (
    <React.Fragment>
      <div className="table">
        <div className="row">
          <div className="cell header-cell">
            <div className="table">
              <div className="header">
                <div className="cell">&nbsp;&nbsp;My favorite stories (21)</div>
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
                {[0, 1, 2, 3, 4, 5, 6, 78, 9].map(item => {
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
                            <div className="lable-red-1">
                              Beauty and the dark queen
                            </div>
                            <div>
                              <span className="lable-red-1 small-label">
                                Author: Charles Cantori
                              </span>
                              <span className="dot"></span>
                            </div>
                            <div>
                              <span
                                className="label-blue-2 small-label"
                                style={{width: '50%', display: 'inline-block'}}
                              >
                                Rd:888997
                              </span>
                              <span
                                className="label-green small-label"
                                style={{width: '50%'}}
                              >
                                Likes:34569
                              </span>
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
                            <div className="lable-red-1">
                              Beauty and the dark queen
                            </div>
                            <div>
                              <span className="lable-red-1 small-label">
                                Author: Charles Cantori
                              </span>
                              <span className="dot"></span>
                            </div>
                            <div>
                              <span
                                className="label-blue-2 small-label"
                                style={{width: '50%', display: 'inline-block'}}
                              >
                                Rd:888997
                              </span>
                              <span
                                className="label-green small-label"
                                style={{width: '50%'}}
                              >
                                Likes:34569
                              </span>
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
        <div className="button button-share small-button">S</div>
        <div className="button button-delete small-button">D</div>
        <div className="button small-button" style={{height: 25}}>
          <img
            src="static/images/FriendsButton.png"
            alt=""
            style={{height: 27}}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default FavoriteStoriesComponent;
