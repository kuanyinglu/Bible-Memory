import React from 'react';
import { loadSavedVerses, searchVerses } from '../js/redux/actions';
import { connect } from 'react-redux';
import Textarea from 'react-textarea-autosize';

class VerseTyper extends React.Component {
  constructor (props) {
    super(props);
    this.state = { mode: "" };//
  }

  verseInputOnChange (e) {
    this.setState({ referenceText: e.target.value });
  }

  render () {
    return (
      <div>
        {
          this.props.versesText.map((verse, i) => 
            <div key={i}>
              <span>
                <h3>{verse.title ? verse.title : verse.chapter + ":" + verse.verse}</h3>
                <span>
                  {verse.content}
                </span>
              </span>
              <span>
                <Textarea/>
              </span>
            </div>
          )
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