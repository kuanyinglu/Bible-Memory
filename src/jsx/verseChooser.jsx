import React from 'react';
import { loadSavedVerses, searchVerses, updateVerses } from '../js/redux/actions';
import { BrowserRouter as Router, Route } from "react-router-dom";
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

  practiceVerse (verse) {
    this.props.searchVerses(verse);
    this.props.history.push('/practice');
  }

  practiceBibleBooks () {
    practiceBooks();
    this.props.history.push('/practice');
  }

  render () {
    if (!this.props.savedVerses.initialized) {
      this.props.loadSavedVerses();
      return null;
    } else {
      return (
        <div className="verse-chooser wrapper">
          <h2>Verses</h2>
          <div className="search">
            Verse Reference
            <input type="text" aria-label="Type Bible verses and search to practice memorizing" value={this.state.referenceText} onChange={e => this.verseInputOnChange(e)}/>
            <button onClick={() => { this.practiceVerse(this.state.referenceText) }}>Search</button>
          </div>
          <hr/>
          <div className="saved-verses">
            <button onClick={() => { this.practiceBibleBooks(verse) }}>
              Books of The Bible
            </button>
            {
              this.props.savedVerses.verses.map((verse, i) => 
                <button key={i} onClick={() => { this.practiceVerse(verse) }}>
                  {verse}
                </button>
              )
            }
          </div>
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
  searchVerses: reference => {
    dispatch(searchVerses(reference));
    dispatch(updateVerses(reference));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseChooser);