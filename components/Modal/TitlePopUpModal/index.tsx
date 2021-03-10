import Portal from '../../Portal';
import ClickOffComponentWrapper from '../../Common/ClickOffComponentWrapper';
const TitlePopUpModal = (props: {
  open: boolean;
  onCloseModal: any;
  onSaveTitleName: () => void;
  handleChangeTitle:(e:any) => void;
}) => {

  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
          {/* <ClickOffComponentWrapper
            {...props}
            onOuterClick={props.onCloseModal}
          > */}
            <div id="modal_create" className="modal">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 20,
                }}
              >
                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <img src="static/images/Forward.png" alt="" />

                  <label
                    style={{
                      color: '#00b7ef',
                      marginLeft: 5,
                    }}
                    className="large-label"
                  >
                    Title of your story
                  </label>
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 20,
                }}
              >
                <input type="text" style={{width: '70%'}} onChange = {(e) => props.handleChangeTitle(e)}/>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginTop: 70,
                }}
              >
                <div
                  className="button button-pause"
                  onClick={props.onCloseModal}
                >
                  Cancel
                </div>
                <div
                  className="button button-start"
                  onClick={props.onSaveTitleName}
                >
                  Save
                </div>
              </div>
            </div>
          {/* </ClickOffComponentWrapper> */}
        </div>
      )}
    </Portal>
  );
};

export default TitlePopUpModal;
