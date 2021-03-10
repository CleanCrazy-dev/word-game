import Portal from '../../Portal';
const TimeToDoItModal = (props: {open: boolean; onCloseModal: any}) => {
  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
          <div id="modal_create_story" className="modal" style = {{width:535,height:420}}>
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
                  Time to do it
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
                fontWeight: 500,
                lineHeight:1.5
              }}
            >
              Imaginaword gives you a recommended time to write your story. The
              timer will decrease until it indicates zero. Afterwards it will
              continue in the negative until you press publish. Giving you the
              excess amount of time it took you to finish your story.
              <br />
              Also your story can be donne in two steps. You can start to write
              it, then stop with the Pause/Save button, and continue again the
              next day. The timer automatically stops and continues from where
              you left off the day before.
              <br />
              <br />
              <div style = {{textAlign:'center',fontWeight:'bold'}}>Why the timer?</div>
              The timer is in place to help you keep track of how fast you are
              in creating stories with random words. The more you write stories,
              the faster your get.
              <br />
              The reason being if you enter the Imaginaword competitions, you
              will be able to write your stories in the recommended amount of
              time authorised during the competitions.
              <br/>
              <br/>
              <div style = {{color:'#ba1419'}}>
                IMPORTANT: The recommended amount of words to your story, for
                all themes and levels is 500 words. 500 words and less is a pre
                requisite for all competitions.
              </div>
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

export default TimeToDoItModal;
