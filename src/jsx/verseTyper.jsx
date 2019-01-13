import React from 'react';
import { loadSavedVerses, searchVerses } from '../js/redux/actions';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import parser from '../js/parser';
import store from '../js/redux/store';


class VerseTyper extends React.Component {
  constructor (props) {
    super(props);
    this.state = { mode: this.props.versesText ? this.props.versesText.map(v => {return {};}) : "", value: this.props.versesText.map(() => ""), previousValue: this.props.versesText.map(() => "") };
  }

  verseInputOnChange (args, i, e) {
    args.inputValue = e.target.value;
    args.previousValue = this.state.value[i];
    args.mode = parser.getMode(args);
    let newValue = parser.getText(args);
    this.setState({ value: this.state.value.map((value, j) => i === j ? newValue : value), previousValue: this.state.value });
  }

  render () {
    return (
      <div>
        {
          this.props.versesText.map((verse, i) => {
            let args = { inputValue: this.state.value[i], previousValue: this.state.previousValue[i], verseText: verse.content, settings: store.getState().settings };
            parser.processVerse(args);
            args.mode = parser.getMode(args);
            let css = parser.getCss(args);
            
            return (
              <div key={i}>
                <span>
                  <h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}</h3>
                  <span>
                    { args.settings.practiceMode ? verse.content : null }
                    { args.settings.practiceMode ? <br/> : null }
                    { args.mode !== "DONE" ? <Textarea className={css} onChange={e => this.verseInputOnChange(args, i, e)} value={this.state.value[i]}/> : null }
                  </span>
                </span>
                <span>
                </span>
              </div>
            );
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  versesText: state.versesText,
  settings: state.settings
});

const mapDispatchToProps = dispatch => ({
  loadSavedVerses: () => dispatch(loadSavedVerses()),
  searchVerses: reference => dispatch(searchVerses(reference))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseTyper);