import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { startFrom } from '../js/redux/actions';
import { connect } from 'react-redux';
import VerseTyper from './verseTyper/verseTyper';

const VerseTyperPage = ({ versesText, settings, appState, typerData, startFrom}) => {
  const textAreasRef = useRef([]);
  const [firstLoad, setFirstLoad] = useState(true);

  const setRef = (i, element) => {
    textAreasRef.current[i] = element;
    if (firstLoad) {
      focusTextAreas(appState.focusedTyper);
      setFirstLoad(false);
    }
  };

  useEffect(() => {
    if (appState.focusedTyper != null)
      focusTextAreas(appState.focusedTyper);
  }, [appState.focusedTyper])

  const focusTextAreas = (index) => {
    if (textAreasRef.current[index] != null) {
      let dom = ReactDOM.findDOMNode(textAreasRef.current[index]);
      if (dom != null) {
        dom.focus();
        var tmpStr = dom.value;
        dom.value = "";
        dom.value = tmpStr;
      }
    }
  }

  if (!appState.ready) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="practice wrapper">
      <h2>{appState.currentVerses}</h2>
      {
        (versesText.length > 0 && typerData.values.length > 0) ?
        <div>
          {
            versesText.map((verse, i) => {
              if (i > typerData.values.length - 1) {
                return null;
              } else {
                return <VerseTyper 
                  key={i}
                  index={i} 
                  setRef={setRef} 
                  focusTextAreas={focusTextAreas}
                  verse={verse} 
                  typerDataValue={typerData.values[i]} 
                  typerDataPrevValue={typerData.prevValues[i]}
                  typerState={typerData.states[i]}
                  settingsValues={settings.settingValues}/>;
              }
            })
          } 
          <div>
            <button className="action" onClick={() => startFrom(0)}>
              Memorize Again!
            </button>
          </div>
        </div> :
        <div>
          <h4>
            Please select a verse before practicing.
          </h4>
        </div>
      }
      <p aria-hidden="true">Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), copyright © 2001 by Crossway, a publishing ministry of Good News Publishers. Used by permission. All rights reserved. May not copy or download more than 500 consecutive verses of the ESV Bible or more than one half of any book of the ESV Bible.</p>
    </div>
    )
}

const mapStateToProps = state => ({
  versesText: state.versesText,
  settings: state.settings,
  appState: state.appState,
  typerData: state.typerData
});

const mapDispatchToProps = dispatch => ({
  startFrom: verseIndex => dispatch(startFrom(verseIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseTyperPage);