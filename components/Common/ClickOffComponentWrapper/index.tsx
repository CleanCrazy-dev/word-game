import React, {useEffect, useState} from 'react';

const ClickOffComponentWrapper = (props: {
  onOuterClick: any;
  className?: any;
  children?: any;
  nestedModals?: any;
}) => {
  const {className, children, nestedModals} = props;
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
  });
  const [wrapperRef, setWrapperRef] = useState(null);
  const handleClickOutside = (event: {target: any}) => {
    if (wrapperRef && !wrapperRef.contains(event.target)) {
      if (nestedModals) {
        return;
      }
      if (!props.onOuterClick) {
        return;
      }
      props.onOuterClick(event);
    }
  };
  return (
    <div className={className} ref={node => setWrapperRef(node)}>
      {children}
    </div>
  );
};
export default ClickOffComponentWrapper;
