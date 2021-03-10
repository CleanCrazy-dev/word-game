/* eslint-disable prettier/prettier */
import React from 'react';

const TopMenuComponent = () => {
  return (
    <div className="top-nav-bar">
      <label>Options</label>
      <label className="menu-separator"></label>
      <label>Notifications</label>
      <label className="menu-separator"></label>
      <label> Help</label>
      <img
        className="avartar"
        src="static/images/avartar.jpg"
        alt=""
      />
      <label className="username">Michel Nardella </label>
    </div>
  );
};

export default TopMenuComponent;
