import React from 'react';
import { loadSavedVerses, searchVerses } from '../js/redux/actions';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';
import parser from '../js/parser';
import store from './redux/store';


class VerseTyper extends React.Component {
  constructor (props) {
    super(props);
    this.state = { mode: this.props.versesText ? this.props.versesText.map(v => {return {};}) : "", value: "", previousValue: "" };
  }

  verseInputOnChange (e) {
    this.setState({ value: e.target.value, previousValue: this.state.value });
  }

  render () {
    return (
      <div>
        {
          this.props.versesText.map((verse, i) => {
            let args = { inputValue: this.state.value, previousValue: this.state.previousValue, verseText: verse.content, settings:  store.getState().settings };
            args.mode = parser.getMode(args);
            let css = parser.getCss(args);
            // let shownText = parser.getShownText(args);
            
            return (
              <div key={i}>
                <span>
                  <h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}</h3>
                  <span>
                    {verse.content}
                  </span>
                </span>
                <span>
                  <Textarea onChange={e => this.verseInputOnChange(e)}/>
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