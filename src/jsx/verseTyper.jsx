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
    this.state = { mode: this.props.versesText ? this.props.versesText.map(v => {return {};}) : "", value: this.props.versesText.map(() => ""), previousValue: this.props.versesText.map(() => ""), lastDone: null };
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

  componentDidUpdate () {
    if (this.state.lastDone !== null) {
      if (typeof this.textAreas[this.state.lastDone + 1] !== 'undefined') {
        ReactDOM.findDOMNode(this.textAreas[this.state.lastDone + 1]).focus();
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
          this.props.versesText.length > 0 ?
          this.props.versesText.map((verse, i) => {
            let args = { inputValue: this.state.value[i], previousValue: this.state.previousValue[i], verseText: verse.content, settings: store.getState().settings };
            //parser.processVerse(args);
            args.mode = parser.getMode(args);
            let css = parser.getCss(args);
            
            return (
              <div className="verse wrapper" key={i}>
                <div>
                  <h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}</h3>
                  <div className="practice-box">
                    { args.settings.practiceMode ? verse.content : null }
                    { args.settings.practiceMode ? <hr/> : null }
                    { args.mode !== "DONE" ? <Textarea ref={element => this.setRef(i, element)} className={css} onChange={e => this.verseInputOnChange(args, i, e)} value={this.state.value[i]} autoFocus={i === 0}/> : null }
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