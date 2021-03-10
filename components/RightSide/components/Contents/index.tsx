import React from 'react';
import TitlesComponent from './Titles';
import FavoriteStoriesComponent from './FavoriteStories';
import MessagesComponent from './Messages';
const ContentComponent = (props: {activeContent: string}) => {
  const {activeContent} = props;
  return (
    <div>
      {activeContent === 'title' && <TitlesComponent />}
      {activeContent === 'story' && <FavoriteStoriesComponent />}
      {activeContent === 'messages' && <MessagesComponent />}
    </div>
  );
};

export default ContentComponent;
