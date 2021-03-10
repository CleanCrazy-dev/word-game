import Portal from '../../Portal';
const CreateStoryModal = (props: {open: boolean; onCloseModal: any}) => {
  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
          <div id="modal_create_story" className="modal">
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
                  Create your Story
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
              To create your story, chose the theme then the level you feel
              comfortable with, then press Go! The word sequence will then
              appear.
              <br />
              <br />
              If you don't like the words that are give to you, you can press
              the new sequence button to the right of the clowd. you can also
              comeback to the previous sequence if need be.
              <br />
              <br />
              Whether you decide to go with a funny story, a drama story, or
              even a horror story, let your imagination guide you, playing with
              words will have never been so much fun.
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

export default CreateStoryModal;
