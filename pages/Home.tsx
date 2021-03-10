import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {TopHeaderContainer} from '../components/Header';
import TopMenuComponent from '../components/Menu';
import PlayGroundComponent from '../components/PlayGround';
import Toast from '../components/Common/Toast';
import CreateStoryModal from '../components/Modal/CreateStoryModal';
import SequenceNumberModal from '../components/Modal/SequenceNumberModal';
import TimeToDoItModal from '../components/Modal/TimeToDoItModal';

import {makeSelectActiveModalId} from '../selectors';
import {setActiveModalId} from '../actions';
const Home = (props: {
  activeModalId: string;
  onSetActiveModalId: (activeModalId: '') => void;
}) => {
  return (
    <div>
      <Toast />
      <CreateStoryModal
        open={props.activeModalId === 'CREAT_STORY' ? true : false}
        onCloseModal={() => props.onSetActiveModalId('')}
      />

      <SequenceNumberModal
        open={props.activeModalId === 'SEQUENCE_NUMBER' ? true : false}
        onCloseModal={() => props.onSetActiveModalId('')}
      />
      <TimeToDoItModal
        open={props.activeModalId === 'TIME_TO_DO_IT' ? true : false}
        onCloseModal={() => props.onSetActiveModalId('')}
      />
      <TopHeaderContainer />
      <TopMenuComponent />
      <PlayGroundComponent />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  activeModalId: makeSelectActiveModalId(),
});
function mapDispatchToProps(dispatch: any) {
  return {
    onSetActiveModalId: (activeModalId: string) =>
      dispatch(setActiveModalId(activeModalId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect)(Home);
