import ReactDOM from 'react-dom';

const Portal = (props: {selector: any; children: any}) => {
  let container: any;
  if (typeof window !== 'undefined') {
    const parentElem = document.querySelector(props.selector);
    container = parentElem;
  }
  return container ? ReactDOM.createPortal(props.children, container) : null;
};
export default Portal;
