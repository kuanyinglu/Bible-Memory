import React from 'react';
import Textarea from 'react-textarea-autosize';
import { updateTyper, startFrom } from '../../js/redux/actions';
import { connect } from 'react-redux';

const showHint = (e, index) => {
  if (e.keyCode === 17) {
    let element = document.getElementById("hint-box-" + index);
    element.classList.remove("hidden");
  }
}

const hideHint = (e, index) => {
  if (e.keyCode === 17) {
    let element = document.getElementById("hint-box-" + index);
    element.classList.add("hidden");
  }
}

const VerseTyper = ({ index, verse, setRef, typerDataValue, typerState, settingsValues, startFrom, updateData }) => {
  let verseInputOnChange = (i, e) => {
    updateData(i, e.target.value);
  }
  
  return (
    <div className="verse ml-4 my-4" key={index}>
      <div>
        <label htmlFor={"verse-" + index} aria-label={verse.title ? verse.title : verse.chapter + ":" + verse.verse}>
          <h3 className="my-1">{verse.title ? verse.title : verse.chapter + ":" + verse.verse}
          </h3>
        </label>
        <div className="w-11/12 mb-2">
          { (settingsValues.practiceMode || typerState.mode === "DONE") ? verse.content : null }
          { settingsValues.practiceMode ? <hr/> : null }
          { typerState.mode !== "DONE" ? 
            <>
              <div id={"hint-box-" + index} className={"absolute hidden"}>
                <div className="hint">
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