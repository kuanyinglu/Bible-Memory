import React from 'react';
import ReactDOM from 'react-dom';
import { loadSavedVerses, searchVerses } from '../js/redux/actions';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import parser from '../js/parser';
import store from '../js/redux/store';


class VerseTyper extends React.Component {
  constructor (props) {
    super(props);
    this.state = { lastDone: null };
    this.textAreas = {};
  }

  verseInputOnChange (args, i, e) {
    args.inputValue = e.target.value;
    args.previousValue = this.state.value[i];
    args.mode = parser.getMode(args);
    let newValue = parser.getText(args);

    //Mode can change after the new value because the value can change
    args.inputValue = newValue;
    let newValueList = this.state.value.map((value, j) => i === j ? newValue : value);
    this.setState({ value: newValueList, previousValue: this.state.value, lastDone: parser.getMode(args) === "DONE" ? i : null });
  }

  setRef (i, element) {
    this.textAreas[i] = element;
  };

  static getDerivedStateFromProps(props, state) {
    if (props.versesText.length !== 0 && props.currentVerses !== props.versesText.filter(v => v.id === 0)[0].reference)) {
      return { verses: props.currentVerses, mode: props.versesText.map(v => {return {};}), value: props.versesText.map(() => ""), previousValue: props.versesText.map(() => "") };
    }
    return null;
  }

  componentDidUpdate () {
    if (this.state.lastDone !== null) {
      if (typeof this.textAreas[this.state.lastDone + 1] !== 'undefined') {
        let dom = ReactDOM.findDOMNode(this.textAreas[this.state.lastDone + 1]);
        if (typeof dom !== 'undefined') {
          dom.focus();
        }
        this.setState({lastDone: null});
      } else {
        this.setState({lastDone: null});
      }
    }
  }

  render () {
    return (
      <div className="practice wrapper">
        <h2>{this.props.currentVerses}</h2>
        {
          (this.props.versesText.length > 0 && this.props.versesText.length === this.state.value.length) ?
          this.props.versesText.map((verse, i) => {
            let args = { inputValue: this.state.value[i], previousValue: this.state.previousValue[i], verseText: verse.content, settings: store.getState().settings };
            //parser.processVerse(args);
            args.mode = parser.getMode(args);
            let css = parser.getCss(args);
            
            return (
              <div className="verse wrapper" key={i}>
                <div>
                  <label htmlFor={"verse-" + i} aria-label={verse.title ? verse.title : verse.chapter + ":" + verse.verse}><h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}</h3></label>
                  <div className="practice-box">
                    { (args.settings.practiceMode || args.mode === "DONE") ? verse.content : null }
                    { args.settings.practiceMode ? <hr/> : null }
                    { args.mode !== "DONE" ? <Textarea id={"verse-" + i} ref={element => this.setRef(i, element)} className={css} onChange={e => this.verseInputOnChange(args, i, e)} value={this.state.value[i]} autoFocus={i === 0}/> : null }
                  </div>
                </div>
              </div>
            );
          }) :
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
  currentVerses: state.currentVerses
});

const mapDispatchToProps = dispatch => ({
  loadSavedVerses: () => dispatch(loadSavedVerses()),
  searchVerses: reference => dispatch(searchVerses(reference))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseTyper);