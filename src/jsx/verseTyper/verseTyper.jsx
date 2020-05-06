import React from 'react';
import Textarea from 'react-textarea-autosize';
import { updateTyper, startFrom } from '../../js/redux/actions';
import { connect } from 'react-redux';

const showHint = (e, index) => {
  if (e.keyCode === 17) {
    let element = document.getElementById("hint-box-" + index);
    element.classList.remove("hide");
  }
}

const hideHint = (e, index) => {
  if (e.keyCode === 17) {
    let element = document.getElementById("hint-box-" + index);
    element.classList.add("hide");
  }
}

const VerseTyper = ({ index, verse, setRef, typerDataValue, typerState, settingsValues, startFrom, updateData }) => {
  let verseInputOnChange = (i, e) => {
    updateData(i, e.target.value);
  }
  
  return (
    <div className="verse wrapper" key={index}>
      <div>
        <label htmlFor={"verse-" + index} aria-label={verse.title ? verse.title : verse.chapter + ":" + verse.verse}>
          <h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}
          </h3>
        </label>
        <div className="practice-box">
          { (settingsValues.practiceMode || typerState.mode === "DONE") ? verse.content : null }
          { settingsValues.practiceMode ? <hr/> : null }
          { typerState.mode !== "DONE" ? 
            <>
              <div id={"hint-box-" + index} className={"hint-box-container hide"}>
                <div className="hint-box-content">
                  {typerState.hint}
                </div>
              </div>
              <Textarea 
                id={"verse-" + index} 
                ref={element => setRef(index, element)} 
                className={typerState.css} onChange={e => verseInputOnChange(index, e)} 
                value={typerDataValue}
                onFocus={e => {
                  let val = e.target.value;
                  e.target.value = '';
                  e.target.value = val;
                }}
                onKeyDown={e => showHint(e, index)}
                onKeyUp={e => hideHint(e, index)}/>
            </> : 
            null }
        </div>
      </div>
      <div>
        <button className="action" onClick={() => startFrom(index)}>
          Memorize From Here
        </button>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  updateData: (id, value) => dispatch(updateTyper(id, value)),
  startFrom: verseIndex => dispatch(startFrom(verseIndex))
});

export default connect(null, mapDispatchToProps)(VerseTyper);