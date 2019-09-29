import React from 'react';
import { updateSavedVerses, searchVerses, updateVerses } from '../js/redux/actions';
import { connect } from 'react-redux';
import { practiceBooks } from '../js/bibleBooks'

class VerseChooser extends React.Component {
  constructor (props) {
    super(props);
    this.state = { referenceText: "", savedSuccessful: false };
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
      xhr.open('POST', /getVerses');
      xhr.setRequestHeader('Content-Type', 'text/html; charset=utf-8');
      xhr.onreadystatechange = function() {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
          updateFunc(xhr.responseText);
        }
      }
      xhr.send();
      return null;
    } else {
      let saveVerses = e => {
        let setState = this.setState;
        let updateFunc = this.props.updateSavedVerses;
        let xhr = new XMLHttpRequest();
        xhr.open('POST', '/saveVerses');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function() {
          if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            let xhr2 = new XMLHttpRequest();
            xhr2.open('POST', '/getVerses');
            xhr2.onreadystatechange = function() {
              if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                updateFunc(xhr2.responseText);
                setState({ savedSuccessful: true });
              }
            }
            xhr2.send();
          }
        }
        xhr.send('verses=' + JSON.stringify(this.props.savedVerses.verses));
      };
      let addVerses = () => {
        let newState = JSON.parse(JSON.stringify(this.props.savedVerses.verses));
        if (!newState.uncategorized) {
          newState.uncategorized = [];
        }
        newState.uncategorized.push(this.state.referenceText);
        this.setState({ referenceText: "" });
        this.props.updateSavedVerses(JSON.stringify(newState));
      };
      let deleteVerses = verse => {
        let newState = JSON.parse(JSON.stringify(this.props.savedVerses.verses));
        if (!newState.uncategorized) {
          newState.uncategorized = [];
        }
        let verseIndex = newState.uncategorized.indexOf(verse);
        if (verseIndex !== -1) {
          newState.uncategorized.splice(verseIndex, 1);
        }
        this.setState({ referenceText: "" });
        this.props.updateSavedVerses(JSON.stringify(newState));
      }
      return (
        <div className="verse-chooser wrapper">
          <h2>Verses</h2>
          <div className="search">
            Verse Reference
            <input type="text" aria-label="Type Bible verses and search to practice memorizing" value={this.state.referenceText} onChange={e => this.verseInputOnChange(e)}/>
            <button onClick={() => { this.practiceVerse(this.state.referenceText) }}>Search</button>
            <button className="action" onClick={addVerses}>Add</button>
          </div>
          <hr/>
          <div className="saved-verses">
            <button onClick={() => { this.practiceBibleBooks(verse) }}>
              Books of The Bible
            </button>
            {
              this.props.savedVerses.verses.uncategorized ? 
              this.props.savedVerses.verses.uncategorized.map((verse, i) => 
                <div key={i}>
                  <button onClick={() => { this.practiceVerse(verse) }}>
                    {verse}
                  </button>
                  <button className="action" onClick={() => deleteVerses(verse)}>X</button>
                </div>
              ) :
              null
            }
          </div>
          <div>
            <button onClick={saveVerses} className="action">
              Save
            </button>
            {this.state.savedSuccessful ? <span>Save successful!</span> : null}
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