import React, {useState, useEffect, useRef} from 'react';
import Portal from '../../Portal';

const LetterModal = (props: {
  open: boolean;
  onCloseModal: any;
  onSaveSelectedLetter: (sLetter: string) => void;
}) => {
  const [selectedLetter, setSelectedLetter] = useState('');
  const handleSelectLetter = (letter: string) => {
    setSelectedLetter(letter);
  };
  return (
    <Portal selector="#modal">
      {props.open && (
        <div className="overlay">
          <div
            id="modal_create_story"
            className="modal"
            style={{height: 236, width: 550}}
          >
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
                  Choose the letter desired
                </label>
              </span>
            </div>
            <div
              style={{
                margin: 10,
                padding: 10,
                fontFamily: 'Comic Sans MS,Comic Sans, cursive',
                fontSize: 32,
                fontWeight: 'bold',
              }}
            >
              <div>
                {[
                  'A',
                  'B',
                  'C',
                  'D',
                  'E',
                  'F',
                  'G',
                  'H',
                  'I',
                  'J',
                  'K',
                  'L',
                  'M',
                ].map((item, index) => {
                  return (
                    <span
                      style={{
                        border: '1px solid #AAA9A7',
                        background: 'white',
                        display: 'inline-block',
                        width: 37,
                        textAlign: 'center',
                      }}
                      key={`${index}-${item}`}
                      onClick={() => handleSelectLetter(item)}
                    >
                      {item}
                    </span>
                  );
                })}
              </div>
              <div>
                {[
                  'N',
                  'O',
                  'P',
                  'Q',
                  'R',
                  'S',
                  'T',
                  'U',
                  'V',
                  'W',
                  'X',
                  'Y',
                  'Z',
                ].map((item, index) => {
                  return (
                    <span
                      style={{
                        border: '1px solid #AAA9A7',
                        background: 'white',
                        display: 'inline-block',
                        width: 37,
                        textAlign: 'center',
                      }}
                      key={`${index}-${item}`}
                      onClick={() => handleSelectLetter(item)}
                    >
                      {item}
                    </span>
                  );
                })}
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
              <div
                className="button button-start"
                onClick={()=>props.onSaveSelectedLetter(selectedLetter)}
              >
                Select
              </div>
            </div>
          </div>
        </div>
      )}
    </Portal>
  );
};

export default LetterModal;
