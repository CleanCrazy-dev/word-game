import Portal from '../../Portal';
const SequenceNumberModal = (props: {open: boolean; onCloseModal: any}) => {
  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
          <div id="modal_create_story" className="modal" style = {{height:193}}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 15,
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
                  Sequence Number
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
              The sequence number is used as a reference between uses so that.
             you can share and use the same words to create different stories.
             <br/>
             <br/>
             Giving you the possibility to compare stories with the same words used.
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 26,
              }}
            >
              <div className="button button-start" onClick={props.onCloseModal}>
                Ok
              </div>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default SequenceNumberModal;
