import React from 'react';
import ReactDOM from 'react-dom';
import { searchVerses, updateTyper, startFrom } from '../js/redux/actions';
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
    if (e.target.value.trim().length !== 0 && this.props.typerData.value[i].length > 0) {
      args.inputValue = e.target.value;
      args.previousValue = this.props.typerData.value[i];
      args.mode = parser.getMode(args);
      let newValue = parser.getText(args);
  
      //Mode can change after the new value because the value can change
      args.inputValue = newValue;
      this.setState({ lastDone: parser.getMode(args) === "DONE" ? i : null });
      this.props.updateData(i, newValue);
    }
  }

  setRef (i, element) {
    this.textAreas[i] = element;
  };

  static getDerivedStateFromProps(props, state) {
    let loadedVerses = props.versesText.length !== 0 && props.versesText.filter(v => v.id === 0)[0].reference === props.currentVerses;
    if (loadedVerses && state.verses !== props.currentVerses) {
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
    return (
      <div className="practice wrapper">
        <h2>{this.props.currentVerses}</h2>
        {
          (this.props.versesText.length > 0 && this.props.typerData.value.length > 0) ?
          <div>
          {
            this.props.versesText.map((verse, i) => {
              if (i > this.props.typerData.value.length - 1) {
                return null;
              }
              let args = { inputValue: this.props.typerData.value[i], previousValue: this.props.typerData.prevValue[i], verseText: verse.content, settings: this.props.settings.settingValues };
              //parser.processVerse(args);
              args.mode = args.inputValue === null ? "DONE" : parser.getMode(args);
              let css = args.inputValue === null ? "" : parser.getCss(args);
              
              return (
                <div className="verse wrapper" key={i}>
                  <div>
                    <label htmlFor={"verse-" + i} aria-label={verse.title ? verse.title : verse.chapter + ":" + verse.verse}>
                      <h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}
                      </h3>
                    </label>
                    <div className="practice-box">
                      { (args.settings.practiceMode || args.mode === "DONE") ? verse.content : null }
                      { args.settings.practiceMode ? <hr/> : null }
                      { args.mode !== "DONE" && args.inputValue !== null ? 
                        <Textarea 
                          id={"verse-" + i} 
                          ref={element => this.setRef(i, element)} 
                          className={css} onChange={e => this.verseInputOnChange(args, i, e)} 
                          value={this.props.typerData.value[i]} 
                          autoFocus={i === 0} 
                          onFocus={e => {
                            let val = e.target.value;
                            e.target.value = '';
                            e.target.value = val;
                          }
                        }/> : 
                        null }
                    </div>
                  </div>
                  <div>
                    <button className="action" onClick={() => this.props.startFrom(i)}>
                      Memorize From Here
                    </button>
                  </div>
                </div>
              );
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
  currentVerses: state.currentVerses,
  typerData: state.typerData
});

const mapDispatchToProps = dispatch => ({
  searchVerses: reference => dispatch(searchVerses(reference)),
  updateData: (id, value) => dispatch(updateTyper(id, value)),
  startFrom: verseIndex => dispatch(startFrom(verseIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseTyper);