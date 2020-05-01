import React from 'react';
import Textarea from 'react-textarea-autosize';
import { getTargetText } from '../../js/typerExtensions/typerUtils';
import { updateTyper, startFrom } from '../../js/redux/actions';
import { connect } from 'react-redux';
import parser from '../../js/parser';

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

const VerseTyper = ({ index, verse, setRef, typerDataValue, typerDataPrevValue, settingsValues, startFrom, updateData }) => {
  let args = { inputValue: typerDataValue, previousValue: typerDataPrevValue, verseText: verse.content, settings: settingsValues };
  let parserOutput = parser.getResult(args);
  args.mode = args.inputValue === null ? "DONE" : parserOutput.mode;
  let css = args.inputValue === null ? "" : parserOutput.css;

  let verseInputOnChange = (args, i, e) => {
    if (e.target.value.trim().length !== 0 || args.inputValue.length > 0) {
      args.inputValue = e.target.value;
      args.previousValue = args.inputValue;
      let parserOutput = parser.getResult(args);
      args.mode = parserOutput.mode;
      let newValue = parserOutput.newText;
  
      //Mode can change after the new value because the value can change
      args.inputValue = newValue;
      parserOutput = parser.getResult(args);
      // this.setState({ lastDone: parserOutput.mode === "DONE" ? i : null });
      updateData(i, newValue);
    }
  }
  
  return (
    <div className="verse wrapper" key={index}>
      <div>
        <label htmlFor={"verse-" + index} aria-label={verse.title ? verse.title : verse.chapter + ":" + verse.verse}>
          <h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}
          </h3>
        </label>
        <div className="practice-box">
          { (args.settings.practiceMode || args.mode === "DONE") ? verse.content : null }
          { args.settings.practiceMode ? <hr/> : null }
          { args.mode !== "DONE" && args.inputValue !== null ? 
            <>
              <div id={"hint-box-" + index} className={"hint-box-container hide"}>
                <div className="hint-box-content">
                  {getTargetText(args, args.inputValue)}
                </div>
              </div>
              <Textarea 
                id={"verse-" + index} 
                ref={element => setRef(index, element)} 
                className={css} onChange={e => verseInputOnChange(args, index, e)} 
                value={typerDataValue} 
                autoFocus={index === 0} 
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