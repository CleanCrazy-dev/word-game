import Portal from '../../Portal';
const PauseSaveModal = (props: {
  open: boolean;
  onCloseModal: any;
  onPauseSave: () => void;
}) => {
  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
          <div id="modal_pause" className="modal">
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 8,
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
                  className="title-label"
                >
                  Pausing story?
                </label>
              </span>
            </div>
            <div
              style={{
                margin: 10,
                border: '1px solid #AAA9A7',
                background: 'white',
                padding: 10,
                fontFamily: 'Arial, sans-serif',
                fontSize: 13,
                fontWeight: 400,
              }}
            >
              <div style={{paddingBottom: 4}}>
                Pausing your story will save it to your story list,so that you
                can
              </div>
              <div>return later and then either finish it or publish it.</div>
              <br />
              <div style={{marginTop: '-5px'}}>
                Do you wish to continue to pause and save your story?
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 26,
              }}
            >
              <div className="button button-pause" onClick={props.onCloseModal}>
                Cancel
              </div>
              <div className="button button-start" onClick={props.onPauseSave}>
                Yes
              </div>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default PauseSaveModal;
