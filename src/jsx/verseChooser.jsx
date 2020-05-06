import React from 'react';
import { searchVerses, addVerse, deleteVerse, saveVerses } from '../js/redux/actions';
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
      return null;
    } else {
      let saveVerses = e => {
        this.props.saveVerses();
      };
      let addVerses = () => {
        this.props.addVerse(this.state.referenceText);
        this.setState({ referenceText: "" });
      };
      let deleteVerses = reference => {
        this.props.deleteVerse(reference);
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
            <button onClick={() => { this.practiceBibleBooks() }}>
              Books of The Bible
            </button>
            {
              this.props.savedVerses.verses.uncategorized ? 
              this.props.savedVerses.verses.uncategorized.map((verse, i) => 
                <div key={i}>
                  <button onClick={() => { this.practiceVerse(verse) }}>
                    {verse}
                  </button>
                  <button className="action" onClick={() => { deleteVerses(verse) }}>X</button>
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
  searchVerses: reference => dispatch(searchVerses(reference)),
  addVerse: reference => dispatch(addVerse(reference)),
  deleteVerse: reference => dispatch(deleteVerse(reference)),
  saveVerses: () => dispatch(saveVerses()),

});

export default connect(mapStateToProps, mapDispatchToProps)(VerseChooser);