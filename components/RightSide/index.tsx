import React, {useState} from 'react';
import SubjectsComponent from './components/Subjects';
import ContentComponent from './components/Contents';
const RightSideContainer = () => {
  const [activeContent, setActiveContent] = useState('title');
  return (
    <div style={{width: '100%', position: 'relative',zIndex:5}}>
      <SubjectsComponent
        handleChangeActiveContent={setActiveContent}
        activeContent={activeContent}
      />
      <ContentComponent activeContent={activeContent} />
    </div>
  );
};

export default RightSideContainer;
