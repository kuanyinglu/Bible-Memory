import React from 'react';
import { loadSavedVerses, searchVerses } from '../js/redux/actions';
import { connect } from 'react-redux';
import { practiceBooks } from '../js/bibleBooks'

class VerseChooser extends React.Component {
  constructor (props) {
    super(props);
    this.state = { referenceText: "" };
  }

  verseInputOnChange (e) {
    this.setState({ referenceText: e.target.value });
  }

  render () {
    if (!this.props.savedVerses.initialized) {
      this.props.loadSavedVerses();
      return null;
    } else {
      return (
        <div>
          <span>
            Verse Reference
            <input type="text" value={this.state.referenceText} onChange={this.verseInputOnChange}/>
            <button onClick={() => this.props.searchVerses(this.state.referenceText)}>Search</button>
          </span>
          <button onClick={() => practiceBooks()}>
            Books of The Bible
          </button>
          {
            this.props.savedVerses.verses.map((verse, i) => 
              <button key={i} onClick={() => this.props.searchVerses(verse)}>
                {verse}
              </button>
            )
          }
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  savedVerses: state.savedVerses
});

const mapDispatchToProps = dispatch => ({
  loadSavedVerses: () => dispatch(loadSavedVerses()),
  searchVerses: reference => dispatch(searchVerses(reference))
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseChooser);