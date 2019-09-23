import React from 'react';
import { updateSavedVerses, searchVerses, updateVerses } from '../js/redux/actions';
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
      let updateFunc = this.props.updateSavedVerses;
      let xhr = new XMLHttpRequest();
      xhr.open('POST', 'http://localhost:3000/getVerses');
      xhr.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          updateFunc(xhr.responseText);
        }
      }
      xhr.send();
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
  updateSavedVerses: objStr => dispatch(updateSavedVerses(objStr)),
  searchVerses: reference => {
    dispatch(searchVerses(reference));
    dispatch(updateVerses(reference));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(VerseChooser);