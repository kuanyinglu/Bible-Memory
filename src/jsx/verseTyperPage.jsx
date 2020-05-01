import React from 'react';
import ReactDOM from 'react-dom';
import { searchVerses, updateTyper, startFrom } from '../js/redux/actions';
import { connect } from 'react-redux';
import VerseTyper from './verseTyper/verseTyper';


class VerseTyperPage extends React.Component {
  constructor (props) {
    super(props);
    this.state = { lastDone: null };
    this.textAreas = {};
  }


  setRef (i, element) {
    this.textAreas[i] = element;
  };

  componentDidUpdate () {
    if (this.state.lastDone !== null) {
      if (typeof this.textAreas[this.state.lastDone + 1] !== 'undefined') {
        let dom = ReactDOM.findDOMNode(this.textAreas[this.state.lastDone + 1]);
        if (typeof dom !== 'undefined') {
          dom.focus();
          var tmpStr = dom.value;
          dom.value = "";
          dom.value = tmpStr;
        }
        this.setState({lastDone: null});
      } else {
        this.setState({lastDone: null});
      }
    }
  }

  render () {
    if (!this.props.appState.ready) {
      return <h2>Loading...</h2>;
    }
    return (
      <div className="practice wrapper">
        <h2>{this.props.appState.currentVerses}</h2>
        {
          (this.props.versesText.length > 0 && this.props.typerData.value.length > 0) ?
          <div>
          {
            this.props.versesText.map((verse, i) => {
              if (i > this.props.typerData.value.length - 1) {
                return null;
              } else {
                return <VerseTyper 
                  index={i} 
                  setRef={setRef} 
                  verse={verse} 
                  typerDataValue={this.props.typerData.value[i]} 
                  typerDataPrevValue={this.props.typerData.prevValue[i]}
                  settingsValues={this.props.settings.settingValues}/>;
              }
            })
          } 
          <div>
            <button className="action" onClick={() => this.props.startFrom(0)}>
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
}

const mapStateToProps = state => ({
  versesText: state.versesText,
  settings: state.settings,
  appState: state.appState,
  typerData: state.typerData
});

const mapDispatchToProps = dispatch => ({
  searchVerses: reference => dispatch(searchVerses(reference)),
  startFrom: verseIndex => dispatch(startFrom(verseIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseTyperPage);